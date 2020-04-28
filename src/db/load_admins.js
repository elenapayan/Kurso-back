"use strict";

const UsersRepository = require("../repositories/user");

class PopulateUsers {
    constructor() { }

    async populateUsers() {
        try {
            const users = await UsersRepository.getUsers();
            if (users.length === 0) {
                const user1 = { username: 'admin1', password: "1234", role: "admin" };
                const user2 = { username: 'admin2', password: "1234", role: "admin" };
                UsersRepository.saveUser(user1.username, user1.password, user1.role);
                UsersRepository.saveUser(user2.username, user2.password, user2.role);
                console.info('Populate users success');
            } else {
                console.log("LengthUsers es distinto de 0")
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new PopulateUsers();