import { MongoClient, Collection, ObjectId } from "mongodb";

import { IDAO } from "../idao/dao.js";
import { MobilePhone } from "../idao/entities/mobile-phone.js";
import { Role } from "../idao/entities/role.js";
import { User } from "../idao/entities/user.js";
import { MongoDBMobilePhone } from "./documents/mobile-phone.js";
import { MongoDBRole } from "./documents/role.js";
import { MongoDBUser } from "./documents/user.js";

const URI = "mongodb://127.0.0.1:27017";
export const client = new MongoClient(URI);

const DB_NAME = "mobile_phones";
enum COLLECTION_NAMES {
    PHONES = "phones",
    ROLES = "roles",
    USERS = "users",
}

const WRONG_ORDER_OF_METHOD_CALLS = "Метод 'init()' об'єкта класу 'MongoDBDAO' повинен бути викликаний раніше за всі інші його методи.";

export class MongoDBDAO implements IDAO {
    private phones?: Collection<MongoDBMobilePhone>;
    private roles?: Collection<MongoDBRole>;
    private users?: Collection<MongoDBUser>;

    public async init(): Promise<void> {
        await client.connect();
        this.phones = client.db(DB_NAME).collection<MongoDBMobilePhone>(COLLECTION_NAMES.PHONES);
        this.roles = client.db(DB_NAME).collection<MongoDBRole>(COLLECTION_NAMES.ROLES);
        this.users = client.db(DB_NAME).collection<MongoDBUser>(COLLECTION_NAMES.USERS);
    }

    public async release(): Promise<void> {
        await client.close();
    }

    public async addMobilePhone(mobile_phone: MobilePhone): Promise<boolean> {
        if (this.phones) {
            const mobile_phone_to_insert: MongoDBMobilePhone = {
                manufacturer: mobile_phone.manufacturer,
                model: mobile_phone.model,
                dimensions: mobile_phone.dimensions,
                weight: mobile_phone.weight,
                display: mobile_phone.display,
                sim_card_slots: mobile_phone.sim_card_slots,
                random_access_memory: mobile_phone.random_access_memory,
                internal_memory: mobile_phone.internal_memory,
                operating_system: mobile_phone.operating_system,
            };

            for (const key of Object.keys(mobile_phone)) {
                if (mobile_phone[key] !== undefined && mobile_phone_to_insert[key] === undefined) {
                    mobile_phone_to_insert[key] = mobile_phone[key];
                }
            }

            return (await this.phones.insertOne(mobile_phone_to_insert)).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async getAllMobilePhones(): Promise<MobilePhone[]> {
        if (this.phones) {
            const mobile_phones: MobilePhone[] = (await (this.phones).find().toArray()).map(mobile_phone => {
                return new MobilePhone(
                    mobile_phone.manufacturer,
                    mobile_phone.model,
                    mobile_phone.dimensions,
                    mobile_phone.weight,
                    mobile_phone.display,
                    mobile_phone.sim_card_slots,
                    mobile_phone.random_access_memory,
                    mobile_phone.internal_memory,
                    mobile_phone.operating_system,
                    mobile_phone.external_memory_slot,
                    mobile_phone.cameras,
                    mobile_phone.wireless_technologies,
                    mobile_phone._id.toString()
                );
            });

            return mobile_phones;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async getMobilePhoneById(id: MobilePhone["id"]): Promise<MobilePhone | null> {
        if (this.phones) {
            const mobile_phone = await this.phones.findOne({ _id: new ObjectId(id) });
            if (mobile_phone) {
                return new MobilePhone(
                    mobile_phone.manufacturer,
                    mobile_phone.model,
                    mobile_phone.dimensions,
                    mobile_phone.weight,
                    mobile_phone.display,
                    mobile_phone.sim_card_slots,
                    mobile_phone.random_access_memory,
                    mobile_phone.internal_memory,
                    mobile_phone.operating_system,
                    mobile_phone.external_memory_slot,
                    mobile_phone.cameras,
                    mobile_phone.wireless_technologies,
                    mobile_phone._id.toString()
                );
            }

            return mobile_phone;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async editMobilePhoneById(id: MobilePhone["id"], data: Partial<Omit<MobilePhone, "id">>): Promise<boolean> {
        if (this.phones) {
            return (await this.phones.updateOne({ _id: new ObjectId(id) }, { $set: data })).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async deleteMobilePhoneById(id: MobilePhone["id"]): Promise<boolean> {
        if (this.phones) {
            return (await this.phones.deleteOne({ _id: new ObjectId(id) })).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async addRole(role: Role): Promise<boolean> {
        if (this.roles) {
            const role_to_insert: MongoDBRole = { name: role.name };

            return (await this.roles.insertOne(role_to_insert)).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async getAllRoles(): Promise<Role[]> {
        if (this.roles) {
            const roles: Role[] = (await (this.roles).find().toArray()).map(role => {
                return new Role(role.name, role._id.toString());
            });

            return roles;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async getRoleById(id: Role["id"]): Promise<Role | null> {
        if (this.roles) {
            const role = await this.roles.findOne({ _id: new ObjectId(id) });
            if (role) {
                return new Role(role.name, role._id.toString());
            }

            return role;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async editRoleById(id: Role["id"], data: Partial<Omit<Role, "id">>): Promise<boolean> {
        if (this.roles) {
            return (await this.roles.updateOne({ _id: new ObjectId(id) }, { $set: data })).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async deleteRoleById(id: Role["id"]): Promise<boolean> {
        if (this.roles) {
            return (await this.roles.deleteOne({ _id: new ObjectId(id) })).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async addUser(user: User): Promise<boolean> {
        if (this.users) {
            const user_to_insert: MongoDBUser = {
                login: user.login,
                password: user.password,
                role_id: new ObjectId(user.role_id)
            };

            return (await this.users.insertOne(user_to_insert)).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async getAllUsers(): Promise<User[]> {
        if (this.users) {
            const users: User[] = (await (this.users).find().toArray()).map(user => {
                return new User(user.login, user.password, user.role_id.toString(), user._id.toString());
            });

            return users;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async getUserById(id: User["id"]): Promise<User | null> {
        if (this.users) {
            const user = await this.users.findOne({ _id: new ObjectId(id) });
            if (user) {
                return new User(user.login, user.password, user.role_id.toString(), user._id.toString());
            }

            return user;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async editUserById(id: User["id"], data: Partial<Omit<User, "id">>): Promise<boolean> {
        if (this.users) {
            return (await this.users.updateOne({ _id: new ObjectId(id) }, { $set: data })).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async deleteUserById(id: User["id"]): Promise<boolean> {
        if (this.users) {
            return (await this.users.deleteOne({ _id: new ObjectId(id) })).acknowledged;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async getUserByLoginAndPassword(login: User["login"], password: User["password"]): Promise<User | null> {
        if (this.users) {
            const user = await this.users.findOne({ login, password });
            if (user) {
                return new User(user.login, user.password, user.role_id.toString(), user._id.toString());
            }

            return user;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }
}