   // on the server, we create the sendEmail RPC function
  Meteor.methods({
    

    sendEmail: function(email) {
      // send the email!
            SSR.compileTemplate( 'htmlEmail', Assets.getText( 'html-email.html' ) );

            var emailData = {
              prenom : Theodoer.findOne({current:true}).prenom,
              nom :  Theodoer.findOne({current:true}).nom,
              fonction: Theodoer.findOne({current:true}).job,
                companyMail: Theodoer.findOne({current:true}).companyMail,
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


              var emailData = {
              prenom : Theodoer.findOne({current:true}).prenom,
              nom :  Theodoer.findOne({current:true}).nom,
              fonction: Theodoer.findOne({current:true}).job,
                companyMail: Theodoer.findOne({current:true}).companyMail,
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