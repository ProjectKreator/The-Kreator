				ServiceConfiguration.configurations.remove({service : 'google'});
				ServiceConfiguration.configurations.upsert({service : 'google'}, {
				    $set: {
				      clientId: Meteor.settings.google.clientId,
				      secret: Meteor.settings.google.secret,
				      loginStyle: 'popup'
				   	}
			  	});  