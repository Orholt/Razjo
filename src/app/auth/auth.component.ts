import { FamilyService } from './../master-main/family-listing/family.service';
import { CalendarserviceService } from './../calendarview/calendarservice.service';
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
  // tslint:disable-next-line: max-line-length
  constructor(private loginservice: LoginService, private familyService: FamilyService , private calendarService: CalendarserviceService, private router: Router) { }

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
        this.familyService.reqObj = this.$response;
        this.overlay = false;
        this.familyHandler();
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
  familyHandler()
  {
    localStorage.setItem('familyId', 'none');
    if (this.$response.families[0] !== null || this.$response.families[0] !== undefined || this.$response.families.length === 0)
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
  }
  afterPost()
  {
    localStorage.setItem('token', this.$response.token);
    localStorage.setItem('usrName', this.$response.userInfo.firstName);
    setTimeout(() => {
      if (this.$response.userInfo.role === 'USR')
      {
        localStorage.setItem('role', 'USR');
        this.router.navigate(['/userMain']);
      }
      else if ( this.$response.userInfo.role === 'PSY')
      {
        localStorage.setItem('role', 'PSY');
        this.router.navigate(['/masterMain']);
      }
    }, 500);
  }

}
