import { Component} from '@angular/core';
import { AuthenticationService } from 'shared/authentication-service';
@Component({
  selector: 'app-password-resetd',
  templateUrl: './password-resetd.page.html',
  styleUrls: ['./password-resetd.page.scss'],
})
export class PasswordResetdPage  {

  constructor(public authService: AuthenticationService) {}

  

}
