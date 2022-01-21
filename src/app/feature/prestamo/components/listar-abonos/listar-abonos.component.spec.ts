import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarAbonosComponent } from './listar-abonos.component';
import { AbonoService } from '@abono/shared/service/abono.service';
import { Abono } from '@abono/shared/model/abono';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ListarAbonosComponent', () => {
  let component: ListarAbonosComponent;
  let fixture: ComponentFixture<ListarAbonosComponent>;
  let abonoService: AbonoService;
  const listaAbonos: Abono[] = [new Abono(1, '2022-01-26', 30000, 1), new Abono(1, '2022-01-26', 40000, 1)];
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAbonosComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [AbonoService, HttpService, NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAbonosComponent);
    component = fixture.componentInstance;
    abonoService = TestBed.inject(AbonoService);
    spyOn(abonoService, 'consultar').and.returnValue(
      of(listaAbonos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaAbonos.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });
});
