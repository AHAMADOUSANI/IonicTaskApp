import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvenementPageRoutingModule } from './evenement-routing.module';

import { EvenementPage } from './evenement.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvenementPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [EvenementPage]
})
export class EvenementPageModule {}
