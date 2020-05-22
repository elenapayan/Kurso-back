"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserRepository {
    constructor() { }

    async saveUser(user) {
        const passwordHash = await bcrypt.hash(user.password, bcrypt.genSaltSync(8), null);
        const newUser = new User({
            username: user.username,
            password: passwordHash,
            role: user.role
        });
        const userSaved = await newUser.save();
        return userSaved;
    };

    async findUser(username) {
        const user = await User.findOne({ username });
        return user;
    }

    async getUsers() {
        const users = User.find({});
        return users;
    }
};

module.exports = new UserRepository();