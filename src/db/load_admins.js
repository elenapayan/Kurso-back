"use strict";

const UsersRepository = require("../repositories/user");
const admins = require("./admins.json");

class PopulateUsers {
    constructor() { }

    async populateUsers() {
        try {
            const users = await UsersRepository.getUsers();
            if (users.length === 0) {
                // UsersRepository.saveUser(admins.admin1.username, admins.admin1.password, admins.admin1.role);
                // UsersRepository.saveUser(admins.admin2.username, admins.admin2.password, admins.admin2.role);
                // UsersRepository.saveUser(admins.admin3.username, admins.admin3.password, admins.admin3.role);
                const createAdmins = Object.entries(admins)
                    .map(admin => Object.values(admin[1]));
                // console.log("createAdmins", createAdmins);
                createAdmins.map(admin => UsersRepository.saveUser(admin[0], admin[1], admin[2]));
                console.info('Populate users success');
            } else {
                console.log("LengthUsers es distinto de 0");
            }
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new PopulateUsers();