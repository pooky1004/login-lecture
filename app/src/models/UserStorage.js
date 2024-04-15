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
}

module.exports = UserStorage;
