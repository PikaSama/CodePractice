import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
let pwd = "passwd";
let epwd = bcrypt.hashSync(pwd,12);
console.log(epwd);
console.log(bcrypt.compareSync('passwd','$2b$12$Le3qM7RpJmCcX3bgla4FnuDXx7pDHp8W/3lRbYSVdrYN183Oww/xa'));
