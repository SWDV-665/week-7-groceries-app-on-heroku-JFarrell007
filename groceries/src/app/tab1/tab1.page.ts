import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { GroceriesService } from '../api/groceries.service';
import { InputDialogService } from '../dialog/input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'Grocery List';
  items = [];
  errorMessage: string;

  // tslint:disable-next-line: max-line-length
  constructor(public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesService, public inputDialogService: InputDialogService, public socialSharing: SocialSharing ) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
      window.location.reload();
    });
  }
  /*ionViewDidLoad() {
    this.loadItems();
    console.log('ionViewDidLoad()');
  }*/
  ionViewDidEnter() {
    this.loadItems();
    console.log('ionViewDidEnter');
  }
  /*ionViewWillEnter() {
    this.loadItems();
    console.log('ionViewWillEnter()');
  }*/
  loadItems() {
    console.log('loadItems() has been called....');
    this.dataService.getItems()
    .subscribe(
      items => this.items = items,
      error => this.errorMessage = error as any);
  }
  async removeItem(item, index) {
    console.log('Removing Item - ', index);
    const toast = await this.toastController.create({
      message: 'Removing Item – ' + index + '...',
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(item._id);
  }
  async shareItem(item, index) {
    console.log('Sharing Item - ', index);
    const toast = await this.toastController.create({
      message: 'Sharing Item – ' + index + '...',
      duration: 3000
    });
    toast.present();
    const message = 'Grocery Item - Name: ' + item.name + ' - Quantity: ' + item.quantity;
    const subject = 'Shared via Groceries app';
    this.socialSharing.share(message, subject).then(() => {
      console.log('Shared successfully!');
    }).catch((error) => {
      console.error('Error while sharing', error);
    });
  }

  async editItem(item, index) {
    console.log('Editing Item - ', index);
    const toast = await this.toastController.create({
      message: 'Editing Item – ' + index + '...',
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  async addItem() {
    console.log('Adding item');
    this.inputDialogService.showPrompt();
  }
}
