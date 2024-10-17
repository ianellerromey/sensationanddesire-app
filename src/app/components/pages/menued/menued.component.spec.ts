import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuedComponent } from './menued.component';

describe('MenuedComponent', () => {
  let component: MenuedComponent;
  let fixture: ComponentFixture<MenuedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
