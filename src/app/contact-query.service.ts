import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactQueryService {


  
  constructor(private firestore: AngularFirestore) {}

  addContactMessage(messageData: any) {
    return this.firestore.collection('queryData').add(messageData);
  }
}

