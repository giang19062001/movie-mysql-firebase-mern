const express = require("express")
const router = express.Router()
const movieController = require("../controller/movie")
const upload = require('../middleware/photo')

router.get('/',movieController.getAllMovie)
router.post('/',upload.single('photo'),movieController.addMovie)
router.put('/:id',movieController.updateMovie)
router.get('/:id',movieController.getMovieDetail)
router.get('/search/:id',movieController.searchMovie)
router.delete('/:id',movieController.deleteMovie)

module.exports = router