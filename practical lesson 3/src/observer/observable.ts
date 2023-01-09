import { Observer } from "./observer";

export interface Observable {
    addObserver(event_name: string, observer: Observer, method: (...args: any[]) => any): void;
    removeObserver(event_name: string, observer: Observer, method: (...args: any[]) => any): void;
    notify(event_name: string, ...args: any[]): void;
}