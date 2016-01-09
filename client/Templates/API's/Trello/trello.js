Template.trello.events({
	'click [name=trelloTest]':function(event){
		event.preventDefault();
		var authenticationSuccess = function() { console.log("Successful authentication"); };
		var authenticationFailure = function() { console.log("Failed authentication"); };
	
		Trello.authorize({
		  type: "popup",
		  name: "Getting Started Application",
		  scope: {
		    read: true,
		    write: true },
		  expiration: "1day",
		  authenticationSuccess,
		  authenticationFailure
		});

		console.log(Trello.token());


	},

	'click [name=putTest]':function(event){
		event.preventDefault();
		var token = Trello.token();
		Meteor.call("addUserToOrganizationTrello", token);
		/*Trello.put("/organizations/kreatortest/members", {email: "pvtalbottest@gmail.com", fullName : "Paul Talbot", type:"Normal"}, function(e,r){
			if(e){
				console.log(e);
			} else {
				console.log(r);
			}
		});*/
	}

});

