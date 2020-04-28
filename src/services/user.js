"use strict";

const UserRepository = require("../repositories/user");

class UserService {
    constructor() { }

    async saveUser(username, password, role) {
        const newUser = await UserRepository.saveUser(username, password, role);
        return newUser;
    }
}

module.exports = new UserService();