import { MongoClient, Collection, ObjectId } from "mongodb";

import { IDAO } from "../idao/dao.js";
import { MobilePhone } from "../idao/entities/mobile-phone.js";
import { MongoDBMobilePhone } from "./documents/mobile-phone.js";

const URI = "mongodb://127.0.0.1:27017";
export const client = new MongoClient(URI);

const DB_NAME = "mobile_phones";
enum COLLECTION_NAMES {
    PHONES = "phones",
}

const WRONG_ORDER_OF_METHOD_CALLS = "Метод 'init()' об'єкта класу 'MongoDBDAO' повинен бути викликаний раніше за всі інші його методи.";

export class MongoDBDAO implements IDAO {
    private phones?: Collection<MongoDBMobilePhone>;

    public async init(): Promise<void> {
        await client.connect();
        this.phones = client.db(DB_NAME).collection<MongoDBMobilePhone>(COLLECTION_NAMES.PHONES);
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
}