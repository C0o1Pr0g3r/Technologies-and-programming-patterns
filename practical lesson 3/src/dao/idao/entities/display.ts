export class Display {
    diagonal_size!: number;
    resolution!: Resolution;
    matrix_type!: MatrixType;

    constructor(diagonal_size: number, resolution: Resolution, matrix_type: MatrixType);
    constructor(display: Display);
    constructor(diagonal_size_or_display: number | Display, resolution?: Resolution, matrix_type?: MatrixType) {
        if (
            typeof diagonal_size_or_display === "number"
            && resolution !== undefined
            && matrix_type !== undefined
        ) {
            this.diagonal_size = diagonal_size_or_display;
            this.resolution = resolution;
            this.matrix_type = matrix_type;
        } else if (diagonal_size_or_display instanceof Display) {
            this.diagonal_size = diagonal_size_or_display.diagonal_size;
            this.resolution = new Resolution(diagonal_size_or_display.resolution);
            this.matrix_type = diagonal_size_or_display.matrix_type;
        }
    }
}

export class Resolution {
    width!: number;
    height!: number;

    constructor(width: number, height: number);
    constructor(resolution: Resolution);
    constructor(width_or_resolution: number | Resolution, height?: number) {
        if (
            typeof width_or_resolution === "number"
            && height !== undefined
        ) {
            this.width = width_or_resolution;
            this.height = height;
        } else if (width_or_resolution instanceof Resolution) {
            this.width = width_or_resolution.width;
            this.height = width_or_resolution.height;
        }
    }
}

export enum MatrixType {
    TN = "TN",
    IPS = "IPS",
    AMOLED = "AMOLED",
}