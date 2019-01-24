var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/location_app");
var mongooseuser=require("mongoose");
mongooseuser.connect("mongodb://localhost/locationuser_app");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.set('debug', true);
mongooseuser.set('debug', true);

var locationschema= new mongoose.Schema({
   name : String,count : Number,img : String,dept : String,cost : Number,desc1 : String,desc2 : String,desc3 : String,desc4 : String,
    desc5 : String,desc6 : String,userfirstname : [String],
    userlastname: [String],
    usercontact: [Number],
    userbatch:[Number],
});
 var Location=mongoose.model("Location",locationschema);

var userschema= new mongooseuser.Schema({
      username : String,
    password : Number,
});
var User=mongooseuser.model("User",userschema);
app.get("/",function(req,res){
    Location.find({},function(err,locs){if(err){console.log("Wrong");}else{
        res.render("home.ejs",{locs:locs});
    }});
});
app.get("/createnew",function(req,res){
    Location.find({},function(err,locs){if(err){console.log("Wrong");}else{
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
    Location.update({name:trip},{$inc: {count:1}},function(err,loc){
        if(err){ console.log("Error in update")}
        else{
        }
    });
    Location.update({name:trip},{$push: {userfirstname:firstnametemp,userlastname:lastnametemp,userbatch:batchtemp,usercontact:contacttemp}},function(err,loc){
        if(err){ console.log("Error in update")}
        else{
        }
    });
    res.redirect("/thankyou");
});

app.get("/signin",function(req,res){
    res.render("signin.ejs");
});
app.post("/signin",function(req,res){
    var name=req.body.name;
    var pass=req.body.pass;
    User.findOne({username:name,password:pass},function(err,usser){if(err){ console.log(err);   }else{
        console.log(usser);
        if(usser){
        res.redirect("/adminhome");}
        else{res.render("nouser.ejs");}
    }});
});
app.get("/adminhome",function(req,res){
    Location.find({},function(err,locs){if(err){console.log("Wrong");}else{
        res.render("adminhome.ejs",{locs:locs});
    }});
});
app.post("/remove",function(req,res){
    var trip=req.body.trip;
    Location.remove({name:trip},function(err,locs){if(err){console.log("Wrong");}else{
        res.redirect("/");
    }});
});
app.get("/thankyou",function(req,res){
    res.render("thankyou.ejs");
});
app.get("/newloc",function(req,res){
    res.render("newplace.ejs");
});
app.post("/newloc",function(req,res){
    Location.create(req.body.loc,function(err,loc){
      if(err)
      {
          console.log(err);
      }else{
      res.redirect("/");     
      }
   });
});
app.get("*",function(req,res){
   res.send("Sorry web page not found."); 
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started");
});