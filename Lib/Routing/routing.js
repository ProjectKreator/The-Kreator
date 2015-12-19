Router.map(function() {
  this.route('Main', {path: '/'});
  this.route('index');
  this.route('Formulaire');
  this.route('GithubForm');
  this.route('GitHub');
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('Main');
  } else {
    this.next();
  }
};

var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('index');
  } else {
    this.next();
  }
};


Router.onBeforeAction(mustBeSignedIn, {except: ['Main']});
Router.onBeforeAction(goToDashboard, {only: ['Main']});

// http://meteortips.com/second-meteor-tutorial/iron-router-part-2/ to understand the dynamic route
Router.route('/Theodoer/:_id', {
	template: 'theodoerPage',
	data: function() {
		// grabs the unique ID of the Theodoer in the page's URL
		var currentTheodoer = this.params._id;
		// finds data linked to this Theodoer in the collection
    Session.set("currentTheodoer", currentTheodoer);
    // on ouvre une session currentTheodoer sur l'id du Theodoer dont la page est ouverte
		return Theodoer.findOne({ _id: currentTheodoer });
	}
});