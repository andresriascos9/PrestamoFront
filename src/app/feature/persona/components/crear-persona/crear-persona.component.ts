import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../shared/service/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 10;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 100;

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
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
    /*this.personaServicio.guardar(this.personaForm.value).subscribe(data => {
      if (data) {
        this.success();
      }
    });*/

    this.personaServicio.guardar(this.personaForm.value).subscribe(
      data => {if(data){
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
    let enPantalla = false;
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha creado la persona',
      icon: 'success'
    });
    if (this.notificacion.isVisible()) {
      enPantalla = true;
    }
    return enPantalla;
  }

  error(mensaje){
    let enPantalla = false;
    this.notificacion.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
    if (this.notificacion.isVisible()) {
      enPantalla = true;
    }
    return enPantalla;
  }

}