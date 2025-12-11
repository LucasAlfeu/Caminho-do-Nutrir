import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-leaflet',
  standalone: true,
  imports: [],
  template: `
    <div id="mapaContainer" style="height: 600px; width: 100%; background-color: #e0e0e0;"></div>
  `,
  styles: [`
    #mapaContainer {
      height: 600px;
      width: 100%;
    }
  `]
})
export class MapaLeaflet implements AfterViewInit { 
  private map!: L.Map;

  ngAfterViewInit(): void {
    console.log('Iniciando mapa...');
    this.initMap();
  }

  private initMap(): void {
    const container = document.getElementById('mapaContainer');

    this.map = L.map('mapaContainer', {
      center: [-22.7414, -43.7053],
      zoom: 15,
      zoomControl: false, 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }
}