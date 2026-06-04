import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {FormularioCadastrarUsuario} from '../../components/formulario-cadastrar-usuario'

@Component({
  selector: 'app-cadastrar',
  imports: [ReactiveFormsModule, CommonModule, FormularioCadastrarUsuario],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css',
})
export class Cadastrar {
  
}
