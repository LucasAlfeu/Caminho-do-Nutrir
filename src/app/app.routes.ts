import { Routes } from '@angular/router';
import { Home } from '../themes/caminho-nutrir/home/home';
import { Entrar } from './modules/usuario/pages/entrar/entrar';
import { Cadastrar } from './modules/usuario/pages/cadastrar/cadastrar';
import { environment } from './environments/environment';

// Componentes do Painel
import { Painel } from './modules/usuario/pages/painel/painel';
import { PainelLayoutComponent } from './modules/shared/components/painel-layout-component/painel-layout-component';
import { CadastrarBanco } from './modules/estacao/pages/cadastrar-banco/cadastrar-banco';
import { LiberarUsuario } from './modules/usuario/pages/liberar-usuario/liberar-usuario';
import { Mapa } from './modules/mapa/pages/mapa/mapa';
import { Perfil } from './modules/usuario/pages/perfil/perfil';
import { Categorias } from './modules/categoria/pages/categorias/categorias';
import { IndicarEstacao } from './modules/estacao/pages/indicar-estacao/indicar-estacao';
import { ValidarSolicitacao } from './modules/estacao/pages/validar-solicitacao/validar-solicitacao';
import { ComoDoar } from './modules/shared/pages/como-doar/como-doar';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => {
      if (environment.tenant === 'caminho-nutrir') {
        return import('../themes/caminho-nutrir/home/home')
          .then(c => c.Home);
      }

      return import('../themes/demo/home-demo/home-demo')
        .then(c => c.HomeDemo);
    }
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
    path: 'indicacao',
    component: IndicarEstacao
  },
  {
    path: 'saiba-mais',
    component: ComoDoar
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
      {
        path: 'categorias',
        component: Categorias,
      },
      {
        path: 'validar-solicitacao',
        component: ValidarSolicitacao,
      },
    ]
  }
];
