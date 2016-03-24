Meteor.methods({
	
	createTheodoer: function (firstname, name, job, email, phone, githubaccount) {
		// Make sure the user is logged in before creating a theodoer
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		var currentUser = Meteor.userId();
		
		Theodoer.insert({
			"createdBy" : currentUser,
			"prenom": firstname,
			"nom": name,
			"job" : job,
			"email": email,
            "phone": phone,
			"comptegithub": githubaccount,
			"createdAt": new Date(),
			"requestGitHub" : {
				"sent" : undefined,
				"recipient" : undefined
			},
			"requestGoogle" : {
				"token" : false,
				"email" : undefined,
				"mailSuggested" : undefined,
				"status" : undefined,
				"id" : undefined,
				"groupsJoined" : [],
				"groupsNotJoined" : []
			},
			"requestTrello" : {
				"joinOrganizationAttempted" : false,
				"status" : undefined,
				"boards" : []
			},
			"companyMail" : undefined,
			"mailsSent" : {
				"mailPerso" : false,
				"mailPro" : false
			}
		});
	},

	setCurrentTheodoer: function(theodoerId, userID){
		Theodoer.update({_id:theodoerId},
			{$set : {current: false, "requestTrello.token" : false}},
			{multi : true}
		);

		Meteor.users.update({_id : userID}, {$set : {"profile.googleTokenRequested" : false}});
	}
});