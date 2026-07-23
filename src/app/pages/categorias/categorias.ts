import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../../services/Categoria/categoria';
import { Categoria } from '../../class/Categoria';
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

  constructor( private categoriaService: CategoriaService, private toastr: ToastrService,) {

  }

  ngOnInit() {
    this.buscarCategorias();
  }

  buscarCategorias(){
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

  openModalCategoria() {
    this.modalCategoria.abrirModal()
  }

  salvar(dados: any){
    console.log("Componente pai", dados)

    this.categoriaService.cadastrarCategoria(dados).subscribe({
      next: (res) => {
        console.log(res);
        this.buscarCategorias();
        this.toastr.success("Categoria cadastrada com sucesso", "Sucesso")
      },
      error: (err) => {
        if(err.error && err.error.errors && err.error.errors.default) {
          this.toastr.error(err.error.errors.default, "Erro")
          return;
        }
        this.toastr.error("Não foi possível cadastrar")
      }
    })
  }
}
