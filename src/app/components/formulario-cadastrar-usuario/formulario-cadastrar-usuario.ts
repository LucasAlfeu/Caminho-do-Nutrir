import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-cadastrar-usuario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-cadastrar-usuario.html',
  styleUrl: './formulario-cadastrar-usuario.css',
})
export class FormularioCadastrarUsuario {
  @Output() cadastrar = new EventEmitter();

  form!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    protected fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required])],
      nome: ['', Validators.compose([Validators.required])],
      matricula: ['', Validators.compose([Validators.required])],
      usuario: ['', Validators.compose([Validators.required])],
      confirmaSenha: ['', Validators.compose([Validators.required])],
    })
  }

  _cadastrar() {
    if (!this.form) return;

    if (this.form.invalid) {
      this.toastr.error('Revise os campos obrigatórios', 'Erro');
      return
    }

    const senha = this.form.get('senha')?.value
    const confirmaSenha = this.form.get('confirmaSenha')?.value

    if (senha && confirmaSenha && senha !== confirmaSenha) {
      this.toastr.error("As senhas precisam ser iguais", 'Erro');
      // return
    }


    const dadosCadastrais = {
      email: this.form.get('email')?.value,
      senha: this.form.get('senha')?.value,
      nome: this.form.get('nome')?.value,
      matricula: this.form.get('matricula')?.value,
      usuario: this.form.get('usuario')?.value,
    };

    this.cadastrar.emit(dadosCadastrais);
  }
}
