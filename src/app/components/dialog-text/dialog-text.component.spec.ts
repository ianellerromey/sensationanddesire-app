import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTextComponent } from './dialog-text.component';

describe('DialogTextComponent', () => {
  let component: DialogTextComponent;
  let fixture: ComponentFixture<DialogTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
