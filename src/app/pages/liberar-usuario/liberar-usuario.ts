import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/Usuario/usuario-service';
import { Usuario } from '../../class/Usuario';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-liberar-usuario',
  imports: [CommonModule],
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

  constructor(
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(){
    this.listarUsuarios();
  }

  ngAfterViewInit() {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe({
      next: (res) => {
        this.listUsuarios = res.body ? [...res.body] : [];
        const totalCount = res.headers.get('X-Total-Count');
        this.totalUser = totalCount ? parseInt(totalCount, 10) : 0;
        console.log(res)
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
        console.log(res)
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
        console.log(res)
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
        console.log(res)
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
        console.log(res)
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
}
