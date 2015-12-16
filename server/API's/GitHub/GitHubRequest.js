Meteor.methods({
	GitHubHTTP : function(adresse){
		var access_token = 'test';
		var keepGoing = true;
		HTTP.post('https://github.com/login/oauth/access_token', {
  			params: {
  				code : adresse,
  				client_id : '5093e55c974e07f7d5f9',
  				client_secret : '0be95f4fec096825b9b92c6b28a3fff72649adf8'
  				}
  			},function(error, response){
  				if(error){
  					console.log(error);
  				} else {
  					access_token = response.content.toString();
  					access_token = access_token.split("=")[1];
  					access_token = access_token.split("&")[0];
  					console.log(access_token);
  				}
  			}
  		);
  		while(keepGoing){
  			var compteur = 0;
  			
  			if (compteur > 10){
/*  				var token = 'token ' + access_token;
		  		console.log(token);
		  		HTTP.put('https://github.com/orgs/ProjectKreator/memberships/pvtalbottest', {
		  			params: {
		  				role : "member"
		  				},
		  			headers: {
		  				Authorization : token
		  				}
		  			}, function(error, response){
		  				if(error){
		  					console.log(error);
		  				} else {
		  					console.log(response.headers);
		  				}
		  			}
		  		);*/
		  		keepGoing = false;
  			}
  			compteur += 1;
  			console.log(compteur);
	  	}

  	}
  });