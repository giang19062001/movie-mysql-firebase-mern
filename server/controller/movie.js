
const {Movie,Cate} = require("../model/model")

const movieController = ({
    addMovie : async(request,response)=>{
        try {
            const name = request.body.name
            const year = request.body.year
            const link = request.body.link
            const CateId = request.body.CateId
            const photo = request.file.filename

            const movie = { name, year,link,CateId, photo }

            // const newMovie = new Movie(movie)
            const newMovie = Movie.build(movie)
            const saveMovie = await newMovie.save()
            
            response.status(200).json(saveMovie)
    
        } catch (error) {
            response.status(500).json(error)
        }
    },
    getAllMovie : async(request,response)=>{
        try {
            const movies = await Movie.findAll()
            
            response.status(200).json(movies)
        } catch (error) {
            response.status(500).json(error)
    
        }
    },
    getMovieDetail : async(request,response)=>{
        try {
            const movie = await Movie.findOne({
                where:{
                    id:request.params.id
                }
            })
            const cate = await Cate.findByPk(movie.CateId)
            const detail = {movie:movie,cate:cate.name}

            response.status(200).json(detail)
        } catch (error) {
            response.status(500).json(error)
    
        }
    },
    updateMovie : async(request,response)=>{
        try {
            const movie = await Movie.findOne({
                where:{
                    id:request.params.id
                }
            })
            const {name, year, link, CateId } = request.body
            await movie.set(
                {
                    name:name,
                    year:year,
                    link:link,
                    CateId:CateId
                }            
            )
            await movie.save()
            response.status(200).json(movie)
    
        } catch (error) {
            response.status(500).json(error)
    
        }
    },
    deleteMovie : async(request,response)=>{
        try {

            await Movie.destroy({
                where:{
                    id:request.params.id
                }
            })
            response.status(200).json("delete succesfull")
        } catch (error) {
            response.status(500).json("delete failed")
    
        }
    },
    searchMovie : async(request,response)=>{
        try {

          const movies = await Movie.findAll({
            where: {
              CateId: request.params.id
            }
          });
            response.status(200).json(movies)
        } catch (error) {
            response.status(500).json(error)
    
        }
    },
})

module.exports = movieController