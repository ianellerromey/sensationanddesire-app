import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensationAndDesireMenuComponent } from './sensation-and-desire-menu.component';

describe('SensationAndDesireMenuComponent', () => {
  let component: SensationAndDesireMenuComponent;
  let fixture: ComponentFixture<SensationAndDesireMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensationAndDesireMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensationAndDesireMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
