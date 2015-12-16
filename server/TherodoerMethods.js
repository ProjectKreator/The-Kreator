Meteor.methods({
	createTheodoer: function (firstname, name, email, githubaccount) {
		// Make sure the user is logged in before creating a theodoer
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		
		Theodoer.insert({
			prenom: firstname,
			nom: name,
			email: email,
			comptegithub: githubaccount,
			createdAt: new Date()
		});
	},

	updateTheodoer: function (theodoerId, firstname, name, email, githubaccount) {
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
			
	},

	
	 
});