const express=require('express')
const cors=require('cors')

const app=express()

const dotenv=require('dotenv')

const bodyParser=require('body-parser')

dotenv.config({path:'config.env'})

const router=require('./Routes/eventRoutes')
const path=require('path')

app.use(cors())

const AppError=require('./utils/appError')
const errorController = require('./Controller/errorController')
const ErrorController=('./Controller/errorController')
const cookieParser=require('cookie-parser')

app.set("view engine","ejs")


app.use(cookieParser())

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.json())
app.use(express.static('../FrontEnd'))

app.use(express.static(path.join(__dirname,'/public/scripts')))

app.use(express.static(path.join(__dirname,'/uploads/')))



app.use('/KickIt',router)




app.use('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl}`,404))
})

app.use(errorController)
module.exports=app