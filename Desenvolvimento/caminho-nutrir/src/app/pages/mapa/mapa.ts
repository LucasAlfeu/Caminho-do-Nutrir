import { Component } from '@angular/core';
import { MapaLeaflet } from '../../components/mapa-leaflet/mapa-leaflet';
import { HeaderSecundario } from '../../components/header-secundario/header-secundario';

@Component({
  selector: 'app-mapa',
  imports: [MapaLeaflet, HeaderSecundario],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa {

}
