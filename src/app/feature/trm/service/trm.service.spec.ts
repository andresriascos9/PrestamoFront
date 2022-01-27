import { TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { TrmService } from './trm.service';
const apiEndpointTrm = `${environment.urlTrm}`;
import { Trm } from '../model/trm';

describe('TrmService', () => {
  let httpMock: HttpTestingController;
  let service: TrmService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrmService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(TrmService);
  });

  it('should be created', () => {
    const trmService: TrmService = TestBed.inject(TrmService);
    expect(trmService).toBeTruthy();
  });

  it('deberia listar el trm', () => {
    const dummyTrm = [
      new Trm('$3,956.32', '2022-01-26', '2022-01-26'), new Trm('$3,956.32', '2022-01-26', '2022-01-26')
    ];
    const fecha = '2022-01-23';
    service.consultarPorFuera(fecha).subscribe(personas => {
      expect(personas).toEqual(dummyTrm);
    });
    const req = httpMock.expectOne(apiEndpointTrm+"?$query=SELECT%20*%20WHERE%20vigenciadesde%3E='"+fecha+"'%20ORDER%20BY%20vigenciahasta%20DESC");
    expect(req.request.method).toBe('GET');
    req.flush(dummyTrm);
  });
});
