import * as bcrypt from 'bcrypt';
import * as inquirer from 'inquirer';

import * as aes from 'aes-js';
import * as fs from 'fs';

interface Data {
    profile: {
        user: string,
        isLogin: boolean,
    },
    users: {
        [username: string]: { passwd: string },
    },
}

interface CryptoParams {
    (data: string,key: number[]): string,
}

inquirer.prompt([
    {
        type: 'list',
        name: 'menu',
        message: '----------Dashboard----------',
        choices: [
            'Login',
            'Register',
        ],
    },
]).then(({ menu }): void => {
    if (menu === 'Login') {
        login();
    }
    else {
        register();
    }
});

function login(): void {
    console.log("login");
}

function register(): void {
    let data: Data = {
        profile: {
            user: '',
            isLogin: false,
        },
        users: {},
    }
    cli();
    function cli(): void {
        inquirer.prompt([
            {
                type: 'input',
                name: 'user',
                message: 'Type your name:',
            },
            {
                type: 'password',
                name: 'passwd',
                message: 'Type your password:',
            },
            {
                type: 'password',
                name: 'verifyPwd',
                message: 'Retype your password:',
            },
        ]).then(({ user,passwd,verifyPwd }): void => {
            if (passwd === verifyPwd) {
                data.users[encrptData(user,[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])] = { passwd: bcrypt.hashSync(passwd,12) };
                console.log(data);
            }
            else {
                console.log("Error: Password validation was failed. Please retry.");
                cli();
            }
        });
    }
}

const encrptData: CryptoParams = function(data,key) {
    const dataBytes = aes.utils.utf8.toBytes(data);
    const cipher = new aes.ModeOfOperation.ctr(key);
    const encryptedData = cipher.encrypt(dataBytes);
    return aes.utils.hex.fromBytes(encryptedData);
}