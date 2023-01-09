import { Observable } from "../../observer/observable";
import { Observer } from "../../observer/observer";
import { IDAO } from "../idao/dao";
import { MobilePhone } from "../idao/entities/mobile-phone";

export class DAOObserver implements Observer {
    observe(observable: IDAO, event_name: "mobile_phone_added" | "mobile_phone_edited" | "mobile_phone_removed", method: (...args: any[]) => void): void {
        observable.addObserver(event_name, this, method);
    }

    stop_observing(observable: IDAO, event_name: "mobile_phone_added" | "mobile_phone_edited" | "mobile_phone_removed", method: (...args: any[]) => void): void {
        observable.removeObserver(event_name, this, method);
    }

    onMobilePhoneAdded(mobile_phone: MobilePhone) {
        console.log("До бази даних було додано мобільний телефон:", mobile_phone);
    }

    onMobilePhoneEdited(mobile_phone_before_changes: MobilePhone, mobile_phone_after_changes: MobilePhone) {
        console.log("У базі даних було оновлено мобільний телефон:");
        console.log("Старі дані:", mobile_phone_before_changes);
        console.log("Нові дані:", mobile_phone_after_changes);
    }

    onMobilePhoneRemoved(mobile_phone: MobilePhone) {
        console.log("З бази даних було видалено мобільний телефон:", mobile_phone);
    }
}