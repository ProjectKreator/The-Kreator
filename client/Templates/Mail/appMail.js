Template.email1_envoi.events({

  'click [name=STmail]': function () {
  var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
  // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)

  Meteor.call('sendEmail', currentTheodoer.email, currentTheodoer._id);

  Theodoer.update({_id : currentTheodoer._id},{$set : {"mailsSent.mailPerso" : true}});
  },

	'click [name=NDmail]': function () {
      var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});
      // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
      Meteor.call('sendEmail', currentTheodoer.email, currentTheodoer._id);
      Theodoer.update({_id : currentTheodoer._id},{$set : {"mailsSent.mailPerso" : true}});
    }

  });
  
Template.email1_envoi.helpers({
  'done' : function (){ 
    return Theodoer.findOne({_id : Session.get("currentTheodoer")}).mailsSent.mailPerso; 
  }
});


Template.email2_envoi.events({

  'click [name=STmail]': function () {
    var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});

    // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
    Meteor.call('sendEmail2', currentTheodoer.companyMail, currentTheodoer._id);
    Theodoer.update({_id : currentTheodoer._id},{$set : {"mailsSent.mailPro" : true}});
  },

	'click [name=NDmail]': function () {
    var currentTheodoer = Theodoer.findOne({_id : Session.get("currentTheodoer")});

    // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
    Meteor.call('sendEmail2', currentTheodoer.companyMail, currentTheodoer._id);
    Theodoer.update({_id : currentTheodoer._id},{$set : {"mailsSent.mailPro" : true}});
  }

});
  
Template.email2_envoi.helpers({
  'done2' : function () { 
    return Theodoer.findOne({_id : Session.get("currentTheodoer")}).mailsSent.mailPro; 
  }
});

