import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-categoria',
  imports: [CommonModule],
  templateUrl: './modal-categoria.html',
  styleUrl: './modal-categoria.css',
})
export class ModalCategoria implements AfterViewInit {
  @ViewChild('meuModal') modalElement!: ElementRef;
  private modalInstance: any;

  constructor(protected toastrService: ToastrService) { }

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
}
