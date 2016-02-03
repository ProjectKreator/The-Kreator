
if (Meteor.isClient) {
// scope pour autoriser l'application à gerer les users Google apps
    var scopes = ['https://www.googleapis.com/auth/admin.directory.user']
    Accounts.ui.config({'requestPermissions':{'google':scopes}});
}


if (Meteor.isServer) {
	
			
}

 

   

