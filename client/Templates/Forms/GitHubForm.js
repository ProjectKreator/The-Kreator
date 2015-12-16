
	Template.GithubForm.events({
		
		// handle the form submission 
		'submit form': function(event) {

			// stop the form from submitting
			event.preventDefault();

			// get the data we need from the form
			var LoginGH = event.target.prenom.value;
			var PasswordGH = event.target.nom.value;
	} 	
	
	}); 
	