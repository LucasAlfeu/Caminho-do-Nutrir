import { Component } from '@angular/core';
import { FormularioCadastrarUsuario } from '../../../usuario/components/formulario-cadastrar-usuario/formulario-cadastrar-usuario';
import { CadastrarBanco } from '../cadastrar-banco/cadastrar-banco';

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
