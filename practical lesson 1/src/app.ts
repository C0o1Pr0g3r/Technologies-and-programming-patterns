import { DAOFactory } from "./dao/dao-factory.js";
import { DAOType } from "./dao/dao-type.js";
import { MobilePhoneBuilder } from "./dao/idao/builders/mobile-phone.js";
import { Camera } from "./dao/idao/entities/camera.js";
import { Display, MatrixType, Resolution } from "./dao/idao/entities/display.js";
import { ExternalMemorySlot, ExternalMemorySlotFormat, InternalMemory, InternalMemoryType, RandomAccessMemory, RandomAccessMemoryType } from "./dao/idao/entities/memory.js";
import { Dimensions, MobilePhone } from "./dao/idao/entities/mobile-phone.js";
import { OperatingSystem } from "./dao/idao/entities/operating-system.js";
import { SimCardFormat } from "./dao/idao/entities/sim-card.js";
import { WirelessTechnology } from "./dao/idao/entities/wireless-technology.js";
import { generateNumberBetweenExclusive } from "./helper.js";

const mongodb_dao = DAOFactory.getDAOInstance(DAOType.MongoDB);

main();

async function main() {
    try {
        if (mongodb_dao) {
            await mongodb_dao.init();

            const mobile_phones_to_insert = [
                new MobilePhoneBuilder(
                    "Nomi", "i144m",
                    new Dimensions(46.2, 98.3, 11.5), 123,
                    new Display(1.44, new Resolution(68, 96), MatrixType.TN),
                    [SimCardFormat.FULL_SIZE],
                    new RandomAccessMemory(16, RandomAccessMemoryType.LPDDR3),
                    new InternalMemory(64, InternalMemoryType.E_MMC_FOUR_FIVE),
                    new OperatingSystem("Unknown", "")
                )
                    .build(),
                new MobilePhoneBuilder(
                    "Aelion", "A600",
                    new Dimensions(54.1, 124.2, 11.6), 131,
                    new Display(2.4, new Resolution(480, 240), MatrixType.TN),
                    [SimCardFormat.MINI],
                    new RandomAccessMemory(32, RandomAccessMemoryType.LPDDR3),
                    new InternalMemory(64, InternalMemoryType.E_MMC_FOUR_FIVE),
                    new OperatingSystem("Unknown", "")
                )
                    .addCamera(new Camera(0.3, false))
                    .build(),
                new MobilePhoneBuilder(
                    "Xiaomi", "Redmi 7A",
                    new Dimensions(146.3, 70.4, 9.6), 165,
                    new Display(5.45, new Resolution(1440, 720), MatrixType.IPS),
                    [SimCardFormat.NANO, SimCardFormat.NANO],
                    new RandomAccessMemory(2048, RandomAccessMemoryType.LPDDR4),
                    new InternalMemory(32768, InternalMemoryType.E_MMC_FIVE_ZERO),
                    new OperatingSystem("Android", "9.0"),
                )
                    .setExternalMemorySlot(new ExternalMemorySlot(ExternalMemorySlotFormat.MICRO_SD, 65536))
                    .addCamera(new Camera(12, true)).addCamera(new Camera(5, false))
                    .addWirelessTechnology(new WirelessTechnology("Wi-Fi", "802.11"))
                    .addWirelessTechnology(new WirelessTechnology("Bluetooth", "4.2"))
                    .addWirelessTechnology(new WirelessTechnology("IrDA", ""))
                    .build(),
                new MobilePhoneBuilder(
                    "Gigabyte", "GSmart Roma R2",
                    new Dimensions(125, 63.2, 9.3), 120,
                    new Display(4, new Resolution(800, 480), MatrixType.IPS),
                    [SimCardFormat.FULL_SIZE, SimCardFormat.FULL_SIZE],
                    new RandomAccessMemory(1024, RandomAccessMemoryType.LPDDR3),
                    new InternalMemory(4096, InternalMemoryType.E_MMC_FOUR_FIVE),
                    new OperatingSystem("Android", "4.4")
                )
                    .setExternalMemorySlot(new ExternalMemorySlot(ExternalMemorySlotFormat.MICRO_SD, 32768))
                    .addCamera(new Camera(5, true)).addCamera(new Camera(0.3, false))
                    .addWirelessTechnology(new WirelessTechnology("Wi-Fi", "802.11"))
                    .addWirelessTechnology(new WirelessTechnology("Bluetooth", "3.0"))
                    .build(),
                new MobilePhoneBuilder(
                    "Samsung", "Galaxy Note 3",
                    new Dimensions(123.8, 58.6, 7.6), 112,
                    new Display(4, new Resolution(1136, 640), MatrixType.AMOLED),
                    [SimCardFormat.FULL_SIZE, SimCardFormat.FULL_SIZE],
                    new RandomAccessMemory(4096, RandomAccessMemoryType.LPDDR3),
                    new InternalMemory(32768, InternalMemoryType.E_MMC_FOUR_FIVE),
                    new OperatingSystem("Android", "4.4")
                )
                    .setExternalMemorySlot(new ExternalMemorySlot(ExternalMemorySlotFormat.MICRO_SD, 131072))
                    .addCamera(new Camera(16, true)).addCamera(new Camera(5, false))
                    .addWirelessTechnology(new WirelessTechnology("Wi-Fi", "802.11"))
                    .addWirelessTechnology(new WirelessTechnology("Bluetooth", "5.0"))
                    .addWirelessTechnology(new WirelessTechnology("NFC", ""))
                    .build(),
            ];

            console.log("1) Додавання мобільних телефонів до бази даних у кількості:", mobile_phones_to_insert.length);
            console.log("Кількість мобільних телефонів в базі даних до додавання:", (await mongodb_dao.getAllMobilePhones()).length);
            for (const mobile_phone of mobile_phones_to_insert) {
                console.log("Результат операції додавання:", await mongodb_dao.addMobilePhone(mobile_phone));
            }
            console.log("Кількість мобільних телефонів в базі даних після додавання:", (await mongodb_dao.getAllMobilePhones()).length);


            console.log();
            console.log();


            console.log("2) Отримання усіх мобільних телефонів з бази даних:");
            const mobile_phones = await mongodb_dao.getAllMobilePhones();
            console.log("Кількість отриманих телефонів:", mobile_phones.length);


            console.log();
            console.log();


            const mobile_phone_id_to_find = mobile_phones[generateNumberBetweenExclusive(0, mobile_phones.length)].id;

            console.log("3) Отримання мобільного телефону з ID =", mobile_phone_id_to_find);
            const found_mobile_phone = await mongodb_dao.getMobilePhoneById(mobile_phone_id_to_find);

            console.log("Отриманий мобільний телефон:", found_mobile_phone);


            console.log();
            console.log();


            const mobile_phone_before_changes = mobile_phones[generateNumberBetweenExclusive(0, mobile_phones.length)];
            const new_data_for_mobile_phone: Partial<Omit<MobilePhone, "id">> = {
                display: new Display(6.5, new Resolution(1920, 1080), MatrixType.AMOLED),
                sim_card_slots: [SimCardFormat.MICRO, SimCardFormat.NANO, SimCardFormat.EMBEDDED],
                operating_system: new OperatingSystem("iOS", "10.0")
            };

            console.log("4) Зміна параметрів мобільного телефону з ID =", mobile_phone_before_changes.id);
            console.log("Усі дані мобільного телефону до зміни:", mobile_phone_before_changes);

            console.log();

            console.log("Старі дані до зміни:", {
                display: mobile_phone_before_changes.display,
                sim_card_slots: mobile_phone_before_changes.sim_card_slots,
                operating_system: mobile_phone_before_changes.operating_system,
            });

            console.log();

            console.log("Нові дані, що змінюють старі:", new_data_for_mobile_phone);

            console.log();

            console.log("Результат операції оновлення:", await mongodb_dao.editMobilePhoneById(mobile_phone_before_changes.id, new_data_for_mobile_phone));

            console.log();

            const mobile_phone_after_changes = await mongodb_dao.getMobilePhoneById(mobile_phone_before_changes.id);
            console.log("Усі дані мобільного телефону після зміни:", mobile_phone_after_changes);


            console.log();
            console.log();


            const mobile_phone_id_to_delete = mobile_phones[generateNumberBetweenExclusive(0, mobile_phones.length)].id;
            console.log("5) Видалення мобільного телефону з ID =", mobile_phone_id_to_delete);
            console.log("Кількість мобільних телефонів в базі даних до видалення:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log("Результат операції видалення:", await mongodb_dao.deleteMobilePhoneById(mobile_phone_id_to_delete));
            console.log("Кількість мобільних телефонів в базі даних після видалення:", (await mongodb_dao.getAllMobilePhones()).length);
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log((e as Error));
        }
    } finally {
        await mongodb_dao?.release();
    }
}
