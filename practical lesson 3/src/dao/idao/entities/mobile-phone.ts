import { MobilePhoneMemento } from "../../../memento/mobile-phone.js";
import { Camera } from "./camera.js";
import { Display } from "./display.js";
import { RandomAccessMemory, InternalMemory, ExternalMemorySlot } from "./memory.js";
import { OperatingSystem } from "./operating-system.js";
import { SimCardFormat } from "./sim-card.js";
import { WirelessTechnology } from "./wireless-technology.js";

export class MobilePhone {
    private _manufacturer!: string;
    private _model!: string;
    private _dimensions!: Dimensions;
    private _weight!: number;
    private _display!: Display;
    private _sim_card_slots!: SimCardFormat[];
    private _random_access_memory!: RandomAccessMemory;
    private _internal_memory!: InternalMemory;
    private _operating_system!: OperatingSystem;
    private _external_memory_slot?: ExternalMemorySlot;
    private _cameras?: Camera[];
    private _wireless_technologies?: WirelessTechnology[];
    private _id?: string;

    private _state_history: MobilePhoneMemento[];

    [index: string]: MobilePhone[
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
    ];

    constructor(
        manufacturer: string, model: string,
        dimensions: Dimensions, weight: number,
        display: Display, sim_card_slots: SimCardFormat[],
        random_access_memory: RandomAccessMemory, internal_memory: InternalMemory,
        operating_system: OperatingSystem,
        external_memory_slot?: ExternalMemorySlot,
        cameras?: Camera[], wireless_technologies?: WirelessTechnology[],
        id?: string
    );
    constructor(mobile_phone: MobilePhone);
    constructor(
        manufacturer_or_mobile_phone: string | MobilePhone, model?: string,
        dimensions?: Dimensions, weight?: number,
        display?: Display, sim_card_slots?: SimCardFormat[],
        random_access_memory?: RandomAccessMemory, internal_memory?: InternalMemory,
        operating_system?: OperatingSystem,
        external_memory_slot?: ExternalMemorySlot,
        cameras?: Camera[], wireless_technologies?: WirelessTechnology[],
        id?: string
    ) {
        if (
            typeof manufacturer_or_mobile_phone === "string"
            && model !== undefined
            && dimensions !== undefined
            && weight !== undefined
            && display !== undefined
            && sim_card_slots !== undefined
            && random_access_memory !== undefined
            && internal_memory !== undefined
            && operating_system !== undefined
        ) {
            this._manufacturer = manufacturer_or_mobile_phone;
            this._model = model;
            this._dimensions = dimensions;
            this._weight = weight;
            this._display = display;
            this._sim_card_slots = sim_card_slots;
            this._random_access_memory = random_access_memory;
            this._internal_memory = internal_memory;
            this._operating_system = operating_system;
            this._external_memory_slot = external_memory_slot;
            this._cameras = cameras;
            this._wireless_technologies = wireless_technologies;
            this._id = id;
        } else if (manufacturer_or_mobile_phone instanceof MobilePhone) {
            this._manufacturer = manufacturer_or_mobile_phone.manufacturer;
            this._model = manufacturer_or_mobile_phone.model;
            this._dimensions = new Dimensions(manufacturer_or_mobile_phone.dimensions);
            this._weight = manufacturer_or_mobile_phone.weight;
            this._display = new Display(manufacturer_or_mobile_phone.display);
            this._sim_card_slots = manufacturer_or_mobile_phone.sim_card_slots.map(value => value);
            this._random_access_memory = new RandomAccessMemory(manufacturer_or_mobile_phone.random_access_memory);
            this._internal_memory = new InternalMemory(manufacturer_or_mobile_phone.internal_memory);
            this._operating_system = new OperatingSystem(manufacturer_or_mobile_phone.operating_system);
            if (manufacturer_or_mobile_phone.external_memory_slot) {
                this._external_memory_slot = new ExternalMemorySlot(manufacturer_or_mobile_phone.external_memory_slot);
            }
            if (manufacturer_or_mobile_phone.cameras) {
                this.cameras = manufacturer_or_mobile_phone.cameras.map(value => new Camera(value));
            }
            if (manufacturer_or_mobile_phone.wireless_technologies) {
                this.wireless_technologies = manufacturer_or_mobile_phone.wireless_technologies.map(value => new WirelessTechnology(value));
            }
        }

        for (const key of Object.keys(this)) {
            if (this[key] === undefined) {
                delete this[key];
            }
        }

        this._state_history = [];
    }

    get id(): string {
        if (this._id) {
            return this._id;
        } else {
            return "";
        }
    }

