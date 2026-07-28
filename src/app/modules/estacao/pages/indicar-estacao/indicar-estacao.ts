import { Component } from '@angular/core';
import { FormularioCadastrarUsuario } from '../../../../components/formulario-cadastrar-usuario/formulario-cadastrar-usuario';
import { CadastrarBanco } from '../../../../pages/cadastrar-banco/cadastrar-banco';

@Component({
  selector: 'app-indicar-estacao',
  imports: [],
  templateUrl: './indicar-estacao.html',
  styleUrl: './indicar-estacao.css',
})
export class IndicarEstacao {


  cadastrar(dados: any){
    console.log(dados)
  }
}
