/*Au moment du rendu du template, on passe à true l'attribut current du Theodoer courant, dont l'ID est obtenue
avec la session qui a été ouverte lors du routage*/

Template.UpdateForm.onRendered(function(){
	Meteor.call("setCurrentTheodoer", Session.get("currentTheodoer"), Meteor.user()._id);
	var companyMail = Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail;
});


Template.UpdateForm.events({
	//Permet de modifier automatiquement les données du Theodoer courant. Le nom du champ modifié est passé dynamiquement à
	//la fonction d'actualisation.
	'keyup .form-group' : function(event) {
		if(event.which == 13 || event.which==27){
			event.target.blur();
		} else {
			var target = event.target.name;
			var value = $(event.target).val();
			var setModifier = { $set: {} };
			setModifier.$set[target] = value;
			Theodoer.update(Session.get('currentTheodoer'), setModifier);
		}
	},

	'companyMail': function(event) {
			var setModifier = { $set: {} };
			setModifier.$setcompanyMail = event.target.companyMail.value;
			Theodoer.update(Session.get('currentTheodoer'), setModifier);
	},
});



Template.UpdateForm.helpers({
	isDev : function(){
		return (Theodoer.findOne({_id : Session.get("currentTheodoer")}).job=="Dev");
	},

	shouldBeDisplayedApi : function(apiName){
		if (apiName === 'OpenStack') {
			return Meteor.settings.public.featureToggling[apiName] && isDev();
		}

		return Meteor.settings.public.featureToggling[apiName];
	},

	companyMailSet : function(){
		if (Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail) {
			return "Adresse email entreprise enregistrée";
		} else {
			return null;
		}
	},
});
