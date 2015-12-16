	// counter starts at 0
  //Session.setDefault('counter', 0);
  /*
  Template.BoutonX.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
*/
  Template.BoutonX.events({
    'click button': function () {
    HTTP.get('http://www.lemonde.fr',function(err,resp){
		console.log(resp);
		alert(resp.content);
	});	  
    }
  });
  
  Template.ButtonX2.events({
    'click button': function () {

		window.location = 'https://github.com/login/oauth/authorize?client_id=5093e55c974e07f7d5f9&scope=admin:org';
    }
  });

  Template.GitHub.events({
    'click button': function(){
      event.preventDefault();
      var adresse = document.location.toString().split("=")[1];
    Meteor.call("GitHubHTTP", adresse);
    }
  });
	