import { Injectable } from "@angular/core";
import * as dayjs from "dayjs";

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    static setInLocalStorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    static getFromLocalStorage(key: string) {
        return localStorage.getItem(key);
    }

    static removeFromLocalStorage(key: string) : void{
        localStorage.removeItem(key);
    }

    static createTokenDate(expires: number) {
        return dayjs().add(expires, 'second');
    }

}