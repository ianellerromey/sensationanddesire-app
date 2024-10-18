import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayDisclaimerComponent } from './overlay-disclaimer.component';

describe('OverlayDisclaimerComponent', () => {
  let component: OverlayDisclaimerComponent;
  let fixture: ComponentFixture<OverlayDisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayDisclaimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
