import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarPersonaComponent } from './listar-persona.component';
import { PersonaService } from '../../shared/service/persona.service';
import { Persona } from '../../shared/model/persona';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';

describe('ListarPersonaComponent', () => {
  let component: ListarPersonaComponent;
  let fixture: ComponentFixture<ListarPersonaComponent>;
  let personaService: PersonaService;
  const listaPersonas: Persona[] = [new Persona(1, 123456, 'Persona 1'), new Persona(2, 654321, 'persona 2')];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPersonaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [PersonaService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPersonaComponent);
    component = fixture.componentInstance;
    personaService = TestBed.inject(PersonaService);
    spyOn(personaService, 'consultar').and.returnValue(
      of(listaPersonas)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaPersonas.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });
});
