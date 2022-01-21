import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Persona } from '../model/persona';
import { HttpResponse } from '@angular/common/http';

import { PersonaService } from './persona.service';

describe('PersonaService', () => {
  let httpMock: HttpTestingController;
  let service: PersonaService;
  const apiEndpointPersonaConsulta = `${environment.endpoint}/personas`;
  const apiEndpointPersonas = `${environment.endpoint}/personas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PersonaService);
  });

  it('should be created', () => {
    const personaService: PersonaService = TestBed.inject(PersonaService);
    expect(personaService).toBeTruthy();
  });

  it('deberia listar personas', () => {
    const dummyPersonas = [
      new Persona(1, 123456, 'Persona 1'), new Persona(2, 12345678, 'Persona 2')
    ];
    service.consultar().subscribe(personas => {
      expect(personas.length).toBe(2);
      expect(personas).toEqual(dummyPersonas);
    });
    const req = httpMock.expectOne(apiEndpointPersonaConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPersonas);
  });

  it('deberia crear una persona', () => {
    const dummyPersonas = new Persona(1, 123456, 'Persona 1');
    service.guardar(dummyPersonas).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointPersonas);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });


});
