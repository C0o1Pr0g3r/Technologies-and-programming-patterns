export class Role {
    name: string;
    _id?: string;

    [index: string]: Role[keyof Role];

    constructor(name: string, id?: string) {
        this.name = name;
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