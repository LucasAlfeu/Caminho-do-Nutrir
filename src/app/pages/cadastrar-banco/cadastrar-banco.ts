import { ChangeDetectorRef, Component } from '@angular/core';
import { EstadosService } from '../../services/Estados/estado-service';
import { Estado } from '../../class/Estado';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Municipio } from '../../class/Municipio';
import { Cep } from '../../class/Cep';

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
    protected fb: FormBuilder
  ) {
    this.dadosCep = new Cep();
  }

  ngOnInit() {
    this.createForm();
    this.carregaEstados();
  }

  createForm() {
    this.cadastroBancoForm = this.fb.group({
      nome: [''],
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      localidade: [null],
      uf: [null],
      latitude: [''],
      longitude: [''],
      descricao: ['']
    })

    this.cadastroBancoForm.get('localidade')?.disable();
  }

  carregaEnderecoViaCep() {
    const cep = this.cadastroBancoForm.get('cep')?.value
    console.log("clicou", cep)
    if (cep) {
      this.estadosService.buscaDadosCep(cep).subscribe({
        next: (res: Cep) => {
          this.dadosCep = res
          this.preencheFormulario()
          console.log(this.dadosCep)
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
      console.log("municipiuos", this.listaDeMunicipios)

      if (!estadoEncontrado) {
        console.error("Estado não encontrado na lista.");
        return;
      }

      this.cadastroBancoForm.get('uf')?.setValue(estadoEncontrado.id);

      const cidadeEncontrada = this.listaDeMunicipios.find(
        cidade => cidade.nome.toLowerCase() === this.dadosCep.localidade.toLowerCase()
      );

      if (cidadeEncontrada) {
        this.cadastroBancoForm.get('localidade')?.setValue(cidadeEncontrada.id);
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
        console.log(this.listaDeEstados)
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
      this.cadastroBancoForm.get('localidade')?.enable();
    } else {
      return
    }
  }

  desabilitaCamposEndereco() {
    this.cadastroBancoForm.get('uf')?.disable();
    this.cadastroBancoForm.get('localidade')?.disable();
    this.cadastroBancoForm.get('logradouro')?.disable();
    this.cadastroBancoForm.get('bairro')?.disable();
  }

  salvar() {
    if (!this.cadastroBancoForm.valid) {
      return
    }

    let dadosForm = this.cadastroBancoForm.getRawValue();

    console.log(dadosForm)
  }
}
