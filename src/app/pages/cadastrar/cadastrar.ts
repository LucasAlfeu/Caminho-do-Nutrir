import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css',
})
export class Cadastrar {
  form!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    protected fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createForm()
  }

  createForm(){
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required])],
      nome: ['', Validators.compose([Validators.required])],
      matricula: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required])],
      usuario: ['', Validators.compose([Validators.required])],
      confirmaSenha: ['', Validators.compose([Validators.required])],
    })
  }

  cadastrar(){
    if(!this.form) return;

    if(this.form.invalid) {
      this.toastr.error('Revise os campos obrigatórios', 'Erro');
      return
    }
    const dadosCadastrais = {
      email: this.form.get('email')?.value,
      senha: this.form.get('senha')?.value,
      nome: this.form.get('nome')?.value,
      matricula: this.form.get('matricula')?.value,
      cpf: this.form.get('cpf')?.value,
      usuario: this.form.get('usuario')?.value,
      confirmaSenha: this.form.get('confirmaSenha')?.value,
    };

    console.log(dadosCadastrais);
  }
}
