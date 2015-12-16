Template.UpdateForm.events({

		// handle the form submission 
		'submit form': function(event) {

			// stop the form from submitting
			event.preventDefault();
			
			var theodoerId = this._id;
			
			// get the data we need from the form and if a field is empty, we keep the old value
			if(event.target.prenom.value == "") {
				var firstname = this.prenom;
			} else { 
				var firstname = event.target.prenom.value;
			}
			
			if(event.target.nom.value == "") {
				var name = this.nom;
			} else { 
				var name = event.target.nom.value;
			}

			if(event.target.email.value == "") {
				var email = this.email;
			} else { 
				var email = event.target.email.value;
			}

			if(event.target.comptegithub.value == "") {
				var githubaccount = this.comptegithub;
			} else { 
				var githubaccount = event.target.comptegithub.value;
			}			
			
			// Update the selected Theodoer
			Meteor.call("updateTheodoer", theodoerId, firstname, name, email, githubaccount);
			
			// permet de rerouter vers la page index sans utiliser la fonction href de HTML5
			//Router.go('/index');
		},
		
		
	}); 