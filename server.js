//importing and initialising the files
const express = require("express");
const bodyParser = require("body-parser");//to parse json form the post req
const path = require("path");
const app = express();
const mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectID;
const bcrypt= require("bcrypt");
const saltRounds = 10;

//mongo connection
mongoose.connect("mongodb://localhost/eventking", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//DATABSE INITIALISATION
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

var userSchema={
  email:String,
  password:String
};
var User=new mongoose.model("User",userSchema);



//making schema for properties listed
var propSchema = new mongoose.Schema({
  venue: String,
  email: String,
  Occupancy: String,
  Contact: Number,
  address: String,
  city: String,
  state: String,
  zip: Number,
  price: Number,
  date: Date,
  wifi: String,
  tv: String,
  parking: String,
});
//making a properties schema
var property = mongoose.model("property", propSchema); //here mongoose makes collection of the plural of property



//specifying static path in for static files
app.use(express.static(path.join(__dirname, "static")));

//Body parser related stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//views folder for rendering pug files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


//get req for home
app.get("/home",(req,res)=>{
  res.render("home");
});

app.get("/login",(req,res)=>{
  res.render("login");
});


app.get("/register",(req,res)=>{
  res.render("register");
});

app.post("/register",(req,res)=>{
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser=new User({
      email:req.body.username,
      password:hash
    });
    console.log(newUser);
    newUser.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        res.render("index");
      }
    });
});
});

app.post("/login",(req,res)=>{
  
  const username=req.body.username;
  const password=req.body.password;
  User.findOne({email:username}, function(err,foundUser){
    console.log("rferferferf");
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if(result==true){
            res.render("index");

          }
      });
        
      }
    }
  });
});




// starting ROUTING FOR PROPERTY PAGE
app.get("/property", (req, res) => {
  //get request fo property page
  res.render("property");
});

app.post("/property", (req, res) => {
  //post request fo property page

  var obj1 = {
    wifi: req.body.wifi ? "yes" : "no",
    tv: req.body.tv ? "yes" : "no",
    parking: req.body.parking ? "yes" : "no",
    pool: req.body.pool ? "yes" : "no",
  };
  //delete existing checkbox properties since it is not giving as value
  // in the required datatype which is booolean so we will add new key
  //and value pair in the object.
  var obj2 = req.body;

  if (obj2.hasOwnProperty("wifi")) {
    delete obj2["wifi"];
  }
  if (obj2.hasOwnProperty("tv")) {
    delete obj2["tv"];
  }
  if (obj2.hasOwnProperty("parking")) {
    delete obj2["parking"];
  }
  if (obj2.hasOwnProperty("pool")) {
    delete obj2["pool"];
  }
  obj2["wifi"] = obj1["wifi"];
  obj2["tv"] = obj1["tv"];
  obj2["parking"] = obj1["parking"];
  obj2["pool"] = obj1["pool"];

  console.log(obj2);
  var myProp = new property(obj2);
  myProp //saving the object recieved from post request in our mongodb
    .save()
    .then(() => {
      res.send("done hurrayy!!!!!");
    })
    .catch(() => {
      res.send("not able to save data in database");
    });
});
//ending of ROUTING of property page

// starting of ROUTING FOR INDEX PAGE
app.get("/", (req, res) => {
  res.render("index"); //get request for index page
  
});

app.post("/", (req, res) => {
  //post request fo index page

  daysReservation = req.body.days;
  searchObj = req.body;
  property.find(
    { city: searchObj.city, date: searchObj.date }, //applying filter so that we can get desired results
    (err, availableSpace) => {
      if (err) return console.error(err);
      if (!availableSpace.length) {
        res.send(
          "SORRY!!, we are not able to find a event space available for rental which satisfies your requirement"
        );
      }
      if (availableSpace.length) {
        res.render("search", {
          results: availableSpace,
        });
      }
    }
  );
});
//ending for routing for login page and redirecting to search page if city
//in database



//Routing for details page 
app.get("/details/:id", (req, res) => { 
  var databaseId1 = req.params.id;    //parsing id from the URL

  databaseId = new ObjectID(databaseId1); //making an mongodb object which will be needed while filtering the details

  property.find({ _id: databaseId }, (err, detailsPage) => { //applying filter based on ObjectID
    if (err) return console.error(err);

    res.render("details", {//rendering the page
      A: detailsPage,
      day: daysReservation,
    });
  });
});

//listening the server
const port = 50;
app.listen(port, () => console.log(`server started on port ${port}`));
