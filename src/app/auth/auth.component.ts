import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { LoginService } from './login.service';
import { IUserObj } from './UserObj';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private loginservice: LoginService, private router: Router) { }

  loginfield; passwordfield;
  $response: IUserObj;
  usr: User;

  ngOnInit(): void {
    this.loginfield = document.getElementById('email') as HTMLInputElement;
    this.passwordfield = document.getElementById('password') as HTMLInputElement;
  }

  setData()
  {
    this.usr = {
      email: this.loginfield.value,
      password: this.passwordfield.value
    };
    this.login();
  }

  login()
  {
    console.log(this.usr);
    this.loginservice.loginUser(this.usr).subscribe({
      next: data => {
        this.$response = data;
        Swal.fire({
            icon: 'success',
            title: 'Zalogowano!',
            text: 'Zostałeś pomyślnie zalogowany, za chwilę zostaniesz przeniesiony do panelu',
            confirmButtonText: `Ok`
          }).then((result) => {
            if (result.isConfirmed) {
              this.afterPost();
            }
          });
      },
      error: error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił Błąd',
          text: 'Wystąpił błąd podczas logowania',
          footer: error.errors
        });
      }
  });
  }
// tslint:disable: no-unused-expression
  afterPost()
  {
    localStorage.setItem('token', this.$response.token);
    setTimeout(() => {
      if (this.$response.userInfo.role === 'USR')
      {
        this.router.navigate(['/userMain']);
      }
      else if ( this.$response.userInfo.role === 'PSY')
      {
        this.router.navigate(['/masterMain']);
      }
    }, 500);
  }

}
