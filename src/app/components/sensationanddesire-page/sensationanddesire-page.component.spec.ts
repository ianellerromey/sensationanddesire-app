import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensationAndDesirePageComponent } from './sensationanddesire-page.component';

describe('SensationAndDesirePageComponent', () => {
  let component: SensationAndDesirePageComponent;
  let fixture: ComponentFixture<SensationAndDesirePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensationAndDesirePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensationAndDesirePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
