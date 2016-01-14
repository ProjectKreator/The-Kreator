Meteor.methods({
	addUserToOrganizationTrello : function(token, email, prenom, nom){
		var organization = Meteor.settings.trello.organization;
		var adresse = "https://api.trello.com/1/organizations/"+organization+"/members?key=cdfe125685dbd8ca533cb67ee42f1c98&token=" + token;
		var name = prenom + " " + nom;
		HTTP.put(adresse,{
			data:{
				email: email,
				fullName: name,
				type:"normal"
			}},
			function(e,r){
				if(e){
					console.log(e);
				} else {
					console.log(r);
					Theodoer.update({current:true},
						{$set:{"requestTrello.recipient" : r.data.email, "requestTrello.status" : r.statusCode}
					});
				}
			}
		);
	}

});