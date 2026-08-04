import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { IBancoLeite } from '../../../../class/BancoLeite';
import { BancoLeiteService } from '../../../../services/BancoLeite/banco-leite-service';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-deletar-solicitacao',
  imports: [],
  templateUrl: './modal-deletar-solicitacao.html',
  styleUrl: './modal-deletar-solicitacao.css',
})
export class ModalDeletarSolicitacao {
  @ViewChild('meuModal') modalElement!: ElementRef;

  @Output() deletarSolicitacao = new EventEmitter();

  private modalInstance: any;
  private nomeEstacao: string = '';

  constructor(private estacaoService: BancoLeiteService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  abrirModal(nomeEstacao: string) {
    if (this.modalInstance) {
      this.setNomeEstacao(nomeEstacao)
      this.modalInstance.show();
    }
  }

  getNomeEstacao(): string{
    return this.nomeEstacao as string
  }

  setNomeEstacao(nome: string) {
    this.nomeEstacao = nome;
  }

  fecharModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  _deletarSolicitacao(){
    this.deletarSolicitacao.emit();
  }

}
