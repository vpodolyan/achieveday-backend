const express = require('express');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')

const mongoose = require('mongoose');
const morgan = require('morgan');
const flash = require('connect-flash');

const passport = require('passport');

const githubAuth = require('connect-oauth-github');

const githubRequest = require( "github-request" ).request;

const app = express();
app.use(cookieParser());
app.use(cookieSession({
	name: 'session',
    secret: 'achievmenentsaregreatthingsishouldlogin'
}));

app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;
// Start listening for requests
app.listen(port);
console.log(`App is listening on port ${port}`)
