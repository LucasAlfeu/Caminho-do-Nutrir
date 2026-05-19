import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-entrar',
  imports: [ ReactiveFormsModule ],
  templateUrl: './entrar.html',
  styleUrl: './entrar.css',
})
export class Entrar {

  form!: FormGroup;

  constructor(
    protected fb: FormBuilder
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
    if(!this.form){
      console.log("Não possui o form")
      return
    }
    const credenciais = {
      email: this.form.get('email')?.value,
      senha: this.form.get('senha')?.value
    }

    console.log(credenciais)
  }
}
