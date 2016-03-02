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
		var prenom = Theodoer.findOne({current:true}).prenom;
		var nom = Theodoer.findOne({current:true}).nom;
		var domain = Meteor.settings.public.googleLogin.acceptedDomainName;
		var mail = (Theodoer.findOne({current:true}).companyMail);
		var phone = Theodoer.findOne({current:true}).phone;
		Meteor.call("createEmail", prenom, nom, mail,phone);
	}
});


Template.googleApi.helpers({
	'mailFound' : function(){
		try{
			return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail != undefined);
		} catch(e){
			return false;
		}
	},

	'companyName' : function(){
		return Meteor.settings.public.googleLogin.acceptedDomainName;
	},

	'requestGoogleStatus' : function(){
		try{
			var email = Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail;
            
				if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == 200 && email == Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.email){
					var res = "L'adresse mail " + email + " a été créée!";
					return res;
                    
				} else if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == undefined){
					return "";
				} else if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == 200){
					return "Attention, l'adresse mail créée est " + Theodoer.findOne({"current":true}).requestGoogle.email + " !";
				} else {
					return "Erreur. Adresse email non créée.";
				}
		} catch (error) {
			return "";
		}
	}
});