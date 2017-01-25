var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "http://www.photosforclass.com/download/4684194306",
        description: "Mixtape iPhone yr, cray portland green juice la croix quinoa ethical pabst cliche locavore aesthetic kinfolk pinterest. Cliche selvage deep v, mustache banh mi poke vaporware neutra air plant kogi cold-pressed raclette. Pickled paleo typewriter meh, chillwave fixie cliche tumblr gentrify raclette. Gentrify thundercats cardigan etsy. Retro chambray ethical, stumptown glossier tacos vexillologist thundercats tofu art party keytar viral live-edge shabby chic austin. Meggings photo booth venmo tumblr coloring book literally, fanny pack pinterest pug kickstarter hoodie post-ironic. Pickled edison bulb knausgaard, migas bushwick mustache pitchfork readymade fam enamel pin plaid retro."
        
    },
    {
        name: "Desert Mesa",
        image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
        description: "Mixtape iPhone yr, cray portland green juice la croix quinoa ethical pabst cliche locavore aesthetic kinfolk pinterest. Cliche selvage deep v, mustache banh mi poke vaporware neutra air plant kogi cold-pressed raclette. Pickled paleo typewriter meh, chillwave fixie cliche tumblr gentrify raclette. Gentrify thundercats cardigan etsy. Retro chambray ethical, stumptown glossier tacos vexillologist thundercats tofu art party keytar viral live-edge shabby chic austin. Meggings photo booth venmo tumblr coloring book literally, fanny pack pinterest pug kickstarter hoodie post-ironic. Pickled edison bulb knausgaard, migas bushwick mustache pitchfork readymade fam enamel pin plaid retro."
        
    },
    {
        name: "Neuromancer",
        image: "http://www.photosforclass.com/download/8006869967",
        description: "Mixtape iPhone yr, cray portland green juice la croix quinoa ethical pabst cliche locavore aesthetic kinfolk pinterest. Cliche selvage deep v, mustache banh mi poke vaporware neutra air plant kogi cold-pressed raclette. Pickled paleo typewriter meh, chillwave fixie cliche tumblr gentrify raclette. Gentrify thundercats cardigan etsy. Retro chambray ethical, stumptown glossier tacos vexillologist thundercats tofu art party keytar viral live-edge shabby chic austin. Meggings photo booth venmo tumblr coloring book literally, fanny pack pinterest pug kickstarter hoodie post-ironic. Pickled edison bulb knausgaard, migas bushwick mustache pitchfork readymade fam enamel pin plaid retro."
        
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        //remove campground
        if (err){
            console.log(err);
        } else {
            console.log("REMOVE CAMPGROUNDS");
        }
             //add new campgrounds
        data.forEach(function(seed){
             Campground.create(seed, function(err, campground){
                 if(err){
                     console.log(err);
                 } else {
                     console.log("added a campground")
                     //create a comment
                     Comment.create(
                         {
                            text:"THIS IS PLACE IS GREAT, BUT I WISH THERE WAS INTERNET",
                            author: "Homer"
                         }, function(err, comment){
                             if(err){
                                 console.log(err)
                             } else {
                                 campground.comments.push(comment);
                                 campground.save();
                                 console.log("create new comment")
                             }
                         })
                 }
             })
        });
    });
}

module.exports = seedDB;

