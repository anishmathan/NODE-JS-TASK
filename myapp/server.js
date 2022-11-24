const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser =require('body-parser')

const dotenv=require('dotenv')
dotenv.config()

const EmployeeRoute =require('./server/routes/employee')
const AuthRoute = require("./server/routes/auth");

mongoose.connect('mongodb://localhost:27017/demodb', {
    useNewUrlParser: true, useUnifiedTopology: true })
   console.log("db connected successfully")
    // const db=mongoose.connection

    // db.on('error', (err)=>{
    //     console.log(err)
    // })
    // db.once('open',()=>{
    //     console.log('Database Connection Established')
    // })
    // .then(()=>console.log("connected"))
    // .catch((err)=>console.log(err))

    const app=express()

    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use('/uploads', express.static("uploads"))

    const PORT=process.env.PORT ||7000
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)

    })
    app.use('/api/employee', EmployeeRoute)
    app.use('/api',AuthRoute)

    var User = require('./server/model/Employee');
const uploads = require('./server/middleware/upload')









/* const express = require('express'); // Import Express package so use Require
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path'); 



const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8000


app.use(morgan('tiny')); //log request

//parse request to body -parser
app.use(bodyparser.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views/index.ejs"))
//load assets

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.get('/', (req, res) => {
    res.send('its working');
})
app.listen(8000, () => {
    console.log('server is running on http://localhost:${8000}')
}); */

