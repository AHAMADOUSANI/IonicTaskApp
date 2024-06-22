import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordResetdPageRoutingModule } from './password-resetd-routing.module';

import { PasswordResetdPage } from './password-resetd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordResetdPageRoutingModule
  ],
  declarations: [PasswordResetdPage]
})
export class PasswordResetdPageModule {}
