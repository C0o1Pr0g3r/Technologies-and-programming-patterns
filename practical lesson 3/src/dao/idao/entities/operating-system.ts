export class OperatingSystem {
    name!: string;
    version!: string;

    constructor(name: string, version: string);
    constructor(operating_system: OperatingSystem);
    constructor(name_or_operating_system: string | OperatingSystem, version?: string) {
        if (
            typeof name_or_operating_system === "string"
            && version !== undefined
        ) {
            this.name = name_or_operating_system;
            this.version = version;
        } else if (name_or_operating_system instanceof OperatingSystem) {
            this.name = name_or_operating_system.name;
            this.version = name_or_operating_system.version;
        }
    }
}