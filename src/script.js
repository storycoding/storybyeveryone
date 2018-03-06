const signup = document.getElementById("signup");

signup.addEventListener("click", ()=> {

	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;

	let contact = document.getElementById("contact");

	while (contact.firstChild) {
    contact.removeChild(contact.firstChild);
	}

	let thanks = document.createElement("p");
	thanks.innerHTML = "Thank you for being a part of this journey, " + name + ".";
	contact.appendChild(thanks);
	alert(`Thank you for being a part of this journey,${name}.`);
});