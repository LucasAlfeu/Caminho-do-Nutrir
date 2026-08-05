import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Pickr from '@simonwep/pickr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../../class/Categoria';


declare var bootstrap: any;

@Component({
  selector: 'app-modal-categoria',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-categoria.html',
  styleUrl: './modal-categoria.css',
})
export class ModalCategoria implements AfterViewInit {
  @ViewChild('colorPicker', { static: false }) colorPickerElement!: ElementRef;
  @ViewChild('meuModal') modalElement!: ElementRef;

  @Output() salvar = new EventEmitter();

  private categoria: Categoria | null = null;
  private modalInstance: any;
  private pickrInstance: any;
  public corSelecionada: string = '#ff0000';
  private indEdicao: boolean = false;
  private indDetalhe: boolean = false;
  private indCadastro: boolean = false;

  form!: FormGroup;

  constructor(
    protected toastrService: ToastrService,
    protected fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }

    this.pickrInstance = Pickr.create({
      el: this.colorPickerElement.nativeElement,
      theme: 'nano',
      container: this.colorPickerElement.nativeElement.parentElement,
      default: this.corSelecionada,

      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: {
          hex: true,
          rgba: false,
          cmyk: false,
          input: true,
          clear: false,
          save: true
        }
      },
      i18n: {
        'btn:save': 'Salvar',
      }
    });

    this.pickrInstance.on('change', (color: any) => {
      this.corSelecionada = color.toHEXA().toString();
    });

    this.pickrInstance.on('save', (color: any) => {
      this.corSelecionada = color.toHEXA().toString();
      this.pickrInstance.hide();
    });
  }

  ngOnDestroy(): void {
    if (this.pickrInstance) {
      this.pickrInstance.destroyAndRemove();
    }
  }

  getIndEdicao(): boolean {
    return this.indEdicao
  }
  getIndDetalhe(): boolean {
    return this.indDetalhe
  }
  getIndCadastro(): boolean {
    return this.indCadastro
  }

  setIndEdicao(newIndEdicao: boolean) {
    this.indEdicao = newIndEdicao;
  }
  setIndDetalhe(newIndDetalhe: boolean) {
    this.indDetalhe = newIndDetalhe;
  }
  setIndCadastro(newIndCadastro: boolean) {
    this.indCadastro = newIndCadastro;
  }

  abrirModal(tipoAbertura: number, categoriaSelecionada?: Categoria) {
    this.categoria = null;
    this.setIndCadastro(false);
    this.setIndEdicao(false);
    this.setIndDetalhe(false);

    if(categoriaSelecionada){
      this.categoria = categoriaSelecionada;
    }

    // 1- Cadastro , 2- Edicao, 3- Detalhe
    if(tipoAbertura == 1) {
      this.setIndCadastro(true);

      // Reseta para uma cor padrão ao cadastrar
      this.corSelecionada = '#ff0000';
      setTimeout(() => {
        if (this.pickrInstance) {
          this.pickrInstance.setColor(this.corSelecionada);
        }
      }, 0);

    } else if (tipoAbertura == 2) {
      this.setIndEdicao(true);
      this.atualizaFormulário();
      this.habilitarCampos();
    } else {
      this.setIndDetalhe(true);
      this.atualizaFormulário();
      this.desabilitarCampos();
    }

    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  fecharModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.form.reset();
    }
  }

  createForm(){
    this.form = this.fb.group({
      nome: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([Validators.required])],
    })
  }

  campoInvalido(campo: string): boolean {
    return Boolean(this.form.get(campo)?.invalid && this.form.get(campo)?.touched)
  }

  atualizaFormulário() {
    if (this.categoria) {
      this.form.get("nome")?.setValue(this.categoria.nome);
      this.form.get("descricao")?.setValue(this.categoria.descricao);
      this.corSelecionada = this.categoria.cor;

      setTimeout(() => {
        if (this.pickrInstance) {
          this.pickrInstance.setColor(this.corSelecionada);
        }
      }, 250);
    }
  }

  desabilitarCampos(){
    this.form.get("nome")?.disable();
    this.form.get("descricao")?.disable();
    this.pickrInstance.disable();
  }

  habilitarCampos(){
    this.form.get("nome")?.enable();
    this.form.get("descricao")?.enable();
    this.pickrInstance.enable();
  }

  _salvar(){
    if (!this.form) return;

    this.form.markAllAsTouched();

    const dados = {
      ...this.form.getRawValue(),
      cor: this.corSelecionada,
      id: this.categoria?.id
    }

    this.salvar.emit(dados);

    this.fecharModal();
  }
}
