import { TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { HomeService } from './home.service';
const apiEndpointTrm = `${environment.endpoint}/trm`;

describe('HomeService', () => {
  let httpMock: HttpTestingController;
  let service: HomeService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    const homeService: HomeService = TestBed.inject(HomeService);
    expect(homeService).toBeTruthy();
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
