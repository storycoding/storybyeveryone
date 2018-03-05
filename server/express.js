const fs = require('fs');
const queries = require('../database/queries');

let homepage;
let css;
let favicon;
let script;

const express = require('express')

const setup = async function() {
	await fs.readFile("../dist/index.html", "utf-8", function(err, data){
	  if(err) {
	  	console.error("homepage failed to deliver, error: " + err);
	  }
	  else {
	  	homepage = data;
	  }
	});

	await fs.readFile("../dist/style.css", "utf-8", function(err, data){
	  if(err) {
	  	console.error("css failed to deliver, error: " + err);
	  }
	  else {
	  	css = data;
	  }
	});


	await fs.readFile("../dist/favicon.ico", function(err, data){
	  if(err) {
	  	console.error("favicon failed to deliver, error: " + err);
	  }
	  else {
	  	favicon = data;
	  }
	});

	await fs.readFile("../src/script.js", "utf-8", function(err, data){
	  if(err) {
	  	console.error("script failed to deliver, error: " + err);
	  }
	  else {
	  	script = data;
	  }
	});

}

setup();


const app = express();

app.use(express.static('../dist'));

app.post('/signup', (request, response) => {

	console.log("url: " + request.url);
	console.log("method:" + request.method);
	
	console.log("request.name:" + request.headers.name);
	console.log("request.email:" + request.headers.email);

	console.log("REQUEST:", request);

	let name = request.headers.name;
	let email = request.headers.email;

	const msg = {
	  to: email,
	  from: 'hello@storybyeveryone.com',
	  subject: 'Welcome to the story by everyone, ' + name + '.',
	  text: 'this is the text',
	  html: `<div>
	  <p>Hello, ${name}</p>
	  <p>Thank you for joining the story by everyone.</p>
	  <p>As I treasure your time and attention, I will send you <strong>only one</strong> more email to let you know when the full website is launched.</p>
	  <p>Looking forward to sharing my stories with you,</p>
	  <p>Nuno</p>
	  </div>`,
	};

	sgMail.send(msg);
	
	queries.insert(name, email);

  response.send("thank you");


});






// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const requestHandler = (request, response) => {

	if (request.url === "/script.js") {
		response.writeHead(200, {'Content-type' : 'application/javascript'});
    response.write(script);
    response.end();
	}

	else if (request.url === "/signup" && request.method === "POST") {

		
		
	}

	else if (request.url === '/style.css') {
    response.writeHead(200, {'Content-type' : 'text/css'});
    response.write(css);
    response.end();
    

  } else if (request.url === '/favicon.ico') {
  	response.writeHead(200, {'Content-type' : 'image/x-icon'});
    response.end(favicon, 'binary');

  } else {
  	response.writeHead(200, {'Content-Type': 'text/html'});
  	response.write(homepage);
  	response.end();
  	
  }
  
}


const port = 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))