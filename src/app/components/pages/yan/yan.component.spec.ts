import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YanComponent } from './yan.component';

describe('yanComponent', () => {
  let component: YanComponent;
  let fixture: ComponentFixture<YanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
