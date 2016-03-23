   // on the server, we create the sendEmail RPC function
Meteor.methods({
  sendEmail: function(email, idMongoTheodoer) {
  // send the email!
    var currentTheodoer = Theodoer.findOne({_id : idMongoTheodoer});
    var emailData = {
      prenom : currentTheodoer.prenom,
      nom :  currentTheodoer.nom,
      fonction: currentTheodoer.job,
      companyMail: currentTheodoer.companyMail,
      password: Meteor.settings.google.passwordForNewUser
    };
    
    if (currentTheodoer.comptegithub == "") {
        SSR.compileTemplate( 'htmlEmail', Assets.getText('html-emailSansGitHub.html'));
    } else {
        SSR.compileTemplate('htmlEmail', Assets.getText('html-emailAvecGitHub.html'));
    }
    Email.send({
      to:email, 
      from:'acemtp@gmail.com', 
      subject:'Bienvenue chez Theodo !! =D', 
      html: SSR.render('htmlEmail', emailData)
    });

  },

  sendEmail2: function(email, idMongoTheodoer) {
    // send the email!
    var currentTheodoer = Theodoer.findOne({_id : idMongoTheodoer});
      
    var emailData = {
      prenom : currentTheodoer.prenom,
      nom :  currentTheodoer.nom,
      fonction: currentTheodoer.job,
      loginOpenStack: currentTheodoer.companyMail.split("@")[0]
    };

      
      if (currentTheodoer.job == "Dev") {
        SSR.compileTemplate('htmlEmail', Assets.getText('html-email2_dev.html'));
    } else {
        SSR.compileTemplate('htmlEmail', Assets.getText('html-email2_biz.html'));
    }
     Email.send({
         to:email, 
         from:'acemtp@gmail.com', 
         subject:'Bienvenue chez Theodo !! =D [2nd mail]', 
         html: SSR.render( 'htmlEmail', emailData )
    });
  }
});