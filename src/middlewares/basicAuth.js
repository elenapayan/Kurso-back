"use strict";

const UserRepo = require("../repositories/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class CheckBasicAuth {
    constructor() { }

    async verify(username, password, done) {
        // console.log("BA", username, password);
        const user = await UserRepo.findUser(username);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (await bcrypt.compare(password, user.password)) {
            // console.log("BA user", user);
            // const body = { role: user.role, _id: user._id, username: user.username }
            // const token = jwt.sign({ body }, process.env.SECRET_KEY);
            // console.log("BA token", token);
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    }
}

module.exports = new CheckBasicAuth();