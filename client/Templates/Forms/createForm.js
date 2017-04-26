Template.createForm.events({
		// handle the form submission
		'submit form': function(event) {

			// stop the form from submitting
			event.preventDefault();

			// get the data we need from the form
			var firstname = event.target.prenom.value;
			var name = event.target.nom.value;
			var job = event.target.job.value;
			var email = event.target.email.value;
			var phone = event.target.phone.value;
			var githubaccount = event.target.comptegithub.value;
			// create the new Theodoer
			if(firstname != "" && name != "" && email != ""){
				Meteor.call("createTheodoer", firstname, name, job, email, phone, githubaccount, function(error, idNewTheodoer) {
					Session.set('theodoerJustCreated', true);
					Router.go(`/Theodoer/${idNewTheodoer}`);
				});
			}
		},

		'click [name=cancel]' : function() {
			Router.go('/index/');
		}
	});
