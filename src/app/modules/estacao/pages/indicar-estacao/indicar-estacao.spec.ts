import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicarEstacao } from './indicar-estacao';

describe('IndicarEstacao', () => {
  let component: IndicarEstacao;
  let fixture: ComponentFixture<IndicarEstacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicarEstacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicarEstacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
