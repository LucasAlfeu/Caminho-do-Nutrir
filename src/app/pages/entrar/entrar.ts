import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entrar',
  imports: [ ReactiveFormsModule ],
  templateUrl: './entrar.html',
  styleUrl: './entrar.css',
})
export class Entrar {

  form!: FormGroup;

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
      senha: ['', Validators.compose([Validators.required])]
    })
  }

  enviarCredenciais(){
    if(!this.form) return;

    if(this.form.invalid) {
      this.toastr.error('Email e senha são obrigatórios', 'Erro');
      return
    }
    const credenciais = {
      email: this.form.get('email')?.value,
      senha: this.form.get('senha')?.value
    };

    console.log(credenciais);
  }
}
