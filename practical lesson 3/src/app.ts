import util from "util";

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

            console.log("1) Додамо мобільні телефони до бази даних.");
            console.log("Кількість мобільних телефонів в базі даних до додавання:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log("Додавання мобільних телефонів до бази даних у кількості:", mobile_phones_to_insert.length);
            console.log();
            for (const mobile_phone of mobile_phones_to_insert) {
                console.log("Результат операції додавання:", await mongodb_dao.addMobilePhone(mobile_phone));
                console.log();
            }
            console.log("Кількість мобільних телефонів в базі даних після додавання:", (await mongodb_dao.getAllMobilePhones()).length);


            console.log();
            console.log();


            console.log("2) Отримаємо усі мобільні телефони з бази даних.");
            const mobile_phones = await mongodb_dao.getAllMobilePhones();

            console.log("Кількість отриманих телефонів:", mobile_phones.length);


            console.log();
            console.log();


            console.log("3) Оберемо випадковий мобільний телефон та почнемо перевіряти працездатність патерну Memento, змінюючи дані мобільного телефону та скасовуючи ці зміни.");
            console.log();

            const mobile_phone = mobile_phones[generateNumberBetweenExclusive(0, mobile_phones.length)];

            console.log("Початковий стан мобільного телефону:", mobile_phone);
            console.log();

            console.log("Змінимо виробника та модель (2 зміни).");
            console.log("Виробник та модель до зміни:", mobile_phone.manufacturer, mobile_phone.model);
            console.log();

            mobile_phone.manufacturer = "Lenovo";
            mobile_phone.model = "A516";

            console.log("Виробник та модель після зміни:", mobile_phone.manufacturer, mobile_phone.model);
            console.log();

            console.log("Скасуємо останню зміну, тобто скасуємо зміну моделі.");
            mobile_phone.cancel_changes();
            console.log("Виробник та модель після скасування останної зміни:", mobile_phone.manufacturer, mobile_phone.model);
            console.log();

            console.log("Видалимо останню камеру з мобільного телефону, якщо вона є (1 зміна).");
            console.log("Додамо 2 камери до мобільного телефону (2 зміни).");
            console.log("Змінимо перелік бездротових технологій (1 зміна).");

            console.log("Камери до зміни:", mobile_phone.cameras);
            console.log("Бездротові технології до зміни:", mobile_phone.wireless_technologies);
            console.log();

            if (mobile_phone.cameras) {
                mobile_phone.removeCamera(mobile_phone.cameras.length - 1);
            }
            mobile_phone.addCamera(new Camera(48, true));
            mobile_phone.addCamera(new Camera(24, false));
            mobile_phone.wireless_technologies = [
                new WirelessTechnology("Bluetooth", "6.0"),
                new WirelessTechnology("IrDA", "")
            ];

            console.log("Камери після зміни:", mobile_phone.cameras);
            console.log("Бездротові технології після зміни:", mobile_phone.wireless_technologies);
            console.log();

            console.log("Скасуємо останні 2 зміни, тобто повернемо старий перелік бездротових технлогій та видалемо камеру, що була додана останньою.");
            mobile_phone.cancel_changes();
            mobile_phone.cancel_changes();
            console.log("Камери після скасування 2 останніх змін:", mobile_phone.cameras);
            console.log("Бездротові технології після скасування 2 останніх змін:", mobile_phone.wireless_technologies);
            console.log();
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log((e as Error));
        }
    } finally {
        await mongodb_dao?.release();
    }
}
