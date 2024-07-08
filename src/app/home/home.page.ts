import { Component,ViewChild} from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { EventPage } from '../event/event.page';
import { ModalController } from '@ionic/angular';

interface Event {
  title: string;
  startTime: Date;
  endTime: Date;
  description: string;
  imageURL: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage  {
  currentDate = new Date();
  currentMonth: string="";
  showAddEvent!: boolean;
  minDate = new Date().toISOString();
  allEvents: Event[] = [];
  
  @ViewChild(CalendarComponent,  { static: false }) myCal!:CalendarComponent;

  newEvent = {
    title: '',
    description: '',
    imageURL: '',
    startTime: '',
    endTime: ''
  };
  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    this.newEvent = {
      title: '',
      description: '',
      imageURL: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
  }
  
  onViewTitleChanged(title: string) {
    this.currentMonth = title;
  }
  addEvent() {
    this.afDB.list('Events').push({
      title: this.newEvent.title,
      imageURL: this.newEvent.imageURL,
      startTime:  this.newEvent.startTime,
      endTime: this.newEvent.endTime,
      description: this.newEvent.description
    });
    this.showHideForm();
  }
  onTimeSelected(ev: any) {
    const selected = new Date(ev.selectedTime);
    this.newEvent.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.newEvent.endTime = (selected.toISOString());
   }
    

  constructor(
    public afDB: AngularFireDatabase,
    public modalController: ModalController,
  ) {
    this.loadEvent();
  }

  loadEvent() {
    
    this.afDB.list('Events').snapshotChanges(['child_added']).subscribe(actions => {
      this.allEvents = [];
      actions.forEach(action => {
        console.log('action: ' + action.payload.exportVal().title);
        this.allEvents.push({
          title: action.payload.exportVal().title,
          startTime:  new Date(action.payload.exportVal().startTime),
          endTime: new Date(action.payload.exportVal().endTime),
          description: action.payload.exportVal().description,
          imageURL: action.payload.exportVal().imageURL
        });
        this.myCal.loadEvents();
      });
    });
  }
  async onEventSelected(event: any) {
    console.log('Event: ' + JSON.stringify(event));
    const modal = await this.modalController.create({
      component: EventPage,
      componentProps: event
    });
    return await modal.present();
  }

}
