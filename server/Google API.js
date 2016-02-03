/*
Meteor.methods ({
    

//#### Generating an authentication URL

//To ask for permissions from a user to retrieve an access token, you redirect them to a consent page. To create a consent page URL:
    
    authenticationG: function() {
        var google = Meteor.npmRequire('googleapis');
        var OAuth2 = google.auth.OAuth2;
        var oauth2Client = new OAuth2(Meteor.settings.google.clientId, Meteor.settings.google.secret, "http://localhost");

        // generate a url that asks permissions for Google+ and Google Calendar scopes
        var scopes = [
          'https://www.googleapis.com/auth/plus.me',
          'https://www.googleapis.com/auth/calendar'
        ];

        var url = oauth2Client.generateAuthUrl({
          access_type: 'online', // 'online' (default) or 'offline' (gets refresh_token)
          scope: scopes // If you only need one scope you can pass it as string
        });
        
        return url;
        

        #### Retrieve authorization code

        Once a user has given permissions on the consent page, Google will redirect
        the page to the redirect URL you have provided with a code query parameter.

            GET /oauthcallback?code={authorizationCode}

        #### Retrieve access token

        With the code returned, you can ask for an access token as shown below:
         js
        oauth2Client.getToken(code, function(err, tokens) {
          // Now tokens contains an access_token and an optional refresh_token. Save them.
          if(!err) {
            oauth2Client.setCredentials(tokens);
          }
        });

 
    }
    

    
    getAccessTokenG: function(user) {
      const GoogleApis = Meteor.npmRequire('googleapis');
      const googleService = user.services.google;
      // is token still valid for the next minute ?
      if (googleService.expiresAt < Date.now() + 60 * 1000) {
        // then just return the currently stored token
        return {
          access_token: googleService.accessToken,
          token_type: 'Bearer',
          id_token: googleService.idToken,
          expiry_date: googleService.expiresAt,
          refresh_token: googleService.refreshToken,
        };
      }
      // fetch google service configuration
      const googleServiceConfig = Accounts.loginServiceConfiguration.findOne({
        service: 'google',
      });
      // declare an Oauth2 client
      const oauth2Client = new GoogleApis.auth.OAuth2(googleServiceConfig.clientId, googleServiceConfig.secret);
      // set the Oauth2 client credentials from the user refresh token
      oauth2Client.setCredentials({
        refresh_token: user.services.google.refreshToken,
      });
      // declare a synchronous version of the oauth2Client method refreshing access tokens
      const refreshAccessTokenSync = Meteor.wrapAsync(oauth2Client.refreshAccessToken, oauth2Client);
      // refresh tokens
      const tokens = refreshAccessTokenSync();
      // update the user document with the fresh token
      Meteor.users.update(user._id, {
        $set: {
          'services.google.accessToken': tokens.access_token,
          'services.google.idToken': tokens.id_token,
          'services.google.expiresAt': tokens.expiry_date,
          'services.google.refreshToken': tokens.refresh_token,
        },
      });
      //
      return tokens;
    }
    
    
});*/

