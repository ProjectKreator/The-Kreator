Meteor.methods({
	addUserToOrganizationTrello : function(token, email, prenom, nom){
		var organization = Meteor.settings.public.trello.organization;
		console.log(Meteor.settings.public.trello.organization);
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
						{$set:{"requestTrello.status" : r.statusCode}}
					);
				}
			}
		);
	},
    
    inviteToBoardTrello : function(token, email, prenom, nom, board, isPersonalBoard){
		var adresse = "https://api.trello.com/1/boards/"+board+"/members?key=cdfe125685dbd8ca533cb67ee42f1c98&token=" + token;
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
                    Theodoer.update({"current" : true}, {
                        $push : {"requestTrello.boards" : {
                            "board" : board,
                            "status" : r.statusCode,
                            "isPersonal": isPersonalBoard
                        }}
                    });
                }
            }
		);
	},
    
    
    copyBoard : function(token, boardName, boardTemplate){
		var adresse = "https://api.trello.com/1/boards/?key=cdfe125685dbd8ca533cb67ee42f1c98&token=" + token;
		HTTP.post(adresse,{
			data:{
				name: boardName,
                idBoardSource: boardTemplate
			}},
			function(e,r){
				if(e){
					console.log(e);
				} else {
					console.log(r);
                    //return l'id du nouveau board
                }
            }
		);
	}
    
    
});