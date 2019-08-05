import { Injectable } from '@angular/core';
import { GroceriesService } from '../api/groceries.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertController: AlertController, public dataService: GroceriesService) { }

  async showPrompt(item?, index?) {
    let ID;
    if (item !== undefined) {
      console.log('item is defined');
      ID = item._id;
    } else {
      ID = null;
    }
    const alert = await this.alertController.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please Edit Item...' : 'Please Enter Item...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          min: '1',
          max: '20',
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          // tslint:disable-next-line: no-shadowed-variable
          handler: item => {
            console.log('Confirm Save');
            console.log('handler.... ' + item.id);
            console.log('handler...' + item.name);
            console.log('handler....ID ' + ID);
            if (index !== undefined) {
              item.id = ID;
              this.dataService.editItem(item, index);
            } else {
              // item._id = null;
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
