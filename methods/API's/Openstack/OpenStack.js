Meteor.methods({
	inviteToOpenstack : function(nom, prenom, email){
        //var utilisateur?? = prenom + " " + nom;
        var apiKeyOpenStack = Meteor.settings.public.OpenStack.apiKey ;
        var projectIDOpenStack = Meteor.settings.public.OpenStack.projectID
        //var adresse = "https://api.synalabs.net/api/v1/openstack/identity/monProjectID/users/";
        //var adresse = "https://api.synalabs.net/api/v1/openstack/identity/" + projectIDOpenStack + "/users/";
		HTTP.post(adresse,{
			header:{
				'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
                Authorization: 'Synalabs-API' + apiKeyOpenStack
			},
            data:{
                username: "utilisateur&email=toto%40toto.com" //tbc?
			}},
			function(e,r){
				if(e){
					console.log(e);
				} else {
					console.log(r);
					Theodoer.update({current:true},
						{$set:{"requestOpenStack.status" : r.statusCode}}
					);
				}
			}
		);
	}
})
