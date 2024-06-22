import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordResetdPage } from './password-resetd.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordResetdPageRoutingModule {}
