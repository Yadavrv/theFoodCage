import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firestore: AngularFirestore) { }

  addReservation(reservationData: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('reservationData').doc(id).set(reservationData);
  }

  getReservations(): Observable<any[]> {
    return this.firestore.collection('reservationData').valueChanges();
  }
}
