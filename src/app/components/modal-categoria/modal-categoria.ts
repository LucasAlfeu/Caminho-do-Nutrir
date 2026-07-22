import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Pickr from '@simonwep/pickr';


declare var bootstrap: any;

@Component({
  selector: 'app-modal-categoria',
  imports: [CommonModule],
  templateUrl: './modal-categoria.html',
  styleUrl: './modal-categoria.css',
})
export class ModalCategoria implements AfterViewInit {
  @ViewChild('colorPicker', { static: false }) colorPickerElement!: ElementRef;
  @ViewChild('meuModal') modalElement!: ElementRef;
  private modalInstance: any;

  private pickrInstance: any;
  public corSelecionada: string = '#ff0000';

  constructor(protected toastrService: ToastrService) { }

  ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }

    this.pickrInstance = Pickr.create({
      el: this.colorPickerElement.nativeElement,
      theme: 'nano',
      container: this.colorPickerElement.nativeElement.parentElement,
      default: this.corSelecionada,

      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: {
          hex: true,
          rgba: false,
          cmyk: false,
          input: true,
          clear: false,
          save: true
        }
      },
      i18n: {
        'btn:save': 'Salvar',
      }
    });

    this.pickrInstance.on('change', (color: any) => {
      this.corSelecionada = color.toHEXA().toString();
    });

    this.pickrInstance.on('save', (color: any) => {
      this.corSelecionada = color.toHEXA().toString();
      this.pickrInstance.hide();
    });
  }

  ngOnDestroy(): void {
    if (this.pickrInstance) {
      this.pickrInstance.destroyAndRemove();
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
}
