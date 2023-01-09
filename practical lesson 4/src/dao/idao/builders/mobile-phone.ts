import { Camera } from "../entities/camera.js";
import { Display } from "../entities/display.js";
import { RandomAccessMemory, InternalMemory, ExternalMemorySlot } from "../entities/memory.js";
import { Dimensions, MobilePhone } from "../entities/mobile-phone.js";
import { OperatingSystem } from "../entities/operating-system.js";
import { SimCardFormat } from "../entities/sim-card.js";
import { WirelessTechnology } from "../entities/wireless-technology.js";

export class MobilePhoneBuilder {
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

    [index: string]: MobilePhoneBuilder[keyof MobilePhoneBuilder];

    constructor(
        manufacturer: string, model: string,
        dimensions: Dimensions, weight: number,
        display: Display, sim_card_slots: SimCardFormat[],
        random_access_memory: RandomAccessMemory, internal_memory: InternalMemory,
        operating_system: OperatingSystem
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
    }

    setExternalMemorySlot(external_memory_slot: ExternalMemorySlot): MobilePhoneBuilder {
        this.external_memory_slot = external_memory_slot;

        return this;
    }

    addCamera(camera: Camera) {
        if (!this.cameras) {
            this.cameras = [];
        }
        this.cameras?.push(camera);

        return this;
    }

    addWirelessTechnology(wireless_technology: WirelessTechnology) {
        if (!this.wireless_technologies) {
            this.wireless_technologies = [];
        }
        this.wireless_technologies?.push(wireless_technology);

        return this;
    }

    build() {
        return new MobilePhone(
            this.manufacturer,
            this.model,
            this.dimensions,
            this.weight,
            this.display,
            this.sim_card_slots,
            this.random_access_memory,
            this.internal_memory,
            this.operating_system,
            this.external_memory_slot,
            this.cameras,
            this.wireless_technologies
        );
    }
}