import { Camera } from "../dao/idao/entities/camera.js";
import { Display, Resolution } from "../dao/idao/entities/display.js";
import { ExternalMemorySlot, InternalMemory, RandomAccessMemory } from "../dao/idao/entities/memory.js";
import { Dimensions, MobilePhone } from "../dao/idao/entities/mobile-phone.js";
import { OperatingSystem } from "../dao/idao/entities/operating-system.js";
import { WirelessTechnology } from "../dao/idao/entities/wireless-technology.js";

export type StateType = Pick<MobilePhone,
    "manufacturer" |
    "model" |
    "dimensions" |
    "weight" |
    "display" |
    "sim_card_slots" |
    "random_access_memory" |
    "internal_memory" |
    "operating_system" |
    "external_memory_slot" |
    "cameras" |
    "wireless_technologies"
>;

export class MobilePhoneMemento {
    readonly state: StateType;


    constructor(state: StateType) {
        this.state = {
            manufacturer: state.manufacturer,
            model: state.model,
            dimensions: new Dimensions(state.dimensions),
            weight: state.weight,
            display: new Display(state.display),
            sim_card_slots: state.sim_card_slots.map(value => value),
            random_access_memory: new RandomAccessMemory(state.random_access_memory),
            internal_memory: new InternalMemory(state.internal_memory),
            operating_system: new OperatingSystem(state.operating_system),
        };

        if (state.external_memory_slot) {
            this.state.external_memory_slot = new ExternalMemorySlot(state.external_memory_slot);
        }
        if (state.cameras) {
            this.state.cameras = state.cameras.map(value => new Camera(value));
        }
        if (state.wireless_technologies) {
            this.state.wireless_technologies = state.wireless_technologies.map(value => new WirelessTechnology(value));
        }
    }
}