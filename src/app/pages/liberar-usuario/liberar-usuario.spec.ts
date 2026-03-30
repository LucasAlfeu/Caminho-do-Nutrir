import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberarUsuario } from './liberar-usuario';

describe('LiberarUsuario', () => {
  let component: LiberarUsuario;
  let fixture: ComponentFixture<LiberarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiberarUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiberarUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
