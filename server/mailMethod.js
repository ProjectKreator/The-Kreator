   // on the server, we create the sendEmail RPC function
Meteor.methods({
  sendEmail: function(email, idMongoTheodoer) {
  // send the email!
    SSR.compileTemplate( 'htmlEmail', Assets.getText( 'html-email.html' ) );
    var currentTheodoer = Theodoer.findOne({_id : idMongoTheodoer});

    var emailData = {
      prenom : currentTheodoer.prenom,
      nom :  currentTheodoer.nom,
      fonction: currentTheodoer.job,
      companyMail: currentTheodoer.companyMail,
      password: Meteor.settings.public.google.passwordForNewUser
    };

    Email.send({
      to:email, 
      from:'acemtp@gmail.com', 
      subject:'Bienvenu chez Theodo !! =D', 
      html: SSR.render( 'htmlEmail', emailData )
    });
  },

  sendEmail2: function(email) {
    // send the email!
    SSR.compileTemplate( 'htmlEmail', Assets.getText( 'html-email2.html' ) );
    var currentTheodoer = Theodoer.findOne({_id : idMongoTheodoer});

    var emailData = {
      prenom : currentTheodoer.prenom,
      nom :  currentTheodoer.nom,
      fonction: currentTheodoer.job,
      companyMail: currentTheodoer.companyMail,
      password: Meteor.settings.public.google.passwordForNewUser
    };

    Email.send({
      to:email, 
      from:'acemtp@gmail.com', 
      subject:'Bienvenu chez Theodo !! =D [2nd mail]', 
      html: SSR.render( 'htmlEmail', emailData )
    });
  }
});