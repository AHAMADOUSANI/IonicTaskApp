import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage  {
  title!: string;
  imageURL!: string;
  decsription!: string;
  start!: string;
  end!: string;

  constructor(
    public modalController: ModalController,
  public navParams: NavParams
  ) { this.title = navParams.get('title');
  this.imageURL = navParams.get('imageURL');
  this.decsription = navParams.get('description');
  this.start = formatDate(navParams.get('startTime'), 'medium', 'fr-FR');
  this.end = formatDate(navParams.get('endTime'), 'medium', 'fr-FR');
}
close() {
  this.modalController.dismiss();
}
}

  


