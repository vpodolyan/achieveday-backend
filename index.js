const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const githubAuth = require('connect-oauth-github');

const githubRequest = require( "github-request" ).request;

const app = express();
app.use(cookieParser() );
app.use(cookieSession({
	name: 'session',
    secret: 'test'
}));

const gha = githubAuth.createClient({
	id: 'f952cb2811f92e4a2597',
	secret: '69ee1799b276c9f195cfa8e5768ffda05ec07432'
});

// Provide a custom success handler which gets all the user information
gha.success = function( request, response, data ) {
	githubRequest({
		path: "/user?access_token=" + data.accessToken
	}, function( error, user ) {
		if ( error ) {
			return response.send( 500 );
		}

		user.accessToken = data.accessToken;
		gha.users[ request.sessionID ] = user;
		response.redirect( data.originalUrl );
	});
};

// Add the route for the GitHub authorization callback
// The path must match authorization callback URL for the GitHub application
app.get( "/auth", gha.handshake );

// Create a route which requires authorization
app.get( "/required", gha.authorize, function( request, response ) {
	var accessToken = gha.users[ request.sessionID ].accessToken;
	response.send( "Your access token is " + accessToken + " info: " + JSON.stringify(gha.users[ request.sessionID ]) );
});

// Start listening for requests
app.listen( 5000 );
