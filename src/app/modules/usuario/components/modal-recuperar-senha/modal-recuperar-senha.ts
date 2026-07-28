import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AutenticacaoService } from '../../../../services/Autenticacao/autenticacao-service';

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
    protected autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      novaSenha: ['', Validators.compose([Validators.required])],
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
      this.form.reset();
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
    if (!this.form) return

    this.form.markAllAsTouched();

    const senha = this.form.get('novaSenha')?.value
    const confirmaSenha = this.form.get('confirmaSenha')?.value

    if (senha && confirmaSenha && senha !== confirmaSenha) {
      this.form.get('novaSenha')?.setValue('')
      this.form.get('confirmaSenha')?.setValue('')
      this.toastrService.error("As senhas precisam ser iguais", 'Erro');
      return
    }


    const dadosCadastrais = {
      email: this.form.get('email')?.value,
      novaSenha: senha,
      matricula: this.form.get('matricula')?.value,
      usuario: this.form.get('usuario')?.value,
    };


    this.autenticacaoService.recuperaSenha(dadosCadastrais).subscribe({
      next: (res) => {
        console.log(res)
        this.toastrService.success("Senha atualizada com sucesso");
        this.fecharModal();
      },
      error: (err) => {
        console.log(err)
        const errosValidacao = err?.error?.errors;

        if (errosValidacao) {
          Object.keys(errosValidacao).forEach((campo) => {
            const mensagem = errosValidacao[campo];
            this.toastrService.error(mensagem, 'Erro de Validação');
          });
        } else {
          this.toastrService.error('Ocorreu um erro ao tentar cadastrar.', 'Erro');
        }

        this.form.reset();
      }
    })
  }

  campoInvalido(campo: string): boolean {
    return Boolean(this.form.get(campo)?.invalid && this.form.get(campo)?.touched)
  }
}
