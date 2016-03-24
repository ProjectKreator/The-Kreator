Template.StatusOfGoogleRequests.helpers({
	'successesOfRequestsGoogle' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		var requestGoogleEmail = currentTheodoer.requestGoogle.email;
		var companyEmail = currentTheodoer.companyMail;
		var status = currentTheodoer.requestGoogle.status;

		if((status == 200 && companyEmail == requestGoogleEmail) || currentTheodoer.requestGoogle.groupsJoined.length > 0){
			return true;
		} else {
			return false;
		}
	},
	'failuresOfRequestsGoogle' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		var requestGoogleEmail = currentTheodoer.requestGoogle.email;
		var companyEmail = currentTheodoer.companyMail;
		var status = currentTheodoer.requestGoogle.status;

		if((status != 200 && status != undefined && status != 404 && status != "undefined")|| currentTheodoer.requestGoogle.groupsNotJoined.length > 0){
			return true;
		} else {
			return false;
		}
	},
	'warningAboutCompanyMailCreation' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		var requestGoogleEmail = currentTheodoer.requestGoogle.email;
		var companyEmail = currentTheodoer.companyMail;
		var status = currentTheodoer.requestGoogle.status;

		if(status ==200 && companyEmail != requestGoogleEmail){
			return true;
		} else {
			return false;
		}
	},
	'successOfCompanyMailCreation' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		var requestGoogleEmail = currentTheodoer.requestGoogle.email;
		var companyEmail = currentTheodoer.companyMail;
		var status = currentTheodoer.requestGoogle.status;

		if(status == 200 && companyEmail == requestGoogleEmail){
			return true;
		} else {
			return false;
		}
	},
	'failureOfCompanyMailCreation' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		var requestGoogleEmail = currentTheodoer.requestGoogle.email;
		var companyEmail = currentTheodoer.companyMail;
		var status = currentTheodoer.requestGoogle.status;

		if(status != 200 && status != undefined && status != 404 && status != "undefined"){
			return true;
		} else {
			return false;
		}
	},
	'groupsHaveBeenJoined' : function(){
		return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.groupsJoined.length > 0);
	},
	'groupsHaveNotBeenJoined' : function(){
		return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.groupsNotJoined.length > 0);
	}
});

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
        window.open(adresse,'_blank','newwindow', 'width=100', 'height=50');
	}
});

Template.googleCheckEmail.events({
	'click [name=buttonCheckEmail]' : function(event){
		event.preventDefault();
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		var prenom = currentTheodoer.prenom;
		var nom = currentTheodoer.nom;
		var id = currentTheodoer._id;
        Meteor.call("checkEmail", prenom, nom, id);

        // fonction pour checker le mail

    },
});



Template.googleCreateEmail.events({
	'click [name=buttonCreateEmail]' : function(event){
		event.preventDefault();
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		var prenom = currentTheodoer.prenom;
		var nom = currentTheodoer.nom;
		var domain = Meteor.settings.public.google.acceptedDomainName;
		var mail = currentTheodoer.companyMail;
		var phone = currentTheodoer.phone;
		var id = currentTheodoer._id;
		Meteor.call("createEmail", prenom, nom, mail,phone,id);
	},

	'click [name=buttonKeepGoing]' : function(event){
		event.preventDefault();
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		Theodoer.update({_id : Session.get("currentTheodoer")},{
                    $set:{"requestGoogle.status" : 200, 
                    "requestGoogle.email" : currentTheodoer.companyMail}});
	},

	'click [name=buttonCheckEmailManually]' : function(event){
		event.preventDefault();
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		var mail = currentTheodoer.companyMail;
		var phone = currentTheodoer.phone;
		var id = currentTheodoer._id;
		Meteor.call("checkEmailManually", mail,id);
	}
});

Template.googleCreateEmail.helpers({
	'mailNotCreated' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		return (currentTheodoer.requestGoogle.status != 200 && currentTheodoer.requestGoogle.status != 409 && currentTheodoer.companyMail != "");
	},

	'noMailFound' : function(){
		return(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.mailSuggested == "");
	},

	'errorWhileEmailCreation' : function(){
		return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGoogle.status == 409);
	},

	'mailWantedDifferentFromMailSuggested' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		return (currentTheodoer.companyMail != currentTheodoer.requestGoogle.mailSuggested);
	},

	'mailUnavailable' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		return currentTheodoer.requestGoogle.status == 404 && currentTheodoer.companyMail != currentTheodoer.requestGoogle.mailSuggested;
	}
});


Template.googleApi.helpers({
	'authenticated' : function(){
		try{
			return Meteor.user().profile.googleTokenRequested;
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

	'mailCreated' : function(){
		try{
			var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
			var email = currentTheodoer.companyMail;
            
				if(currentTheodoer.requestGoogle.status == 200 && email == currentTheodoer.requestGoogle.email){
					return true;
       			} else {
					return false;
				}
		} catch (error) {
			return false;
		}
	},

	'allGroupsHaveBeenJoined' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		if (currentTheodoer.job == "Dev") {
			var groupsToJoin = Meteor.settings.public.google.groups.dev;
			return currentTheodoer.requestGoogle.groupsJoined.length == groupsToJoin.length;
		} else {
			var groupsToJoin = Meteor.settings.public.google.groups.biz;
			return currentTheodoer.requestGoogle.groupsJoined.length == groupsToJoin.length;
		}
	}
});


Template.joinGoogleGroups.events({
	'click [name=joinGroups]' : function(event){

		event.preventDefault();

		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});

		var isDev = (currentTheodoer.job == "Dev");

		var email = currentTheodoer.companyMail;
		var id = currentTheodoer._id;
		var domain = Meteor.settings.public.google.acceptedDomainName;
		var groups;

		if(isDev){
			var groups = Meteor.settings.public.google.groups.dev;
		} else {
			var groups = Meteor.settings.public.google.groups.biz;
		}

		var userHasNotJoinedYet = function (nameOfTheGroupToJoin){
			for(j = 0 ; j < currentTheodoer.requestGoogle.groupsJoined.length ; ++j){
				if (currentTheodoer.requestGoogle.groupsJoined[j].groupName == nameOfTheGroupToJoin){
					return false;
				}
			}
			return true;
		}
		var groupNameWithDomain;

		for(i = 0; i<groups.length; ++i){
			groupNameWithDomain = groups[i] + '@' + domain;
			if(userHasNotJoinedYet(groupNameWithDomain)){
				Meteor.call("addToGoogleGroup", email,groupNameWithDomain, id);
			}
		}
	}
});