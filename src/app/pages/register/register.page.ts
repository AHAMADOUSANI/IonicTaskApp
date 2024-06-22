import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'shared/authentication-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

 

  signUp(email:any, password:any){
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}
