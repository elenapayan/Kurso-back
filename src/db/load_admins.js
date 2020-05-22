"use strict";

const UsersRepository = require("../repositories/user");
const admins = require("./admins.json");

class PopulateUsers {
    constructor() { }

    async populateUsers() {
        try {
            const users = await UsersRepository.getUsers();
            if (users.length === 0) {
                Object.entries(admins)
                    .map(admin => admin[1])
                    .map(admin => UsersRepository.saveUser(admin));
                console.info('Populate users success');
            }
        } catch (err) {
            res.status(404).send(err.message);
        }
    };
}

module.exports = new PopulateUsers();