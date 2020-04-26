"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        console.log("repository user", user);
        return user;
    }

    async createToken(username) {
        const token = jwt.sign({ user: username }, process.env.SECRET_KEY);
        return token;
    }
};

module.exports = new UserRepository();