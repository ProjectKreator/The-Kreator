
  Template.email1_envoi.events({
    'click [name=STmail]': function () {
      // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
      Meteor.call('sendEmail', $('[name=email]').val());
      Session.set('done', true);
    },

	'click [name=NDmail]': function () {
      // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
      Meteor.call('sendEmail', $('[name=email]').val());
      Session.set('done', true);
    }

  });
  
  Template.email1_envoi.done = function () { return Session.equals('done', true); }


  Template.email2_envoi.events({
    'click [name=STmail]': function () {
      // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
      Meteor.call('sendEmail2', $('[name=email]').val());
      Session.set('done2', true);
    },

	'click [name=NDmail]': function () {
      // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
      Meteor.call('sendEmail2', $('[name=email]').val());
      Session.set('done2', true);
    }

  });
  
  Template.email2_envoi.done2 = function () { return Session.equals('done2', true); }

