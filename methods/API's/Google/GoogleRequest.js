Meteor.methods({
    
    retrieveToken: function(authCode){
        var google = Meteor.npmRequire('../node_modules/googleapis/lib/googleapis.js');

        var OAuth2Client = google.auth.OAuth2;
        var admin = google.admin('directory_v1');

        var CLIENT_ID = Meteor.settings.public.google.clientId;
        var CLIENT_SECRET = Meteor.settings.google.secret;
        var REDIRECT_URL = Meteor.settings.public.google.redirectUrl;

        var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

        function getAccessToken(oauth2Client) {
            // request access token
            oauth2Client.getToken(authCode, Meteor.bindEnvironment(function(err, tokens) {
                if (err) {
                    console.log("err before "+err);        
                } else {
                    Tokens.insert({
                        "name" : "google",
                        "tokens" : tokens
                    });
                }
            
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            oauth2Client.setCredentials(tokens);
                
            })); 
        };

        // retrieve an access token

        getAccessToken(oauth2Client);
        
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
        prenom = "admi";
        nom = "nalbot";
        var res = prenom.toLowerCase();
        var stopCheckEmail = false;
        
        var addLetter = function(nameTest) {
            if(nameTest.length >= (prenom.length+nom.length)){
                stopCheckEmail = true;
                nameTest = "";
                return nameTest;
            }
            return (nameTest + nom.charAt(nameTest.length-prenom.length).toLowerCase());
        };
            
        var checkEmailApi = function(nameTest) {
            // requete http ou methode google pour voir si l'adresse existe deja
            if(nameTest == ""){
                Theodoer.update({current:true},
                    {$set : {"requestGoogle.email" : ""}});
            }
            else{
                var url = "https://www.googleapis.com/admin/directory/v1/users/" + nameTest + "@kretaor.in";
                HTTP.get(url, {
                    "params": {
                        "access_token": Tokens.findOne({name : "google"}).tokens.access_token
                    },    
                }, function(error, response){
                    if(error){
                        res = nameTest;
                        console.log("e " + error);
                        Theodoer.update({current:true},
                            {$set : {"requestGoogle.email" : res}});

                    } else {
                        console.log("r " + response);
                        checkEmailApi(addLetter(nameTest));
                    }
                });
            }
        };
        
        checkEmailApi(addLetter(res));
    },
    
    createEmail: function (prenom, nom) {
        var url = "https://www.googleapis.com/admin/directory/v1/users/paul@kretaor.in";
        HTTP.get(url, {
            "params": {
                "access_token": Tokens.findOne({name : "google"}).tokens.access_token
            },    
            }, function(error, response){
                if(error){
                    console.log("erreur :" + error);
                } else {
                    console.log(response);
                }
            }
        );

    }
    
});