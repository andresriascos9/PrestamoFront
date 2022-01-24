import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona';

@Injectable()
export class PersonaService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<Persona[]>(`${environment.endpoint}/personas`, this.http.optsName('consultar personas'));
  }

  public guardar(persona: Persona) {
    return this.http.doPost<Persona, boolean>(`${environment.endpoint}/personas`, persona,
                                                this.http.optsName('crear/actualizar personas'));
  }
}
