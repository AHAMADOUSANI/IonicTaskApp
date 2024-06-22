import { Component } from '@angular/core';
import { AuthenticationService } from 'shared/authentication-service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage  {

  constructor(
    public authService: AuthenticationService
  ) { }

 

}
