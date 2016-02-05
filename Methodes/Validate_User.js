	
	
	
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

Accounts.config({restrictCreationByEmailDomain: Meteor.settings.googleLogin.acceptedDomainName})