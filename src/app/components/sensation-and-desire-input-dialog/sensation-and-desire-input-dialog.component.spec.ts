import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensationAndDesireInputDialogComponent } from './sensation-and-desire-input-dialog.component';

describe('SensationAndDesireInputDialogComponent', () => {
  let component: SensationAndDesireInputDialogComponent;
  let fixture: ComponentFixture<SensationAndDesireInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensationAndDesireInputDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensationAndDesireInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
