/*Méthode permettant de relier un utilisateur à une organisation*/

Meteor.methods({
	GitHubRequest : function(adresse){


    var loginGitHub = Theodoer.findOne({current : true}).comptegithub;
    console.log(loginGitHub);

    var organisation = Meteor.settings.public.gitHub.organization;
    var clientId = Meteor.settings.public.gitHub.clientId;
    var clientSecret = Meteor.settings.gitHub.clientSecret;




    //URL de la dernière requête (PUT)
    var URLPut = "https://api.github.com/orgs/" + organisation + "/memberships/" + loginGitHub ;

    //fonction d'appel de la dernière requête (PUT). Les utilisateurs sont toujours invités en temps que membres
    var addUserToOrganisation = function(token){
      HTTP.put(URLPut, {
        "data": {
          "role": "member"
        },
        "headers": {
          "Authorization": token,
          "User-Agent": "Meteor"
        }
      }, function(error, response){
        if(error){

        }
        else {
          var res = response.headers.status;
          res = res.toString();
          Theodoer.update({current:true},
          {$set:{
            requestGitHub : {
              sent:res,
              recipient:loginGitHub
            }
          }
          });
        }
      });
    };

    //requête post pour obtenir le token d'authentification. En cas de succès, on appelle ensuite la fonction addUserToOrganisation
		HTTP.post('https://github.com/login/oauth/access_token', {
  			data: {
  				code : adresse,
  				client_id : clientId,
  				client_secret : clientSecret
  			}
  		}, function(error, response){
  			if(error){
  			} else {
          console.log(response);
  				var access_token = response.content.toString();
					access_token = access_token.split("=")[1];
 					access_token = access_token.split("&")[0];
          addUserToOrganisation('token ' + access_token);

 				}
 			}
 		);
 		
	}
});