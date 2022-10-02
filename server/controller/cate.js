
const {Cate,Movie} = require("../model/model")

const cateController = ({
    addCate : async(request,response)=>{
        try {
            const cate =  request.body
            // const newMovie = new Movie(movie)
            const newCate = Cate.build(cate)
            const saveCate = await newCate.save()
            response.status(200).json(saveCate)
    
        } catch (error) {
            response.status(500).json(error)
        }
    },
    getAllCate : async(request,response)=>{
        try {
            const cates = await Cate.findAll()
            response.status(200).json(cates)
        } catch (error) {
            response.status(500).json(error)
    
        }
    },
    deleteCate : async(request,response)=>{
        try {
            
            await Movie.destroy({
                where:{
                    CateId:request.params.id
                }
            })
            await Cate.destroy({
                where:{
                    id:request.params.id
                }
            })

            response.status(200).json("delete succesfull")
        } catch (error) {
            response.status(500).json("delete failed")
    
        }
    },
  
})

module.exports = cateController