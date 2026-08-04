import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-validar-solicitacao',
  imports: [],
  templateUrl: './modal-validar-solicitacao.html',
  styleUrl: './modal-validar-solicitacao.css',
})
export class ModalValidarSolicitacao {
  @ViewChild('meuModal') modalElement!: ElementRef;

  @Output() validarSolicitacao = new EventEmitter();

  private modalInstance: any;
  private nomeEstacao: string = '';

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  abrirModal(nomeEstacao: string) {
    if (this.modalInstance) {
      this.nomeEstacao = nomeEstacao
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

  _validarSolicitacao(){
    this.validarSolicitacao.emit();
  }
}
