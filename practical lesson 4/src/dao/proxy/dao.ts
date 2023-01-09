import { DAOFactory } from "../dao-factory.js";
import { DAOType } from "../dao-type.js";
import { IDAO } from "../idao/dao.js";
import { MobilePhone } from "../idao/entities/mobile-phone.js";
import { Role } from "../idao/entities/role.js";
import { User } from "../idao/entities/user.js";

const WRONG_ORDER_OF_METHOD_CALLS = "Метод 'init()' об'єкта класу 'DAOProxy' повинен бути викликаний раніше за всі інші його методи.";
const UNAUTHORIZED_ERROR = "В доступі відмовлено. Для виконання операцій необхідно авторизуватися за допомогою метода 'login()'.";
const NOT_ENOUGH_RIGHTS_ERROR = "В доступі відмовлено. Ви зайшли під роллю звичайного користувача, а виконувати операції, що модифікують базу даних, можуть тільки адміністратори.";

export class DAOProxy implements IDAO {
    private _dao: IDAO | null;
    private _user: User | null = null;
    private _admin_role_id: string | null = null;

    constructor() {
        this._dao = DAOFactory.getDAOInstance(DAOType.MongoDB);
    }

    public async login(login: string, password: string): Promise<boolean> {
        if (this._dao) {
            const user = await this._dao.getUserByLoginAndPassword(login, password);
            if (user) {
                this._user = user;

                return true;
            }
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }

        return false;
    }

    public async init(): Promise<void> {
        await this._dao?.init();

        if (this._dao) {
            const roles = await this._dao.getAllRoles();
            const admin_role = roles.find(role => role.name = "Admin");
            if (admin_role) {
                this._admin_role_id = admin_role.id;
            }
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async release(): Promise<void> {
        await this._dao?.release();
    }

    public async addMobilePhone(mobile_phone: MobilePhone): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.addMobilePhone(mobile_phone);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async getAllMobilePhones(): Promise<MobilePhone[]> {
        if (this.isReadingAllowed()) {
            if (this._dao) {
                return await this._dao.getAllMobilePhones();
            } else {
                throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
            }
        } else {
            throw new Error(UNAUTHORIZED_ERROR);
        }
    }

    public async getMobilePhoneById(id: MobilePhone["id"]): Promise<MobilePhone | null> {
        if (this.isReadingAllowed()) {
            if (this._dao) {
                return await this._dao.getMobilePhoneById(id);
            } else {
                throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
            }
        } else {
            throw new Error(UNAUTHORIZED_ERROR);
        }
    }

    public async editMobilePhoneById(id: MobilePhone["id"], data: Partial<Omit<MobilePhone, "id">>): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.editMobilePhoneById(id, data);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async deleteMobilePhoneById(id: MobilePhone["id"]): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.deleteMobilePhoneById(id);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async addRole(role: Role): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.addRole(role);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async getAllRoles(): Promise<Role[]> {
        if (this.isReadingAllowed()) {
            if (this._dao) {
                return await this._dao.getAllRoles();
            } else {
                throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
            }
        } else {
            throw new Error(UNAUTHORIZED_ERROR);
        }
    }

    public async getRoleById(id: Role["id"]): Promise<Role | null> {
        if (this.isReadingAllowed()) {
            if (this._dao) {
                return await this._dao.getRoleById(id);
            } else {
                throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
            }
        } else {
            throw new Error(UNAUTHORIZED_ERROR);
        }
    }

    public async editRoleById(id: Role["id"], data: Partial<Omit<Role, "id">>): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.editRoleById(id, data);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async deleteRoleById(id: Role["id"]): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.deleteRoleById(id);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async addUser(user: User): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.addUser(user);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async getAllUsers(): Promise<User[]> {
        if (this.isReadingAllowed()) {
            if (this._dao) {
                return await this._dao.getAllUsers();
            } else {
                throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
            }
        } else {
            throw new Error(UNAUTHORIZED_ERROR);
        }
    }

    public async getUserById(id: User["id"]): Promise<User | null> {
        if (this.isReadingAllowed()) {
            if (this._dao) {
                return await this._dao.getUserById(id);
            } else {
                throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
            }
        } else {
            throw new Error(UNAUTHORIZED_ERROR);
        }
    }

    public async editUserById(id: User["id"], data: Partial<Omit<User, "id">>): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.editUserById(id, data);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async deleteUserById(id: User["id"]): Promise<boolean> {
        if (this.isWritingAllowed()) {
            if (this._dao) {
                return await this._dao.deleteUserById(id);
            }
        } else {
            throw new Error(NOT_ENOUGH_RIGHTS_ERROR);
        }

        return false;
    }

    public async getUserByLoginAndPassword(login: User["login"], password: User["password"]): Promise<User | null> {
        if (this._dao) {
            return await this._dao.getUserByLoginAndPassword(login, password);
        }

        return null;
    }

    private isReadingAllowed(): boolean {
        if (this._dao) {
            return Boolean(this._user);
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    private isWritingAllowed(): boolean {
        if (this._dao && this._admin_role_id) {
            if (this._user) {
                return this._user.role_id === this._admin_role_id;
            } else {
                throw new Error(UNAUTHORIZED_ERROR);
            }
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }
}