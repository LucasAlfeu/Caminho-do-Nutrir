import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSecundario } from './header-secundario';

describe('HeaderSecundario', () => {
  let component: HeaderSecundario;
  let fixture: ComponentFixture<HeaderSecundario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSecundario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSecundario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
