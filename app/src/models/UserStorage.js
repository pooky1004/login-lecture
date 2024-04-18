"use strict";

const fs = require("fs").promises;
// const { use } = require("../routes/home");

class UserStorage {

    // static #getUserInfo(data, id) {
    //     const users = JSON.parse(data);
    //     const idx = users.id.indexOf(id);
    //     const usersKeys = Object.keys(users);
    //     const userInfo = usersKeys.reduce((newUser, info) => {
    //         newUser[info] = users[info][idx];
    //         return newUser;
    //     }, {});

    //     return userInfo;
    // }

    // static #getUsers(data, fields) {
    //     const users = JSON.parse(data);
    //     if(isAll) return users;

    //     const newUsers = fields.reduce((newUsers, field) => {
    //         if (users.hasOwnProperty(field)) {
    //             newUsers[field] = users[field];
    //         }
    //         return newUsers;            
    //     }, {});
    //     return newUsers;
    // }

    static getUsers(isAll, ...fields) {
        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
            const users = JSON.parse(data);
            if(isAll) return users;
            
            const newUsers = fields.reduce((newUsers, field) => {
                if (users.hasOwnProperty(field)) {
                    newUsers[field] = users[field];
                }
                return newUsers;            
            }, {});
            return newUsers;            
            // return this.#getUsers(data, isAll, fields);
            // return this.#getUserInfo(data, id);
            // const users = JSON.parse(data);
            // const idx = users.id.indexOf(id);
            // const usersKeys = Object.keys(users);
            // const userInfo = usersKeys.reduce((newUser, info) => {
            //     newUser[info] = users[info][idx];
            //     return newUser;
            // }, {});
    
            // return userInfo;          
        })
        .catch(console.error);

        // const newUsers = fields.reduce((newUsers, field) => {
        //     if (users.hasOwnProperty(field)) {
        //         newUsers[field] = users[field];
        //     }
        //     return newUsers;
        // }, {});
        // return newUsers;
    }

    static getUserInfo(id) {
        return fs
            .readFile("./src/databases/users.json")
            .then((data) => {
                // return this.#getUserInfo(data, id);
                const users = JSON.parse(data);
                const idx = users.id.indexOf(id);
                const usersKeys = Object.keys(users);
                const userInfo = usersKeys.reduce((newUser, info) => {
                    newUser[info] = users[info][idx];
                    return newUser;
                }, {});
        
                return userInfo;          
            })
            .catch(console.error);
    }

    static async save(userInfo) {
        // const users = await this.getUsers("id", "psword", "name");
        const users = await this.getUsers(true);

        if(users.id.includes(userInfo.id)) {
            throw  '이미 존재하는 아이디 입니다.';
        }

        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return {success: true};


        // console.log(users);

        

        // const users = this.#users;
        // users.id.push(userInfo.id);
        // users.name.push(userInfo.name);
        // users.psword.push(userInfo.psword);
        // return { success: true };
    }
}

module.exports = UserStorage;
