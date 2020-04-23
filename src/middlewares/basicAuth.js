"use strict";

class CheckBasicAuth {
    constructor() { }

    verify(username, password, done) {

        if (username == 'admin' && password == 'pass') {
            return done(null, { username, password });
        } else {
            return done(null, false, { message: 'Incorrect username or password' });
        }
    }
}

module.exports = new CheckBasicAuth();