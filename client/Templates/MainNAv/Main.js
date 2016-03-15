Template.Main.onCreated(function(){
	try{
		var id = LoginAttempt.findOne({"name" : "attempt"})._id;
		LoginAttempt.update({_id : id},
			{$set : {state : false}});
	} catch(e){

	}
});

Template.Main.helpers({
	'loginWithUnauthorizedDomainAttempted' : function(){
		try{
			return LoginAttempt.findOne({"name" : "attempt"}).state;
		} catch (e){
			return false;
		}
	}
})

Template.RestrictionOfDomain.helpers({
	'authorizedDomain' : function(){
		return Meteor.settings.public.google.acceptedDomainName;
	}
})