import { FamilyService } from './family.service';
import { Family, IUserObj } from './../../auth/UserObjG';
import { LoginService } from './../../auth/login.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family-listing',
  templateUrl: './family-listing.component.html',
  styleUrls: ['./family-listing.component.css']
})
export class FamilyListingComponent implements OnInit {

  families: Family[];
  constructor(private loginService: LoginService, private familyService: FamilyService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getFamilies();
    }, 150);
  }

  getFamilies()
  {
    this.families = JSON.parse(localStorage.getItem('x'));
  }

  copyCode(code)
  {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    // alert
    Swal.fire({
      icon: 'success',
      title: 'Skopiowano do schowka'
    });
  }

}
