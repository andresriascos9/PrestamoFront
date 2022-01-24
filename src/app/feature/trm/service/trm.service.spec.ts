import { TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { TrmService } from './trm.service';
const apiEndpointTrm = `${environment.endpoint}/trm`;

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
    const dummyTrm = 4000.96;
    service.consultar().subscribe(personas => {
      expect(personas).toEqual(dummyTrm);
    });
    const req = httpMock.expectOne(apiEndpointTrm);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTrm);
  });
});
