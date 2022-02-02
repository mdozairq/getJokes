//jshint esversion: 6

const express = require("express");
const https = require("https");
//const request = require("request");
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs'); 


app.get("/", function(req, res){
	res.sendFile(__dirname+"/index.html");
});



try{
app.post("/", function(req, res){
	var url="";
	console.log("post request Recieved");
			const type = req.body.jokeType;
			const rmType = req.body.removeType;
			if(rmType === undefined){
				var url="https://v2.jokeapi.dev/joke/"+type;
			}
			else
			{
				var url="https://v2.jokeapi.dev/joke/"+type+"?blacklistFlags="+rmType;
			}

			https.get(url, function(response){
				console.log(response.statusCode);
				response.on("data", function(data){
				const jokeData = JSON.parse(data);
				//console.log(jokeData);
				const joke1= jokeData.setup;
				const joke2= jokeData.delivery;
				const jokes= jokeData.joke;
				const types = jokeData.type;
				if(types === 'twopart'){
						res.render("getJoke", {gJokes: joke1+"\n"+joke2});
					}
				else
					res.render("getJoke", {gJokes: jokes});
			});
		});
});
}catch(error){
	console.log("error occured", error);
};


app.get("/t&c", function(req, res){
	res.sendFile(__dirname+"/t&c.html");
});

app.get("/privacy", function(req, res){
	res.sendFile(__dirname+"/privacy.html");
});


app.listen(process.env.PORT || 3000, function () {
	// body...
	console.log("Server is running on the port 3000");
});

