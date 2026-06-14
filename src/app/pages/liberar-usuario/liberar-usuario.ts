import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/Usuario/usuario-service';
import { Usuario } from '../../class/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liberar-usuario',
  imports: [CommonModule],
  templateUrl: './liberar-usuario.html',
  styleUrl: './liberar-usuario.css',
})
export class LiberarUsuario {

  listUsuarios: Usuario[] | null = null;
  totalUser: number = 0;

  constructor(
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(){
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe({
      next: (res) => {
        this.listUsuarios = res.body;
        const totalCount = res.headers.get('X-Total-Count');
        this.totalUser = totalCount ? parseInt(totalCount, 10) : 0;
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
