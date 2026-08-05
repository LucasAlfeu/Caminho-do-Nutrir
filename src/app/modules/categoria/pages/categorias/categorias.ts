import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../../../../services/Categoria/categoria';
import { Categoria } from '../../../../class/Categoria';
import { CommonModule } from '@angular/common';
import { ModalCategoria } from '../../components/modal-categoria/modal-categoria';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, ModalCategoria],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  @ViewChild('modalCategoria') modalCategoria!: ModalCategoria;

  listCategorias: Categoria[] = [];
  totalCategoria: string = '';

  constructor(private categoriaService: CategoriaService, private toastr: ToastrService,) {

  }

  ngOnInit() {
    this.buscarCategorias();
  }

  buscarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (res) => {
        this.totalCategoria = res.headers.get("x-total-count") || "0"
        this.listCategorias = res.body || []
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  openModalCategoria(tipoAbertura: number, categoriaSelecionada?: Categoria) {
    if (tipoAbertura == 1) {
      this.modalCategoria.abrirModal(tipoAbertura)
    } else {
      this.modalCategoria.abrirModal(tipoAbertura, categoriaSelecionada)
    }
  }

  salvar(dados: any) {
    const isEdicao = !!dados.id;

    const operacao$ = isEdicao
      ? this.categoriaService.atualizarCategoria(dados.id, dados)
      : this.categoriaService.cadastrarCategoria(dados);

    const mensagemSucesso = isEdicao ? "Categoria atualizada com sucesso" : "Categoria cadastrada com sucesso";
    const mensagemErroFallback = isEdicao ? "Não foi possível atualizar" : "Não foi possível cadastrar";

    operacao$.subscribe({
      next: () => {
        this.buscarCategorias();
        this.toastr.success(mensagemSucesso, "Sucesso");
      },
      error: (err) => {
        const mensagemErroBackend = err.error?.errors?.default;

        if (mensagemErroBackend) {
          this.toastr.error(mensagemErroBackend, "Erro");
        } else {
          this.toastr.error(mensagemErroFallback, "Erro");
        }
      }
    });
  }
}
