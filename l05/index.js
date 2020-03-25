const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var contacts = [
	{ 
		name: "peter",
		phone: 123456	
	},
	{ 
		name: "pablo",
		phone: 789456	
	}
];

const BASE_API_URL = "/api/v1";

//GET CONTACTS

app.get(BASE_API_URL+"/contacts", (req,res) =>{
	res.send(JSON.stringify(contacts,null,2));
});
//POST CONTACTS
app.post(BASE_API_URL+"/contacts",(req,res) =>{
	 
	var newContact = req.body;
	if((newContact.name == null) || (newContact.name == null)){
		res.sendStatus(400,"BAD REQUEST (no name provided)");
	}else{
		contacts.push(newContact);
		res.sendStatus(201,"CREATED");
	}
});

//DELETE CONTACTS


//GET CONTACTS/xxx
app.get(BASE_API_URL+"/contacts/:name",(req,res)=>{
	var name = req.params.name;
	var filteredContacts = contacts.filter((c) => {
		return (c.name == name)
	});
	if(filteredContacts.length >= 1){
		res.send(filteredContacts[0])
	}else{
		res.sendStatus(404, "CONTACT NOT FOUND")
	}
});

//PUT CONTACTS/xxx


//DELETE CONTACTS/xxx
app.delete(BASE_API_URL+"/contacts/:name",(req,res)=>{
	var name = req.params.name;
	var filteredContacts = contacts.filter((c) => {
		return (c.name != name)
	});
	if(filteredContacts.length < contacts.length){
		contacts = filteredContacts;
		res.sendStatus(200, "OK");
	}else{
		res.sendStatus(404, "CONTACT NOT FOUND")
	}
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");