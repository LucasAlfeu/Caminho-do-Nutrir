import { Component } from '@angular/core';
import { FormularioCadastrarUsuario } from '../../components/formulario-cadastrar-usuario/formulario-cadastrar-usuario';


@Component({
  selector: 'app-perfil',
  imports: [FormularioCadastrarUsuario],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

}
