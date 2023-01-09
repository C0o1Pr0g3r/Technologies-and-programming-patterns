export class WirelessTechnology {
    name!: string;
    version!: string;

    constructor(name: string, version: string);
    constructor(wireless_technology: WirelessTechnology);
    constructor(name_or_wireless_technology: string | WirelessTechnology, version?: string) {
        if (
            typeof name_or_wireless_technology === "string"
            && version !== undefined
        ) {
            this.name = name_or_wireless_technology;
            this.version = version;
        } else if (name_or_wireless_technology instanceof WirelessTechnology) {
            this.name = name_or_wireless_technology.name;
            this.version = name_or_wireless_technology.version;
        }
    }
}