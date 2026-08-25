import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormularioCadastrarUsuario } from '../../components/formulario-cadastrar-usuario/formulario-cadastrar-usuario';
import { AutenticacaoService } from '../../../../services/Autenticacao/autenticacao-service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

declare var bootstrap: any;

@Component({
  selector: 'app-cadastrar',
  imports: [ReactiveFormsModule, CommonModule, FormularioCadastrarUsuario],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css',
})
export class Cadastrar {

  @ViewChild('meuModal') modalElement!: ElementRef;
  private modalInstance: any;
  environment = environment

  constructor(
    private autenticacaoService: AutenticacaoService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngAfterViewInit() {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  cadastrar(dados: any) {
  this.autenticacaoService.cadastrarUsuario(dados).subscribe({
    next: (res) => {
      this.modalInstance.show();
    },
    error: (err) => {
      const errosValidacao = err.error?.errors?.body;

      if (errosValidacao) {
        Object.keys(errosValidacao).forEach((campo) => {
          const mensagem = errosValidacao[campo];
          this.toastr.error(mensagem, 'Erro de Validação');
        });
      } else {
        this.toastr.error('Ocorreu um erro ao tentar cadastrar.', 'Erro');
      }
    }
  });
}

  confirmarLeitura() {
    this.modalInstance.hide();
    setTimeout(() => {
      this.router.navigate(['/entrar']);
    }, 200)
  }
}
