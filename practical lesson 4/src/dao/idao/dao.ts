import { MobilePhone } from "./entities/mobile-phone";
import { Role } from "./entities/role";
import { User } from "./entities/user";

export interface IDAO {
    init(): Promise<void>;
    release(): Promise<void>;

    addMobilePhone(mobile_phone: MobilePhone): Promise<boolean>;
    getAllMobilePhones(): Promise<MobilePhone[]>;
    getMobilePhoneById(id: MobilePhone["id"]): Promise<MobilePhone | null>;
    editMobilePhoneById(id: MobilePhone["id"], data: Partial<Omit<MobilePhone, "id">>): Promise<boolean>;
    deleteMobilePhoneById(id: MobilePhone["id"]): Promise<boolean>;

    addRole(role: Role): Promise<boolean>;
    getAllRoles(): Promise<Role[]>;
    getRoleById(id: Role["id"]): Promise<Role | null>;
    editRoleById(id: Role["id"], data: Partial<Omit<Role, "id">>): Promise<boolean>;
    deleteRoleById(id: Role["id"]): Promise<boolean>;

    addUser(user: User): Promise<boolean>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: User["id"]): Promise<User | null>;
    editUserById(id: User["id"], data: Partial<Omit<User, "id">>): Promise<boolean>;
    deleteUserById(id: User["id"]): Promise<boolean>;

    getUserByLoginAndPassword(login: User["login"], password: User["password"]): Promise<User | null>;
}