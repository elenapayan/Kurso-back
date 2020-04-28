"use strict";

const UserService = require("../services/user");

class UserController {
    constructor() { }

    async saveUser(req, res, next) {
        try {
            const { username } = req.body;
            const { password } = req.body;
            const newUser = await UserService.saveUser(username, password);
            res.status(200).send(newUser);
        } catch (err) {
            res.status(500).send(err.message);
        } finally {
            next();
        }
    }
}

module.exports = new UserController();

