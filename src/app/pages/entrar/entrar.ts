import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from '../../services/Autenticacao/autenticacao-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './entrar.html',
  styleUrl: './entrar.css',
})
export class Entrar {

  form!: FormGroup;
  showPassword = false;

  constructor(
    protected fb: FormBuilder,
    private toastr: ToastrService,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      usuario: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required])]
    })
  }

  enviarCredenciais() {
    if (!this.form) return;

    if (this.form.invalid) {
      this.toastr.error('Usuario e senha são obrigatórios', 'Erro');
      return
    }
    const credenciais = {
      usuario: this.form.get('usuario')?.value,
      senha: this.form.get('senha')?.value
    };

    this.autenticacaoService.entrar(credenciais).subscribe({
      next: (user) => {
        if (user.indLiberado) {
          localStorage.setItem("usuario", JSON.stringify(user));
          setTimeout(() => {
            this.router.navigate(['/painel']);
          }, 200)
          return
        } else {
          this.toastr.error("Seu acesso ainda não foi liberado. Fale com o responsável para concluir a habilitação.")
        }



      },
      error: (err) => {
        this.form.get('senha')?.setValue("");
        this.toastr.error(err.error.errors.default)
      }
    })
  }
}
