import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { EstadosService } from '../../../../services/Estados/estado-service';
import { ToastrService } from 'ngx-toastr';
import { Cep } from '../../../../class/Cep';
import { Municipio } from '../../../../class/Municipio';
import { Estado } from '../../../../class/Estado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-indicar-estacao',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './form-indicar-estacao.html',
  styleUrl: './form-indicar-estacao.css',
})
export class FormIndicarEstacao {

  @Output() public cadastrar = new EventEmitter();

  form!: FormGroup;
  dadosCep: Cep;
  listaDeMunicipios: Municipio[] = [];
  listaDeEstados: Estado[] = [];

  constructor(
    protected estadosService: EstadosService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService,
    protected fb: FormBuilder,
    private router: Router,
  ) {
    this.dadosCep = new Cep();
  }

  ngOnInit(): void {
    this.createForm();
    this.carregaEstados();
  }

  createForm(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      municipio: [{ value: null, disabled: true }, Validators.required],
      uf: [null, Validators.required],
      emailUsuario: [''],
      nomeUsuario: [''],
      classificacao: ['', Validators.required],
      descricao: [''],
      telefone: [''],
    });
  }

  limparFormulário(){
    this.form.reset();
  }

  carregaEnderecoViaCep(): void {
    let cep = this.form.get('cep')?.value;
    if (!cep) return;

    cep = cep.replace(/\D/g, '');

    this.estadosService.buscaDadosCep(cep).subscribe({
      next: (res: Cep) => {
        this.dadosCep = res;
        this.preencheFormulario();
      },
      error: () => this.toastr.error("Erro ao buscar o CEP informado.")
    });
  }

  preencheFormulario(): void {
    const siglaUf = this.dadosCep.uf;
    const estadoEncontrado = this.listaDeEstados.find(estado => estado.sigla === siglaUf);

    if (!estadoEncontrado) {
      console.error("Estado não encontrado na lista.");
      return;
    }

    this.estadosService.buscarMunicipios(String(estadoEncontrado.sigla)).subscribe({
      next: (municipios: Municipio[]) => {
        this.listaDeMunicipios = municipios;

        this.form.patchValue({
          uf: estadoEncontrado.id,
          logradouro: this.dadosCep.logradouro,
          bairro: this.dadosCep.bairro
        });

        const cidadeEncontrada = this.listaDeMunicipios.find(
          cidade => cidade.nome.toLowerCase() === this.dadosCep.localidade.toLowerCase()
        );

        if (cidadeEncontrada) {
          this.form.get('municipio')?.setValue(cidadeEncontrada.id);
        }

        this.desabilitaCamposEndereco();
        this.cdRef.detectChanges();
      },
      error: (err) => console.error("Erro ao buscar municípios através do CEP: ", err)
    });
  }

  desabilitaCamposEndereco(): void {
    this.form.get('uf')?.disable();
    this.form.get('municipio')?.disable();
    this.form.get('logradouro')?.disable();
    this.form.get('bairro')?.disable();
  }

  carregaDadosMunicipio(): void {
    const ufSelecionada = this.form.get('uf')?.value;
    if (ufSelecionada === null || ufSelecionada === undefined) return;

    const estadoEncontrado = this.listaDeEstados.find(estado => estado.id == ufSelecionada);
    if (estadoEncontrado) {
      this.estadosService.buscarMunicipios(String(estadoEncontrado.sigla)).subscribe({
        next: (municipios: Municipio[]) => {
          this.listaDeMunicipios = municipios;
          this.form.get('municipio')?.enable();
          this.cdRef.detectChanges();
        }
      });
    }
  }

  carregaEstados(): void {
    this.estadosService.buscarEstados().subscribe({
      next: (estados: Estado[]) => {
        this.listaDeEstados = estados;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar estados:', err)
    });
  }

  voltar(): void {
    this.router.navigate(['/']);
  }

  _cadastrar() {
    this.form.markAllAsTouched();

    let dadosFormulario = this.form.getRawValue();
    Object.keys(dadosFormulario).forEach(element => {
      const valor = dadosFormulario[element];

      if (valor === '' || valor === null) {
        delete dadosFormulario[element];
      }
    });

    const auxMunicipio = this.listaDeMunicipios.find(mun => mun.id === Number(dadosFormulario['municipio']));
    const auxUf = this.listaDeEstados.find(uf => uf.id === Number(dadosFormulario['uf']));

    dadosFormulario['municipio'] = auxMunicipio?.nome;
    dadosFormulario['uf'] = auxUf?.sigla;

    this.cadastrar.emit(dadosFormulario);
  }
}
