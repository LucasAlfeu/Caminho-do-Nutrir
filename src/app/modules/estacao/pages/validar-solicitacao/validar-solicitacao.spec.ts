import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarSolicitacao } from './validar-solicitacao';

describe('ValidarSolicitacao', () => {
  let component: ValidarSolicitacao;
  let fixture: ComponentFixture<ValidarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
