/*Méthode permettant de relier un utilisateur à une organisation*/

Meteor.methods({
	GitHubRequest : function(adresse, organisation){

    //le login GitHub est obtenu dans la base de données en cherchant le Theodoer courant
    var loginGitHub = Theodoer.findOne({current : true}).comptegithub;



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
            requestGitHubSent : res
          }
          });
        }
      });
    };

    //requête post pour obtenir le token d'authentification. En cas de succès, on appelle ensuite la fonction addUserToOrganisation
		HTTP.post('https://github.com/login/oauth/access_token', {
  			data: {
  				code : adresse,
  				client_id : '5093e55c974e07f7d5f9',
  				client_secret : '0be95f4fec096825b9b92c6b28a3fff72649adf8'
  			}
  		}, function(error, response){
  			if(error){
  			} else {
  				var access_token = response.content.toString();
					access_token = access_token.split("=")[1];
 					access_token = access_token.split("&")[0];
          addUserToOrganisation('token ' + access_token);

 				}
 			}
 		);
 		
	}
});