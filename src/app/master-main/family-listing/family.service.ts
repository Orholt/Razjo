import { IUserObj } from './../../auth/UserObjG';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  public reqObj: IUserObj;
  constructor() { }
}
