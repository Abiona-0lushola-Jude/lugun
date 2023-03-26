const lugunModel = require('../Models/LugunModel')

module.exports = {
    postLugun : async (req, res) => {
        
        const {title, review, rating, lat, long, userId, userSch, userEmail} = req.body
        try {
            const createLugun = await lugunModel.create({title, review, rating, lat, long, userId, userSch, userEmail})
            await res.status(201).json(createLugun)
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    },
    
    getAllLugun : async (req, res) =>{
        try {
            const allLuguns = await lugunModel.find()
            await res.status(200).json(allLuguns)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    },

    deleteLugun : async(req, res)=>{
        const {id} = req.params
        
        try {
            await lugunModel.findByIdAndDelete(id)
            await res.status(202).json({message: "Lugun Location has been deleted"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }
}
