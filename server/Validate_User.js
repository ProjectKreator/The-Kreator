	
	
	
//Prevent new accounts creation
//Accounts.validateNewUser(function() {
//	return false;
//});


/*	Accounts.validateNewUser(function (user) {
    if(user.services.google.email.match(/kreataor\.in$/)) {
       return true;
    }
    throw new Meteor.Error(403, "You must sign in using a kretaor.in account");
	});
*/

Accounts.config({restrictCreationByEmailDomain: function(email){
	var domain = email.slice(email.lastIndexOf("@")+1);
	var authorized = Meteor.settings.public.googleLogin.acceptedDomainName;
	if(domain == authorized){
		return true;
	} else {
		var id = LoginAttempt.findOne({"name" : "attempt"})._id;
		LoginAttempt.update({_id : id}, {$set : {"state" : true}});
		return false;
	}
}
});
