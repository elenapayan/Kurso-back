"use strict";

const UserRepository = require("../repositories/user");

class UserService {
    constructor() { }

    async saveUser(username, password) {
        const newUser = await UserRepository.saveUser(username, password);
        return newUser;
    }
    async createToken(username) {
        const token = await UserRepository.createToken(username);
        return token;
    }
}

module.exports = new UserService();