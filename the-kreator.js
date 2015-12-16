Theodoer = new Mongo.Collection("theodoer");

if (Meteor.isClient) {
	
	// Code modifier accounts.ui.config
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
		
	}); 
		
 }   

if (Meteor.isServer) {
	
	
	Meteor.startup(function () {
		// code to run on server at startup
		return Meteor.methods({

			// To be removed when in production!!!
			removeAllTheodoer: function() {
					//Erreur si un utilisateur non identifié veut vider la base
					
					if (! Meteor.userId()) {
						throw new Meteor.Error("not-authorized");
					}
					
				return Theodoer.remove({});
			}

		});
	});
	
	//Prevent new accounts creation
    Accounts.validateNewUser(function() {
		return false;
	});
	 
		
}

 

   

