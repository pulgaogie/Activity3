
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Contacts';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_contact(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_contact() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }


  delete_contact(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
