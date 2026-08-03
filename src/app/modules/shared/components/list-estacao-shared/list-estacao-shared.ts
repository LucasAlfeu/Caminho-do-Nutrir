import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
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

  openModalDetalhe(banco: any){
    this.modalDetalhe.abrirModal(banco);
  }
}
