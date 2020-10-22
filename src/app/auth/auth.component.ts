import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { LoginService } from './login.service';
import { IUserObj } from './UserObjG';
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
  overlay;

  ngOnInit(): void {
    this.loginfield = document.getElementById('email') as HTMLInputElement;
    this.passwordfield = document.getElementById('password') as HTMLInputElement;
    this.overlay = false;
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
    this.overlay = true;
    this.loginservice.loginUser(this.usr).subscribe({
      next: data => {
        this.$response = data;
        this.loginservice.$reqObj = this.$response;
        this.overlay = false;
        this.afterPost();
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił Błąd',
          text: 'Wystąpił błąd podczas logowania',
          footer: error.error.errors
        });
        this.overlay = false;
      }
  });
  }
// tslint:disable: no-unused-expression
  afterPost()
  {
    localStorage.setItem('token', this.$response.token);
    localStorage.setItem('usrName', this.$response.userInfo.firstName);
    if (this.$response.families[0] !== null || this.$response.families[0] !== undefined)
    {
      if (this.$response.families.length === 1)
      {
        localStorage.setItem('familyId', this.$response.families[0].familyId);
      }
      else if (this.$response.families.length > 1)
      {
        let t: string;
        t = 'array';
        this.$response.families.forEach(familyI => {
          t += '$' + familyI.familyId; // !important
        });
        console.log(t);
        localStorage.setItem('familyId', t);
      }
    }
    else
    {
      localStorage.setItem('familyId', 'none');
    }
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
