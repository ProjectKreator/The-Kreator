Template.googleAuthentication.events({
	'click [name=buttonGoogleAuthentication]' : function(event){
	    var CLIENT_ID = Meteor.settings.public.google.clientId;
        var REDIRECT_URL = Meteor.settings.public.google.redirectUrl;
        var acces_type = "offline"; // will return a refresh token
        var scope = ['https://www.googleapis.com/auth/admin.directory.user', 'https://www.googleapis.com/auth/admin.directory.group'];
        var adresse = "https://accounts.google.com/o/oauth2/auth?access_type="+ acces_type + "&response_type=code&client_id=" + CLIENT_ID +"&redirect_uri=" +REDIRECT_URL + "&scope=" + scope[0];
        for(i = 1 ; i<scope.length ; i++){
            adresse += '%20';
            adresse += scope[i];
        }
        console.log(adresse);
        window.open(adresse,'_blank','newwindow', 'width=200', 'height=100');
	}
});

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
		var domain = Meteor.settings.public.google.acceptedDomainName;
		var mail = (Theodoer.findOne({current:true}).companyMail);
		var phone = Theodoer.findOne({current:true}).phone;
		Meteor.call("createEmail", prenom, nom, mail,phone);
	}
});


Template.googleApi.helpers({
	'authenticated' : function(){
		try{
			return Theodoer.findOne({current : true}).requestGoogle.token;
		} catch(e) {
			return false;
		}
	},
	'mailFound' : function(){
		try{
			return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail != undefined);
		} catch(e){
			return false;
		}
	},

	'companyName' : function(){
		return Meteor.settings.public.google.acceptedDomainName;
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
	},

	'mailCreated' : function(){
		try{
			var email = Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail;
            
				if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == 200 && email == Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.email){
					return true;
                    
				} else if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == undefined){
					return false;
				} else if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == 200){
					return false
				} else {
					return false;
				}
		} catch (error) {
			return false;
		}
	}
});

Template.joinGoogleGroups.helpers({
	'job' : function(){
		try{
			return Theodoer.findOne({"current" : true}).job;
		} catch(e){
			return "";
		}
	},

	'groupsHaveBeenJoined' : function(){
		try{
			return (Theodoer.findOne({"current" : true}).requestGoogle.groups.length > 0);
		} catch(e){
			return false;
		}
	}

});

Template.listOfGoogleGroupsJoined.helpers({
	'groupsJoined' : function(){
		try{
			var groups = Theodoer.findOne({"current" : true}).requestGoogle.groups;
			var res = [];
			for(i = 0 ; i < groups.length ; ++i){
				if(groups[i].status == 200){
					res.push(groups[i]);
				}
			}
			return res;
		} catch(e){
			return [];
		}
	}
});

Template.joinGoogleGroups.events({
	'click [name=joinGroups]' : function(event){

		event.preventDefault();

		var isDev = (Theodoer.findOne({"current" : true}).job == "Dev");

		var email = Theodoer.findOne({current:true}).companyMail;
		var domain = Meteor.settings.public.google.acceptedDomainName;
		var groups;

		if(isDev){
			var groups = Meteor.settings.public.google.groups.dev;
		} else {
			var groups = Meteor.settings.public.google.groups.biz;
		}


		var createGroupName = function(name){
			var res = name + "@" + domain;
			return res;
		}

		for(i = 0; i<groups.length; ++i){
			Meteor.call("addToGoogleGroup", email, createGroupName(groups[i]));
		}
	}
});