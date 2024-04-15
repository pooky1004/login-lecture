"use strict";

const { use } = require("../routes/home");

class UserStorage {
    static #users = {
        id: ["pooky", "pooky1004", "rhjoung"],
        psword: ["i5lovepooky!@#$%", "1234", "i0loveme^("],
        name: ["푸키", "푸키천사", "임헌정"],
    };
    
    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }
}

module.exports = UserStorage;
