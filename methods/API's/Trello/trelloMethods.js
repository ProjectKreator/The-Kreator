Meteor.methods({
	addUserToOrganizationTrello : function(token, email, prenom, nom, idMongoTheodoer){
		var organization = Meteor.settings.public.trello.organization;
		var apiKeyTrello = Meteor.settings.public.trello.apiKey ;
		var adresse = "https://api.trello.com/1/organizations/"+organization+"/members?key=" + apiKeyTrello + "&token=" + token;
		var name = prenom + " " + nom;
		Theodoer.update({_id : idMongoTheodoer},{$set:{"requestTrello.joinOrganizationAttempted" : true}});
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
					Theodoer.update({_id : idMongoTheodoer},
						{$set:{"requestTrello.status" : r.statusCode}}
					);
				}
			}
		);
	},
    
    inviteToBoardTrello : function(token, email, prenom, nom, board, isPersonalBoard, idMongoTheodoer){
    	var apiKeyTrello = Meteor.settings.public.trello.apiKey ;
		var adresse = "https://api.trello.com/1/boards/"+board+"/members?key=" + apiKeyTrello + "&token=" + token;
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
                    Theodoer.update({_id : idMongoTheodoer}, {
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
    
    getIdAndCopyBoardTrello : function(token, boardId, boardName, email, prenom, nom, idMongoTheodoer){
    	var apiKeyTrello = Meteor.settings.public.trello.apiKey ;
		var adresseGet = "https://api.trello.com/1/boards/"+ boardId +"?key=" + apiKeyTrello + "&token=" + token;
		var adressePost = "https://api.trello.com/1/boards?key=" + apiKeyTrello + "&token=" + token;
        HTTP.get(adresseGet,{},
			function(e,r){
				if(e){
					console.log(e);
				} else {
					var idBoard = r.data.id;
                    console.log("Test dans methode getIdBoardTrello " +idBoard);
                        HTTP.post(adressePost,{
                            data:{
                                name: boardName,
                                idBoardSource: idBoard
                            }},
                            function(error,response){
                                if(error){
                                    console.log(error);
                                } else {
                                    var newBoardId = response.data.shortUrl.split(".com/b/")[1];
                                    console.log(newBoardId);
                                    Meteor.call("inviteToBoardTrello", token, email, prenom, nom, newBoardId, true, idMongoTheodoer);
                                    
                                }
                            }
                        );
                }
            }
		);
	}
    
});