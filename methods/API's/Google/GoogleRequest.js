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
                    
                    Theodoer.update({current:true}, {$set : {"requestGoogle.token" : true}});
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
            // TODO
            // IL FAUT GERER LES ERREURS


            if(nameTest == ""){
                Theodoer.update({current:true},
                    {$set : {"requestGoogle.email" : ""}});
            }
            else{
                var domain = Meteor.settings.public.google.acceptedDomainName;
                var url = "https://www.googleapis.com/admin/directory/v1/users/" + nameTest + "@" + domain;
                HTTP.get(url, {
                    "params": {
                        "access_token": Meteor.user().profile.googleToken.access_token
                    },    
                }, function(error, response){
                    if(error){
                        res = nameTest + "@" + domain;
                        console.log(error);
                        Theodoer.update({current:true},
                            {$set : {"companyMail" : res}});

                    } else {
                        checkEmailApi(addLetter(nameTest));
                    }
                });
            }
        };
        
        checkEmailApi(addLetter(res));
    },
    
    createEmail: function (prenom, nom, mail, phone) {
        var accessToken = "Bearer " + Meteor.user().profile.googleToken.access_token;
        var password = Meteor.settings.google.passwordForNewUser;
        HTTP.post('https://www.googleapis.com/admin/directory/v1/users',{
            "data" : {
                "name" : {
                    "familyName" : nom,
                    "givenName" : prenom
                },
                "password" : password,
                "primaryEmail" : mail,
                "phones" : [{
                    "type" : "work",
                    "value" : phone
                }]
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
                Theodoer.update({current:true},{
                    $set:{"companyMail" : r.data.primaryEmail, "requestGoogle.status" : r.statusCode, 
                    "requestGoogle.email" : r.data.primaryEmail, "requestGoogle.id" : r.data.id}});
            }
        } 
        )
    },

    addToGoogleGroup : function(mail, group){
        var accessToken = "Bearer " + Meteor.user().profile.googleToken.access_token;
        var url = 'https://www.googleapis.com/admin/directory/v1/groups/'+ group +'/members'
        HTTP.post(url, {
            "data" : {
                "kind" : "admin#directory#member",
                "email" : mail,
                "role" : "MEMBER",
                "type" : "USER"
            },
            "headers" : {
                "Authorization" : accessToken,
                "User-Agent" : "Meteor"
            }
        }, function(e,r){
            if(e){
                console.log("erreur " + e);
            } else {
                Theodoer.update({"current" : true}, {
                    $push : {"requestGoogle.groups" : {
                        "groupName" : group,
                        "status" : r.statusCode
                    }}
                });
            }
        });
    }
    
});