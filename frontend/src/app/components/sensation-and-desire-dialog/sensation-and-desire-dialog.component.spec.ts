import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensationAndDesireDialogComponent } from './sensation-and-desire-dialog.component';

describe('SensationAndDesireDialogComponent', () => {
  let component: SensationAndDesireDialogComponent;
  let fixture: ComponentFixture<SensationAndDesireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensationAndDesireDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensationAndDesireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
