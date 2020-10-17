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
  constructor(private regHandler: RegisterHandlerService) { }

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
    this.regHandler.addUser(this.userData).subscribe({
      next: data => {
          this.data$ = data;
          Swal.fire({
            icon: 'success',
            title: 'Zarejestrowano!',
            text: 'Zostałeś pomyślnie zarejestrowany w naszym serwisie 😀',
            footer: 'Nie zapomnij sprawdzić swojej poczty 📧'
          });
      },
      error: error => {
        Swal.fire(
          'Wystąpił błąd!',
          'Niestety podczas rejestracji wystąpił błąd',
          'error'
        );
      }
  });
  }
}
