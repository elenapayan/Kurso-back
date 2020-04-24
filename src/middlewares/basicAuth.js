"use strict";

const UserRepo = require("../repositories/user");
const bcrypt = require("bcrypt");

class CheckBasicAuth {
    constructor() { }

    async verify(username, password, done) {
        console.log("BA", username, password);
        const user = await UserRepo.findUser(username);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    }
}

module.exports = new CheckBasicAuth();