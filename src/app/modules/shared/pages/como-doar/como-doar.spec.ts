import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoDoar } from './como-doar';

describe('ComoDoar', () => {
  let component: ComoDoar;
  let fixture: ComponentFixture<ComoDoar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoDoar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComoDoar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
