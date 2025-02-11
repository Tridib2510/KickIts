class ApiFeature{
    constructor(query,queryString){
      this.queryString=queryString
      this.query=query
    }
    filter(){
       const queryObj={...this.queryString}
      
      let queryStr=JSON.stringify(queryObj)

      queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>{
        `$${match}`})
        
        this.query=this.query.find(JSON.parse(queryStr))

        return this

    }
}
module.exports=ApiFeature