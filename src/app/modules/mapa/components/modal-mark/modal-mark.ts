import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskPipe } from 'ngx-mask';
import { BancoLeiteService } from '../../../../services/BancoLeite/banco-leite-service';
import { IBancoLeite } from '../../../../class/BancoLeite';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-mark',
  imports: [CommonModule, NgxMaskPipe],
  templateUrl: './modal-mark.html',
  styleUrl: './modal-mark.css',
})
export class ModalMark {
  @ViewChild('meuModal') modalElement!: ElementRef;

  @Input() indLogado: boolean = false;

  private modalInstance: any;
  endereco: any;
  estacao: any;

  constructor(protected toastrService: ToastrService, private estacaoService: BancoLeiteService) { }

  ngOnInit(){

  }

  abrirModal(endereco: any) {
    if (!this.modalInstance && this.modalElement?.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }

    if (this.modalInstance) {
      this.endereco = endereco
      this.modalInstance.show();
    } else {
      console.error("Não foi possível encontrar o elemento #meuModal no HTML.");
    }

    if(this.indLogado){
      this.buscarEstacao();
    }
  }

  fecharModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  copiarEnderecoCompleto(): void {
    if (!this.endereco) return;

    const textoParaCopiar = `
      ${this.endereco.logradouro}, nº ${this.endereco.numero} ${this.endereco.complemento ? '- ' + this.endereco.complemento : ''},
      ${this.endereco.bairro},
      ${this.endereco.municipio} - ${this.endereco.uf},
      ${this.endereco.cep}`.trim();

    navigator.clipboard.writeText(textoParaCopiar)
      .then(() => {
        this.toastrService.success('Endereço copiado para a área de transferência!')
        this.fecharModal()
      })
      .catch(err => {
        this.toastrService.error('Erro ao copiar endereço.');
      });
  }

  buscarEstacao(){
    this.estacaoService.buscarBancoLeite(this.endereco.id).subscribe({
      next: (res) => {
        this.estacao = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  reportarErro(){
    console.log('Erro reportado')
  }
}
