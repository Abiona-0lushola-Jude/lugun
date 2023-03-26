const express = require('express')
const router = express.Router()
const lugunController = require('../Controllers/lugunControllers')


// posting locations
router.post('/post/lugun', lugunController.postLugun)

// getting all location
router.get('/get/lungun', lugunController.getAllLugun)

router.delete('/delete/lungun/:id', lugunController.deleteLugun)

module.exports = router