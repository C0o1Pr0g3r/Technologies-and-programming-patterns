import { DAOFactory } from "./dao/dao-factory.js";
import { DAOType } from "./dao/dao-type.js";
import { MobilePhoneBuilder } from "./dao/idao/builders/mobile-phone.js";
import { Camera } from "./dao/idao/entities/camera.js";
import { Display, MatrixType, Resolution } from "./dao/idao/entities/display.js";
import { ExternalMemorySlot, ExternalMemorySlotFormat, InternalMemory, InternalMemoryType, RandomAccessMemory, RandomAccessMemoryType } from "./dao/idao/entities/memory.js";
import { Dimensions, MobilePhone } from "./dao/idao/entities/mobile-phone.js";
import { OperatingSystem } from "./dao/idao/entities/operating-system.js";
import { Role } from "./dao/idao/entities/role.js";
import { SimCardFormat } from "./dao/idao/entities/sim-card.js";
import { User } from "./dao/idao/entities/user.js";
import { WirelessTechnology } from "./dao/idao/entities/wireless-technology.js";
import { DAOProxy } from "./dao/proxy/dao.js";
import { generateNumberBetweenExclusive } from "./helper.js";

const mongodb_dao = DAOFactory.getDAOInstance(DAOType.MongoDB);
const dao_proxy = new DAOProxy();

