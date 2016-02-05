Meteor.methods({
	
	createTheodoer: function (firstname, name, job, email, phone, githubaccount) {
		// Make sure the user is logged in before creating a theodoer
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		
		Theodoer.insert({
			"prenom": firstname,
			"nom": name,
			"job" : job,
			"email": email,
            "phone": phone,
			"comptegithub": githubaccount,
			"createdAt": new Date(),
			"current": false
		});
	},

/*	updateTheodoer: function (theodoerId, firstname, name, email, githubaccount) {
		// Make sure the user is logged in before creating a theodoer
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		
		Theodoer.update({ _id: theodoerId }, {
			$set: {prenom: firstname,
			nom: name,
			email: email,
			comptegithub: githubaccount}
		});
			
	},*/

	setCurrentTheodoer: function(theodoerId){
		// tous les theodoers voient leur attribut current ajusté à false
		Theodoer.update({current:true},
			{$set : {current: false, "requestTrello.token" : false}},
			{multi : true}
		);

		//on passe à true l'attribut current du theodoer dont l'ID correspond à celle fournie en argument de la méthode
		Theodoer.update({_id:theodoerId},
			{$set : {current:true}});
	}

	
	 
});