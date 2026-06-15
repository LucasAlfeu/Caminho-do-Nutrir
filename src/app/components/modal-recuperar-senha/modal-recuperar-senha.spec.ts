import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecuperarSenha } from './modal-recuperar-senha';

describe('ModalRecuperarSenha', () => {
  let component: ModalRecuperarSenha;
  let fixture: ComponentFixture<ModalRecuperarSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRecuperarSenha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRecuperarSenha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
