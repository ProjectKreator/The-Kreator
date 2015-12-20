Template.createForm.events({

		// handle the form submission 
		'submit form': function(event) {

			// stop the form from submitting
			event.preventDefault();

			// get the data we need from the form
			var firstname = event.target.prenom.value;
			var name = event.target.nom.value;
			var email = event.target.email.value;
			var githubaccount = event.target.comptegithub.value;
			// create the new Theodoer
			if(firstname != "" && name != "" && email != ""){
				Meteor.call("createTheodoer", firstname, name, email, githubaccount);
			}			
			// permet de rerouter vers la page index sans utiliser la fonction href de HTML5
			Router.go('/index');
		},

		'click [name=cancel]' : function() {

			Router.go('/index');

		}
	}); 