const AppError = require("../utils/appError")

const sendDevelopment=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        stack:err.stack
    })
}

const sendProduction=(err,res)=>{
    if(err.isOperational===true){
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}
else{
    console.error("ERROR")
    res.status(500).json({
        status:'error',
        message:'Something went very wrong'
    })
}


}
const handleCastErrorDB=err=>{
    const message=`Invalid ${err.path}:${err.value}`
    return new AppError('Please enter a valid ID',400)
}
const handleValidationErrorDB=err=>{
    const error=Object.values(err.errors).map(el=>el.message)
    console.log(error)
    const message=`Invalid input data+${error.join('. ')}`
    return new AppError(message,400)
}
module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode||500
    err.status=err.status||'error'
    
    if(process.env.NODE_ENV==='development')
    sendDevelopment(err,res)
   else if(process.env.NODE_ENV==='production'){
    let error={...err}
   
    if(err.name==='CastError')error=handleCastErrorDB(error)
    if(err.name==='ValidationError')error=handleValidationErrorDB(error)
    sendProduction(error,res)
   }
}