import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportarErro } from './modal-reportar-erro';

describe('ModalReportarErro', () => {
  let component: ModalReportarErro;
  let fixture: ComponentFixture<ModalReportarErro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReportarErro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReportarErro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
