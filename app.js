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
	const empty = req;
	const Nonempty = req.body;
	console.log(empty);
	console.log("post request Recieved");
	if(req.body == Nonempty)
	{
			const type = req.body.jokeType;
			const rmType = req.body.removeType;
			//console.log(rmType);
			if(rmType === undefined){
				https.get("https://v2.jokeapi.dev/joke/"+type, function(response){
				console.log(response.statusCode);
				response.on("data", function(data){
				const jokeData = JSON.parse(data);
				//console.log(jokeData);
				const joke1= jokeData.setup;
				const joke2= jokeData.delivery;
				const jokes= jokeData.joke;
				const types = jokeData.type;
				//res.write("<h1> JOKES </h1>");
				if(types === 'twopart'){
					//res.write("<p>Person 1 : "+joke1+"\n</p>");
					//res.write("<p>Person 2 : "+joke2+"</p>");
					res.render("getJoke", {gJokes: joke1+"\n"+joke2});
					//res.render("getJoke", {gJokes2: joke2});
				}
				else
					res.render("getJoke", {gJokes: jokes});
					//res.write(jokes);
					//res.send();
		 });
		});
			}
			else{
			https.get("https://v2.jokeapi.dev/joke/"+type+"?blacklistFlags="+rmType, function(response){
			console.log(response.statusCode);
			response.on("data", function(data){
			const jokeData = JSON.parse(data);
			//console.log(jokeData);
			const joke1= jokeData.setup;
			const joke2= jokeData.delivery;
			const jokes= jokeData.joke;
			const types = jokeData.type;
			//res.write("<h1> JOKES </h1>");
			if(types === 'twopart'){
				//res.write("<p>Person 1 : "+joke1+"\n</p>");
				//res.write("<p>Person 2 : "+joke2+"</p>");
				res.render("getJoke", {gJokes: joke1+"\n"+joke2});
				//res.render("getJoke", {gJokes2: joke2});
			}
			else
				res.render("getJoke", {gJokes: jokes});
				//res.write(jokes);
				//res.send();
		 });
		});
	  }
	}
	else{
		//res.render('newjoke');
		res.write("<h1> Please Select type of Jokes then Submit </h1>");
		res.write("<p>Please Go Back and Try again</p>")
	}
	
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

//heroku git:remote -a fierce-shelf-72438