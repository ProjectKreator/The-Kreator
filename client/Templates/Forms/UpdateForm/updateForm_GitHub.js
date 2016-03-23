Template.gitHubInformations.helpers({
	'failureOfGitHubRequest' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		if(currentTheodoer.requestGitHub.status != 200 && currentTheodoer.requestGitHub.sent != undefined){
			return true;
		} else {
			return false;
		}
	},
	'warningAboutGitHubRequest' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		if (currentTheodoer.requestGitHub.status == 200 && currentTheodoer.requestGitHub.recipient != currentTheodoer.comptegithub){
			return true;
		} else {
			return false;
		}
	},
	'successOfGitHubRequest' : function(){
		var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
		if (currentTheodoer.requestGitHub.status == 200 && currentTheodoer.requestGitHub.recipient == currentTheodoer.comptegithub){
			return true;
		} else {
			return false;
		}
	}
});

Template.gitHubInformations.events({
	'click [name=windowGitHubForm]': function(event){
		event.preventDefault();
		var state = Theodoer.findOne({_id : Session.get("currentTheodoer")})._id;
		var adresse = 'https://github.com/login/oauth/authorize?client_id=' + Meteor.settings.public.gitHub.clientId +'&scope=admin:org' + '&state=' + state;
		window.open(adresse,'_blank','newwindow', 'width=100', 'height=50');
	},
});