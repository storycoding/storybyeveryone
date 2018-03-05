const http = require('http');
const fs = require('fs');
const queries = require('../database/queries');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let homepage;
let css;
let favicon;
let script;

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

const port = 8080;

const requestHandler = (request, response) => {

	if (request.url === "/script.js") {
		response.writeHead(200, {'Content-type' : 'application/javascript'});
    response.write(script);
    response.end();
	}

	else if (request.url === "/signup" && request.method === "POST") {


    var body = '';

    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {

    	// hacky, but fast parser
    	const bodyparser = function(string) {
  			let arr = string.split("=").slice(1); // parsing the form content

  			if(arr.length > 2) {
  				response.statusCode = 404;
		  		response.statusMessage = 'Invalid form input';
		  		response.end();
  				return;
  			}

  			let user = arr[0].split("&")[0];
  			let email = arr[1].substring(0, arr[1].indexOf("%")) + "@" + arr[1].substring(arr[1].indexOf("%")+3);
  
  			return {
    			name: user,
    			email: email
  			};
			};

			body = bodyparser(body);

      console.log("Body.name: ", body.name);
      console.log("Body.email: ", body.email);

      // using SendGrid's v3 Node.js Library
			// https://github.com/sendgrid/sendgrid-nodejs

			const msg = {
			  to: body.email,
			  from: 'hello@storybyeveryone.com',
			  subject: 'Welcome to the story by everyone, ' + body.name + '.',
			  text: 'this is the text',
			  html: `<div>
			  <p>Hello, ${body.name}</p>
			  <p>Thank you for joining the story by everyone.</p>
			  <p>As I treasure your time and attention, I will send you <strong>only one</strong> more email to let you know when the full website is launched.</p>
			  <p>Looking forward to sharing my stories with you,</p>
			  <p>Nuno</p>
			  </div>`,
			};

			sgMail.send(msg).then((res)=>console.log(res)).catch((err)=>console.error(err));
			
			queries.insert(body.name, body.email);

			response.writeHead(201);
			response.statusMessage = 'user info added to database';
		  response.end();

    });

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

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})