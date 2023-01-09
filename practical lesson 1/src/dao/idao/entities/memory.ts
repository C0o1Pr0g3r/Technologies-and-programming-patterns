abstract class Memory {
    size: number;

    constructor(size: number) {
        this.size = size;
    }
}

export class RandomAccessMemory extends Memory {
    type: RandomAccessMemoryType;

    constructor(size: number, type: RandomAccessMemoryType) {
        super(size);

        this.type = type;
    }
}

export class InternalMemory extends Memory {
    type: InternalMemoryType;

    constructor(size: number, type: InternalMemoryType) {
        super(size);

        this.type = type;
    }
}

export class ExternalMemorySlot {
    format: ExternalMemorySlotFormat;
    maximum_supported_size: number;

    constructor(format: ExternalMemorySlotFormat, maximum_supported_size: number) {
        this.format = format;
        this.maximum_supported_size = maximum_supported_size;
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