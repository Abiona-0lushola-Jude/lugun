const DB = require('../Dbconnection/mysqlConnection')

module.exports = {
    getAllUniversityList : async (req, res) =>{
        const q = "SELECT * FROM university_lugun.universities"

        await DB.query(q, (err, data)=>{
            if(err) return res.status(500).json({message: err.message})

            return res.status(200).json(data)
        })
    }
}