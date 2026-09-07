import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LilacPagedComponent } from './lilac-paged.component';

describe('lilacPagedComponent', () => {
  let component: LilacPagedComponent;
  let fixture: ComponentFixture<LilacPagedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LilacPagedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LilacPagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
