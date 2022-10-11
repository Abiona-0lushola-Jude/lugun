const express = require('express')
const router = express.Router()
const universityController = require('../Controllers/universityListController')

router.get('/university', universityController.getAllUniversityList)





module.exports = router