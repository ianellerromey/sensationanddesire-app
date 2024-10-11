import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtcbrrComponent } from './mtcbrr.component';

describe('MtcbrrComponent', () => {
  let component: MtcbrrComponent;
  let fixture: ComponentFixture<MtcbrrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtcbrrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtcbrrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
