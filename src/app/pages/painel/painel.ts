import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel',
  imports: [],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {
  nomeUsuario: string = 'Lucas Alfeu da Silva Oliveira'

  constructor(private router: Router) {}

  goTo(){
    this.router.navigate(['painel/cadastrar-banco']);
  }
}
