import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarPrestamoComponent } from './listar-prestamo.component';
import { PrestamoService } from '../../shared/service/prestamo.service';
import { PersonaService } from '@persona/shared/service/persona.service';
import { Prestamo } from '../../shared/model/prestamo';
import { Persona } from '@persona/shared/model/persona';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';

describe('ListarPrestamoComponent', () => {
  let component: ListarPrestamoComponent;
  let fixture: ComponentFixture<ListarPrestamoComponent>;
  let prestamoService: PrestamoService;
  let personaService: PersonaService;
  const listaPrestamos: Prestamo[] = [new Prestamo(1, '2022-01-26', 3000000, 1, false), new Prestamo(1, '2022-01-26', 4000000, 2, false)];
  const listaPersonas: Persona[] = [new Persona(1, 123456, 'Persona 1'), new Persona(2, 654321, 'persona 2')];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPrestamoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [PrestamoService, PersonaService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPrestamoComponent);
    component = fixture.componentInstance;
    prestamoService = TestBed.inject(PrestamoService);
    spyOn(prestamoService, 'consultar').and.returnValue(
      of(listaPrestamos)
    );
    personaService = TestBed.inject(PersonaService);
    spyOn(personaService, 'consultar').and.returnValue(
      of(listaPersonas)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(2).toBe(listaPrestamos.length);
    expect(2).toBe(listaPersonas.length);
  });
});
