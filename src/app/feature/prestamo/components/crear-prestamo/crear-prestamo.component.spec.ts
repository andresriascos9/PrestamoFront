import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearPrestamoComponent } from './crear-prestamo.component';
import { PrestamoService } from '../../shared/service/prestamo.service';
import { PersonaService } from '@shared/Persona/service/persona.service';
import { Persona } from '@shared/Persona/model/persona';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';

describe('CrearPrestamoComponent', () => {
  let component: CrearPrestamoComponent;
  let fixture: ComponentFixture<CrearPrestamoComponent>;
  let prestamoService: PrestamoService;
  let personasService: PersonaService;
  let spyGuardar;
  const listaPersonas: Persona[] = [new Persona(1, 123456, 'Persona 1'), new Persona(2, 654321, 'persona 2')];
  const testError = {
    status: 404,
    error: {
        mensaje: 'Test 404 error'
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPrestamoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [PersonaService, PrestamoService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPrestamoComponent);
    component = fixture.componentInstance;
    personasService = TestBed.inject(PersonaService);
    spyOn(personasService, 'consultar').and.returnValue(
      of(listaPersonas)
    );
    prestamoService = TestBed.inject(PrestamoService);
    spyGuardar = spyOn(prestamoService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.prestamoForm.valid).toBeFalsy();
  });

  it('debería capturar el error in this.error', () => {
    spyGuardar.and.returnValue(throwError(testError));
    component.agregar();
    expect(component.notificacion.isVisible()).toBeTruthy();
    expect(component.notificacion.getTitle().textContent).toEqual('Error');
  });

  it('Registrando prestamos', () => {
    expect(component.prestamoForm.valid).toBeFalsy();
    component.prestamoForm.controls.valorPrestamo.setValue('2000000');
    component.prestamoForm.controls.persona.setValue(1);
    expect(component.prestamoForm.valid).toBeTruthy();
    expect(component.agregar()).toBe();
    fixture.detectChanges();
    expect(component.notificacion.isVisible()).toBeTruthy();
    expect(component.notificacion.getTitle().textContent).toEqual('Éxito');
    component.notificacion.clickConfirm();
  });

  it('Registrando prestamos con mensaje de error', () => {
    prestamoService = TestBed.inject(PrestamoService);
    spyGuardar.and.returnValue(of(component.mostrarError('Error')));
    expect(component.notificacion.isVisible()).toBeTruthy();
    expect(component.notificacion.getTitle().textContent).toEqual('Error');
  });
});
