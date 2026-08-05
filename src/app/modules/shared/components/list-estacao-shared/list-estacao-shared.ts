import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { IBancoLeite } from '../../../../class/BancoLeite';
import { RouterModule } from '@angular/router';
import { ModalMark } from '../../../mapa/components/modal-mark/modal-mark';
import { ModalDeletarSolicitacao } from '../../../estacao/components/modal-deletar-solicitacao/modal-deletar-solicitacao';
import { BancoLeiteService } from '../../../../services/BancoLeite/banco-leite-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-estacao-shared',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalMark, ModalDeletarSolicitacao],
  templateUrl: './list-estacao-shared.html',
  styleUrl: './list-estacao-shared.css',
})
export class ListEstacaoShared {

  @ViewChild('modalMark') modalDetalhe!: ModalMark;
  @ViewChild('modalDeletarSolicitacao') modalDeletarSolicitacao!: ModalDeletarSolicitacao;

  @Input() listBancos: IBancoLeite[] = []
  @Input() indSolicitacao: boolean = false;
  @Input() indTabelaInicio: boolean = false;

  @Output() atualizarListagem = new EventEmitter();

  private estacaoSelecionada: IBancoLeite | null = null;

  constructor(
    private estacaoService: BancoLeiteService,
    protected toastrService: ToastrService,
  ) { }

  ngOnInit(){  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['indSolicitacao']){
      this.indSolicitacao = changes['indSolicitacao'].currentValue;
    }
  }

  openModalDeletarSolicitacao(estacao: IBancoLeite){
    this.estacaoSelecionada = estacao
    this.modalDeletarSolicitacao.abrirModal(estacao.nome as string);
  }

  openModalDetalhe(banco: any){
    this.modalDetalhe.abrirModal(banco);
  }

  exibeIconeAtencao(banco: IBancoLeite){
    return banco.indValidado == Boolean(0) && this.indSolicitacao
  }

  validaReporte(banco: IBancoLeite): boolean{
    return this.indTabelaInicio && banco.numReporte > 0
  }

  deletarSolicitacao(e: any){
    if(this.estacaoSelecionada && this.estacaoSelecionada.id) {
      this.estacaoService.deletarSolicitacao(this.estacaoSelecionada.id).subscribe({
        next: (res) => {
          this.toastrService.success("Solicitação removida com sucesso!");
          this.modalDeletarSolicitacao.fecharModal();
          setTimeout(() => {
            this.atualizarListagem.emit();
          }, 400)
        }, error: (err) => {
          this.toastrService.error("Não foi possível deletar essa solicitação")
          console.log(err)
        }
      })
    }
  }
}
