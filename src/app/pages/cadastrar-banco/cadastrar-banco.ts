import { ChangeDetectorRef, Component } from '@angular/core';
import { EstadosService } from '../../services/Estados/estado-service';
import { Estado } from '../../class/Estado';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Municipio } from '../../class/Municipio';
import { Cep } from '../../class/Cep';
import { ToastrService } from 'ngx-toastr';
import { BancoLeiteService } from '../../services/BancoLeite/banco-leite-service';

@Component({
  selector: 'app-cadastrar-banco',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-banco.html',
  styleUrl: './cadastrar-banco.css',
})
export class CadastrarBanco {

  listaDeEstados: Estado[] = [];
  listaDeMunicipios: Municipio[] = [];
  cadastroBancoForm!: FormGroup;
  dadosCep: Cep;

  constructor(
    protected estadosService: EstadosService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService,
    protected fb: FormBuilder,
    private bancoLeiteService: BancoLeiteService,
  ) {
    this.dadosCep = new Cep();
  }

  ngOnInit() {
    this.createForm();
    this.carregaEstados();
  }

  createForm() {
    this.cadastroBancoForm = this.fb.group({
      nome: ['', Validators.compose([Validators.required])],
      cep: ['', Validators.compose([Validators.required])],
      logradouro: ['', Validators.compose([Validators.required])],
      numero: ['', Validators.compose([Validators.required])],
      complemento: [''],
      bairro: ['', Validators.compose([Validators.required])],
      municipio: [null, Validators.compose([Validators.required])],
      uf: [null, Validators.compose([Validators.required])],
      latitude: ['', Validators.compose([Validators.required])],
      longitude: ['', Validators.compose([Validators.required])],
      descricao: ['']
    })

    this.cadastroBancoForm.get('municipio')?.disable();
  }

  carregaEnderecoViaCep() {
    const cep = this.cadastroBancoForm.get('cep')?.value
    if (cep) {
      this.estadosService.buscaDadosCep(cep).subscribe({
        next: (res: Cep) => {
          this.dadosCep = res
          this.preencheFormulario()
        }
      })
    } else {
      return;
    }
  }

  preencheFormulario() {
    const siglaUf = this.dadosCep.uf;
    const estadoEncontrado = this.listaDeEstados.find(estado => estado.sigla === siglaUf);
    this.carregarMunicipios(String(estadoEncontrado?.sigla))
    setTimeout(() => {

      if (!estadoEncontrado) {
        console.error("Estado não encontrado na lista.");
        return;
      }

      this.cadastroBancoForm.get('uf')?.setValue(estadoEncontrado.id);

      const cidadeEncontrada = this.listaDeMunicipios.find(
        cidade => cidade.nome.toLowerCase() === this.dadosCep.localidade.toLowerCase()
      );

      if (cidadeEncontrada) {
        this.cadastroBancoForm.get('municipio')?.setValue(cidadeEncontrada.id);
      } else {
        console.warn("Cidade não encontrada na lista de municípios carregada.");
      }

      this.cadastroBancoForm.get('logradouro')?.setValue(this.dadosCep.logradouro);
      this.cadastroBancoForm.get('bairro')?.setValue(this.dadosCep.bairro);

      this.desabilitaCamposEndereco();
    }, 300)
  }

  carregaEstados() {
    this.estadosService.buscarEstados().subscribe({
      next: (estados: Estado[]) => {
        this.listaDeEstados = estados;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar estados:', err);
      },
      complete: () => {
        console.log('Busca de estados completa.');
      }
    });
  }

  carregarMunicipios(uf: string) {
    this.estadosService.buscarMunicipios(uf).subscribe({
      next: (municipios: Municipio[]) => {
        this.listaDeMunicipios = municipios;
        this.cdRef.detectChanges();
      },
      error: (err: any) => {
        console.error("Erro ao buscar municípios: ", err)
      },
      complete: () => {
        console.log('Busca de estados completa.');
      }
    })
  }

  carregaDadosMunicipio() {
    const UfSelecionada = this.cadastroBancoForm.get('uf')?.value

    if (UfSelecionada !== null) {
      const estadoEncontrado = this.listaDeEstados.find(estado => estado.id == UfSelecionada);
      this.carregarMunicipios(String(estadoEncontrado?.sigla))
      this.cadastroBancoForm.get('municipio')?.enable();
    } else {
      return
    }
  }

  desabilitaCamposEndereco() {
    this.cadastroBancoForm.get('uf')?.disable();
    this.cadastroBancoForm.get('municipio')?.disable();
    this.cadastroBancoForm.get('logradouro')?.disable();
    this.cadastroBancoForm.get('bairro')?.disable();
  }

  salvar() {
    this.cadastroBancoForm.markAllAsTouched();

    if (!this.cadastroBancoForm.valid) {
      this.toastr.error("Revise os campos")
      return
    }

    let dadosForm = this.cadastroBancoForm.getRawValue();
    const auxMunicipio = this.listaDeMunicipios.find((mun) => {
      return mun.id === Number(dadosForm['municipio'])
    })

    const auxUf = this.listaDeEstados.find((uf) => {
      return uf.id === Number(dadosForm['uf'])
    })

    dadosForm['municipio'] = auxMunicipio?.nome
    dadosForm['uf'] = auxUf?.sigla
    dadosForm['dataUltimaAtualizacao'] = new Date().toLocaleDateString('sv-SE');

    this.bancoLeiteService.cadastrarBancoLeite(dadosForm).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success("Banco cadastrado com sucesso")
        this.cadastroBancoForm.reset();
      },
      error: (err) => {
        const errosValidacao = err.error?.errors?.body;

        if (errosValidacao) {
          Object.keys(errosValidacao).forEach((campo) => {
            const mensagem = errosValidacao[campo];
            this.toastr.error(mensagem, 'Erro de Validação');
          });
        } else {
          this.toastr.error('Ocorreu um erro ao tentar cadastrar.', 'Erro');
        }
      }
    })
  }
}
