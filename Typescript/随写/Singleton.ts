class Person {
    private name: string;
    public constructor(name: string) {
        this.name = name;
    }
}

const createAdministrator = (() => {
    let admin = null;
    return function (name: string): Person {
        if (!admin) {
            admin = new Person(name);
        }
        return admin;
    };
})();

const adminInfo = createAdministrator('Zorin');
console.log(adminInfo);
const anotherAdmin = createAdministrator('PikaSama');
console.log(anotherAdmin);
