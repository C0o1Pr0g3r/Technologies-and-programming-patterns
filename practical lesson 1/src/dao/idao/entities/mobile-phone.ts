import { Camera } from "./camera.js";
import { Display } from "./display.js";
import { RandomAccessMemory, InternalMemory, ExternalMemorySlot } from "./memory.js";
import { OperatingSystem } from "./operating-system.js";
import { SimCardFormat } from "./sim-card.js";
import { WirelessTechnology } from "./wireless-technology.js";

export class MobilePhone {
    manufacturer: string;
    model: string;
    dimensions: Dimensions;
    weight: number;
    display: Display;
    sim_card_slots: SimCardFormat[];
    random_access_memory: RandomAccessMemory;
    internal_memory: InternalMemory;
    operating_system: OperatingSystem;
    external_memory_slot?: ExternalMemorySlot;
    cameras?: Camera[];
    wireless_technologies?: WirelessTechnology[];
    _id?: string;

    [index: string]: MobilePhone[keyof MobilePhone];

    constructor(
        manufacturer: string, model: string,
        dimensions: Dimensions, weight: number,
        display: Display, sim_card_slots: SimCardFormat[],
        random_access_memory: RandomAccessMemory, internal_memory: InternalMemory,
        operating_system: OperatingSystem,
        external_memory_slot?: ExternalMemorySlot,
        cameras?: Camera[], wireless_technologies?: WirelessTechnology[],
        id?: string
    ) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.dimensions = dimensions;
        this.weight = weight;
        this.display = display;
        this.sim_card_slots = sim_card_slots;
        this.random_access_memory = random_access_memory;
        this.internal_memory = internal_memory;
        this.operating_system = operating_system;
        this.external_memory_slot = external_memory_slot;
        this.external_memory_slot = external_memory_slot;
        this.cameras = cameras;
        this.wireless_technologies = wireless_technologies;
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

export class Dimensions {
    length: number;
    width: number;
    height: number;

    constructor(length: number, width: number, height: number) {
        this.length = length;
        this.width = width;
        this.height = height;
    }
}