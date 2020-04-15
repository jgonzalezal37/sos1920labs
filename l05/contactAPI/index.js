module.exports = function init (app, db){
	console.log("Registering contact API.....");
	const BASE_API_URL = "/api/v1";
	var initialContacts = [
	{ 
		name: "peter",
		phone: 123456	
	},
	{ 
		name: "pablo",
		phone: 789456	
	}
];

app.get(BASE_API_URL+"/contacts/loadInitialData", (req,res) =>{
	console.log("New GET ../loadInitialData");
	db.insert(initialContacts);
	res.sendStatus(200);
	console.log("Initial Contact loaded"+JSON.stringify(initialContacts,null,2));
});


// GET CONTACTS

app.get(BASE_API_URL+"/contacts", (req,res) =>{
	console.log("New GET ../contact");
	db.find({},(err, contact)=>{
		contacts.forEach((c)=>{
			delete c._id;
		})
		res.send(JSON.stringify(contacts,null,2));
	console.log("Data sent:"+JSON.stringify(contacts,null,2));
	});
	
	
});


// POST CONTACTS

app.post(BASE_API_URL+"/contacts",(req,res) =>{
	
	var newContact = req.body;
	
	if((newContact == "") || (newContact.name == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		contacts.push(newContact); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE CONTACTS

// GET CONTACT/XXX

app.get(BASE_API_URL+"/contacts/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) => {
		return (c.name == name);
	});
	
	
	if(filteredContacts.length >= 1){
		res.send(filteredContacts[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
});

// PUT CONTACT/XXX

// DELETE CONTACT/XXX

app.delete(BASE_API_URL+"/contacts/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) => {
		return (c.name != name);
	});
	
	
	if(filteredContacts.length < contacts.length){
		contacts = filteredContacts;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
	
});
	
	
	
	console.log("OK");
}