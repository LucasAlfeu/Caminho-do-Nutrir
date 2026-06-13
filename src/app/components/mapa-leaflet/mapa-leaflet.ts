import { Component, AfterViewInit, OnDestroy, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { ModalMark } from '../modal-mark/modal-mark';
import { BancoLeite } from '../../class/BancoLeite';

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
export class MapaLeaflet implements AfterViewInit, OnDestroy, OnChanges {
  private map: L.Map | undefined;
  private markersGroup: L.LayerGroup | undefined;

  @ViewChild('modalMark') modalElement!: ModalMark;

  @Input() listBancos?: BancoLeite[];

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listBancos']) {
      this.listBancos = changes['listBancos'].currentValue;

      if (this.map) {
        this.renderizarMarcadores();
      }
    }
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

    // Mantemos as coordenadas antigas como "fallback" padrão caso o usuário recuse a localização
    this.map = L.map('mapaContainer', {
      center: [-22.5003437, -44.1227801],
      zoom: 15,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.markersGroup = L.layerGroup().addTo(this.map);

    this.renderizarMarcadores();

    // Tenta centralizar na localização de quem está acessando
    this.obterLocalizacaoUsuario();

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  private obterLocalizacaoUsuario(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (this.map) {
            this.map.setView([lat, lng], 14);
          }
        },
        (error) => {
          console.warn('Não foi possível obter a localização do usuário:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.log('Geolocalização não é suportada por este navegador.');
    }
  }

  private renderizarMarcadores(): void {
    if (!this.map || !this.markersGroup) return;

    this.markersGroup.clearLayers();

    (this.listBancos ?? []).forEach((banco) => {
      const lat = Number(banco.latitude);
      const lng = Number(banco.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng]);

        marker.on('click', () => {
          this.modalElement.abrirModal(banco);
        });

        this.markersGroup?.addLayer(marker);
      }
    });
  }
}
