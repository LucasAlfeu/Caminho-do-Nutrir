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
  ){ 
    this.dadosCep = new Cep();
  }

  ngOnInit(){
    this.createForm();
    this.carregaEstados();
  }

  createForm(){
    this.cadastroBancoForm = this.fb.group({
      nome: [''],
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      uf: [''],
      localidade: ['']
    })
  }

  carregaEnderecoViaCep(){
    const cep = this.cadastroBancoForm.get('cep')?.value
    console.log("clicou", cep)
    if(cep){
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

  preencheFormulario(){
    const siglaUf = this.dadosCep.uf;
    const nomeLocalidade = this.dadosCep.localidade; 
    const estadoEncontrado = this.listaDeEstados.find(estado => estado.sigla === siglaUf);

    if (!estadoEncontrado) {
        console.error("Estado não encontrado na lista.");
        return; 
    }
    
    this.cadastroBancoForm.get('uf')?.setValue(estadoEncontrado.id);
    this.cadastroBancoForm.get('uf')?.disable();
    
    this.estadosService.buscarMunicipios(String(estadoEncontrado.id)).subscribe({
        next: (municipios) => {
            this.listaDeMunicipios = municipios;
            
            const localidadeEncontrada = this.listaDeMunicipios.find(m => m.nome === nomeLocalidade);
            console.log(localidadeEncontrada?.id)
            if (localidadeEncontrada) {
              this.cadastroBancoForm.get('localidade')?.setValue(localidadeEncontrada.id);
              this.cadastroBancoForm.get('localidade')?.disable();
            } else {
              console.warn(`Município "${nomeLocalidade}" não encontrado na lista IBGE.`);
            }

            this.cadastroBancoForm.get('logradouro')?.setValue(this.dadosCep.logradouro);
            this.cadastroBancoForm.get('bairro')?.setValue(this.dadosCep.bairro);
            this.cadastroBancoForm.get('logradouro')?.disable();
            this.cadastroBancoForm.get('bairro')?.disable();

        },
        error: (err) => {
            console.error("Erro ao carregar municípios:", err);
        }
    });
  }

  carregaEstados(){
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

  carregarMunicipios(uf: string){
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

  exibeMunicipios(){
    const ufControl = this.cadastroBancoForm.get('uf')?.value;

    if(ufControl){
      this.carregarMunicipios(ufControl)
    } else {
      return
    }
  }

  salvar(){
    if(!this.cadastroBancoForm.valid){
      return
    }

    let dadosForm = this.cadastroBancoForm.getRawValue();

    console.log(dadosForm)
  }
}
