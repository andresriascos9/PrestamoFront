import { Component, OnInit } from '@angular/core';
import { PersonaService } from '@shared/Persona/service/persona.service';
import { PrestamoService } from '../../shared/service/prestamo.service';
import { Persona } from '@shared/Persona/model/persona';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_PERMITIDA_INT = 999;
const LONGITUD_MAXIMA_PERMITIDA_INT = 9999999999;

@Component({
  selector: 'app-crear-prestamo',
  templateUrl: './crear-prestamo.component.html'
})
export class CrearPrestamoComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });
  listaPersonas: Observable<Persona[]>;
  prestamoForm: FormGroup;
  constructor(protected personaServicio: PersonaService, protected prestamoServicio: PrestamoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerPersonas();
    this.construirFormularioPrestamo();
  }

  private obtenerPersonas(){
    this.listaPersonas = this.personaServicio.consultar();
  }

  private construirFormularioPrestamo() {
    this.prestamoForm = this.fb.group({
      persona: ['', [Validators.required]],
      valorPrestamo: ['', [Validators.required, Validators.min(LONGITUD_MINIMA_PERMITIDA_INT),
                                                             Validators.max(LONGITUD_MAXIMA_PERMITIDA_INT)]]
    });
  }

  get nombrePersonaNoValido(){
    return this.prestamoForm.get('persona').invalid && this.prestamoForm.get('persona').touched;
  }

  get valorPrestamoNoValido(){
    return this.prestamoForm.get('valorPrestamo').invalid && this.prestamoForm.get('valorPrestamo').touched;
  }

  agregar(){
    this.prestamoServicio.guardar(this.prestamoForm.value).subscribe(
      data => {if (data){
        this.success();
        this.prestamoForm.reset();
      }},
      error => this.mostrarError(error.error.mensaje)
    );
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha creado el prestamo',
      icon: 'success'
    });
  }

  mostrarError(mensaje){
    this.notificacion.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
  }

}
