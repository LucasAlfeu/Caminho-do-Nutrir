import { Component } from '@angular/core';
import { FormIndicarEstacao } from '../../components/form-indicar-estacao/form-indicar-estacao';

@Component({
  selector: 'app-indicar-estacao',
  imports: [FormIndicarEstacao],
  templateUrl: './indicar-estacao.html',
  styleUrl: './indicar-estacao.css',
})
export class IndicarEstacao {


  cadastrar(dados: any){
    console.log(dados)
  }
}
