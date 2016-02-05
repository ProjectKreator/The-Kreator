Meteor.methods({
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