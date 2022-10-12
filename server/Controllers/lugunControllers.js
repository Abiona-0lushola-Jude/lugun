const DB = require('../Dbconnection/mysqlConnection')


module.exports = {
    postLugun : async (req, res) => {
        const q = "INSERT INTO university_lugun.luguns (`title`, `review`, `rating`, `lat`, `long`, `user`) VALUES (?)"
        const values= [
            req.body.title,
            req.body.review,
            req.body.rating,
            req.body.lat,
            req.body.long,
            req.body.user
        ]

        await DB.query(q, [values], (err, data)=>{
            if(err) return res.status(400).json({messgae: err.message})


            return res.status(203).json("Location created!")
        })
    },
    
    getAllLugun : async (req, res) =>{
        const q = "SELECT * FROM university_lugun.luguns"

        await DB.query(q, (err, data)=>{
            if(err) return res.status(400).json({messgae: err.message})


            return res.status(200).json(data)
        })
    }
}
