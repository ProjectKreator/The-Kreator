Meteor.startup(function () {
	if (LoginAttempt.find().fetch().length == 0){
		LoginAttempt.insert({"name" : "attempt", "state" : false});
	}

	process.env.MAIL_URL = 'smtp:/postmaster%40sandboxf7c43340f7dd48af8829fa208778f816.mailgun.org:09545f1d693b24e25bd204849c206bcd@smtp.mailgun.org:587';

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