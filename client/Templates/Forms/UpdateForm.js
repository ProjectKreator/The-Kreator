/*Au moment du rendu du template, on passe à true l'attribut current du Theodoer courant, dont l'ID est obtenue
avec la session qui a été ouverte lors du routage*/

Template.UpdateForm.onRendered(function(){
	Meteor.call("setCurrentTheodoer", Session.get("currentTheodoer"));
});


Template.UpdateForm.events({
	//Permet de modifier automatiquement les données du Theodoer courant. Le nom du champ modifié est passé dynamiquement à 
	//la fonction d'actualisation.
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

Template.UpdateForm.helpers({
	isDev : function(){
		return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).job=="Dev");
	}
})

/*Affiche si l'invitation a bien été envoyée ou non. Lors des requêtes HTTP, on enregistre dans l'objet requestGitHub :
- La réponse du serveur dans sent
- Le login auquel l'invitation a été envoyée.
Ainsi, si le login est faux et qu'il faut le modifier, l'indication de réussite n'apparaît pas une fois que le login a été modifié.*/



