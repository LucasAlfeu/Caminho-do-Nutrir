import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { ModalMark } from '../modal-mark/modal-mark';

declare var bootstrap: any;

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-mapa-leaflet',
  standalone: true,
  imports: [ModalMark],
  templateUrl: './mapa-leaflet.html',
  styleUrl: './mapa-leaflet.css'
})
export class MapaLeaflet implements AfterViewInit, OnDestroy {
  private map: L.Map | undefined;

  @ViewChild('modalMark') modalElement!: ModalMark;
  // private modalInstance: any;

  ngAfterViewInit(): void {
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
    const marker = L.marker([lat, lng]).addTo(this.map!);

    const endereco = {
    nome: 'Isso é um teste',
    descricao: 'teste teste teste',
    cep: '20205570',
    longradouro: 'Avenida Jaraguá',
    numero: '370',
    complemento: 'casa 47',
    bairro: 'Retiro',
    cidade: 'Volta Redonda',
    uf: 'RJ'
  }

    marker.on('click', () => {
      this.modalElement.abrirModal(endereco);
    });

    return marker;
  }

}
