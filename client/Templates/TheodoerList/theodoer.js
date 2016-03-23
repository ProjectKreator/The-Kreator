Template.theodoer.helpers({
	'progressIndex': function(){
		var index = 0;
        var indexComplet =0;
        var currentTheodoer = Theodoer.findOne({_id: this._id});
        var googleGroupsToJoin = 0;
        var boardsTrelloToJoin = Meteor.settings.public.trello.boards.length;
        
        if (currentTheodoer.job == "Dev") {
            indexComplet =9;
            googleGroupsToJoin = Meteor.settings.public.google.groups.dev.length;
        } else {
            indexComplet =8;
            googleGroupsToJoin = Meteor.settings.public.google.groups.biz.length;
        }
        
		// Theodoer invité à l'organisation sur github
        if (currentTheodoer.requestGitHub.status == 200 && currentTheodoer.requestGitHub.recipient == currentTheodoer.comptegithub) {
            index++;
        }
        //Compte google créé pour le theodoer
        if (currentTheodoer.requestGoogle.status == 200) {
            index++;
        } 
        
         //Theodoer invité aux groupes google pertinents
        if (currentTheodoer.requestGoogle.groupsJoined.length == googleGroupsToJoin) {
            index++;
        } 
        
        //Theodoer invité à l'organisation sur Trello
        if (currentTheodoer.requestTrello.status == 200) {
            index++;
        } 
        
        //Trello
        var compteurBoardsJoined = 0;
        var boards =currentTheodoer.requestTrello.boards;
        var isInvitedToPersonalBoard = false;
            for(i = 0 ; i < boards.length ; ++i){
                if(boards[i].status == 200 && !boards[i].isPersonal){
                    compteurBoardsJoined++;
                } else if (boards[i].status == 200 && boards[i].isPersonal) {
                    isInvitedToPersonalBoard = true;
                }
            }
        //Theodoer invité aux boards d'info
        if (compteurBoardsJoined == boardsTrelloToJoin) {
            index++;
        }
        //Theodoer invité au board personel de formation
        if (isInvitedToPersonalBoard) {
            index++;
        }
        
        //Mail perso envoyé
        if (currentTheodoer.mailsSent.mailPerso) {
            index++;
        }
        
        //Mail pro envoyé
        if (currentTheodoer.mailsSent.mailPro) {
            index++;
        }
        var res= "width:"+Math.round((index/indexComplet)*100)+"%";       
        return res;
	},
    
    'tasksDone': function(){
		var res = "Effectué: ";
        var currentTheodoer = Theodoer.findOne({_id: this._id});
        
        var googleGroupsToJoin = 0;
        var boardsTrelloToJoin = Meteor.settings.public.trello.boards.length;
        
        if (currentTheodoer.job == "Dev") {
            googleGroupsToJoin = Meteor.settings.public.google.groups.dev.length;
        } else {
            googleGroupsToJoin = Meteor.settings.public.google.groups.biz.length;
        }
        
		//GitHub OK ?
        if (currentTheodoer.requestGitHub.status == 200 && currentTheodoer.requestGitHub.recipient == currentTheodoer.comptegithub) {
            res += "GitHub - ";
        }
        //Google OK ?
        if (currentTheodoer.requestGoogle.status == 200 && currentTheodoer.requestGoogle.groupsJoined.length == googleGroupsToJoin) {
            res += "Google - ";
        } 
        
        //Trello OK ?
        var compteurBoardsJoined = 0;
        var boards =currentTheodoer.requestTrello.boards;
        var isInvitedToPersonalBoard = false;
            for(i = 0 ; i < boards.length ; ++i){
                if(boards[i].status == 200 && !boards[i].isPersonal){
                    compteurBoardsJoined++;
                } else if (boards[i].status == 200 && boards[i].isPersonal) {
                    isInvitedToPersonalBoard = true;
                }
            }
        if (compteurBoardsJoined == boardsTrelloToJoin && isInvitedToPersonalBoard && currentTheodoer.requestTrello.status == 200) {
            res+= "Trello - ";
        }
       
        //Mails Ok ?
        if (currentTheodoer.mailsSent.mailPerso && currentTheodoer.mailsSent.mailPro ) {
            res+= "Mails";
        }
        return res;
	}
});

Template.theodoer.events({
	'click .deleteTheodoer': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Voulez-vous vraiment supprimer ce Theodoer ? Attention, cette action ne peut pas être annulée !");
		if(confirm){
			Theodoer.remove({ _id: documentId });
		}
	}
});