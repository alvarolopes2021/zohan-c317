import { Injectable } from '@angular/core';
import { faFileSignature, faEnvelope, faPhone, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconServiceService {

  constructor() { }

  getIcons() : Map<string, any>{
    const icons = new Map<string, any>();

    icons.set("faFileSignature", faFileSignature);
    icons.set("faEnvelope", faEnvelope);
    icons.set("faPhone", faPhone);
    icons.set("faLock", faLock);
    icons.set("faCheck", faCheck);

    return icons;
  }
}
