const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
   'heroku_00f2e86728f0a8f', 
   'bb3c4218313695',
    '6fec274c', {
  host: 'us-cdbr-east-06.cleardb.net',
  dialect: 'mysql',
});
// 'mysql://bb3c4218313695:6fec274c@us-cdbr-east-06.cleardb.net/heroku_00f2e86728f0a8f?reconnect=true'

const connectDb = async () =>{
    try {
        await sequelize.authenticate();
        console.log('connect mysql succesfull')
    } catch (error) {
        console.log('connect mysql fail')
    }
}
module.exports ={sequelize,connectDb}