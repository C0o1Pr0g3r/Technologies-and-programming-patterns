import { MobilePhone } from "./entities/mobile-phone";

export interface IDAO {
    init(): Promise<void>;
    release(): Promise<void>;

    addMobilePhone(mobile_phone: MobilePhone): Promise<boolean>;
    getAllMobilePhones(): Promise<MobilePhone[]>;
    getMobilePhoneById(id: MobilePhone["id"]): Promise<MobilePhone | null>;
    editMobilePhoneById(id: MobilePhone["id"], data: Partial<Omit<MobilePhone, "id">>): Promise<boolean>;
    deleteMobilePhoneById(id: MobilePhone["id"]): Promise<boolean>;
}