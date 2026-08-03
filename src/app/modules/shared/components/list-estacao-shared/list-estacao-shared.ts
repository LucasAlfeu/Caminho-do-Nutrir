import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { IBancoLeite } from '../../../../class/BancoLeite';
import { RouterModule } from '@angular/router';
import { ModalMark } from '../../../mapa/components/modal-mark/modal-mark';

@Component({
  selector: 'app-list-estacao-shared',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalMark],
  templateUrl: './list-estacao-shared.html',
  styleUrl: './list-estacao-shared.css',
})
export class ListEstacaoShared {

  @ViewChild('modalMark') modalDetalhe!: ModalMark;

  @Input() listBancos: IBancoLeite[] = []
  @Input() indSolicitacao: boolean = false;
  @Input() indTabelaInicio: boolean = false;

  ngOnInit(){  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['indSolicitacao']){
      this.indSolicitacao = changes['indSolicitacao'].currentValue;
    }
  }

  openModalDetalhe(banco: any){
    this.modalDetalhe.abrirModal(banco);
    console.log("soli", this.indSolicitacao)
  }

  exibeIconeAtencao(banco: IBancoLeite){
    return banco.indValidado == Boolean(0) && this.indSolicitacao
  }
}
