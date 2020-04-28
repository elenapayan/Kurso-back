"use strict";

const UserService = require("../services/user");

class UserController {
    constructor() { }

    async saveUser(req, res, next) {
        try {
            const { username, password, role } = req.body;
            const newUser = await UserService.saveUser(username, password, role);
            res.status(200).send(newUser);
        } catch (err) {
            res.status(500).send(err.message);
        } finally {
            next();
        }
    }
}

module.exports = new UserController();

