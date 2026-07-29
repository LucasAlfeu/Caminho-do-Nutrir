import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormIndicarEstacao } from '../../components/form-indicar-estacao/form-indicar-estacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicar-estacao',
  imports: [FormIndicarEstacao],
  templateUrl: './indicar-estacao.html',
  styleUrl: './indicar-estacao.css',
})
export class IndicarEstacao {

  constructor(private router: Router){}


  cadastrar(dados: any){
    console.log(dados)
  }


}
