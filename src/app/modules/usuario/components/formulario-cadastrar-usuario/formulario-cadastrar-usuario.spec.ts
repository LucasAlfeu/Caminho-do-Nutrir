import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCadastrarUsuario } from './formulario-cadastrar-usuario';

describe('FormularioCadastrarUsuario', () => {
  let component: FormularioCadastrarUsuario;
  let fixture: ComponentFixture<FormularioCadastrarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCadastrarUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCadastrarUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
