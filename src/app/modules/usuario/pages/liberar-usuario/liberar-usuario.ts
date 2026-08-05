import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../services/Usuario/usuario-service';
import { Usuario } from '../../../../class/Usuario';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-liberar-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './liberar-usuario.html',
  styleUrl: './liberar-usuario.css',
})
export class LiberarUsuario {

  @ViewChild('modalConfirmarAcao') modalElement!: ElementRef;
  private modalInstance: any;

  listUsuarios: Usuario[] | null = null;
  totalUser: number = 0;

  aberturaModal: number = 0;
  usuarioSelecionado: Usuario | null = null;
  form!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    protected fb: FormBuilder,
  ) { }

  ngOnInit(){
    this.createForm();
    this.listarUsuarios();
  }

  createForm(){
    this.form = this.fb.group({
      filtroBanco: ['']
    })
  }

  ngAfterViewInit() {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  listarUsuarios(dados?: any){

    const params = {
      filter: dados?.nomeUsuario ? dados.nomeUsuario : ''
    }
    this.usuarioService.listarUsuarios(params).subscribe({
      next: (res) => {
        this.listUsuarios = res.body ? [...res.body] : [];
        const totalCount = res.headers.get('X-Total-Count');
        this.totalUser = totalCount ? parseInt(totalCount, 10) : 0;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  openModalAprovarAcao(abertura: any, user: any){
    this.aberturaModal = abertura
    this.usuarioSelecionado = user
    this.modalInstance.show();
  }

  fecharModalAprorarAcao(){
    this.modalInstance.hide();
  }

  habilitarUsuario(usuario: any){
    this.usuarioService.habilitarUsuario(usuario.id).subscribe({
      next: (res) => {
        this.toastr.success("Usuário liberado com sucesso");
        this.listarUsuarios();
        this.fecharModalAprorarAcao();
      },
      error: (err) => {
        console.log(err)
        this.toastr.error(err.error.errors.default)
      }
    })
  }

  tornarADM(usuario: any){
    this.usuarioService.tornarAdm(usuario.id).subscribe({
      next: (res) => {
        this.toastr.success(`O usuário ${usuario.nome} agora é administrador`);
        this.listarUsuarios();
        this.fecharModalAprorarAcao();
      },
      error: (err) => {
        console.log(err)
        this.toastr.error(err.error.errors.default)
      }
    })
  }

  desabilitarUsuario(usuario: any){
    this.usuarioService.desabilitarUsuario(usuario.id).subscribe({
      next: (res) => {
        this.toastr.success("Usuário desabilitado com sucesso")
        this.listarUsuarios();
        this.fecharModalAprorarAcao();
      },
      error: (err) => {
        console.log(err)
        this.toastr.error(err.error.errors.default)
      }
    })
  }

  deletarUsuario(usuario: any){
    this.usuarioService.deletarUsuario(usuario.id).subscribe({
      next: (res) => {
        this.toastr.success("Usuário desabilitado com sucesso")
        this.listarUsuarios();
        this.fecharModalAprorarAcao();
      },
      error: (err) => {
        console.log(err)
        this.toastr.error(err.error.errors.default)
      }
    })
  }

  filtrarPontos(){
    if(!this.form) return;

    const dadosFiltro = {
      nomeUsuario: this.form.get('filtroBanco')?.value
    }


    this.listarUsuarios(dadosFiltro);
  }

  limparFiltro(){
    this.form.reset();
    this.listarUsuarios();
  }
}
