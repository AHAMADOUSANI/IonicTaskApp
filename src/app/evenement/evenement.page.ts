import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar';



@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.page.html',
  styleUrls: ['./evenement.page.scss'],
})
export class EvenementPage  implements OnInit {
  allEvents=[];
  allEvent: {
    Title: string;
    description: string;
    img: string;
    startTime: Date;
    endTime: Date;
  }[] = [];
  showAddEvent?:boolean;
  myData=[
    {
      title:"My first Event",
      description:"My first Description",
      startTime:"new Date(2024,03,07,10,02,01)",
      endTime:"new Date(2024,07,07,12,11,5)",
      img:"https://picsum.photos"
    },
    {
      title:"My first Event",
      description:"My first Description",
      startTime:"new Date(2024,03,07,10,02,01)",
      endTime:"new Date(2024,07,07,12,11,5)",
      img:"https://picsum.photos"
    }
  ];

  ngOnInit() {
    this.allEvents==this.myData;
  }
  currentMonth: string="";
  calendar={
    mode:'month' as CalendarMode,
    currentDate:new Date()
  }
  newEvent={
    title:'',
    description:'',
    startTime:'',
    endTime:'',
    img:''
  }
  @ViewChild(CalendarComponent,  { static: false }) myCal!:CalendarComponent;

  onViewTitleChanged(title: string) {
    this.currentMonth = title;
  }
  onEventSelected(ev:any){
this.newEvent=ev;
  }
  back(){
    this.myCal.slidePrev();
    
  }
  next(){
    this.myCal.slideNext();
  }

  showHideForm(){
this.showAddEvent=!this.showAddEvent;
this.newEvent={
  title:'',
  description:'',
  img:'',
  startTime:new Date().toISOString(),
  endTime:new Date().toISOString()
}
  }
  today(){
    this.calendar.currentDate= new Date(2024,7,3);
  }
  changeMode(mode:any){
    this.calendar.mode= mode;
  }
  addEvent(){
    this.allEvent.push({
      Title:this.newEvent.title,
      description: this.newEvent.description,
      img:this.newEvent.img,
      startTime: new Date(this.newEvent.startTime),
      endTime: new Date(this.newEvent.endTime),
    });
  }
}
