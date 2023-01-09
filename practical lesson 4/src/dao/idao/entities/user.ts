export class User {
    login: string;
    password: string;
    role_id: string;
    _id?: string;

    [index: string]: User[keyof User];

    constructor(login: string, password: string, role_id: string, id?: string) {
        this.login = login;
        this.password = password;
        this.role_id = role_id;
        this._id = id;

        for (const key of Object.keys(this)) {
            if (this[key] === undefined) {
                delete this[key];
            }
        }
    }

    get id(): string {
        if (this._id) {
            return this._id;
        } else {
            return "";
        }
    }
}