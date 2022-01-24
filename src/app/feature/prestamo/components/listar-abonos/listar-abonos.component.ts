import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Abono } from '@prestamo/shared/model/abono';
import { AbonoService } from '@prestamo/shared/service/abono.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-abonos',
  templateUrl: './listar-abonos.component.html',
  styleUrls: ['./listar-abonos.component.css']
})
export class ListarAbonosComponent implements OnInit {
  listaAbonos: Observable<Abono[]>;
  idPrestamo;
  totalAbonos;
  constructor( public modal: NgbActiveModal, protected abonoService: AbonoService ) { }

  ngOnInit(): void {
    this.listaAbonos = this.abonoService.consultarAbonosPorPrestamo(this.idPrestamo);
  }


}
