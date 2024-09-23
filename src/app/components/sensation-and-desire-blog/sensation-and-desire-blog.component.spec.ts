import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensationAndDesireBlogComponent } from './sensation-and-desire-blog.component';

describe('SensationAndDesireBlogComponent', () => {
  let component: SensationAndDesireBlogComponent;
  let fixture: ComponentFixture<SensationAndDesireBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensationAndDesireBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensationAndDesireBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
