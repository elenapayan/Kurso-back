"use strict";

const User = require("../models/user");

class UserRepository {
    constructor() { }

    async saveUser(user) {
        const newUser = new User(user);
        const userSaved = await newUser.save();
        console.log("userSaved",userSaved);
        return userSaved;
    };
};

module.exports = new UserRepository();