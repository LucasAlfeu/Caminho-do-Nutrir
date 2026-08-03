import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMark } from './modal-mark';

describe('ModalMark', () => {
  let component: ModalMark;
  let fixture: ComponentFixture<ModalMark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMark]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
