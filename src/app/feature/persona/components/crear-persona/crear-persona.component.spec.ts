import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearPersonaComponent } from './crear-persona.component';
import { PersonaService } from '@shared/Persona/service/persona.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';

describe('CrearPersonaComponent', () => {
  let component: CrearPersonaComponent;
  let fixture: ComponentFixture<CrearPersonaComponent>;
  let personaService: PersonaService;
  let spyAgregar;
  const testError = {
    status: 404,
    error: {
        mensaje: 'Test 404 error'
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPersonaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [PersonaService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPersonaComponent);
    component = fixture.componentInstance;
    personaService = TestBed.inject(PersonaService);
    spyAgregar = spyOn(personaService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.personaForm.valid).toBeFalsy();
  });

  it('debería capturar el error in this.error', () => {
    spyAgregar.and.returnValue(throwError(testError));
    component.agregar();
    expect(component.notificacion.isVisible()).toBeTruthy();
    expect(component.notificacion.getTitle().textContent).toEqual('Error');
  });

  it('Registrando persona', () => {
    expect(component.personaForm.valid).toBeFalsy();
    component.personaForm.controls.identificacion.setValue('001111');
    component.personaForm.controls.nombre.setValue('Nombre test de test');
    expect(component.personaForm.valid).toBeTruthy();
    expect(component.agregar()).toBe();
    fixture.detectChanges();
    expect(component.notificacion.isVisible()).toBeTruthy();
    expect(component.notificacion.getTitle().textContent).toEqual('Éxito');
    component.notificacion.clickConfirm();
  });

  it('Registrando abono con mensaje de error', () => {
    spyAgregar.and.returnValue(of(component.mostrarError('Error')));
    expect(component.notificacion.isVisible()).toBeTruthy();
    expect(component.notificacion.getTitle().textContent).toEqual('Error');
  });
});
