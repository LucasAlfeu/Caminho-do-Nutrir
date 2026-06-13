import { Component } from '@angular/core';
import { MapaLeaflet } from '../../components/mapa-leaflet/mapa-leaflet';
import { BancoLeiteService } from '../../services/BancoLeite/banco-leite-service';
import { BancoLeite } from '../../class/BancoLeite';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mapa',
  imports: [MapaLeaflet, CommonModule],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa {
  listBancos: BancoLeite[] = []

  constructor(
    private bancoLeiteService: BancoLeiteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.listarBancosLeite();
  }

  listarBancosLeite() {
    this.bancoLeiteService.listBancoLeite().subscribe({
      next: (res) => {
        this.listBancos = res;
      },
      error: (err) => {
        this.toastr.error("Não foi possível carregar os Bancos de Leite")
      }
    })
  }
}
