import { isNull } from '@angular/compiler/src/output/output_ast';
import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { IUserObj } from '../auth/UserObjG';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  $request: IUserObj;
  constructor(private loginService: LoginService) { }

  usrName = localStorage.getItem('usrName');

  ngOnInit(): void {
    this.$request = this.loginService.$reqObj as IUserObj;
    if (localStorage.getItem('usrName') === null)
    {
      this.usrName = 'Anon';
    }
  }

}
