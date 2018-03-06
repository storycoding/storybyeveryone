const signup = document.getElementById("signup");

signup.addEventListener("click", ()=> {

	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;

	let newsfeed = document.getElementById("newsfeed");
	let contact = document.getElementById("contact");

	while (newsfeed.firstChild) {
    newsfeed.removeChild(newsfeed.firstChild);
	}

	while (contact.firstChild) {
    contact.removeChild(contact.firstChild);
	}

	let thanks = document.createElement("p");
	thanks.innerHTML = "Thank you for being a part of this journey, " + name + ".";
	newsfeed.appendChild(thanks);
});