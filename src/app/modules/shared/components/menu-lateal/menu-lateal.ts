import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../../class/Usuario';
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from '../../../../services/Autenticacao/autenticacao-service';

@Component({
  selector: 'app-menu-lateal',
  imports: [CommonModule],
  templateUrl: './menu-lateal.html',
  styleUrl: './menu-lateal.css',
})
export class MenuLateal {

  @Input() usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['usuario']){
      this.usuario = changes['usuario'].currentValue;
    }
  }

  validaAdm(){
    return this.autenticacaoService.verificaAdministrador()
  }

  sair(){
    localStorage.clear();
    this.router.navigate(['/entrar']);
  }
}
