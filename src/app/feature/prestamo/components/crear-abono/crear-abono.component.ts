import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prestamo } from '@prestamo/shared/model/prestamo';
import {AbonoService } from '@prestamo/shared/service/abono.service';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_PERMITIDA_INT = 999;
const LONGITUD_MAXIMA_PERMITIDA_INT = 9999999999;

@Component({
  selector: 'app-crear-abono',
  templateUrl: './crear-abono.component.html'
})
export class CrearAbonoComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });
  prestamoSeleccionado: Prestamo;
  editForm: FormGroup;
  isLoading = false;
  constructor(protected abonoServie: AbonoService, public modal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.construirFormularioAbono();
  }

  get editFormData() { return this.editForm.controls; }

  get valorAbonoNoValido(){
    return this.editForm.get('valorAbono').invalid && this.editForm.get('valorAbono').touched;
  }

  private construirFormularioAbono() {
    this.editForm = this.fb.group({
      valorAbono: ['', [Validators.required, Validators.min(LONGITUD_MINIMA_PERMITIDA_INT),
        Validators.max(LONGITUD_MAXIMA_PERMITIDA_INT)]],
      prestamo: [this.prestamoSeleccionado.id, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.abonoServie.guardar(this.editForm.value).subscribe(
      data => {if (data){
        this.success();
        this.editForm.reset();
        this.isLoading = false;
        this.modal.close(true);
      }},
      error => {this.error(error.error.mensaje);
                this.isLoading = false;
      }
    );
    this.isLoading = true;
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha creado el abono',
      icon: 'success'
    });
  }

  error(mensaje){
    this.notificacion.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
  }

}
