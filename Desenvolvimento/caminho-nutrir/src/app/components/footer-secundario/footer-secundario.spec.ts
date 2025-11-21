import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSecundario } from './footer-secundario';

describe('FooterSecundario', () => {
  let component: FooterSecundario;
  let fixture: ComponentFixture<FooterSecundario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSecundario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSecundario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
