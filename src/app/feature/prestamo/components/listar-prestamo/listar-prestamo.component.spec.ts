import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarPrestamoComponent } from './listar-prestamo.component';
import { PrestamoService } from '../../shared/service/prestamo.service';
import { AbonoService } from '../../shared/service/abono.service';
import { Prestamo } from '../../shared/model/prestamo';
import { PersonaService } from '@shared/Persona/service/persona.service';
import { Persona } from '@shared/Persona/model/persona';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { Abono } from '@prestamo/shared/model/abono';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('ListarPrestamoComponent', () => {
  let component: ListarPrestamoComponent;
  let fixture: ComponentFixture<ListarPrestamoComponent>;
  let prestamoService: PrestamoService;
  let personaService: PersonaService;
  let abonoService: AbonoService;
  let spyConsultarPrestamos;
  let spyConsultarPersonas;
  let spyConsultarAbono;
  const listaPrestamos: Prestamo[] = [new Prestamo(1, '2022-01-26', 3000000, 1, false), new Prestamo(2, '2022-01-26', 4000000, 2, false)];
  const listaPersonas: Persona[] = [new Persona(1, 123456, 'Persona 1'), new Persona(2, 654321, 'persona 2')];
  const listaAbonos: Abono[] = [new Abono(1, '2022-01-26', 30000, 1), new Abono(2, '2022-01-26', 40000, 2)];
  const testError = {
    status: 404,
    error: {
        mensaje: 'Test 404 error'
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPrestamoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [PrestamoService, PersonaService, AbonoService, HttpService, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPrestamoComponent);
    component = fixture.componentInstance;
    prestamoService = TestBed.inject(PrestamoService);
    spyConsultarPrestamos = spyOn(prestamoService, 'consultar').and.returnValue(
      of(listaPrestamos)
    );
    personaService = TestBed.inject(PersonaService);
    spyConsultarPersonas = spyOn(personaService, 'consultar').and.returnValue(
      of(listaPersonas)
    );
    abonoService = TestBed.inject(AbonoService);
    spyConsultarAbono = spyOn(abonoService, 'consultarAbonosPorPrestamo').withArgs(1).and.returnValue(
      of(listaAbonos)
    );
    fixture.detectChanges();
  });

  it('debería capturar el error in this.error en prestamos', () => {
    spyConsultarPrestamos.and.returnValue(throwError(testError));
    spyConsultarPersonas.and.returnValue(throwError(testError));
    spyConsultarAbono.and.returnValue(throwError(testError));
    component.iniciarValores();
    expect(component.notificacion.isVisible()).toBeTruthy();
    expect(component.notificacion.getTitle().textContent).toEqual('Error');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(2).toBe(listaPrestamos.length);
    expect(2).toBe(listaPersonas.length);
    expect(2).toBe(listaAbonos.length);
  });

  it('Se hacen pruebas a obtener persona', () => {
    expect(component.obtenerPersona(1)).toEqual('Persona 1');
    expect(component.obtenerPersona(4)).toEqual('No se pudo obtener el nombre de la persona');
  });

  it('Se hacen pruebas a abrir modal', () => {
    expect(component.open(listaPrestamos[0].id)).toBe();
  });


});
