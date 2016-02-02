Template.gitHubInformations.helpers({
	requestGitHubStatus:function(){
		try{
			if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGitHub.recipient == $('[name=comptegithub]').val()){
				if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGitHub.sent == '200 OK'){
					return "Invitation envoyée !";
				} else if (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGitHub.sent != undefined){
					return "Erreur. Invitation non envoyée.";
				}
			}
			return "";
		} catch (error) {
			return "";
		}
	}
});

Template.gitHubInformations.events({
	'click [name=windowGitHubForm]': function(event){
		event.preventDefault();
		var adresse = 'https://github.com/login/oauth/authorize?client_id=' + Meteor.settings.public.gitHub.clientId +'&scope=admin:org';
		window.open(adresse,'_blank','newwindow', 'width=200', 'height=100');
	},
});