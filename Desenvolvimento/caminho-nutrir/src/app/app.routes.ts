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
// Importe aqui o seu componente de Layout que contém a estrutura (header/menu/footer)
// import { PainelLayoutComponent } from './layout/painel-layout/painel-layout.component';

// Crie (ou importe) outros componentes que ficarão DENTRO do painel
// import { PerfilPainel } from './pages/painel/perfil/perfil'; 
// import { ConfiguracoesPainel } from './pages/painel/configuracoes/configuracoes'; 


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
                path: 'liberar-usuario',
                component: LiberarUsuario,
            },
        ]
    }
];