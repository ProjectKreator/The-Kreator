Meteor.startup(function () {
				// code to run on server at startup
				return Meteor.methods({

					// To be removed when in production!!!
					removeAllTheodoer: function() {
							//Erreur si un utilisateur non identifié veut vider la base
							
							if (! Meteor.userId()) {
								throw new Meteor.Error("not-authorized");
							}
							
						return Theodoer.remove({});
					}

				});
			});