Template.googleCheckEmail.events({
	'click [name=buttonCheckEmail]' : function(event){
		event.preventDefault();
        var prenom = Theodoer.findOne({current:true}).prenom;
		var nom = Theodoer.findOne({current:true}).nom;
        Meteor.call("checkEmail", prenom, nom);

        // fonction pour checker le mail

    }
});



Template.googleCreateEmail.events({
	'click [name=buttonCreateEmail]' : function(event){
		event.preventDefault();
/*		
        var prenom = Theodoer.findOne({current:true}).prenom;
		var nom = Theodoer.findOne({current:true}).nom;

        var token = Trello.token();
		var email = Theodoer.findOne({current:true}).email;
		Meteor.call("addUserToOrganizationTrello", token, email, prenom, nom,
			function(e,r){
				if(e){

				} else {
					Theodoer.update({_id : Session.get("currentTheodoer")}, {$set : {"requestTrello.recipient" : email}});*/

	}
});

Template.google.helpers({
	'mailFound' : function(){
		try{
			if (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.email != "undefined") {
               return true; 
            }  
		} catch(e){
			return false;
		}
	},
	requestGoogleStatus:function(){
		try{
			var email = Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.email;
            
				if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == 200){
					var res = "L'adresse mail " + email + "à été créée!";
					return res;
                    
				} else {
					return "Erreur. Adresse email non créée.";
				}
		} catch (error) {
			return "";
		}
	}
});