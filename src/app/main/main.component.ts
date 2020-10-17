import { isNull } from '@angular/compiler/src/output/output_ast';
import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  usrName = localStorage.getItem('usrName');

  ngOnInit(): void {
    if (localStorage.getItem('usrName') === null)
    {
      this.usrName = 'Anon';
    }
  }

}
