import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Abono } from '../model/abono';
import { HttpResponse } from '@angular/common/http';

import { AbonoService } from './abono.service';

describe('AbonoService', () => {
  let httpMock: HttpTestingController;
  let service: AbonoService;
  const apiEndpointAbonooConsulta = `${environment.endpoint}/abonos`;
  const apiEndpointAbono = `${environment.endpoint}/abonos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AbonoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(AbonoService);
  });

  it('should be created', () => {
    const abonoService: AbonoService = TestBed.inject(AbonoService);
    expect(abonoService).toBeTruthy();
  });

  it('deberia listar abonos', () => {
    const dummyAbonos = [
      new Abono(1, '2022-01-26', 300000, 1), new Abono(1, '2022-01-26', 300000, 2)
    ];
    service.consultar().subscribe(abonos => {
      expect(abonos.length).toBe(2);
      expect(abonos).toEqual(dummyAbonos);
    });
    const req = httpMock.expectOne(apiEndpointAbonooConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAbonos);
  });

  it('deberia crear un abono', () => {
    const dummyAbonos = new Abono(1, '2022-01-26', 3000000, 1);
    service.guardar(dummyAbonos).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointAbono);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
