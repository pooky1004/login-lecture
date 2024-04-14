"use strict";

const { use } = require(".");

const users = {
    id: ["pooky", "pooky1004", "rhjoung"],
    psword: ["i5lovepooky!@#$%", "1234", "i0loveme^("],
};

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    
    login: (req, res) => {
        res.render("home/login");
    },    
};

const process = {
    login: (req, res) => {
        const id = req.body.id,
        psword = req.body.psword;

        if(users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if(users.psword[idx] === psword) {
                return res.json({
                    success: true,
                });
            }
        }

        return res.json({
            success: false,
            msg: "로그인에 실패하셨습니다.",
        });
    },
};

module.exports = {
    output,
    process,   
};
