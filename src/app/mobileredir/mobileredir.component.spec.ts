/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MobileredirComponent } from './mobileredir.component';

describe('MobileredirComponent', () => {
  let component: MobileredirComponent;
  let fixture: ComponentFixture<MobileredirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileredirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileredirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
