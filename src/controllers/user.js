"use strict";

const UserService = require("../services/user");

class UserController {
    constructor() { }

    async saveUser(req, res, next) {
        try {
            const user = req.body;
            const newUser = await UserService.saveUser(user);
            res.status(200).send(newUser);
        } catch (err) {
            res.status(500).send(err.message);
        } finally {
            next();
        }
    }
}

module.exports = new UserController();

