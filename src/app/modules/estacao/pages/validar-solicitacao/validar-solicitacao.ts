import { Component, Input, input, ViewChild } from '@angular/core';
import { ListEstacaoShared } from '../../../shared/components/list-estacao-shared/list-estacao-shared';
import { IBancoLeite } from '../../../../class/BancoLeite';
import { ModalMark } from '../../../mapa/components/modal-mark/modal-mark';
import { Router } from '@angular/router';
import { BancoLeiteService } from '../../../../services/BancoLeite/banco-leite-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validar-solicitacao',
  imports: [ListEstacaoShared],
  templateUrl: './validar-solicitacao.html',
  styleUrl: './validar-solicitacao.css',
})
export class ValidarSolicitacao {

  listBancos: IBancoLeite[] = []

  constructor(
    private router: Router,
    private bancoLeiteService: BancoLeiteService,
    private toastr: ToastrService,
    // protected fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.listarBancosLeite();
  }

  listarBancosLeite() {
    const indValidado = false
    this.bancoLeiteService.listBancoLeite(indValidado).subscribe({
      next: (res) => {
        this.listBancos = res.body ?? [];

      },
      error: (err) => {
        this.toastr.error("Não foi possível carregar os Bancos de Leite")
      }
    })
  }

  atualizarListagem(e: any): void {
    this.listarBancosLeite();
  }

}
