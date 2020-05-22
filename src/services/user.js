"use strict";

const UserRepository = require("../repositories/user");

class UserService {
    constructor() { }

    async saveUser(user) {
        const newUser = await UserRepository.saveUser(user);
        return newUser;
    }
}

module.exports = new UserService();