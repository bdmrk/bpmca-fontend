import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCommunicationService {
// get item count start
private itemCounter = new BehaviorSubject<string>('');
getItemCounter = this.itemCounter.asObservable();
private clearBasketItem = new BehaviorSubject<string>('');
clearBasket = this.clearBasketItem.asObservable();
public passedItemData = new BehaviorSubject<any>('');
getPassedItemData = this.passedItemData.asObservable();

public headerData = new Subject;
getheaderData = this.headerData.asObservable();

  constructor() { }

  itemAddToCart() {
    this.itemCounter.next('');
  }
  setBasketClear(data){
    this.clearBasketItem.next(data);
  }
  setPassedItemData(data){
    this.passedItemData.next(data);
  }
  setHeaderData(data){
    this.headerData.next(data);
  }
}
