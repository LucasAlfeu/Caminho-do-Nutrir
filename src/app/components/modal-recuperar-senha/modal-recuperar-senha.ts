import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-recuperar-senha',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-recuperar-senha.html',
  styleUrl: './modal-recuperar-senha.css',
})
export class ModalRecuperarSenha {
  @ViewChild('meuModal') modalElement!: ElementRef;
  private modalInstance: any;

  form!: FormGroup;

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    protected toastrService: ToastrService,
    protected fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required])],
      nome: ['', Validators.compose([Validators.required])],
      matricula: ['', Validators.compose([Validators.required])],
      usuario: ['', Validators.compose([Validators.required])],
      confirmaSenha: ['', Validators.compose([Validators.required])],
    })
  }

  abrirModal() {
    if (!this.modalInstance && this.modalElement?.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }

    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      console.error("Não foi possível encontrar o elemento #meuModal no HTML.");
    }
  }

  fecharModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }


  enviarRecuperacao() {
    if(!this.form) return

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastrService.warning('Preencha todos os campos obrigatórios.');
      return;
    }
    console.log('Dados enviados:', this.form.value);
  }

  campoInvalido(campo: string): boolean {
    return Boolean(this.form.get(campo)?.invalid && this.form.get(campo)?.touched)
  }
}
