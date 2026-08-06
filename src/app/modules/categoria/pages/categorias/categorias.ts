import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../../../../services/Categoria/categoria';
import { Categoria } from '../../../../class/Categoria';
import { CommonModule } from '@angular/common';
import { ModalCategoria } from '../../components/modal-categoria/modal-categoria';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, ModalCategoria, ReactiveFormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  @ViewChild('modalCategoria') modalCategoria!: ModalCategoria;

  listCategorias: Categoria[] = [];
  totalCategoria: string = '';
  form!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    protected fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.createForm();
    this.buscarCategorias();
  }

  createForm(){
    this.form = this.fb.group({
      filtroBanco: ['']
    })
  }

  buscarCategorias(filterNomeCategoria?: string) {
    const params = {
      filter: filterNomeCategoria ? filterNomeCategoria : ''
    }
    this.categoriaService.listarCategorias(params).subscribe({
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

  filtrarPontos(){
    if(!this.form) return;
    const filtroString = this.form.get('filtroBanco')?.value

    if(filtroString) this.buscarCategorias(filtroString);
  }

  limparFiltro(){
    this.form.reset();
    this.buscarCategorias();
  }
}
