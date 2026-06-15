import { ChangeDetectorRef, Component } from '@angular/core';
import { FormularioCadastrarUsuario } from '../../components/formulario-cadastrar-usuario/formulario-cadastrar-usuario';
import { UsuarioService } from '../../services/Usuario/usuario-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-perfil',
  imports: [FormularioCadastrarUsuario],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) { }

  atualizar(dados: any) {
    let dadosFinal: any;

    if (dados.senha === "") {
      const { senha, ...dadosEnvio } = dados;
      dadosFinal = dadosEnvio;
    } else {
      dadosFinal = dados;
    }

    this.usuarioService.atualizarUsuario(dadosFinal).subscribe({
      next: (res) => {
        const usuarioLocal = localStorage.getItem("usuario");

        if (usuarioLocal) {
          const aux = JSON.parse(usuarioLocal);

          const novoUserObjeto = {
            ...res.body,
            accessToken: aux.accessToken
          };

          localStorage.setItem("usuario", JSON.stringify(novoUserObjeto));
        }

        this.toastr.success("Usuário atualizado com sucesso");
        this.cdr.detectChanges();
      },
      error: (err) => {
        const errosValidacao = err.error?.errors?.body;

        if (errosValidacao) {
          Object.keys(errosValidacao).forEach((campo) => {
            const mensagem = errosValidacao[campo];
            this.toastr.error(mensagem);
          });
        } else {
          this.toastr.error('Ocorreu um erro ao tentar atualizar.', 'Erro');
        }
      }
    });
  }
}
