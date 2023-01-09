import { MongoClient, Collection, ObjectId } from "mongodb";

import { IDAO } from "../idao/dao.js";
import { Dimensions, MobilePhone } from "../idao/entities/mobile-phone.js";
import { MongoDBMobilePhone } from "./documents/mobile-phone.js";
import { Observer } from "../../observer/observer.js";
import { Display, Resolution } from "../idao/entities/display.js";
import { ExternalMemorySlot, InternalMemory, RandomAccessMemory } from "../idao/entities/memory.js";
import { OperatingSystem } from "../idao/entities/operating-system.js";
import { Camera } from "../idao/entities/camera.js";
import { WirelessTechnology } from "../idao/entities/wireless-technology.js";

const URI = "mongodb://127.0.0.1:27017";
export const client = new MongoClient(URI);

const DB_NAME = "mobile_phones";
enum COLLECTION_NAMES {
    PHONES = "phones",
}

const WRONG_ORDER_OF_METHOD_CALLS = "Метод 'init()' об'єкта класу 'MongoDBDAO' повинен бути викликаний раніше за всі інші його методи.";

export class MongoDBDAO implements IDAO {
    private phones?: Collection<MongoDBMobilePhone>;
    private observers = new Map<string, Set<{ observer: Observer, method: (...args: unknown[]) => unknown }>>();

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
                if (key === "_state_history") {
                    continue;
                }
                // console.log(key);

                const key_to_insert = key.slice(1, key.length);

                if (mobile_phone[key_to_insert] !== undefined && mobile_phone_to_insert[key_to_insert] === undefined) {
                    mobile_phone_to_insert[key_to_insert] = mobile_phone[key_to_insert];
                }
            }
            const { acknowledged: result, insertedId } = await this.phones.insertOne(mobile_phone_to_insert);

            const inserted_mobile_phone = this.getMobilePhoneById(insertedId.toString());

            this.notify("mobile_phone_added", mobile_phone);

            return result;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async getAllMobilePhones(): Promise<MobilePhone[]> {
        if (this.phones) {
            const mobile_phones: MobilePhone[] = (await (this.phones).find().toArray()).map(mobile_phone => {
                const external_memory_slot = mobile_phone.external_memory_slot
                    ?
                    new ExternalMemorySlot(
                        mobile_phone.external_memory_slot.format,
                        mobile_phone.external_memory_slot.maximum_supported_size
                    )
                    :
                    mobile_phone.external_memory_slot;
                const cameras = mobile_phone.cameras
                    ?
                    mobile_phone.cameras?.map(value => new Camera(value.number_of_megapixels, value.presence_of_flash))
                    :
                    mobile_phone.cameras;
                const wireless_technologies = mobile_phone.wireless_technologies
                    ?
                    mobile_phone.wireless_technologies.map(value => new WirelessTechnology(value.name, value.version))
                    :
                    mobile_phone.wireless_technologies;

                return new MobilePhone(
                    mobile_phone.manufacturer,
                    mobile_phone.model,
                    new Dimensions(mobile_phone.dimensions),
                    mobile_phone.weight,
                    new Display(
                        mobile_phone.display.diagonal_size,
                        new Resolution(
                            mobile_phone.display.resolution.width,
                            mobile_phone.display.resolution.height
                        ),
                        mobile_phone.display.matrix_type
                    ),
                    mobile_phone.sim_card_slots,
                    new RandomAccessMemory(mobile_phone.random_access_memory.size, mobile_phone.random_access_memory.type),
                    new InternalMemory(mobile_phone.internal_memory.size, mobile_phone.internal_memory.type),
                    new OperatingSystem(mobile_phone.operating_system.name, mobile_phone.operating_system.version),
                    external_memory_slot,
                    cameras,
                    wireless_technologies,
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
                const external_memory_slot = mobile_phone.external_memory_slot
                    ?
                    new ExternalMemorySlot(
                        mobile_phone.external_memory_slot.format,
                        mobile_phone.external_memory_slot.maximum_supported_size
                    )
                    :
                    mobile_phone.external_memory_slot;
                const cameras = mobile_phone.cameras
                    ?
                    mobile_phone.cameras?.map(value => new Camera(value.number_of_megapixels, value.presence_of_flash))
                    :
                    mobile_phone.cameras;
                const wireless_technologies = mobile_phone.wireless_technologies
                    ?
                    mobile_phone.wireless_technologies.map(value => new WirelessTechnology(value.name, value.version))
                    :
                    mobile_phone.wireless_technologies;

                return new MobilePhone(
                    mobile_phone.manufacturer,
                    mobile_phone.model,
                    new Dimensions(mobile_phone.dimensions),
                    mobile_phone.weight,
                    new Display(
                        mobile_phone.display.diagonal_size,
                        new Resolution(
                            mobile_phone.display.resolution.width,
                            mobile_phone.display.resolution.height
                        ),
                        mobile_phone.display.matrix_type
                    ),
                    mobile_phone.sim_card_slots,
                    new RandomAccessMemory(mobile_phone.random_access_memory.size, mobile_phone.random_access_memory.type),
                    new InternalMemory(mobile_phone.internal_memory.size, mobile_phone.internal_memory.type),
                    new OperatingSystem(mobile_phone.operating_system.name, mobile_phone.operating_system.version),
                    external_memory_slot,
                    cameras,
                    wireless_technologies,
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
            const mobile_phone_before_chantges = await this.getMobilePhoneById(id);
            const result = (await this.phones.updateOne({ _id: new ObjectId(id) }, { $set: data })).acknowledged;
            const mobile_phone_after_chantges = await this.getMobilePhoneById(id);

            if (mobile_phone_before_chantges && mobile_phone_after_chantges && result) {
                this.notify("mobile_phone_edited", mobile_phone_before_chantges, mobile_phone_after_chantges);
            }

            return result;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    public async deleteMobilePhoneById(id: MobilePhone["id"]): Promise<boolean> {
        if (this.phones) {
            const mobile_phone = await this.getMobilePhoneById(id);
            const result = (await this.phones.deleteOne({ _id: new ObjectId(id) })).acknowledged;

            if (mobile_phone && result) {
                this.notify("mobile_phone_removed", mobile_phone);
            }

            return result;
        } else {
            throw new Error(WRONG_ORDER_OF_METHOD_CALLS);
        }
    }

    addObserver(event_name: "mobile_phone_added" | "mobile_phone_edited" | "mobile_phone_removed", observer: Observer, method: (...args: any[]) => unknown): void {
        if (this.observers.get(event_name) === undefined) {
            this.observers.set(event_name, new Set());
        }
        this.observers.get(event_name)?.add({ observer, method });
    }

    removeObserver(event_name: "mobile_phone_added" | "mobile_phone_edited" | "mobile_phone_removed", observer: Observer, method: (...args: any[]) => unknown): void {
        const observers_with_methods = this.observers.get(event_name);
        if (observers_with_methods !== undefined) {
            for (const observer_with_method of observers_with_methods.values()) {
                if (observer_with_method.observer === observer && observer_with_method.method === method) {
                    observers_with_methods.delete(observer_with_method);
                    break;
                }
            }
        }
    }

    notify(event_name: "mobile_phone_added" | "mobile_phone_edited" | "mobile_phone_removed", ...args: any[]): void {
        const observers_with_methods = this.observers.get(event_name);
        if (observers_with_methods !== undefined) {
            for (const observer_with_method of observers_with_methods.values()) {
                observer_with_method.method.apply(observer_with_method.observer, args);
            }
        }
    }
}