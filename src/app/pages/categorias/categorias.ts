import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../../services/Categoria/categoria';
import { Categoria } from '../../class/Categoria';
import { CommonModule } from '@angular/common';
import { ModalCategoria } from '../../components/modal-categoria/modal-categoria';

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

  constructor( private categoriaService: CategoriaService) {

  }

  ngOnInit() {
    console.log("Iniciou")
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

  salvar(e: any){
    console.log("Componente pai", e)
  }
}
