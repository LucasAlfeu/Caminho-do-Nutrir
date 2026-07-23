import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Pickr from '@simonwep/pickr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


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

  private modalInstance: any;
  private pickrInstance: any;
  public corSelecionada: string = '#ff0000';

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

  abrirModal() {
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

  _salvar(){
    if (!this.form) return;

    this.form.markAllAsTouched();

    const dados = {
      ...this.form.getRawValue(),
      cor: this.corSelecionada
    }

    this.salvar.emit(dados);

    this.fecharModal();
  }
}
