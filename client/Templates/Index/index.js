// Code pour la liste de Theodoer

	Template.index.helpers({

		theodoers: function () {
			// Show newest Theodoer at the top
			var currentUser = Meteor.userId();
			var printAllUsers;

			try{
	    		printAllUsers = !Meteor.user().profile.noOtherUsersPrinting;
	    	} catch(e){
	  		  	printAllUsers = false;
	   		}

	   		if(printAllUsers){
				return Theodoer.find({}, {sort: {createdAt: -1}});
			} else {
				return Theodoer.find({createdBy : currentUser}, {sort: {createdAt: -1}});
			}
		},

		'checked': function(){
        var isCompleted;
	    try{
	    	isCompleted = Meteor.user().profile.noOtherUsersPrinting;
	    } catch(e){
	    	isCompleted = false;
	    }

        if(isCompleted){
            return "checked";
        } else {
            return "";
        }
    }
	});

Template.index.events({
	'change [type=checkbox]': function(){
	    var dontPrintOtherUsers;
	    try{
	    	dontPrintOtherUsers = Meteor.user().profile.noOtherUsersPrinting;
	    } catch(e){
	    	dontPrintOtherUsers = false;
	    }

	    if(dontPrintOtherUsers){
	        Meteor.users.update({ _id: Meteor.userId() }, {$set: { "profile.noOtherUsersPrinting" : false }});
	    } else {
	        Meteor.users.update({ _id: Meteor.userId() }, {$set: { "profile.noOtherUsersPrinting" : true }});
	    }
	}
});
  