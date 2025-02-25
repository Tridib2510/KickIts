class ApiFeature{
    constructor(query,queryString,q){
      this.queryString=queryString
      this.query=query
      this.q=q
    }
    filter(){
      
       const queryObj={...this.queryString}
       const q2={...this.q}
      let queryStr=JSON.stringify(queryObj)
      let q3=JSON.stringify(q2)
      queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>{
        `$${match}`})
      
      if(q3=='{}')
        this.query=this.query.find(JSON.parse(queryStr),JSON.parse(q3))
      else{
       
        this.query=this.query.find(JSON.parse(q3))
        this.query=this.query.find(JSON.parse(queryStr))
        
   //console.log(JSON.parse(q3))
      }
        return this

}
}
module.exports=ApiFeature