var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    passport        = require("passport"),
    methodeOverride = require("method-override"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index.js");
    
//  PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Cause I'm a man woman",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Express Configuration
mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://vini:xaxaxa@ds131119.mlab.com:31119/yelpcamp");
//mongoose.connect("mongodb://localhost/yelp_camp");

console.log(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodeOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next(); //move to next code
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes); //reuducing routes
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started");
});