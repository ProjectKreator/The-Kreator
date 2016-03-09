Meteor.startup(function () {


	process.env.MAIL_URL = 'smtp://postmaster@sandbox4f6624e6694649709214da00570bdf7c.mailgun.org:da37e1a90172a47cc13a44f2a4468307@smtp.mailgun.org:587';


	if (LoginAttempt.find().fetch().length == 0){
		LoginAttempt.insert({"name" : "attempt", "state" : false});
	}

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