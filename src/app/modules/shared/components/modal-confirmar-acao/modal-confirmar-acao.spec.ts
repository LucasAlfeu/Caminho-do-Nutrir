import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmarAcao } from './modal-confirmar-acao';

describe('ModalConfirmarAcao', () => {
  let component: ModalConfirmarAcao;
  let fixture: ComponentFixture<ModalConfirmarAcao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmarAcao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmarAcao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
