const DB = require('../Dbconnection/mysqlConnection')
const bcrypt = require('bcrypt')

module.exports = {
    postUser : async (req, res)=> {
        const userId = req.body.username

        const q  = "SELECT * FROM university_lugun.users WHERE `username` = ? "

        DB.query(q, [userId],( async (err, data)=>{
            if(userId === ""){
                return res.status(400).json({message:"All fields must be filled"})
            }
            if (err) res.status(400).json({message: err.message})

            if(data.length > 0){
                res.status(403).json({message: "username is taken"})
            }else{

                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(req.body.password, salt)
                const newQuery = "INSERT INTO university_lugun.users (`username`, `email`, `password`, `student`, `universityName`) VALUES  (?) "
            const values = [
                req.body.username,
                req.body.email,
                hashPassword,
                req.body.student,
                req.body.universityName,
            ] 

            DB.query(newQuery, [values], (err, data)=> {
                if (err) return res.status(400).json({message: err.message})


                res.status(200).json({
                    username: req.body.username
                })
            })
            }
        }))
    },


    loginUser: async (req , res)=> {
        const userIdName = req.body.username
        const userIdPassword = req.body.password

        if(userIdName === "" || userIdPassword === ""){
          return res.status(400).json({message:"All fields must be filled"})
        }
        
        const q  = "SELECT* FROM university_lugun.users WHERE `username` = ? "

        await DB.query(q, [userIdName], async (err, data)=>{
            if (err) res.status(400).json({message: err.message})

            if(data.length <= 0){
                return res.status(400).json({message: "Enter correct username!"})
            }

            const match = await bcrypt.compare(userIdPassword, data[0].password)
            
            if(!match){
                res.status(400).json({message:"Incorrect Password!"})
            }else{
                res.status(200).json({
                    username: data[0].username,
                    email: data[0].email,
                    school: data[0].universityName
                })
            }
        })
    }
}