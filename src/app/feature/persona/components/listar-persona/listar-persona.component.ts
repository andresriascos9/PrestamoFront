import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaService } from '@persona/shared/service/persona.service';
import { Persona } from '@persona/shared/model/persona';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.css']
})
export class ListarPersonaComponent implements OnInit {
  public listaPersonas: Observable<Persona[]>;
  
  constructor(protected personaService: PersonaService) { }

  ngOnInit(): void {
    this.listaPersonas = this.personaService.consultar();
  }


}
