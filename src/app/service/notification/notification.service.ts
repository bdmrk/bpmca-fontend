import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<any>();

  constructor() { }

  sendNotification(message: string) {
    this.subject.next({ notification: message });
}

  getNotification(): Observable<any> {
    return this.subject.asObservable();
  }
}
