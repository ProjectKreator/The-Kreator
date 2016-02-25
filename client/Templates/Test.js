Template.Test.events({
	'click [name=testGoogle]' : function(event){
           
        event.preventDefault();
        
        var CLIENT_ID = Meteor.settings.public.google.clientId;
        var REDIRECT_URL = Meteor.settings.public.google.redirectUrl;
        var acces_type = "offline"; // will return a refresh token
        var scope = 'https://www.googleapis.com/auth/admin.directory.user';
        var adresse = "https://accounts.google.com/o/oauth2/auth?access_type="+ acces_type + "&scope=" + scope + "&response_type=code&client_id=" + CLIENT_ID +"&redirect_uri=" +REDIRECT_URL;
        console.log(adresse);
        window.open(adresse,'_blank','newwindow', 'width=200', 'height=100');
    },
});