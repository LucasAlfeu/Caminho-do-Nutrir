import { Component, Input, input, ViewChild } from '@angular/core';
import { ListEstacaoShared } from '../../../shared/components/list-estacao-shared/list-estacao-shared';
import { IBancoLeite } from '../../../../class/BancoLeite';
import { ModalMark } from '../../../mapa/components/modal-mark/modal-mark';
import { Router } from '@angular/router';
import { BancoLeiteService } from '../../../../services/BancoLeite/banco-leite-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-validar-solicitacao',
  imports: [ListEstacaoShared, ReactiveFormsModule],
  templateUrl: './validar-solicitacao.html',
  styleUrl: './validar-solicitacao.css',
})
export class ValidarSolicitacao {

  listBancos!: IBancoLeite[]
  form!: FormGroup;

  constructor(
    private router: Router,
    private bancoLeiteService: BancoLeiteService,
    private toastr: ToastrService,
    protected fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.listarBancosLeite();
  }

  createForm(){
    this.form = this.fb.group({
      filtroBanco: ['']
    })
  }

  listarBancosLeite(filterNomeEstacao?: string) {
    const params = {
      indValidado: false,
      filter: filterNomeEstacao ? filterNomeEstacao : ''
    }
    this.bancoLeiteService.listBancoLeite(params).subscribe({
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

  filtrarPontos(){
    if(!this.form) return;
    const filtroString = this.form.get('filtroBanco')?.value

    if(filtroString) this.listarBancosLeite(filtroString);
  }

  limparFiltro(){
    this.form.reset();
    this.listarBancosLeite();
  }

}
