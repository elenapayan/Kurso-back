"use strict";

const UserRepo = require("../repositories/user");

class CheckJwtAuth {
    constructor() { }

    async verifyToken(payload, done) {
        console.log("payload", payload);
        const user = await UserRepo.findUser(payload.user);
        console.log("jwt", payload, user);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'User not found' });
        }
    };
}

module.exports = new CheckJwtAuth();