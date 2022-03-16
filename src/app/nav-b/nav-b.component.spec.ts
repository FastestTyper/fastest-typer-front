import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBComponent } from './nav-b.component';

describe('NavBComponent', () => {
  let component: NavBComponent;
  let fixture: ComponentFixture<NavBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
