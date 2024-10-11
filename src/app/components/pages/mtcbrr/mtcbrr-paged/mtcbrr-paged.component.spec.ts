import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtcbrrPagedComponent } from './mtcbrr-paged.component';

describe('MtcbrrPagedComponent', () => {
  let component: MtcbrrPagedComponent;
  let fixture: ComponentFixture<MtcbrrPagedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtcbrrPagedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtcbrrPagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
