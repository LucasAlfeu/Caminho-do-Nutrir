import { Component } from '@angular/core';
import { Header } from '../../../app/modules/shared/components/header/header';
import { FooterMain } from '../../../app/modules/shared/components/footer-main/footer-main';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    FooterMain,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
