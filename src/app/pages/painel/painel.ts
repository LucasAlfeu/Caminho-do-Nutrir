import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../class/Usuario';
import { AutenticacaoService } from '../../services/Autenticacao/autenticacao-service';

@Component({
  selector: 'app-painel',
  imports: [],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {
  usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
  ) { }

  ngOnInit() {
    const dadosUsuario = this.autenticacaoService.verificaLogin();

    if (dadosUsuario) {
      this.usuario = Usuario.map(dadosUsuario);
    }
  }

  goTo() {
    this.router.navigate(['painel/cadastrar-banco']);
  }
}
