const DB = require('../Dbconnection/mysqlConnection')


module.exports = {
    postLugun : async (req, res) => {
        const q = "INSERT INTO university_lugun.luguns (`title`, `review`, `rating`, `lat`, `long`, `user`, `school`) VALUES (?)"
        const values= [
            req.body.title,
            req.body.review,
            req.body.rating,
            req.body.lat,
            req.body.long,
            req.body.userId,
            req.body.userSch
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
    },

    deleteLugun : async(req, res)=>{
        const id = req.params.id
        const q = "DELETE FROM university_lugun.luguns WHERE id=?"

        DB.query(q, [id], (err, data)=>{
            if(err) res.status(500).json({message: err.message})


            return res.status(200).json("Data is deleted")
        })
    }
}
