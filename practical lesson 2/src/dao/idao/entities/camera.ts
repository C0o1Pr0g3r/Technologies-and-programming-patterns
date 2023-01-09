export class Camera {
    number_of_megapixels: number;
    presence_of_flash: boolean;

    constructor(number_of_megapixels: number, presence_of_flash: boolean) {
        this.number_of_megapixels = number_of_megapixels;
        this.presence_of_flash = presence_of_flash;
    }
}