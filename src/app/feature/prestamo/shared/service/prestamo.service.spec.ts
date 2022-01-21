import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Prestamo } from '../model/prestamo';
import { HttpResponse } from '@angular/common/http';

import { PrestamoService } from './prestamo.service';

describe('PrestamoService', () => {
  let httpMock: HttpTestingController;
  let service: PrestamoService;
  const apiEndpointPrestamoConsulta = `${environment.endpoint}/prestamos`;
  const apiEndpointPrestamo = `${environment.endpoint}/prestamos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrestamoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PrestamoService);
  });

  it('should be created', () => {
    const prestamoService: PrestamoService = TestBed.inject(PrestamoService);
    expect(prestamoService).toBeTruthy();

  });

  it('deberia listar prestamos', () => {
    const dummyPersonas = [
      new Prestamo(1, '2022-01-26', 3000000, 1, false), new Prestamo(1, '2022-01-26', 3000000, 2, false)
    ];
    service.consultar().subscribe(personas => {
      expect(personas.length).toBe(2);
      expect(personas).toEqual(dummyPersonas);
    });
    const req = httpMock.expectOne(apiEndpointPrestamoConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPersonas);
  });

  it('deberia crear un producto', () => {
    const dummyPersonas = new Prestamo(1, '2022-01-26', 3000000, 1, false);
    service.guardar(dummyPersonas).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointPrestamo);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });


});
