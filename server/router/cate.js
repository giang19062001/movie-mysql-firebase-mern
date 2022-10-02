const express = require("express")
const router = express.Router()
const cateController = require("../controller/cate")

router.post('/',cateController.addCate)
router.get('/',cateController.getAllCate)
router.delete('/:id',cateController.deleteCate)




module.exports = router