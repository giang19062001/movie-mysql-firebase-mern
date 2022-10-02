const express = require('express')
const app = express()
const cors = require("cors");
const morgan = require("morgan")
const bodyParser = require("body-parser")
const {connectDb} = require('./database/db')

const movieRouter = require('./router/movie')
const cateRouter = require('./router/cate')


app.use(cors()) 
app.use (bodyParser.json()) 
app.use(morgan("common"))
app.use(express.static('images'))

app.use('/api/movie',movieRouter)
app.use('/api/cate',cateRouter)


app.listen(process.env.PORT ||8000, async ()=>{
    console.log('server is running')
    await connectDb()
})