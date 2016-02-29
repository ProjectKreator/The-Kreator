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
	}
});
Template.googleCreateEmail.helpers({
	'mailCompany' : function(){
		try{
			var res = Theodoer.findOne({current:true}).requestGoogle.email + "@theodo.fr";
			return res;
		} catch (e) {
			return "";
		}
	},

});

Template.googleApi.helpers({
	'mailFound' : function(){
		try{
			return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.email != undefined);
		} catch(e){
			return false;
		}
	},

	'companyName' : function(){
		return Meteor.settings.public.googleLogin.acceptedDomainName;
	},

	'requestGoogleStatus' : function(){
		try{
			var email = Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.email;
            
				if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == 200){
					var res = "L'adresse mail " + email + "à été créée!";
					return res;
                    
				} else if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == undefined){
					return "";
				} else {
					return "Erreur. Adresse email non créée.";
				}
		} catch (error) {
			return "";
		}
	}
});