Template.requestOpenStack.events({
	'click [name=buttonRequestOpenStack]' : function(event){
		event.preventDefault();
        var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
        var nom = currentTheodoer.nom;
        var prenom = currentTheodoer.prenom;
        var email = currentTheodoer.companyMail;
        alert("the method is empty atm");
        //Meteor.call("inviteToOpenStack", nom, prenom, email); 
	}
});

Template.OpenStack.helpers({
	'invitationSent' : function(){
		try{
			if (Theodoer.findOne({_id : Session.get("currentTheodoer")}).requestOpenStack.status == 200){
            return true
            } else {
                return false;
            }
		} catch(e){
			return false;
		}
	}
});