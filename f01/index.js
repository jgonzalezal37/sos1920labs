const express = require("express");
const time = new Date();
var app = express();
app.get("/time",(request,response)=>{
	response.send("<html>"+time.getHours()+"</html>");
}
	   )
app.listen(80);
console.log("Server ready");