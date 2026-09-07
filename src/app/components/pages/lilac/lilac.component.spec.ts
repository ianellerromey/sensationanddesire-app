import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LilacComponent } from './lilac.component';

describe('lilacComponent', () => {
  let component: LilacComponent;
  let fixture: ComponentFixture<LilacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LilacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LilacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
