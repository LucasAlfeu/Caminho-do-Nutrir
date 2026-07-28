import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarBanco } from './cadastrar-banco';

describe('CadastrarBanco', () => {
  let component: CadastrarBanco;
  let fixture: ComponentFixture<CadastrarBanco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarBanco]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarBanco);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
