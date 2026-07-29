import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndicarEstacao } from './form-indicar-estacao';

describe('FormIndicarEstacao', () => {
  let component: FormIndicarEstacao;
  let fixture: ComponentFixture<FormIndicarEstacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIndicarEstacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIndicarEstacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
