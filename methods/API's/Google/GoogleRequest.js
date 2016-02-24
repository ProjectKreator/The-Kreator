Meteor.methods({
    
    testToken : function(){
       // var google = Meteor.npmRequire('C:/Users/Jeremy/The-Kreator/.meteor/local/isopacks/npm-container/npm/node_modules/googleapis/lib/googleapis.js');
        var google = Meteor.npmRequire('../node_modules/googleapis/lib/googleapis.js');
        var OAuth2Client = google.auth.OAuth2;
        var admin = google.admin('directory_v1');

        // Client ID and client secret are available at
        // https://code.google.com/apis/console
        var CLIENT_ID = Meteor.settings.google.clientId;
        var CLIENT_SECRET = Meteor.settings.google.secret;
        var REDIRECT_URL = 'http://localhost:80';

        var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);


        function getAccessToken(oauth2Client, callback) {
          // generate consent page url
          var url = oauth2Client.generateAuthUrl({
            access_type: 'offline', // will return a refresh token
            scope: 'https://www.googleapis.com/auth/admin.directory.user' // can be a space-delimited string or an array of scopes
          });
            
            // request access token
            oauth2Client.getToken(code, function(err, tokens) {
              console.log("err before "+err);
              // set tokens to the client
              // TODO: tokens should be set by OAuth2 client.
              oauth2Client.setCredentials(tokens);
              callback();
            }); 
        }

        // retrieve an access token

        getAccessToken(oauth2Client, function(e, r){
            if(e){
                console.log("error "+e);
            }
            else{
                console.log("response "+r);
            }

        });
        
        /*getAccessToken(oauth2Client, function() {
          // retrieve user profile
          plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
            if (err) {
              console.log('An error occured', err);
              return;
            }
            console.log(profile.displayName, ':', profile.tagline);
          });
        });*/
    },
    
    checkEmail: function (prenom,nom) {
        var res = prenom;
        var stopCheckEmail = false;
        var apiKey = Meteor.settings.google.clientId;
        var authorize = "Bearer " + Meteor.user().services.google.accessToken;
        
        var addLetter = function() {
            if(res.length == (prenom.length+nom.length)){
                stopCheckEmail = true;
                res = "";
                return res;
            }
            return (res + nom.charAt(res.length).toLowerCase());
        };
            
        var checkEmailApi = function() {
            // requete http ou methode google pour voir si l'adresse existe deja 
            var url = "https://www.googleapis.com/admin/directory/v1/users/" + res + "@kretaor.in";
            HTTP.get(url, {
                "data": {
                    "Authorization": authorize
                },    
            }, function(error, response){
                if(error){
                    console.log(error);
                } else {
                    stopCheckEmail = true;
                    }
                }
            );
        };
        
        while (!stopCheckEmail) {
            res = addLetter();
            checkEmailApi();
        }
          
        console.log(res);
    },
    
    createEmail: function (prenom, nom) {
      
    }
   
    
    
});