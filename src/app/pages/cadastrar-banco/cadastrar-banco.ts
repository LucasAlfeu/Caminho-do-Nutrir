import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { EstadosService } from '../../services/Estados/estado-service';
import { BancoLeiteService } from '../../services/BancoLeite/banco-leite-service';
import { Estado } from '../../class/Estado';
import { Municipio } from '../../class/Municipio';
import { Cep } from '../../class/Cep';
import { BancoLeite } from '../../class/BancoLeite';

@Component({
  selector: 'app-cadastrar-banco',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-banco.html',
  styleUrl: './cadastrar-banco.css',
})
export class CadastrarBanco implements OnInit {

  listaDeEstados: Estado[] = [];
  listaDeMunicipios: Municipio[] = [];
  cadastroBancoForm!: FormGroup;
  dadosCep: Cep;
  bancoLeite: BancoLeite | null = null;
  indEdicao: boolean = false;

  constructor(
    protected estadosService: EstadosService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService,
    protected fb: FormBuilder,
    private bancoLeiteService: BancoLeiteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.dadosCep = new Cep();
  }

  ngOnInit(): void {
    this.indEdicao = this.router.url.includes("/editar/");
    this.createForm();
    this.carregaEstados();
  }

  createForm(): void {
    this.cadastroBancoForm = this.fb.group({
      nome: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      municipio: [{ value: null, disabled: true }, Validators.required],
      uf: [null, Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      descricao: ['']
    });
  }

  carregaEstados(): void {
    this.estadosService.buscarEstados().subscribe({
      next: (estados: Estado[]) => {
        this.listaDeEstados = estados;
        this.cdRef.detectChanges();

        if (this.indEdicao) {
          this.buscarBanco();
        }
      },
      error: (err) => console.error('Erro ao buscar estados:', err)
    });
  }

  buscarBanco(): void {
    const idBancoLeite = Number(this.route.snapshot.paramMap.get('id'));
    if (!idBancoLeite || idBancoLeite <= 0) return;

    this.bancoLeiteService.buscarBancoLeite(idBancoLeite).subscribe({
      next: (res) => {
        this.bancoLeite = BancoLeite.map(res);
        this.atualizaFormulario();
      },
      error: () => this.toastr.error("Não foi possível recuperar os dados do banco de leite")
    });
  }

  atualizaFormulario(): void {
    if (!this.bancoLeite) return;

    this.cadastroBancoForm.patchValue(this.bancoLeite);
    const estadoSalvo = this.listaDeEstados.find(e => e.sigla === this.bancoLeite?.uf);

    if (estadoSalvo) {
      this.cadastroBancoForm.get('uf')?.setValue(estadoSalvo.id);

      this.estadosService.buscarMunicipios(estadoSalvo.sigla).subscribe({
        next: (municipios) => {
          this.listaDeMunicipios = municipios;
          this.cadastroBancoForm.get('municipio')?.enable();

          const cidadeSalva = this.listaDeMunicipios.find(
            m => m.nome.toLowerCase() === this.bancoLeite?.municipio.toLowerCase()
          );

          if (cidadeSalva) {
            this.cadastroBancoForm.get('municipio')?.setValue(cidadeSalva.id);
          }

          this.cadastroBancoForm.get('logradouro')?.setValue(this.bancoLeite?.logradouro);
          this.cadastroBancoForm.get('bairro')?.setValue(this.bancoLeite?.bairro);
          this.cdRef.detectChanges();
        }
      });
    }
  }

  carregaEnderecoViaCep(): void {
    let cep = this.cadastroBancoForm.get('cep')?.value;
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

        this.cadastroBancoForm.patchValue({
          uf: estadoEncontrado.id,
          logradouro: this.dadosCep.logradouro,
          bairro: this.dadosCep.bairro
        });

        const cidadeEncontrada = this.listaDeMunicipios.find(
          cidade => cidade.nome.toLowerCase() === this.dadosCep.localidade.toLowerCase()
        );

        if (cidadeEncontrada) {
          this.cadastroBancoForm.get('municipio')?.setValue(cidadeEncontrada.id);
        }

        this.desabilitaCamposEndereco();
        this.cdRef.detectChanges();
      },
      error: (err) => console.error("Erro ao buscar municípios através do CEP: ", err)
    });
  }

  carregaDadosMunicipio(): void {
    const ufSelecionada = this.cadastroBancoForm.get('uf')?.value;
    if (ufSelecionada === null || ufSelecionada === undefined) return;

    const estadoEncontrado = this.listaDeEstados.find(estado => estado.id == ufSelecionada);
    if (estadoEncontrado) {
      this.estadosService.buscarMunicipios(String(estadoEncontrado.sigla)).subscribe({
        next: (municipios: Municipio[]) => {
          this.listaDeMunicipios = municipios;
          this.cadastroBancoForm.get('municipio')?.enable();
          this.cdRef.detectChanges();
        }
      });
    }
  }

  desabilitaCamposEndereco(): void {
    this.cadastroBancoForm.get('uf')?.disable();
    this.cadastroBancoForm.get('municipio')?.disable();
    this.cadastroBancoForm.get('logradouro')?.disable();
    this.cadastroBancoForm.get('bairro')?.disable();
  }

  salvar(): void {
    this.cadastroBancoForm.markAllAsTouched();

    if (!this.cadastroBancoForm.valid && !this.cadastroBancoForm.get('uf')?.disabled) {
      this.toastr.error("Revise os campos");
      return;
    }

    const dadosForm = this.cadastroBancoForm.getRawValue();

    if (dadosForm['cep']) {
      dadosForm['cep'] = String(dadosForm['cep']).replace(/\D/g, '');
    }

    const auxMunicipio = this.listaDeMunicipios.find(mun => mun.id === Number(dadosForm['municipio']));
    const auxUf = this.listaDeEstados.find(uf => uf.id === Number(dadosForm['uf']));

    dadosForm['municipio'] = auxMunicipio?.nome;
    dadosForm['uf'] = auxUf?.sigla;
    dadosForm['dataUltimaAtualizacao'] = new Date().toLocaleDateString('sv-SE');

    if (this.indEdicao && this.bancoLeite) {
      dadosForm['id'] = this.bancoLeite.id;

      this.bancoLeiteService.atualizarBancoLeite(dadosForm).subscribe({
        next: () => this.toastr.success("Banco atualizado com sucesso!"),
        error: () => this.toastr.error("Erro ao atualizar banco")
      });
    } else {
      this.bancoLeiteService.cadastrarBancoLeite(dadosForm).subscribe({
        next: () => {
          this.toastr.success("Banco cadastrado com sucesso");
          this.cadastroBancoForm.reset();
        },
        error: () => this.toastr.error("Erro ao cadastrar Banco de Leite")
      });
    }
  }
}
