// Code pour la liste de Theodoer

	Template.index.helpers({

		theodoers: function () {
			// Show newest Theodoer at the top
			var currentUser = Meteor.userId();
			return Theodoer.find({}, {sort: {createdAt: -1}});

//			return Theodoer.find({createdBy : currentUser}, {sort: {createdAt: -1}});
		}
	});
  