import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidarSolicitacao } from './modal-validar-solicitacao';

describe('ModalValidarSolicitacao', () => {
  let component: ModalValidarSolicitacao;
  let fixture: ComponentFixture<ModalValidarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalValidarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalValidarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
