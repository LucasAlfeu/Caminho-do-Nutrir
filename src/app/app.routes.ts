import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Entrar } from './pages/entrar/entrar';
import { Cadastrar } from './pages/cadastrar/cadastrar';

// Componentes do Painel
import { Painel } from './pages/painel/painel';
import { PainelLayoutComponent } from './components/painel-layout-component/painel-layout-component';
import { CadastrarBanco } from './pages/cadastrar-banco/cadastrar-banco';
import { LiberarUsuario } from './pages/liberar-usuario/liberar-usuario';
import { Mapa } from './pages/mapa/mapa';
import { Perfil } from './pages/perfil/perfil';


export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'entrar',
    component: Entrar
  },
  {
    path: 'cadastrar',
    component: Cadastrar
  },
  {
    path: 'mapa',
    component: Mapa
  },

  {
    path: 'painel',
    component: PainelLayoutComponent,
    children: [
      {
        path: '',
        component: Painel,
        pathMatch: 'full'
      },
      {
        path: 'cadastrar-banco',
        component: CadastrarBanco,
      },
      {
        path: 'cadastrar-banco/editar/:id',
        component: CadastrarBanco
      },
      {
        path: 'liberar-usuario',
        component: LiberarUsuario,
      },
      {
        path: 'perfil',
        component: Perfil,
      },
    ]
  }
];
