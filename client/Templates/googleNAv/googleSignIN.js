    
Template.loginButtonsBig.events({  
    'click a#loginGoogle': function(e, t) {
        e.preventDefault();

        Meteor.loginWithGoogle({
            requestPermissions: ['email'],
            requestOfflineToken: 'true'
        }, Router.go('index'));
    }
}); 