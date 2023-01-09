import { Observable } from "./observable";

export interface Observer {
    observe(observable: Observable, event_name: string, method: (...args: any[]) => void): void;
    stop_observing(observable: Observable, event_name: string, method: (...args: any[]) => void): void;
}