import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaLeaflet } from './mapa-leaflet';

describe('MapaLeaflet', () => {
  let component: MapaLeaflet;
  let fixture: ComponentFixture<MapaLeaflet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaLeaflet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaLeaflet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
