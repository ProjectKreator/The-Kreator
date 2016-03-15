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
    
    getIdAndCopyBoardTrello : function(token, boardId, boardName, email, prenom, nom){
		var adresseGet = "https://api.trello.com/1/boards/"+ boardId +"?key=cdfe125685dbd8ca533cb67ee42f1c98&token=" + token;
		var adressePost = "https://api.trello.com/1/boards?key=cdfe125685dbd8ca533cb67ee42f1c98&token=" + token;
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
                                    Meteor.call("inviteToBoardTrello", token, email, prenom, nom, newBoardId, true);
                                    
                                }
                            }
                        );
                }
            }
		);
	}
    
});