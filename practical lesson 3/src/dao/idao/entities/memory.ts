abstract class Memory {
    size: number;

    constructor(size: number) {
        this.size = size;
    }
}

export class RandomAccessMemory extends Memory {
    type!: RandomAccessMemoryType;

    constructor(size: number, type: RandomAccessMemoryType);
    constructor(random_access_memory: RandomAccessMemory);
    constructor(size_or_random_access_memory: number | RandomAccessMemory, type?: RandomAccessMemoryType) {
        if (
            typeof size_or_random_access_memory === "number"
            && type !== undefined
        ) {
            super(size_or_random_access_memory);

            this.type = type;
        } else if (size_or_random_access_memory instanceof RandomAccessMemory) {
            super(size_or_random_access_memory.size);

            this.type = size_or_random_access_memory.type;
        }
    }
}

export class InternalMemory extends Memory {
    type!: InternalMemoryType;

    constructor(size: number, type: InternalMemoryType);
    constructor(internal_memory: InternalMemory);
    constructor(size_or_internal_memory: number | InternalMemory, type?: InternalMemoryType) {
        if (
            typeof size_or_internal_memory === "number"
            && type !== undefined
        ) {
            super(size_or_internal_memory);

            this.type = type;
        } else if (size_or_internal_memory instanceof InternalMemory) {
            super(size_or_internal_memory.size);

            this.type = size_or_internal_memory.type;
        }
    }
}

export class ExternalMemorySlot {
    format!: ExternalMemorySlotFormat;
    maximum_supported_size!: number;

    constructor(format: ExternalMemorySlotFormat, maximum_supported_size: number);
    constructor(external_memory_slot: ExternalMemorySlot);
    constructor(format_or_external_memory_slot: ExternalMemorySlotFormat | ExternalMemorySlot, maximum_supported_size?: number) {
        if (
            typeof format_or_external_memory_slot !== "object"
            && maximum_supported_size !== undefined
        ) {
            this.format = format_or_external_memory_slot;
            this.maximum_supported_size = maximum_supported_size;
        } else if (format_or_external_memory_slot instanceof ExternalMemorySlot) {
            this.format = format_or_external_memory_slot.format;
            this.maximum_supported_size = format_or_external_memory_slot.maximum_supported_size;
        }
    }
}

export enum RandomAccessMemoryType {
    LPDDR3 = "LPDDR3",
    LPDDR4 = "LPDDR4",
    LPDDR4x = "LPDDR4x"
}

export enum InternalMemoryType {
    E_MMC_FOUR_FIVE = "eMMC 4.5",
    E_MMC_FIVE_ZERO = "eMMC 5.0",
    E_MMC_FIVE_ONE = "eMMC 5.1",
    UFS_TWO_ZERO = "UFS 2.0",
    UFS_TWO_ONE = "UFS 2.1",
    UFS_THREE_ZERO = "UFS 3.0"
}

export enum ExternalMemorySlotFormat {
    MICRO_SD = "MicroSD",
    MICRO_SDHC = "MicroSDHC",
    MICRO_SDXC = "MicroSDXC"
}