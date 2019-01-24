var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/location_app");


app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

var locationchema= new mongoose.Schema({
    name : String,count : Number,img : String,dept : String,cost : Number,desc1 : String,desc2 : String,desc3 : String,desc4 : String,
    desc5 : String,desc6 : String,users : Array,
});
 var Location=mongoose.model("Location",locationchema);


app.get("/",function(req,res){
    Location.find({},function(err,locs){if(err){console.log("Wrong");}else{
        console.log(locs);
        res.render("home.ejs",{locs:locs});
    }});
});
app.get("/createnew",function(req,res){
    Location.find({},function(err,locs){if(err){console.log("Wrong");}else{
        console.log(locs);
        res.render("new.ejs",{locs:locs});
    }});
});
app.post("/createnew",function(req,res){
    var firstnametemp=req.body.firstname;
    var lastnametemp=req.body.lastname;
    var contacttemp=req.body.contact;
    var batchtemp=req.body.batch;
    var trip=req.body.trip;
    var c;
    var user={contact:contacttemp,firstname:firstnametemp,lastname:lastnametemp,batch:batchtemp};
    Location.update({name:trip},{$inc: {count:1}},function(err,loc){
        if(err){ console.log("Error in update")}
        else{
        }
    });
    Location.update({name:trip},{$push: {users:user}},function(err,loc){
        if(err){ console.log("Error in update")}
        else{
        }
    });
    res.redirect("/thankyou.ejs");
});
app.get("/thankyou.ejs",function(req,res){
    res.render("thankyou.ejs");
});
app.get("*",function(req,res){
   res.send("Sorry web page not found."); 
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started");
});