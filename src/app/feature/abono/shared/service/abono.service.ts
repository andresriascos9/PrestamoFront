import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Abono } from '../model/abono';

@Injectable({
  providedIn: 'root'
})
export class AbonoService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<Abono[]>(`${environment.endpoint}/abonos`, this.http.optsName('consultar abonos'));
  }

  public consultarAbonosPorPrestamo(id) {
    return this.http.doGet<Abono[]>(`${environment.endpoint}/abonos/`+id, this.http.optsName('consultar abonos'));
  }

  public guardar(abono: Abono) {
    return this.http.doPost<Abono, boolean>(`${environment.endpoint}/abonos`, abono,
                                                this.http.optsName('crear/actualizar abonos'));
  }

}
