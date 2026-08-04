import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-reportar-erro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-reportar-erro.html',
  styleUrl: './modal-reportar-erro.css',
})
export class ModalReportarErro {
  @ViewChild('meuModal') modalElement!: ElementRef;

  @Output() enviarRelatorio = new EventEmitter();

  private modalInstance: any;
  form!: FormGroup;

  constructor(
    protected fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      relato: ['', Validators.required]
    })
  }

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

  _enviarRelatorio(){
    this.form.markAllAsTouched();

    Object.keys(this.form.controls).forEach(key => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors != null) {
        console.log('Campo com erro: ' + key, controlErrors);
      }
    });

    if (!this.form.valid) {
      this.toastr.error("Revise os campos");
      return;
    }

    const dadosForm = this.form.getRawValue();
    console.log(dadosForm)
    this.enviarRelatorio.emit(dadosForm);
  }
}
