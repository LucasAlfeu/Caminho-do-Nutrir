import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { AutenticacaoService } from '../../../../services/Autenticacao/autenticacao-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  environment = environment;

  constructor(
    private autenticacaoService: AutenticacaoService,
  ) { }

  validaUsuarioLogado(){
    return this.autenticacaoService.validaUsuarioLogado()
  }
}
