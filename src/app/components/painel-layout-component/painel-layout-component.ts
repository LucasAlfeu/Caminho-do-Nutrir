import { Component } from '@angular/core';
import { MenuLateal } from '../../components/menu-lateal/menu-lateal';
import { FooterSecundario } from '../../components/footer-secundario/footer-secundario';
import { RouterOutlet } from '@angular/router';
import { Usuario } from '../../class/Usuario';
import { AutenticacaoService } from '../../services/Autenticacao/autenticacao-service';

@Component({
  selector: 'app-painel-layout-component',
  imports: [
    MenuLateal,
    FooterSecundario,
    RouterOutlet,
  ],
  templateUrl: './painel-layout-component.html',
  styleUrl: './painel-layout-component.css',
})
export class PainelLayoutComponent {

  usuario: Usuario | null = null;

  constructor(
    private autenticacaoService: AutenticacaoService,
  ) { }

  ngOnInit() {
    const dadosUsuario = this.autenticacaoService.verificaLogin();
    if (dadosUsuario) {
      this.usuario = Usuario.map(dadosUsuario);
    }
  }
}
