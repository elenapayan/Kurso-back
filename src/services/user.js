"use strict";

const UserRepository = require("../repositories/user");

class UserService {
    constructor() { }

    async saveUser(username, password) {
        const newUser = await UserRepository.saveUser(username, password);
        return newUser;
    }
}

module.exports = new UserService();