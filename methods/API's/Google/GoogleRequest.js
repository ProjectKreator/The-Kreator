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
                    var user = Meteor.user();

                    Meteor.users.update({_id: user._id}, {$set:{"profile.googleToken" : tokens}});
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
                        "access_token": Meteor.user().profile.googleToken.access_token
                    },    
                }, function(error, response){
                    if(error){
                        res = nameTest;
                        Theodoer.update({current:true},
                            {$set : {"requestGoogle.email" : res}});

                    } else {
                        checkEmailApi(addLetter(nameTest));
                    }
                });
            }
        };
        
        checkEmailApi(addLetter(res));
    },
    
    createEmail: function (prenom, nom, mail) {
        var accessToken = "Bearer " + Meteor.user().profile.googleToken.access_token;
        HTTP.post('https://www.googleapis.com/admin/directory/v1/users',{
            "data" : {
                "name" : {
                    "familyName" : nom,
                    "givenName" : prenom
                },
                "password" : "paultalbot",
                "primaryEmail" : mail
            },
            "headers" : {
                "Authorization" : accessToken,
                "User-Agent" : "Meteor"
            }
        }, function(e,r){
            if(e){
                console.log("erreur "+e);
            } else {
                console.log(r);
            }
        } 
        )
    }
    
});