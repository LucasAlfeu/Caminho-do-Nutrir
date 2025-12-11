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

  customIcon = L.icon({
  iconUrl: 'images/pino-de-localizacao.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

  ngAfterViewInit(): void {
    console.log('Iniciando mapa...');
    this.initMap();
    this.addMarker(-22.7414, -43.7053, "Esse é um teste")
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

   private fixLeafletIcon(): void {
    const iconRetinaUrl = 'images/pino-de-localizacao.png';
    const iconUrl = 'images/pino-de-localizacao.png';
    const shadowUrl = 'images/pino-de-localizacao.png';
    
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    
    L.Marker.prototype.options.icon = iconDefault;
  }

  private addMarker(lat: number, lng: number, mensagem?: string): L.Marker {
    const marker = L.marker([lat, lng], {icon: this.customIcon}).addTo(this.map);
    
    if (mensagem) {
      marker.bindPopup(mensagem);
    }
    
    return marker;
  }
}