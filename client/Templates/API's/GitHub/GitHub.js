/*
	Le template ne sert qu'à déclencher des événements. Il est appelé par GitHub après la première requête GET
	et lance les requêtes suivantes (obtention du token par post + relier à une organisation par put) grâce à la méthode
	GitHubRequest. Pour l'instant, le nom de l'organisation est en dur, on pourra modifier par la suite.
	Une fois la requête terminée, la pop-up se ferme.

	Doc : https://developer.github.com/v3/oauth/#web-application-flow



*/

Template.GitHub.onRendered(function(){
	var code = document.location.toString().split("=")[1];
	Meteor.call("GitHubRequest", code);
	window.close();


});