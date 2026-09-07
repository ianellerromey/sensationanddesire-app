import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsPagedComponent } from './shorts-paged.component';

describe('LovPagedComponent', () => {
  let component: ShortsPagedComponent;
  let fixture: ComponentFixture<ShortsPagedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortsPagedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortsPagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
