import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, catchError } from 'rxjs/operators';
import { FoodItem } from './foodItem.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private orders: FoodItem[] = [];
  private orderSubject = new BehaviorSubject<FoodItem[]>(this.orders);

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  private handleError(error: any): void {
    console.error('Food Service Error:', error);
  }

  addOrder(order: FoodItem): void {
    this.orders.push(order);
    this.orderSubject.next(this.orders);
  }

  removeOrder(order: FoodItem): void {
    this.orders = this.orders.filter((o) => o !== order);
    this.orderSubject.next(this.orders);
  }

  getOrders(): Observable<FoodItem[]> {
    return this.orderSubject.asObservable();
  }

  setOrderDetails(details: FoodItem[]): void {
    this.orders = details;
    this.orderSubject.next(details);
  }

  getUserOrders(userId: string): Observable<FoodItem[]> {
    return this.firestore
      .collection('userOrders').doc(userId).collection('orders', ref => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as FoodItem;
          const id = a.payload.doc.id;
          return { id, ...data };
        })),
        catchError((error) => {
          console.error('Error fetching user orders:', error);
          throw error;
        })
      );
  }
  
  addFoodToCollection(food: FoodItem, collection: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore
        .collection(collection)
        .add(food)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((err) => {
          this.handleError(err);
          observer.error(err);
        });
    });
  }

  addMultipleFoodItemsToCollection(
    foodItems: FoodItem[],
    collection: string
  ): Observable<void> {
    const batch = this.firestore.firestore.batch();
    foodItems.forEach((item) => {
      const id = this.firestore.createId();
      const itemRef = this.firestore.collection(collection).doc(id).ref;
      batch.set(itemRef, { ...item, id });
    });

    return from(
      batch
        .commit()
        .then(() => {
          console.log(`All items added to ${collection} successfully.`);
        })
        .catch((error) => {
          this.handleError(error);
          throw error;
        })
    );
  }

  // Fetch starter food items from Firestore
  getStarterFoodItems(): Observable<FoodItem[]> {
    return this.firestore
      .collection<FoodItem>('starter-food-items')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as FoodItem;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        ),
        catchError((error) => {
          this.handleError(error);
          throw error;
        })
      );
  }

  // Fetch veg food items from Firestore
  getVegFoodItems(): Observable<FoodItem[]> {
    return this.firestore
      .collection<FoodItem>('veg-food-items')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as FoodItem;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        ),
        catchError((error) => {
          this.handleError(error);
          throw error;
        })
      );
  }

  // Fetch Nonveg food items from Firestore
  getNonVegFoodItems(): Observable<FoodItem[]> {
    return this.firestore
      .collection<FoodItem>('non-veg-food-items')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as FoodItem;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        ),
        catchError((error) => {
          this.handleError(error);
          throw error;
        })
      );
  }
}
