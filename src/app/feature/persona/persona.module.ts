import { NgModule } from '@angular/core';
import { PersonaRoutingModule } from './persona-routing.module';
import { ListarPersonaComponent } from './components/listar-persona/listar-persona.component';
import { SharedModule } from '@shared/shared.module';
import { PersonaService } from '@shared/Persona/service/persona.service';
import { CrearPersonaComponent } from './components/crear-persona/crear-persona.component';
import { PersonaComponent } from './components/persona/persona.component';

@NgModule({
  declarations: [
    ListarPersonaComponent,
    CrearPersonaComponent,
    PersonaComponent
  ],
  imports: [
    SharedModule,
    PersonaRoutingModule
  ],
  providers: [PersonaService]
})
export class PersonaModule { }
