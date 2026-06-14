import { ChangeDetectorRef, Component } from '@angular/core';
import { EstadosService } from '../../services/Estados/estado-service';
import { Estado } from '../../class/Estado';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Municipio } from '../../class/Municipio';
import { Cep } from '../../class/Cep';
import { ToastrService } from 'ngx-toastr';
import { BancoLeiteService } from '../../services/BancoLeite/banco-leite-service';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CadastrarBanco {

  listaDeEstados: Estado[] = [];
  listaDeMunicipios: Municipio[] = [];
  cadastroBancoForm!: FormGroup;
  dadosCep: Cep;

  bancoLeite: BancoLeite | null = null;

  indEdicao: boolean = false

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

  ngOnInit() {
    this.indEdicao = this.router.url.includes("/editar/");

    this.createForm();
    this.carregaEstados();

    if(this.indEdicao){
      this.buscarBanco();
    }
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

  buscarBanco(){
    const idBancoLeite = Number(this.route.snapshot.paramMap.get('id'));

    if(!idBancoLeite || idBancoLeite <= 0) return

    this.bancoLeiteService.buscarBancoLeite(idBancoLeite).subscribe({
      next: (res) => {
        this.bancoLeite = BancoLeite.map(res);
        this.atualizaFormulario();
      }, error: (err) => {
        this.toastr.error("Não foi possível recuperar os dados do banco de leite")
      }
    })
  }

  atualizaFormulario() {
    if (!this.bancoLeite) return;

    this.cadastroBancoForm.patchValue(this.bancoLeite);
    const estadoSalvo = this.listaDeEstados.find(e => e.sigla === this.bancoLeite?.uf);

    if (estadoSalvo) {
      this.cadastroBancoForm.get('uf')?.setValue(estadoSalvo.id);

      this.estadosService.buscarMunicipios(estadoSalvo.sigla).subscribe({
        next: (municipios) => {
          this.listaDeMunicipios = municipios;
          this.cadastroBancoForm.get('municipio')?.enable();

          const cidadeSalva = this.listaDeMunicipios.find(m => m.nome.toLowerCase() === this.bancoLeite?.municipio.toLowerCase());
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

        if (this.indEdicao) {
          this.buscarBanco();
        }
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

    dadosForm['municipio'] = auxMunicipio?.nome;
    dadosForm['uf'] = auxUf?.sigla;
    dadosForm['dataUltimaAtualizacao'] = new Date().toLocaleDateString('sv-SE');

    if (this.indEdicao && this.bancoLeite) {
      dadosForm['id'] = this.bancoLeite.id;

      this.bancoLeiteService.atualizarBancoLeite(dadosForm).subscribe({
        next: (res) => {
          this.toastr.success("Banco atualizado com sucesso!");
        },
        error: (err) => this.toastr.error("Erro ao atualizar banco")
      });

    } else {
      this.bancoLeiteService.cadastrarBancoLeite(dadosForm).subscribe({
        next: (res) => {
          this.toastr.success("Banco cadastrado com sucesso");
          this.cadastroBancoForm.reset();
        },
        error: (err) => {
            this.toastr.error("Erro ao cadastrar Banco de Leite")
        }
      });
    }
  }
}
