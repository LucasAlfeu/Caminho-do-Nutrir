import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateal } from './menu-lateal';

describe('MenuLateal', () => {
  let component: MenuLateal;
  let fixture: ComponentFixture<MenuLateal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLateal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLateal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
