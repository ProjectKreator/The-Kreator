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
                    
                    Meteor.users.update({_id: user._id}, {$set:{"profile.googleToken" : tokens, "profile.googleTokenRequested" : true}});
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
    
    checkEmail: function (prenom,nom, idMongoTheodoer) {
        var clean = function(string){
            string = string.replace(/[é|è|ê]/g, "e");
            string = string.replace(/[î]/g, "i");
            string = string.replace(/[ô]/g, "o");
            string = string.replace(/[ç]/g, "c");
            string = string.replace(/[à]/g, "a");
            string = string.replace(/[^a-zA-Z ]/g, "");
            string = string.toLowerCase();
            return string;
        };
        prenom = clean(prenom);
        nom = clean(nom);
        var res = prenom;
        var stopCheckEmail = false;
        
        var addLetter = function(nameTest) {
            if(nameTest.length >= (prenom.length+nom.length)){
                stopCheckEmail = true;
                nameTest = "";
                return nameTest;
            }
            return (nameTest + nom.charAt(nameTest.length-prenom.length));
        };
            
        var checkEmailApi = function(nameTest) {
            // requete http ou methode google pour voir si l'adresse existe deja

            if(nameTest == ""){
                Theodoer.update({_id : idMongoTheodoer},
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
                        if(error.response.statusCode == 404){
                            res = nameTest + "@" + domain;
                            Theodoer.update({_id : idMongoTheodoer},
                                {$set : {"companyMail" : res}});
                        } else {
                            Theodoer.update({_id : idMongoTheodoer},{$set : {"requestGoogle.email" : ""}});
                        }

                    } else {
                        checkEmailApi(addLetter(nameTest));
                    }
                });
            }
        };
        
        checkEmailApi(addLetter(res));
    },
    
    createEmail: function (prenom, nom, mail, phone, idMongoTheodoer) {
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
                Theodoer.update({_id : idMongoTheodoer},{
                    $set:{"companyMail" : r.data.primaryEmail, "requestGoogle.status" : r.statusCode, 
                    "requestGoogle.email" : r.data.primaryEmail, "requestGoogle.id" : r.data.id}});
            }
        } 
        )
    },

    addToGoogleGroup : function(mail, group, idMongoTheodoer){
        var accessToken = "Bearer " + Meteor.user().profile.googleToken.access_token;
        var currentTheodoer = Theodoer.findOne({_id : idMongoTheodoer});
        var compteur = 0;
 
        var userHadFailedtoJoin = function (){
            for(i = 0 ; i < currentTheodoer.requestGoogle.groupsNotJoined.length ; ++i){
                if (currentTheodoer.requestGoogle.groupsNotJoined[i].groupName == group){
                    return true;
                }
            }
            return false;
        };

        var url = 'https://www.googleapis.com/admin/directory/v1/groups/'+ group +'/members';
        
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
                    Theodoer.update({_id : idMongoTheodoer}, {
                        $addToSet : {"requestGoogle.groupsNotJoined" : {
                            "groupName" : group}}
                    });
                } else {
                    if( userHadFailedtoJoin() ) {
                        Theodoer.update({_id : idMongoTheodoer}, {
                            $pull: {"requestGoogle.groupsNotJoined" : {
                                "groupName" : group}}
                        });
                    }
                    Theodoer.update({_id : idMongoTheodoer}, {
                        $addToSet : {"requestGoogle.groupsJoined" : {
                            "groupName" : group}}
                    });
                }
            });
    }
    
});