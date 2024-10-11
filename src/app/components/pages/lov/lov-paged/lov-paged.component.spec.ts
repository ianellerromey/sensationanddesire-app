import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovPagedComponent } from './lov-paged.component';

describe('LovPagedComponent', () => {
  let component: LovPagedComponent;
  let fixture: ComponentFixture<LovPagedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LovPagedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovPagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