    get manufacturer(): string {
        return this._manufacturer;
    }
    set manufacturer(value: string) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._manufacturer = value;
    }

    get model(): string {
        return this._model;
    }
    set model(value: string) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._model = value;
    }

    get dimensions(): Dimensions {
        return this._dimensions;
    }
    set dimensions(value: Dimensions) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._dimensions = value;
    }

    get weight(): number {
        return this._weight;
    }
    set weight(value: number) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._weight = value;
    }

    get display(): Display {
        return this._display;
    }
    set display(value: Display) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._display = value;
    }

    get sim_card_slots(): SimCardFormat[] {
        return this._sim_card_slots;
    }
    set sim_card_slots(value: SimCardFormat[]) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._sim_card_slots = value;
    }

    get random_access_memory(): RandomAccessMemory {
        return this._random_access_memory;
    }
    set random_access_memory(value: RandomAccessMemory) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._random_access_memory = value;
    }

    get internal_memory(): InternalMemory {
        return this._internal_memory;
    }
    set internal_memory(value: InternalMemory) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._internal_memory = value;
    }

    get operating_system(): OperatingSystem {
        return this._operating_system;
    }
    set operating_system(value: OperatingSystem) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._operating_system = value;
    }

    get external_memory_slot(): ExternalMemorySlot | undefined {
        return this._external_memory_slot;
    }
    set external_memory_slot(value: ExternalMemorySlot | undefined) {
        this._state_history.push(new MobilePhoneMemento(this));
        if (value === undefined) {
            delete this._external_memory_slot;
        } else {
            this._external_memory_slot = value;
        }
    }

    get cameras(): Camera[] | undefined {
        return this._cameras;
    }
    set cameras(value: Camera[] | undefined) {
        this._state_history.push(new MobilePhoneMemento(this));
        if (value === undefined) {
            delete this._cameras;
        } else {
            this._cameras = value;
        }
    }

    get wireless_technologies(): WirelessTechnology[] | undefined {
        return this._wireless_technologies;
    }
    set wireless_technologies(value: WirelessTechnology[] | undefined) {
        this._state_history.push(new MobilePhoneMemento(this));
        if (value === undefined) {
            delete this._wireless_technologies;
        } else {
            this._wireless_technologies = value;
        }
    }

    addSimCardSlot(value: SimCardFormat) {
        this._state_history.push(new MobilePhoneMemento(this));
        this._sim_card_slots.push(value);
    }

    addCamera(value: Camera) {
        this._state_history.push(new MobilePhoneMemento(this));
        if (!this._cameras) {
            this._cameras = [];
        }
        this._cameras.push(value);
    }

    addWirelessTechnology(value: WirelessTechnology) {
        this._state_history.push(new MobilePhoneMemento(this));
        if (!this._wireless_technologies) {
            this._wireless_technologies = [];
        }
        this._wireless_technologies.push(value);
    }

    removeSimCardSlot(value: SimCardFormat | number) {
        if (typeof value === "number") {
            this._state_history.push(new MobilePhoneMemento(this));
            this._sim_card_slots.splice(value, 1);
        } else {
            const index = this._sim_card_slots.indexOf(value);
            if (index !== -1) {
                this._state_history.push(new MobilePhoneMemento(this));
                this._sim_card_slots.splice(index, 1);
            }
        }
    }

    removeCamera(value: Camera | number) {
        if (this._cameras) {
            if (typeof value === "number") {
                this._state_history.push(new MobilePhoneMemento(this));
                this._cameras.splice(value, 1);
            } else {
                const index = this._cameras.indexOf(value);
                if (index !== -1) {
                    this._state_history.push(new MobilePhoneMemento(this));
                    this._cameras.splice(index, 1);
                }
            }
        }

        if (this._cameras?.length === 0) {
            delete this._cameras;
        }
    }

    removeWirelessTechnology(value: WirelessTechnology | number) {
        if (this._wireless_technologies) {
            if (typeof value === "number") {
                this._state_history.push(new MobilePhoneMemento(this));
                this._wireless_technologies.splice(value, 1);
            } else {
                const index = this._wireless_technologies.indexOf(value);
                if (index !== -1) {
                    this._state_history.push(new MobilePhoneMemento(this));
                    this._wireless_technologies.splice(index, 1);
                }
            }
        }

        if (this._wireless_technologies?.length === 0) {
            delete this._wireless_technologies;
        }
    }

    cancel_changes() {
        const last_backup = this._state_history.pop();
        if (last_backup) {
            this._manufacturer = last_backup.state.manufacturer;
            this._model = last_backup.state.model;
            this._dimensions = last_backup.state.dimensions;
            this._weight = last_backup.state.weight;
            this._display = last_backup.state.display;
            this._sim_card_slots = last_backup.state.sim_card_slots;
            this._random_access_memory = last_backup.state.random_access_memory;
            this._internal_memory = last_backup.state.internal_memory;
            this._operating_system = last_backup.state.operating_system;
            this._external_memory_slot = last_backup.state.external_memory_slot;
            this._cameras = last_backup.state.cameras;
            this._wireless_technologies = last_backup.state.wireless_technologies;
        }
    }
}

export class Dimensions {
    length!: number;
    width!: number;
    height!: number;

    constructor(length: number, width: number, height: number);
    constructor(dimensions: Dimensions);
    constructor(length_or_dimensions: number | Dimensions, width?: number, height?: number) {
        if (
            typeof length_or_dimensions === "number"
            && width !== undefined
            && height !== undefined
        ) {
            this.length = length_or_dimensions;
            this.width = width;
            this.height = height;
        } else if (length_or_dimensions instanceof Dimensions) {
            this.length = length_or_dimensions.length;
            this.width = length_or_dimensions.width;
            this.height = length_or_dimensions.height;
        }
    }
}