import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private orderCountSource = new BehaviorSubject<number>(0);
  currentOrderCount = this.orderCountSource.asObservable();

  constructor() {}

  changeOrderCount(count: number) {
    this.orderCountSource.next(count);
  }
}
