import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-confirmar-acao',
  imports: [],
  templateUrl: './modal-confirmar-acao.html',
  styleUrl: './modal-confirmar-acao.css',
})
export class ModalConfirmarAcao {
  @ViewChild('meuModal') modalElement!: ElementRef;

  @Input() titulo: string = '';
  @Input() mensagem: string = '';

  @Output() confirmarAcao = new EventEmitter();

  private modalInstance: any;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  abrirModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  fecharModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  _confirmarAcao(){
    this.confirmarAcao.emit();
  }
}
