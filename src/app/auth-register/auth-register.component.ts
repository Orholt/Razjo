import { Component, OnInit } from '@angular/core';
import { RegisterHandlerService } from './register-handler.service';
import { User } from './User';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {

  data$;
  valuechanges;
  userData: User;
  constructor(private regHandler: RegisterHandlerService) { }

  email;
  name ;
  surname ;
  pass ;


  ngOnInit(): void {
    this.email = document.getElementById('email') as HTMLInputElement;
    this.name = document.getElementById('name') as HTMLInputElement;
    this.surname = document.getElementById('surname') as HTMLInputElement;
    this.pass = document.getElementById('password') as HTMLInputElement;
  }

  createUser()
  {
    this.userData = {
      email: this.email.value,
      password: this.pass.value,
      role: 'USR'
    };
    this.createUserPost();
  }

  // Adding User
  createUserPost()
  {
    this.regHandler.addUser(this.userData).subscribe({
      next: data => {
          this.data$ = data;
          // console.log(data);
      },
      error: error => {
          console.error('Wystąpił błąd!', error);
      }
  });
  }
}
