
import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {AlertController} from '@ionic/angular';

interface ContactData {
  contName: string;
  familyName: string;
  contNumber: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  contactList = [];
  contactData: ContactData;
  contactForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder, public alertCtrl: AlertController
  ) {
    this.contactData = {} as ContactData;
  }

  ngOnInit() {

    this.contactForm = this.fb.group({
      contName: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      contNumber: ['', [Validators.required]]
    })

    this.firebaseService.read_contact().subscribe(data => {

      this.contactList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          contName: e.payload.doc.data()['contName'],
          familyName: e.payload.doc.data()['familyName'],
          contNumber: e.payload.doc.data()['contNumber'],
        };
      })
      console.log(this.contactList);

    });
  }

  CreateContact() {
    console.log(this.contactForm.value);
    this.firebaseService.create_contact(this.contactForm.value).then(resp => {
      this.contactForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

 async RemoveContact(rowID) {
    
      let prompt=await this.alertCtrl.create({
        header:'Are you sure you want to delete this contact?',
        buttons:[
          {
            text:'No',
            role:'cancel',
            handler:()=>{
              console.log('No');
            }
          },
          {
            text:'Yes',
            cssClass:'warning',
            handler:()=>{
              this.firebaseService.delete_contact(rowID);
              }
            },
            
          
         
        ]
    
      });
      prompt.present();
  }

 

 
  

}