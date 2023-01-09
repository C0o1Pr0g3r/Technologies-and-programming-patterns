import { DAOFactory } from "./dao/dao-factory.js";
import { DAOType } from "./dao/dao-type.js";
import { MobilePhoneBuilder } from "./builders/mobile-phone.js";
import { Camera } from "./dao/idao/entities/camera.js";
import { Display, MatrixType, Resolution } from "./dao/idao/entities/display.js";
import { ExternalMemorySlot, ExternalMemorySlotFormat, InternalMemory, InternalMemoryType, RandomAccessMemory, RandomAccessMemoryType } from "./dao/idao/entities/memory.js";
import { Dimensions, MobilePhone } from "./dao/idao/entities/mobile-phone.js";
import { OperatingSystem } from "./dao/idao/entities/operating-system.js";
import { SimCardFormat } from "./dao/idao/entities/sim-card.js";
import { WirelessTechnology } from "./dao/idao/entities/wireless-technology.js";
import { generateNumberBetweenExclusive } from "./helper.js";
import { DAOObserver } from "./dao/mongodb-dao/dao-observer.js";
import { Observable } from "./observer/observable.js";

const mongodb_dao = DAOFactory.getDAOInstance(DAOType.MongoDB);
const mongodb_dao_observer = new DAOObserver();

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
                new MobilePhoneBuilder(
                    "Apple", "iPhone 11",
                    new Dimensions(150.9, 75.7, 8.3), 194,
                    new Display(6.1, new Resolution(1792, 828), MatrixType.IPS),
                    [SimCardFormat.NANO],
                    new RandomAccessMemory(4096, RandomAccessMemoryType.LPDDR4x),
                    new InternalMemory(131072, InternalMemoryType.E_MMC_FOUR_FIVE),
                    new OperatingSystem("iOS", "16.2")
                )
                    .addCamera(new Camera(16, true)).addCamera(new Camera(12, false)).addCamera(new Camera(8, false))
                    .addWirelessTechnology(new WirelessTechnology("Wi-Fi", "802.11"))
                    .addWirelessTechnology(new WirelessTechnology("Bluetooth", "5.0"))
                    .addWirelessTechnology(new WirelessTechnology("NFC", ""))
                    .addWirelessTechnology(new WirelessTechnology("Wireless charger", ""))
                    .build()
            ];

            console.log("1) Зробимо так, щоб об'єкт 'mongodb_dao_observer' спостерігав за усіма операціями об'єкта 'mongodb_dao', тобто за операціями додавання, оновлення та видалення.");

            mongodb_dao_observer.observe(mongodb_dao, "mobile_phone_added", mongodb_dao_observer.onMobilePhoneAdded);
            mongodb_dao_observer.observe(mongodb_dao, "mobile_phone_edited", mongodb_dao_observer.onMobilePhoneEdited);
            mongodb_dao_observer.observe(mongodb_dao, "mobile_phone_removed", mongodb_dao_observer.onMobilePhoneRemoved);


            console.log();
            console.log();


            console.log("2) Перевіримо працездатність обробників подій додавання.");

            const first_part_of_mobile_phones_to_insert = mobile_phones_to_insert.slice(0, mobile_phones_to_insert.length / 3);

            console.log("Кількість мобільних телефонів в базі даних до додавання:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log("Додавання мобільних телефонів до бази даних у кількості:", first_part_of_mobile_phones_to_insert.length);
            console.log();
            for (const mobile_phone of first_part_of_mobile_phones_to_insert) {
                console.log("Результат операції додавання:", await mongodb_dao.addMobilePhone(mobile_phone));
                console.log();
            }
            console.log("Кількість мобільних телефонів в базі даних після додавання:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log();
            console.log("Як бачимо, обробник подій додавання об'єкта 'mongodb_dao_observer' успішно відпрацював.");


            console.log();
            console.log();


            console.log("3) Видалимо обробник подій додавання об'єкта 'mongodb_dao_observer' та додамо до бази даних ще кілька телефонів.");

            mongodb_dao_observer.stop_observing(mongodb_dao, "mobile_phone_added", mongodb_dao_observer.onMobilePhoneAdded);

            const second_part_of_mobile_phones_to_insert = mobile_phones_to_insert.slice(mobile_phones_to_insert.length / 3, mobile_phones_to_insert.length);

            console.log("Кількість мобільних телефонів в базі даних до додавання:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log("Додавання мобільних телефонів до бази даних у кількості:", second_part_of_mobile_phones_to_insert.length);
            for (const mobile_phone of second_part_of_mobile_phones_to_insert) {
                console.log("Результат операції додавання:", await mongodb_dao.addMobilePhone(mobile_phone));
            }
            console.log("Кількість мобільних телефонів в базі даних після додавання:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log();
            console.log("Як бачимо, обробник подій додавання об'єкта 'mongodb_dao_observer' більше не працює.");


            console.log();
            console.log();


            console.log("4) Перевіримо працездатність обробників подій оновлення.");

            const mobile_phones = await mongodb_dao.getAllMobilePhones();

            const mobile_phone_to_edit = mobile_phones[generateNumberBetweenExclusive(0, mobile_phones.length)];
            const new_data_for_mobile_phone: Partial<Omit<MobilePhone, "id">> = {
                manufacturer: "LG", model: "G8",
                sim_card_slots: [SimCardFormat.EMBEDDED],
                cameras: [
                    new Camera(12, true),
                    new Camera(12, false),
                    new Camera(16, true),
                ],
                wireless_technologies: [
                    new WirelessTechnology("Wi-Fi", "802.11"),
                    new WirelessTechnology("Bluetooth", "5.0"),
                    new WirelessTechnology("IrDA", "")
                ]
            };

            console.log("Зміна параметрів мобільного телефону з ID =", mobile_phone_to_edit.id);

            console.log();

            console.log("Старі дані до зміни: ", {
                manufacturer: mobile_phone_to_edit.manufacturer,
                model: mobile_phone_to_edit.model,
                sim_card_slots: mobile_phone_to_edit.sim_card_slots,
                cameras: mobile_phone_to_edit.cameras,
                wireless_technologies: mobile_phone_to_edit.wireless_technologies,
            });

            console.log();

            console.log("Нові дані, що змінюють старі: ", new_data_for_mobile_phone);

            console.log();

            console.log("Результат операції оновлення:", await mongodb_dao.editMobilePhoneById(mobile_phone_to_edit.id, new_data_for_mobile_phone));
            console.log();
            console.log("Як бачимо, обробник подій оновлення об'єкта 'mongodb_dao_observer' успішно відпрацював.");


            console.log();
            console.log();


            console.log("5) Створимо анонімний об'єкт, який буде обробляти подію видалення мобільного телефона з бази даних.");

            const object_that_observes_the_removal = {
                observe(observable: Observable, event_name: string, method: (...args: any[]) => void): void { return; },
                stop_observing(observable: Observable, event_name: string, method: (...args: any[]) => void): void { return; },
                onMobilePhoneRemoved(mobile_phone: MobilePhone) {
                    console.log("Анонімний об'єкт відстежив подію видалення. ID мобільного телефона, що був видалений:", mobile_phone.id);
                }
            };

            mongodb_dao.addObserver("mobile_phone_removed", object_that_observes_the_removal, object_that_observes_the_removal.onMobilePhoneRemoved);


            console.log();
            console.log();


            console.log("6) Перевіримо працездатність обробників подій видалення.");

            const mobile_phone_id_to_delete = mobile_phones[generateNumberBetweenExclusive(0, mobile_phones.length)].id;
            console.log("Кількість мобільних телефонів в базі даних до видалення:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log("Видалення мобільного телефону з ID =", mobile_phone_id_to_delete);
            console.log();
            console.log("Результат операції видалення:", await mongodb_dao.deleteMobilePhoneById(mobile_phone_id_to_delete));
            console.log();
            console.log("Кількість мобільних телефонів в базі даних після видалення:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log();
            console.log("Як бачимо, відпрацювало 2 обробника подій видалення: 1-ий — обробник об'єкта 'mongodb_dao_observer', 2-ий — обробник анонімного об'єкта.");
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log((e as Error));
        }
    } finally {
        await mongodb_dao?.release();
    }
}
