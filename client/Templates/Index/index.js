// Code pour la liste de Theodoer

	Template.index.helpers({

		theodoers: function () {
			// Show newest Theodoer at the top
			return Theodoer.find({}, {sort: {createdAt: -1}});
		}
	});
  