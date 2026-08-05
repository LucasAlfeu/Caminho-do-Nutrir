import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from '../../../../services/Autenticacao/autenticacao-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(
    private autenticacaoService: AutenticacaoService,
  ) { }

  validaUsuarioLogado(){
    return this.autenticacaoService.validaUsuarioLogado()
  }
}
