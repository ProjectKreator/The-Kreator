Template.Test.events({
	'click [name=testGoogle]' : function(event){
           
        event.preventDefault();
        
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
    },
});

Template.TestGroups.events({
    'click [name=testpostgroup]' : function(event){
           
        event.preventDefault();
        
        Meteor.call("addToGoogleGroup", "antoined@kreatorteam.in", "biz@kreatorteam.in");
    },
});

  