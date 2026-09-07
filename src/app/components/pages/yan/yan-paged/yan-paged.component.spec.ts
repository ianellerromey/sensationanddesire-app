import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YanPagedComponent } from './yan-paged.component';

describe('yanPagedComponent', () => {
  let component: YanPagedComponent;
  let fixture: ComponentFixture<YanPagedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YanPagedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YanPagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
