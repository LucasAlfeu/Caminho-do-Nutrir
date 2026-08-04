import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarSolicitacao } from './modal-deletar-solicitacao';

describe('ModalDeletarSolicitacao', () => {
  let component: ModalDeletarSolicitacao;
  let fixture: ComponentFixture<ModalDeletarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeletarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
