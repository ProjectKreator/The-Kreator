Meteor.methods({
    checkEmail: function (prenom,nom) {
        var res = "";
        var check = false;
        var i = 0;
        
        var addLetter = function() {
            return (res + nom.charAt(i).toLowerCase())
        };
            
        var checkEmailApi = function() {
            // requete http ou methode google pour voir si l'adresse existe deja 
            var url = "https://www.googleapis.com/admin/directory/v1/users/" + res + "@kretaor.in";
            HTTP.get(url, {
            }, function(error, response){
                if(error){
                    console.log(error);
                } else {
                    check = true
                    }
                }
            );
        };
        
        while (!check) {
            res = addLetter()
            checkEmailApi()
            i += 1;
        }
          
        console.log(res)
    }
});