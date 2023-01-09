export class Camera {
    number_of_megapixels!: number;
    presence_of_flash!: boolean;

    constructor(number_of_megapixels: number, presence_of_flash: boolean);
    constructor(camera: Camera);
    constructor(number_of_megapixels_or_camera: number | Camera, presence_of_flash?: boolean) {
        if (
            typeof number_of_megapixels_or_camera === "number"
            && typeof presence_of_flash === "boolean"
        ) {
            this.number_of_megapixels = number_of_megapixels_or_camera;
            this.presence_of_flash = presence_of_flash;
        } else if (number_of_megapixels_or_camera instanceof Camera) {
            this.number_of_megapixels = number_of_megapixels_or_camera.number_of_megapixels;
            this.presence_of_flash = number_of_megapixels_or_camera.presence_of_flash;
        }
    }
}