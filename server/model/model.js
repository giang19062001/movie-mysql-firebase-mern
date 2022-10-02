const {sequelize} = require('../database/db')
const {DataTypes} = require('sequelize')

const Cate = sequelize.define('Cate',{
    name:{
        type:DataTypes.STRING,
        validate:{
            max:150
        },
    },
})
const Movie = sequelize.define('Movie',{
    name:{
        type:DataTypes.STRING,
        validate:{
            max:150
        },
    },
    year:{
        type:DataTypes.INTEGER,
        validate:{
            min:4
        },
    },
    link:{
        type:DataTypes.STRING,
    },
    photo:{
        type:DataTypes.STRING,
    },

})


Cate.hasOne(Movie)
Movie.belongsTo(Cate)

module.exports = {Movie,Cate} 
// sequelize.sync()     
//    chỉ dùng khi tạo, thay đổi dữ liệu bảng, record trong sql và tắt khi không cần thiết (node module.js)