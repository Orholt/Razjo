import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  overlay;
  constructor(private regHandler: RegisterHandlerService, private router: Router) { }

  email;
  name ;
  surname ;
  pass ;
  radio: HTMLInputElement;
  defRole = 'USR';


  ngOnInit(): void {
    this.email = document.getElementById('email') as HTMLInputElement;
    this.name = document.getElementById('name') as HTMLInputElement;
    this.surname = document.getElementById('surname') as HTMLInputElement;
    this.pass = document.getElementById('password') as HTMLInputElement;
    this.radio = document.getElementById('usr') as HTMLInputElement;
    this.radio.checked = true;
    this.overlay = false;
  }

  roleChange(i: number)
  {
    if ( i === 0 )
    {
      this.defRole = 'USR';
    }
    else
    {
      this.defRole = 'PSY';
    }
  }

  createUser()
  {
    this.userData = {
      email: this.email.value,
      password: this.pass.value,
      role: this.defRole,
      firstName: this.name.value,
      surname: this.surname.value
    };
    this.createUserPost();
  }

  // Adding User
  createUserPost()
  {
    this.overlay = true;
    this.regHandler.addUser(this.userData).subscribe({
      next: data => {
          this.data$ = data;
          this.overlay = false;
          Swal.fire({
            icon: 'success',
            title: 'Zarejestrowano!',
            text: 'Zostałeś pomyślnie zarejestrowany w naszym serwisie 😀',
            footer: 'Nie zapomnij sprawdzić swojej poczty 📧',
            confirmButtonText: `Ok`
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['../']);
            }
          });
      },
      error: error => {
        this.overlay = false;
        Swal.fire({
          title: 'Wystąpił błąd!',
          text: 'Niestety podczas rejestracji wystąpił błąd',
          icon: 'error',
          footer: error.error.errors
        });
      }
  });
  }

  clearInput()
  {
    this.email.value = '';
    this.name.value = '';
    this.pass.value = '';
    this.surname.value = '';
  }
}
