"use strict";

const UserRepo = require("../repositories/user");

class CheckJwtAuth {
    constructor() { }

    async verifyToken(payload, done) {
        const user = await UserRepo.findUser(payload.body.username);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'User not found' });
        }
    };
}

module.exports = new CheckJwtAuth();