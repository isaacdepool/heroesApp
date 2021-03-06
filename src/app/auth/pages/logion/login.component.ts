import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logion',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( private router: Router,
               private authSvc: AuthService ) { }

  login(){

    // ir al back 
    // un usuario 

    this.authSvc.login()
      .subscribe( resp => {
        console.log(resp);
        
        if(resp.id){

          this.router.navigate(['./heroes']);
        }
      });


  }

}
