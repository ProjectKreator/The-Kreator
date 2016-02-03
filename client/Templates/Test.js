Template.Test.events({
	'click [name=testGoogle]' : function(event){
        console.log(Meteor.user());
	}

});