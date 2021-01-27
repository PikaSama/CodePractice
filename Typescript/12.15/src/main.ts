import * as bcrypt from 'bcrypt';
import * as inquirer from 'inquirer';

import * as fs from 'fs';

interface ValidateResult {
    status: number;
    epwd: string;
}

interface Data {
    profile: {
        user: string;
        isLogin: boolean;
    };
    users: {
        [username: string]: { passwd: string };
    };
}

let data: Data = {
    profile: {
        user: '',
        isLogin: false,
    },
    users: {},
};

fs.readFile('database.json', 'utf8', (err, content): void => {
    if (err) {
        console.error('ERROR: Can not find database file.');
        menu(['Login', 'Register']);
    } else {
        data = JSON.parse(content);
        if (data.profile.isLogin) {
            menu(['Logout', 'Register'], '----------' + data.profile.user + '----------');
        } else {
            menu(['Login', 'Register']);
        }
    }
});

function menu(choices: string[], msg = '----------Dashboard----------'): void {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: msg,
                choices: choices,
            },
        ])
        .then(({ menu }): void => {
            if (menu === 'Login') {
                login();
            } else if (menu === 'Logout') {
                logout();
            } else {
                register();
            }
        });
}

function logout(): void {
    data.profile = {
        user: '',
        isLogin: false,
    };

    fs.writeFile('database.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Success');
        }
    });
}

function login(): void {
    function cli(): void {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'user',
                    message: 'Type your user name: ',
                    filter: (val: string): string => val.toLowerCase(),
                },
                {
                    type: 'password',
                    name: 'pwd',
                    message: 'Password: ',
                },
            ])
            .then(({ user, pwd }): void => {
                const { status, epwd } = validate(user);
                if (status) {
                    if (bcrypt.compareSync(pwd, epwd)) {
                        data.profile = {
                            user: user,
                            isLogin: true,
                        };
                        fs.writeFile('database.json', JSON.stringify(data), (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log('Success');
                            }
                        });
                    } else {
                        console.error('Error: Incorrect password.');
                    }
                } else {
                    console.error('Error: No such user.');
                }
            });
    }
    cli();
}

function register(): void {
    function cli(): void {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'user',
                    message: 'Type your name:',
                    filter: (val: string): string => val.toLowerCase(),
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
            ])
            .then(({ user, passwd, verifyPwd }): void => {
                if (passwd === verifyPwd) {
                    if (validate(user).status) {
                        console.error('Erorr: Same user.');
                    } else {
                        data.users[bcrypt.hashSync(user, 10)] = { passwd: bcrypt.hashSync(passwd, 10) };
                        fs.writeFile('database.json', JSON.stringify(data), (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log('Success');
                            }
                        });
                    }
                } else {
                    console.log('Error: Password validation was failed. Please retry.');
                    cli();
                }
            });
    }
    cli();
}

function validate(user): ValidateResult {
    let status = 0;
    let epwd = '';
    Object.keys(data.users).map((objIndex): string => {
        if (bcrypt.compareSync(user, objIndex)) {
            status = 1;
            epwd = data.users[objIndex].passwd;
        }
        return '';
    });
    return {
        status,
        epwd,
    };
}
