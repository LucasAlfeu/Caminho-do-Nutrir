import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../class/Usuario';

@Component({
  selector: 'app-menu-lateal',
  imports: [],
  templateUrl: './menu-lateal.html',
  styleUrl: './menu-lateal.css',
})
export class MenuLateal {

  @Input() usuario: Usuario | null = null;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['usuario']){
      this.usuario = changes['usuario'].currentValue;
    }
  }

  sair(){
    localStorage.clear();
    this.router.navigate(['/entrar']);
  }
}
