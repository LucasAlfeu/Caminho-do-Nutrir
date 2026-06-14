import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../class/Usuario';
import { AutenticacaoService } from '../../services/Autenticacao/autenticacao-service';
import { BancoLeiteService } from '../../services/BancoLeite/banco-leite-service';
import { BancoLeite } from '../../class/BancoLeite';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalMark } from '../../components/modal-mark/modal-mark';

@Component({
  selector: 'app-painel',
  imports: [CommonModule, DatePipe, RouterLink, ModalMark],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {

  @ViewChild('modalMark') modalDetalhe!: ModalMark;

  usuario: Usuario | null = null;
  listBancos: BancoLeite[] = [];
  totalBancos: number = 0;

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private bancoLeiteService: BancoLeiteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.listarBancosLeite();
  }

  listarBancosLeite() {
    this.bancoLeiteService.listBancoLeite().subscribe({
      next: (res) => {
        this.listBancos = res.body ?? [];

        const totalCount = res.headers.get('X-Total-Count');
        this.totalBancos = totalCount ? parseInt(totalCount, 10) : 0;
      },
      error: (err) => {
        this.toastr.error("Não foi possível carregar os Bancos de Leite")
      }
    })
  }

  goTo() {
    this.router.navigate(['painel/cadastrar-banco']);
  }

  openModalDetalhe(banco: any){
    this.modalDetalhe.abrirModal(banco);
  }
}
