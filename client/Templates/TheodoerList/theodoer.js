Template.theodoer.events({
	'click .deleteTheodoer': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Voulez-vous vraiment supprimer ce Theodoer ? Attention, cette action ne peut pas être annulée !");
		if(confirm){
			Theodoer.remove({ _id: documentId });
		}
	}
});