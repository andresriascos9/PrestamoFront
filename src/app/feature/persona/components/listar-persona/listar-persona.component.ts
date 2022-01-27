import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaService } from '@shared/Persona/service/persona.service';
import { Persona } from '@shared/Persona/model/persona';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html'
})
export class ListarPersonaComponent implements OnInit {
  public listaPersonas: Observable<Persona[]>;

  constructor(protected personaService: PersonaService) { }

  ngOnInit(): void {
    this.listaPersonas = this.personaService.consultar();
  }


}
