import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateal',
  imports: [],
  templateUrl: './menu-lateal.html',
  styleUrl: './menu-lateal.css',
})
export class MenuLateal {

  constructor(private router: Router) { }

  sair(){
    localStorage.clear();
    this.router.navigate(['/entrar']);
  }
}
