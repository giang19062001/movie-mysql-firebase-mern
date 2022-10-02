const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
   'movie', 
   'root',
    '123', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDb = async () =>{
    try {
        await sequelize.authenticate();
        console.log('connect mysql succesfull')
    } catch (error) {
        console.log('connect mysql fail')
    }
}
module.exports ={sequelize,connectDb}