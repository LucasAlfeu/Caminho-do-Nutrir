import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-leaflet',
  standalone: true,
  imports: [],
  templateUrl: './mapa-leaflet.html',
  styleUrl: './mapa-leaflet.css'
})
export class MapaLeaflet implements AfterViewInit, OnDestroy {
  private map: L.Map | undefined;

  customIcon = L.icon({
    iconUrl: 'assets/images/pino-de-localizacao.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  ngAfterViewInit(): void {
    console.log('Iniciando mapa...');
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  private initMap(): void {
    if (this.map) {
      return;
    }

    this.map = L.map('mapaContainer', {
      center: [-22.5003437, -44.1227801],
      zoom: 15,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.addMarker(-22.5003437, -44.1227801, "Banco de Leite - Exemplo");

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  private addMarker(lat: number, lng: number, mensagem?: string): L.Marker {
    const marker = L.marker([lat, lng], {icon: this.customIcon}).addTo(this.map!);

    if (mensagem) {
      marker.bindPopup(mensagem);
    }

    return marker;
  }
}
