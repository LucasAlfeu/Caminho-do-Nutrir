import { Component } from '@angular/core';
import { MenuLateal } from '../../components/menu-lateal/menu-lateal';
import { FooterSecundario } from '../../components/footer-secundario/footer-secundario';
import { RouterOutlet } from '@angular/router';

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

}
