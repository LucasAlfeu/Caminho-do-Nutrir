import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, NgZone, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { ModalMark } from '../modal-mark/modal-mark';
import { BancoLeite } from '../../../../class/BancoLeite';
import { CategoriaService } from '../../../../services/Categoria/categoria';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-mapa-leaflet',
  standalone: true,
  imports: [ModalMark, CommonModule],
  templateUrl: './mapa-leaflet.html',
  styleUrl: './mapa-leaflet.css',
  encapsulation: ViewEncapsulation.None // Permite que os estilos do Leaflet funcionem perfeitamente
})
export class MapaLeaflet implements AfterViewInit, OnDestroy, OnChanges {
  private map: L.Map | undefined;
  private markersGroup: L.LayerGroup | undefined;
  private permissaoModal: any;
  private userMarker: L.Marker | undefined;

  listCategoria: any[] = [];

  @ViewChild('modalMark') modalElement!: ModalMark;
  @ViewChild('modalPermissao') modalPermissaoRef!: ElementRef;

  @Input() listBancos?: BancoLeite[];

  constructor(
    private categoriaService: CategoriaService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.abrirModalPermissao();
    this.buscarCategorias();
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
    if (this.permissaoModal) {
      this.permissaoModal.dispose();
      this.permissaoModal = undefined;
    }
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
      zoomControl: false,
      worldCopyJump: true
    }).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.markersGroup = L.layerGroup().addTo(this.map);

    this.renderizarMarcadores();

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  private abrirModalPermissao(): void {
    if (!this.modalPermissaoRef) return;

    this.permissaoModal = new bootstrap.Modal(this.modalPermissaoRef.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
    this.permissaoModal.show();
  }

  permitirLocalizacao(): void {
    this.permissaoModal?.hide();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // NgZone garante que o mapa e a UI atualizem imediatamente
          this.ngZone.run(() => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            if (this.map) {
              this.map.invalidateSize();
              this.map.setView([lat, lng], 15);
              this.adicionarMarcadorUsuario(lat, lng);
            }
          });
        },
        (error) => {
          console.warn('Não foi possível obter a localização do usuário:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.log('Geolocalização não é suportada por este navegador.');
    }
  }

  recusarLocalizacao(): void {
    this.permissaoModal?.hide();
  }

  private adicionarMarcadorUsuario(lat: number, lng: number): void {
    if (!this.map) return;

    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }

    // Estrutura HTML com estilos inline para evitar perda de estilo do Angular
    const iconUser = L.divIcon({
      className: 'custom-user-icon',
      html: `
        <div class="pulse-container">
          <div class="pulse-ring"></div>
          <div class="pulse-dot"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    this.userMarker = L.marker([lat, lng], {
      icon: iconUser,
      zIndexOffset: 1000
    }).addTo(this.map);

    this.userMarker.bindPopup('<b>Você está aqui</b>');
  }

  private criarIconeDinamico(corHex: string): L.DivIcon {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="map-marker shadow d-flex justify-content-center align-items-center"
             style="width: 20px; height: 20px; border-radius: 50% 50% 0 50%; transform: rotate(45deg); background-color: ${corHex}; border: 1px solid #00000084">
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

      const cor = banco.categoria?.cor || '#e62222';

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng], {
          icon: this.criarIconeDinamico(cor)
        });

        marker.on('click', () => {
          this.modalElement.abrirModal(banco);
        });

        this.markersGroup?.addLayer(marker);
      }
    });
  }

  buscarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (res) => {
        this.listCategoria = res.body ?? [];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
