import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstacaoShared } from './list-estacao-shared';

describe('ListEstacaoShared', () => {
  let component: ListEstacaoShared;
  let fixture: ComponentFixture<ListEstacaoShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEstacaoShared]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEstacaoShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
