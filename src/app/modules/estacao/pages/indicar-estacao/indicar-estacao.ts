import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormIndicarEstacao } from '../../components/form-indicar-estacao/form-indicar-estacao';
import { Router } from '@angular/router';
import { BancoLeiteService } from '../../../../services/BancoLeite/banco-leite-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-indicar-estacao',
  imports: [FormIndicarEstacao],
  templateUrl: './indicar-estacao.html',
  styleUrl: './indicar-estacao.css',
})
export class IndicarEstacao {

  environment = environment;

  @ViewChild('formSolicitar') formSolicitar!: FormIndicarEstacao;

  constructor(
    private router: Router,
    private estacaoService: BancoLeiteService,
    private toastr: ToastrService,
  ){}


  cadastrar(dados: any){
    this.estacaoService.solicitarEstacao(dados).subscribe({
      next: (res) => {
        this.toastr.success("Tudo certo com a sua solicitação! Nossa equipe já está analisando e retornará em breve.")
        this.formSolicitar.limparFormulário();
        setTimeout(()=>{
          this.router.navigate(['/']);
        }, 500)
      }, error: (err) => {
        console.log(err)
        this.toastr.error("Não foi possível cadastrar uma solicitação")
      }
    })
  }


}
