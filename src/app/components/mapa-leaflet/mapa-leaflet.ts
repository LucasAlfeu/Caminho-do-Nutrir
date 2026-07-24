import { Component, AfterViewInit, OnDestroy, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { ModalMark } from '../modal-mark/modal-mark';
import { BancoLeite } from '../../class/BancoLeite';

declare var bootstrap: any;

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

  private criarIconeDinamico(corHex: string): L.DivIcon {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="map-marker shadow d-flex justify-content-center align-items-center"
             style="width: 18px; height: 18px; border-radius: 50% 50% 0 50%; transform: rotate(45deg); background-color: ${corHex};">
            <div class="marker-inner bg-white rounded-circle shadow-sm" style="width: 8px; height: 8px;"></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 20],
      popupAnchor: [0, -20]
    });
  }

  private renderizarMarcadores(): void {
    if (!this.map || !this.markersGroup) return;

    this.markersGroup.clearLayers();

    (this.listBancos ?? []).forEach((banco) => {
      const lat = Number(banco.latitude);
      const lng = Number(banco.longitude);

      const cor = String(banco.classificacao) || '#e62222';

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng], {
          icon: this.criarIconeDinamico('#e62222')
        });

        marker.on('click', () => {
          this.modalElement.abrirModal(banco);
        });

        this.markersGroup?.addLayer(marker);
      }
    });
  }
}
