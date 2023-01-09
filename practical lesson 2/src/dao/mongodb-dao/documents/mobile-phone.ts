import { Camera } from "../../idao/entities/camera.js";
import { Display } from "../../idao/entities/display.js";
import { RandomAccessMemory, InternalMemory, ExternalMemorySlot } from "../../idao/entities/memory.js";
import { Dimensions } from "../../idao/entities/mobile-phone.js";
import { OperatingSystem } from "../../idao/entities/operating-system.js";
import { SimCardFormat } from "../../idao/entities/sim-card.js";
import { WirelessTechnology } from "../../idao/entities/wireless-technology.js";

export interface MongoDBMobilePhone {
    manufacturer: string;
    model: string;
    dimensions: Pick<Dimensions, "length" | "width" | "height">;
    weight: number;
    display: Pick<Display, "diagonal_size" | "resolution" | "matrix_type">;
    sim_card_slots: SimCardFormat[];
    random_access_memory: Pick<RandomAccessMemory, "size" | "type">;
    internal_memory: Pick<InternalMemory, "size" | "type">;
    operating_system: Pick<OperatingSystem, "name" | "version">;
    external_memory_slot?: Pick<ExternalMemorySlot, "maximum_supported_size" | "format">;
    cameras?: Pick<Camera, "number_of_megapixels" | "presence_of_flash">[];
    wireless_technologies?: Pick<WirelessTechnology, "name" | "version">[];

    [index: string]: MongoDBMobilePhone[keyof MongoDBMobilePhone];
}