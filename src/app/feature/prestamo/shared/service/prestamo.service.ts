import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Prestamo } from '../model/prestamo';

@Injectable()
export class PrestamoService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<Prestamo[]>(`${environment.endpoint}/prestamos`, this.http.optsName('consultar prestamos'));
  }

  public guardar(prestamo: Prestamo) {
    return this.http.doPost<Prestamo, boolean>(`${environment.endpoint}/prestamos`, prestamo,
                                                this.http.optsName('crear/actualizar prestamos'));
  }

}
