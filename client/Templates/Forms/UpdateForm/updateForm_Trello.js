Template.trelloAuthentication.events({
	'click [name=buttonTrelloAuthentication]' : function(event){
		event.preventDefault();
		var authenticationSuccess = function() { console.log("Successful authentication"); };
		var authenticationFailure = function() { console.log("Failed authentication"); };
	
		Trello.authorize({
		  type: "popup",
		  name: "Getting Started Application",
		  scope: {
		    read: true,
		    write: true },
		  expiration: "never",
		  persist: "false",
		  succes: authenticationSuccess,
		  failure: authenticationFailure
		});


		if(Trello.token() != undefined){
			Theodoer.update({_id : Session.get("currentTheodoer")}, {$set:{"requestTrello.token" : true}});
		}
	}

});



Template.trelloInformations.events({
	'click [name=trelloRequest]' : function(event){
		try{
/*			if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status != 200){
				alert("L\'adresse mail de l'entreprise n'a pas encore été créée !");
			}
			else{ [TBC]*/
			event.preventDefault();
			var token = Trello.token();
			var email = Theodoer.findOne({current:true}).email;
			var prenom = Theodoer.findOne({current:true}).prenom;
			var nom = Theodoer.findOne({current:true}).nom;
			Meteor.call("addUserToOrganizationTrello", token, email, prenom, nom,
				function(e,r){
					if(e){

					} else {
						Theodoer.update({_id : Session.get("currentTheodoer")}, {$set : {"requestTrello.recipient" : email}});
					}
				});
			//}
		} catch(e){
			alert("L\'adresse mail de l'entreprise n'a pas encore été créée !");
		}
	}
});

Template.trello.helpers({
	'authenticated' : function(){
		try{
			return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestTrello.token);
		} catch(e){
			return false;
		}
	},
	'requestTrelloStatus':function(){
		try{
			var requestRecipient = Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestTrello.recipient;
			if(requestRecipient == $('[name=email]').val()){
				if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestTrello.status == 200){
					var res = "Invitation envoyée à " + requestRecipient;
					return res;
				} else {
					return "Erreur. Invitation non envoyée.";
				}
			}
			return "";
		} catch (error) {
			return "";
		}
	},
	'requestTrelloStatusBoolean' : function(){
		try{
			var requestRecipient = Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestTrello.recipient;
			if(requestRecipient == $('[name=email]').val()){
				if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestTrello.status == 200){
					return true;
				} else {
					return false;
				}
			}
			return false;
		} catch (error) {
			return false;
		}	
	},
    
    'boardsJoined' : function(){
        try{
            var boards = Theodoer.findOne({"current" : true}).requestTrello.boards;
            var boardsS = Meteor.settings.public.trello.boards;
            var index = 0;
            for(i = 0 ; i < boards.length ; ++i){
                if(boards[i].status == 200 && !boards[i].isPersonal){
                    index++;
                }
            }
            var res = "Invitation envoyée pour " + index + " boards sur " + boardsS.length
            return res;
        } catch(e){
            return "Invitations non envoyées";
        }
	},
    
    'invitedToPersonalBoard' : function(){
        try{
            var isInvited = false;
            var boards = Theodoer.findOne({"current" : true}).requestTrello.boards;
            for(i = 0 ; i < boards.length ; ++i){
                if(boards[i].status == 200 && boards[i].isPersonal){
                    return "Invitation pour le Board Personel de Formation envoyée";
                }
            }
            return "Invitation pour le Board Personel de Formation non envoyée";
        } catch(e){
            return "Problème avec l'invitation";
        }
	},
    
    'job' : function(){
        try{
            return Theodoer.findOne({"current" : true}).job;
        } catch(e){
            return "";
        }
	}
    
});


Template.TrelloInviteToBoards.events({
	'click [name=TrelloInviteToBoards]' : function(event){

		event.preventDefault();
		var isDev = (Theodoer.findOne({"current" : true}).job == "Dev");
//[TBC]
//		var email = Theodoer.findOne({current:true}).companyMail;
        var token = Trello.token();
        var prenom = Theodoer.findOne({current:true}).prenom;
        var nom = Theodoer.findOne({current:true}).nom;
        var email = Theodoer.findOne({current:true}).email;
		var boards = Meteor.settings.public.trello.boards;

		for(i = 0; i<boards.length; ++i){
			Meteor.call("inviteToBoardTrello", token, email, prenom, nom, boards[i], false);
		}
	},
    
    'click [name=TrelloCopyAndInvite]' : function(event){

		event.preventDefault();
        console.log("Hello1");
		var isDev = (Theodoer.findOne({"current" : true}).job == "Dev");
//[TBC]
//		var email = Theodoer.findOne({current:true}).companyMail;
        var token = Trello.token();
        var prenom = Theodoer.findOne({current:true}).prenom;
        var nom = Theodoer.findOne({current:true}).nom;
        var email = Theodoer.findOne({current:true}).email;
        var boardName = "Formation " + prenom;
		if(isDev){
			var templateBoard = Meteor.settings.public.trello.templateBoardFormation.dev;
		} else {
			var templateBoard = Meteor.settings.public.trello.templateBoardFormation.biz;
		}

        
        //Copy board + Invite to board
        Meteor.call("CopyBoardTrello",token, boardName, templateBoard);
        //Meteor.call("inviteToOrganisationBoardTrello", token, email, prenom, nom,copyBoard);
        //test de copy (appel api)
        
	}
});