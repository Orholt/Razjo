import { FamilyService } from './family.service';
import { Family, IUserObj } from './../../auth/UserObjG';
import { LoginService } from './../../auth/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-listing',
  templateUrl: './family-listing.component.html',
  styleUrls: ['./family-listing.component.css']
})
export class FamilyListingComponent implements OnInit {

  families: Family[];
  constructor(private loginService: LoginService, private familyService: FamilyService) { }

  ngOnInit(): void {
  }

  test()
  {
    console.log(this.familyService.reqObj);
  }

}
