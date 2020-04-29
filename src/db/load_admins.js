"use strict";

const UsersRepository = require("../repositories/user");
const admins = require("./admins.json");

class PopulateUsers {
    constructor() { }

    async populateUsers() {
        try {
            const users = await UsersRepository.getUsers();
            if (users.length === 0) {
                const createAdmins = Object.entries(admins)
                    .map(admin => Object.values(admin[1]));
                createAdmins.map(admin => UsersRepository.saveUser(admin[0], admin[1], admin[2]));
            }
        } catch (err) {
        }
    };
}

module.exports = new PopulateUsers();