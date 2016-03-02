Meteor.methods({
  sendEmail: function (to, from, subject, text) {

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    //actual email sending method
    /*Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });*/
  HTTP.post("https://api.mailgun.net/v3/sandboxf7c43340f7dd48af8829fa208778f816.mailgun.org",
    {
      "data" : {
        "to" : to,
        "from" : from,
        "subject" : subject,
        "text" : text
      },
      "headers" :{
        "api" : "key-fb032d282326f2fa5565dc81a6e93ad3"
      }
    }, function(e, r){
      if(e){
        console.log("erreur" + e);
      } else {
        console.log(r);
      }
    });
  }
});