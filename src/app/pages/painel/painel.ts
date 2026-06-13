import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../class/Usuario';
import { AutenticacaoService } from '../../services/Autenticacao/autenticacao-service';
import { BancoLeiteService } from '../../services/BancoLeite/banco-leite-service';
import { BancoLeite } from '../../class/BancoLeite';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-painel',
  imports: [CommonModule, DatePipe],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {
  usuario: Usuario | null = null;
  listBancos: BancoLeite[] = []

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private bancoLeiteService: BancoLeiteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    const dadosUsuario = this.autenticacaoService.verificaLogin();

    if (dadosUsuario) {
      this.usuario = Usuario.map(dadosUsuario);
    }

    this.listarBancosLeite();
  }

  listarBancosLeite(){
    this.bancoLeiteService.listBancoLeite().subscribe({
      next: (res) => {
        this.listBancos = res;
      },
      error: (err) => {
        this.toastr.error("Não foi possível carregar os Bancos de Leite")
      }
    })
  }

  goTo() {
    this.router.navigate(['painel/cadastrar-banco']);
  }
}
