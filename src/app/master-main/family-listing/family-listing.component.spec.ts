import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyListingComponent } from './family-listing.component';

describe('FamilyListingComponent', () => {
  let component: FamilyListingComponent;
  let fixture: ComponentFixture<FamilyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
