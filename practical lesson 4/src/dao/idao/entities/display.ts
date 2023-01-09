export class Display {
    diagonal_size: number;
    resolution: Resolution;
    matrix_type: MatrixType;

    constructor(diagonal_size: number, resolution: Resolution, matrix_type: MatrixType) {
        this.diagonal_size = diagonal_size;
        this.resolution = resolution;
        this.matrix_type = matrix_type;
    }
}

export class Resolution {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export enum MatrixType {
    TN = "TN",
    IPS = "IPS",
    AMOLED = "AMOLED",
}