const signup = document.getElementById("signup");

signup.addEventListener("click", ()=> {

	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;

	console.log(name);
	console.log(email);

	let contact = document.getElementById("contact");

	while (contact.firstChild) {
    contact.removeChild(contact.firstChild);
	}

	let thanks = document.createElement("p");
	thanks.innerHTML = "Thank you for being a part of this journey, " + name + ".";
	contact.appendChild(thanks);


	// // something is wrong with the axios, it doesn't send the props as headers

// let data = {
// 	name: name,
//   email: email
// }

// let headers = {
//     'Content-Type': 'application/json'
// }

// axios.post("/signup", data, headers)

//   .then((response) => {
//       console.log(response.data[0]);
//   })
//   .catch((error) => {
//       console.log(error[0]);
// })

/*
 var req ={
      "request": {
        "header": {
          "name": name,
          "email": email
        },
        "body": {
        "shape":"round"    
    }
      }
    };

    // define request from http.request
    http.request.post({
	    url: '/signup',
	    body: req,
	    json: true
			}, function (error, response, body) {
	   		if (!error && response.statusCode == 200) {
	      console.log(body);
	    }
	});
*/

});