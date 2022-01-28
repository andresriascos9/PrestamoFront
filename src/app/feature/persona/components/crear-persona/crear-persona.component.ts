import { Component, OnInit } from '@angular/core';
import { PersonaService } from '@shared/Persona/service/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 100;

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html'
})
export class CrearPersonaComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });
  personaForm: FormGroup;
  constructor(protected personaServicio: PersonaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.construirFormularioProducto();
  }

  agregar(){
    this.personaServicio.guardar(this.personaForm.value).subscribe(
      data => {if (data){
        this.success();
        this.personaForm.reset();
      }},
      error => this.error(error.error.mensaje)
    );
  }

  private construirFormularioProducto() {
    this.personaForm = this.fb.group({
      identificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                             Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]]
    });
  }

  get form() {
    return this.personaForm.controls;
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha creado la persona',
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
