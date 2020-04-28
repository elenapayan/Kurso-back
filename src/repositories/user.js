"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserRepository {
    constructor() { }

    async saveUser(username, password) {
        const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);
        const newUser = new User({ username: username, password: passwordHash });
        const userSaved = await newUser.save();
        return userSaved;
    };

    async findUser(username) {
        const user = await User.findOne({ username });
        return user;
    }
};

module.exports = new UserRepository();