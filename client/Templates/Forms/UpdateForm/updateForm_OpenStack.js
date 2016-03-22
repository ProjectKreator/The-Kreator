Template.requestOpenStack.events({
	'click [name=buttonRequestOpenStack]' : function(event){
		event.preventDefault();
        var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
        var username = currentTheodoer.companyMail.split("@")[0];
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