const MOBILE_PHONES_TO_INSERT = [
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

const ROLES_TO_INSERT = [
    new Role("Admin"),
    new Role("User"),
];

const USERS_TO_INSERT: (Pick<User, "login" | "password"> & { role_name: string })[] = [
    {
        login: "misha",
        password: "qwerty",
        role_name: ROLES_TO_INSERT[0].name
    },
    {
        login: "alexey",
        password: "123456",
        role_name: ROLES_TO_INSERT[1].name
    },
    {
        login: "petya",
        password: "789012",
        role_name: ROLES_TO_INSERT[1].name
    },
    {
        login: "grisha",
        password: "][poiu",
        role_name: ROLES_TO_INSERT[0].name
    },
    {
        login: "dasha",
        password: "asdfgh",
        role_name: ROLES_TO_INSERT[1].name
    },
];

main();

async function main() {
    try {
        if (mongodb_dao) {
            await mongodb_dao.init();
            await dao_proxy.init();

            console.log("1) Спочатку за допомогою звичайного 'DAO' додамо до бази даних ролі, користувачів та мобільні телефони.");

            console.log();
            console.log();

            console.log("Кількість ролей в базі даних до додавання:", (await mongodb_dao.getAllRoles()).length);
            console.log("Кількість користувачів в базі даних до додавання:", (await mongodb_dao.getAllUsers()).length);
            console.log("Кількість мобільних телефонів в базі даних до додавання:", (await mongodb_dao.getAllMobilePhones()).length);
            console.log();

            for (const role of ROLES_TO_INSERT) {
                console.log("Результат операції додавання ролі:", await mongodb_dao.addRole(role));
            }
            console.log();

            const roles = await mongodb_dao.getAllRoles();

            for (const user of USERS_TO_INSERT) {
                const role = roles.find(role => role.name === user.role_name);
                if (role) {
                    console.log("Результат операції додавання користувача:", await mongodb_dao.addUser(new User(user.login, user.password, role.id)));

                }
            }
            console.log();

            for (const mobile_phone of MOBILE_PHONES_TO_INSERT) {
                console.log("Результат операції додавання мобільного телефону:", await mongodb_dao.addMobilePhone(mobile_phone));
            }
            console.log();

            const users = await mongodb_dao.getAllUsers();
            const mobile_phones = await mongodb_dao.getAllMobilePhones();

            console.log("Кількість ролей в базі даних після додавання:", roles.length);
            console.log("Кількість користувачів в базі даних після додавання:", users.length);
            console.log("Кількість мобільних телефонів в базі даних після додавання:", mobile_phones.length);


            console.log();
            console.log();
            console.log();


            console.log("2) Перевіримо працездатність проксі для 'DAO'.");

            console.log();
            console.log();

            console.log("2.1) Залогінимося за допомогою даних неіснуючого користувача та спробуємо отримати дані про ролі.");
            console.log("Результат операції авторизації:", await dao_proxy.login("vasya", "vasya"));
            console.log();
            console.log();

            console.log("2.1.1) Спроба отримати дані про ролі.");

            try {
                const roles = await dao_proxy.getAllRoles();
                console.log("Інформація про ролі була успішно отримана. Кількість ролей у базі даних:", roles.length);
            } catch (e) {
                if (e instanceof Error) {
                    console.log("Помилка!", e.message);
                }
            }


            console.log();
            console.log();


            console.log("2.2) Залогінимося за допомогою даних звичайного користувача та спробуємо виконати операції з базою даних.");
            const user_to_login = USERS_TO_INSERT.find(user => user.role_name === ROLES_TO_INSERT[1].name);
            if (user_to_login) {
                console.log("Результат операції авторизації:", await dao_proxy.login(user_to_login.login, user_to_login.password));
                console.log();
                console.log();

                console.log("2.2.1) Спроба отримати дані про користувачів.");

                try {
                    const users = await dao_proxy.getAllUsers();
                    console.log("Інформація про користувачів була успішно отримана. Кількість користувачів у базі даних:", users.length);
                } catch (e) {
                    if (e instanceof Error) {
                        console.log("Помилка!", e.message);
                    }
                }

                console.log();
                console.log();

                console.log("2.2.2) Спроба додати користувача до бази даних.");

                try {
                    console.log("Результат операції додавання користувача:",
                        await dao_proxy.addUser(
                            new User("natasha", "13579", roles[generateNumberBetweenExclusive(0, roles.length)].id)
                        )
                    );
                } catch (e) {
                    if (e instanceof Error) {
                        console.log("Помилка!", e.message);
                    }
                }


                console.log();
                console.log();
            }

            console.log("2.3) Залогінимося за допомогою даних адміністратора та спробуємо виконати операції з базою даних.");
            const admin_to_login = USERS_TO_INSERT.find(user => user.role_name === ROLES_TO_INSERT[0].name);
            if (admin_to_login) {
                console.log("Результат операції авторизації:", await dao_proxy.login(admin_to_login.login, admin_to_login.password));
                console.log();
                console.log();

                console.log("2.3.1) Спроба отримати дані про мобільні телефони.");

                try {
                    const mobile_phones = await dao_proxy.getAllMobilePhones();
                    console.log("Інформація про мобільні телефони була успішно отримана. Кількість мобільних телефонів у базі даних:", mobile_phones.length);
                } catch (e) {
                    if (e instanceof Error) {
                        console.log("Помилка!", e.message);
                    }
                }

                console.log();
                console.log();

                console.log("2.3.2) Спроба додати користувача до бази даних.");

                try {
                    console.log("Результат операції додавання користувача:",
                        await dao_proxy.addUser(
                            new User("alina", "zxcvbn", roles[generateNumberBetweenExclusive(0, roles.length)].id)
                        )
                    );
                } catch (e) {
                    if (e instanceof Error) {
                        console.log("Помилка!", e.message);
                    }
                }

                console.log();
                console.log();

                console.log("2.3.3) Спроба оновити мобільний телефон у базі даних.");

                const mobile_phone_before_changes = mobile_phones[generateNumberBetweenExclusive(0, mobile_phones.length)];
                const new_data_for_mobile_phone: Partial<Omit<MobilePhone, "id">> = {
                    manufacturer: "Nokia",
                    display: new Display(6.5, new Resolution(1920, 1080), MatrixType.AMOLED),
                    sim_card_slots: [SimCardFormat.MICRO, SimCardFormat.NANO, SimCardFormat.EMBEDDED],
                    operating_system: new OperatingSystem("Windows Phone", "8.1"),
                    cameras: [new Camera(3.2, true), new Camera(0.3, false)],
                };

                console.log("Зміна параметрів мобільного телефону з ID =", mobile_phone_before_changes.id);
                console.log();

                console.log("Усі дані мобільного телефону до зміни:", mobile_phone_before_changes);
                console.log();

                console.log("Старі дані до зміни:", {
                    manufacturer: mobile_phone_before_changes.manufacturer,
                    display: mobile_phone_before_changes.display,
                    sim_card_slots: mobile_phone_before_changes.sim_card_slots,
                    operating_system: mobile_phone_before_changes.operating_system,
                    cameras: mobile_phone_before_changes.cameras,
                });
                console.log();

                console.log("Нові дані, що змінюють старі:", new_data_for_mobile_phone);
                console.log();

                try {
                    console.log("Результат операції оновлення мобільного телефону:", await dao_proxy.editMobilePhoneById(mobile_phone_before_changes.id, new_data_for_mobile_phone));
                    console.log();
                    console.log("Усі дані мобільного телефону після зміни:", await dao_proxy.getMobilePhoneById(mobile_phone_before_changes.id));
                } catch (e) {
                    if (e instanceof Error) {
                        console.log("Помилка!", e.message);
                    }
                }

                console.log();
                console.log();

                console.log("2.3.4) Спроба видалити користувача з бази даних.");

                const user_to_delete = users[generateNumberBetweenExclusive(0, users.length)];

                const mobile_phone_id_to_delete = mobile_phones[generateNumberBetweenExclusive(0, mobile_phones.length)].id;
                console.log("Видалення користувача з ID =", user_to_delete.id);
                console.log("Кількість користувачів в базі даних до видалення:", (await mongodb_dao.getAllUsers()).length);
                console.log();

                try {
                    console.log("Результат операції видалення користувача:", await mongodb_dao.deleteUserById(user_to_delete.id));
                } catch (e) {
                    if (e instanceof Error) {
                        console.log("Помилка!", e.message);
                    }
                }
                console.log();

                console.log("Кількість користувачів в базі даних після видалення:", (await mongodb_dao.getAllUsers()).length);
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log((e as Error));
        }
    } finally {
        await mongodb_dao?.release();
    }
}