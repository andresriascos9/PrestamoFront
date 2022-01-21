import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearAbonoComponent } from './crear-abono.component';
import { AbonoService } from '@abono/shared/service/abono.service';
import { Prestamo } from '@prestamo/shared/model/prestamo';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('CrearAbonoComponent', () => {
  let component: CrearAbonoComponent;
  let fixture: ComponentFixture<CrearAbonoComponent>;
  let abonoService: AbonoService;
  const prestamoSeleccionado: Prestamo = new Prestamo(1, '2022-01-26', 3000000, 1, false);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAbonoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [AbonoService, HttpService, NgbActiveModal],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAbonoComponent);
    component = fixture.componentInstance;
    component.prestamoSeleccionado = prestamoSeleccionado;
    abonoService = TestBed.inject(AbonoService);
    spyOn(abonoService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.editForm.valid).toBeFalsy();
  });

  it('Registrando abono', () => {
    expect(component.editForm.valid).toBeFalsy();
    component.editForm.controls.valorAbono.setValue('20000');
    component.editForm.controls.prestamo.setValue(1);
    expect(component.editForm.valid).toBeTruthy();
    expect(component.onSubmit()).toBeTruthy;
  });
});
