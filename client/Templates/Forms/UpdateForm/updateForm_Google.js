Template.StatusOfGoogleRequests.helpers({
	'successesOfRequestsGoogle' : function(){
		var currentTheodoer = Theodoer.findOne({current : true});
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
		var currentTheodoer = Theodoer.findOne({current : true});
		var requestGoogleEmail = currentTheodoer.requestGoogle.email;
		var companyEmail = currentTheodoer.companyMail;
		var status = currentTheodoer.requestGoogle.status;

		if((status != 200 && status != undefined)|| currentTheodoer.requestGoogle.groupsNotJoined.length > 0){
			return true;
		} else {
			return false;
		}
	},
	'warningAboutCompanyMailCreation' : function(){
		var currentTheodoer = Theodoer.findOne({current : true});
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
		var currentTheodoer = Theodoer.findOne({current : true});
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
		var currentTheodoer = Theodoer.findOne({current : true});
		var requestGoogleEmail = currentTheodoer.requestGoogle.email;
		var companyEmail = currentTheodoer.companyMail;
		var status = currentTheodoer.requestGoogle.status;

		if(status != 200 && status != undefined){
			return true;
		} else {
			return false;
		}
	},
	'groupsHaveBeenJoined' : function(){
		return (Theodoer.findOne({current:true}).requestGoogle.groupsJoined.length > 0);
	},
	'groupsHaveNotBeenJoined' : function(){
		return (Theodoer.findOne({current:true}).requestGoogle.groupsNotJoined.length > 0);
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
        console.log(adresse);
        window.open(adresse,'_blank','newwindow', 'width=200', 'height=100');
	}
});

Template.googleCheckEmail.events({
	'click [name=buttonCheckEmail]' : function(event){
		event.preventDefault();
		var currentTheodoer = Theodoer.findOne({current:true});
		var prenom = currentTheodoer.prenom;
		var nom = currentTheodoer.nom;
        Meteor.call("checkEmail", prenom, nom);

        // fonction pour checker le mail

    }
});



Template.googleCreateEmail.events({
	'click [name=buttonCreateEmail]' : function(event){
		event.preventDefault();
		var currentTheodoer = Theodoer.findOne({current:true});
		var prenom = currentTheodoer.prenom;
		var nom = currentTheodoer.nom;
		var domain = Meteor.settings.public.google.acceptedDomainName;
		var mail = currentTheodoer.companyMail;
		var phone = currentTheodoer.phone;
		Meteor.call("createEmail", prenom, nom, mail,phone);
	}
});

Template.googleCreateEmail.helpers({
	'mailNotCreated' : function(){
		var currentTheodoer = Theodoer.findOne({current : true});
		return (currentTheodoer.requestGoogle.status != 200 && currentTheodoer.companyMail != "");
	},

	'noMailFound' : function(){
		return(Theodoer.findOne({current:true}).companyMail == "");
	}
})


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

	'mailCreated' : function(){
		try{
			var currentTheodoer = Theodoer.findOne({current : true});
			var email = currentTheodoer.companyMail;
            
				if(currentTheodoer.requestGoogle.status == 200 && email == currentTheodoer.requestGoogle.email){
					return true;
       			} else if(currentTheodoer.requestGoogle.status == undefined){
					return false;
				} else if(currentTheodoer.requestGoogle.status == 200){
					return false
				} else {
					return false;
				}
		} catch (error) {
			return false;
		}
	},

	'allGroupsHaveBeenJoined' : function(){
		var currentTheodoer = Theodoer.findOne({current : true});
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

		var currentTheodoer = Theodoer.findOne({current : true});

		var isDev = (currentTheodoer.job == "Dev");

		var email = currentTheodoer.companyMail;
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
				Meteor.call("addToGoogleGroup", email,groupNameWithDomain);
			}
		}
	}
});