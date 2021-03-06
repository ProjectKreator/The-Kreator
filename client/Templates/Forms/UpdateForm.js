/*Au moment du rendu du template, on passe à true l'attribut current du Theodoer courant, dont l'ID est obtenue
avec la session qui a été ouverte lors du routage*/
Template.UpdateForm.onCreated(function () {
	if (Session.get('theodoerJustCreated')) {
		this.theodoerJustCreated = true;
	} else {
		this.theodoerJustCreated = false;
	}
});

Template.UpdateForm.onRendered(function(){
	Meteor.call("setCurrentTheodoer", Session.get("currentTheodoer"), Meteor.user()._id);
	var companyMail = Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail;
});

Template.UpdateForm.onDestroyed(function(){
	Session.set('theodoerJustCreated', false);
	this.theodoerJustCreated = false;
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

	'click [name=saveCompanyMail]': function (event) {
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
		} else if (apiName === 'googleApi' || apiName === 'githubApi') {
			return Meteor.settings.public.featureToggling[apiName];
		}

			return Meteor.settings.public.featureToggling[apiName]
				&& Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail;
	},

	theodoerNotJustCreated : function() {
		return !Template.instance().theodoerJustCreated;
	},

	companyMailSet : function(){
		if (Theodoer.findOne({_id : Session.get("currentTheodoer")}).companyMail) {
			return "Adresse email entreprise enregistrée";
		} else {
			return null;
		}
	},
});
