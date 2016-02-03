Template.Test.events({
	'click [name=testGoogle]' : function(event){
		event.preventDefault();
//        var tokenG = Meteor.call("getAccessTokenG", Meteor.user());
        try {
            Meteor.call("getAccessTokenG", Meteor.user());
        }
        catch (e) {
            console.log(e);
        } 
	}

});