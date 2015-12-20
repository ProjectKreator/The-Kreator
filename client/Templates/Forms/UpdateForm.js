/*Au moment du rendu du template, on passe à true l'attribut current du Theodoer courant, dont l'ID est obtenue
avec la session qui a été ouverte*/

Template.UpdateForm.onRendered(function(){
	Meteor.call("setCurrentTheodoer", Session.get("currentTheodoer"));
});



/*Template.UpdateForm.events({



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
		
		
	});*/

/*Affiche si l'invitation a bien été envoyée ou non. Lors des requêtes HTTP, on enregistre dans l'objet requestGitHub :
- La réponse du serveur dans sent
- Le login auquel l'invitation a été envoyée.
Ainsi, si le login est faux et qu'il faut le modifier, l'indication de réussite n'apparaît pas une fois que le login a été modifié.*/
Template.gitHubInformations.helpers({
	requestGitHubStatus:function(){
		try{
			if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGitHub.recipient == $('[name=comptegithub]').val()){
				if(Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGitHub.sent == '200 OK'){
					return "Invitation envoyée !";
				} else if (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestGitHub.sent != undefined){
					return "Erreur. Invitation non envoyée.";
				}
			}
			return "";
		} catch (error) {
			return "";
		}
	}
});

Template.gitHubInformations.events({
	'click [name=windowGitHubForm]': function(event){
		event.preventDefault();
		var adresse = 'https://github.com/login/oauth/authorize?client_id=5093e55c974e07f7d5f9&scope=admin:org'
		window.open(adresse,'_blank','newwindow', 'width=200', 'height=100');
	},
});


Template.UpdateForm.events({
	//Permet de modifier automatiquement les données du Theodoer courant. Le nom du champ modifié est passé dynamiquement à la fonction d'actualisation.
	'keyup .form-group' : function(event){
		if(event.which == 13 || event.which==27){
			event.target.blur();
		} else {
			var target = event.target.name;
			var value = $(event.target).val();
			var setModifier = { $set: {} };
			setModifier.$set[target] = value;
			Theodoer.update(Session.get('currentTheodoer'), setModifier);
		}
	}
});