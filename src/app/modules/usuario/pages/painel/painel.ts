import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../../class/Usuario';
import { AutenticacaoService } from '../../../../services/Autenticacao/autenticacao-service';
import { BancoLeiteService } from '../../../../services/BancoLeite/banco-leite-service';
import { BancoLeite } from '../../../../class/BancoLeite';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalMark } from '../../../mapa/components/modal-mark/modal-mark';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ListEstacaoShared } from '../../../shared/components/list-estacao-shared/list-estacao-shared';

@Component({
  selector: 'app-painel',
  imports: [
    CommonModule,
    ModalMark,
    ReactiveFormsModule,
    ListEstacaoShared
  ],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {

  @ViewChild('modalMark') modalDetalhe!: ModalMark;

  usuario: Usuario | null = null;
  listBancos: BancoLeite[] = [];
  totalBancos: number = 0;
  form!: FormGroup;

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
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
      indValidado: true,
      filter: filterNomeEstacao ? filterNomeEstacao : ''
    }
    this.bancoLeiteService.listBancoLeite(params).subscribe({
      next: (res) => {
        this.listBancos = res.body?.reverse() ?? [];

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
