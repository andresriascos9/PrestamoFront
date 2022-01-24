import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '@prestamo/shared/service/prestamo.service';
import { Prestamo } from '@prestamo/shared/model/prestamo';
import { Persona } from '@shared/Persona/model/persona';
import { Abono } from '@prestamo/shared/model/abono';
import { PersonaService } from '@shared/Persona/service/persona.service';
import { CrearAbonoComponent } from '../crear-abono/crear-abono.component';
import { ListarAbonosComponent } from '../listar-abonos/listar-abonos.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AbonoService } from '@prestamo/shared/service/abono.service';

@Component({
  selector: 'app-listar-prestamo',
  templateUrl: './listar-prestamo.component.html',
  styleUrls: ['./listar-prestamo.component.css']
})
export class ListarPrestamoComponent implements OnInit {

  listaAbonos: Abono[] = [];
  listaPrestamos: Prestamo[] = [];
  listaPersonas: Persona[] = [];
  constructor(
    protected prestamoService: PrestamoService,
    protected personasService: PersonaService,
    protected abonoService: AbonoService,
    private modalService: NgbModal){
    }

  ngOnInit(): void {
     this.iniciarValores();
  }

  private iniciarValores(){
    this.prestamoService.consultar().subscribe(data => {
      this.listaPrestamos = data;
    }, error => {
      console.log(error);
    });

    this.personasService.consultar().subscribe(info => {
      this.listaPersonas = info;
    }, error => {
      console.log(error);
    });

    this.abonoService.consultar().subscribe(info => {
      this.listaAbonos = info;
    }, error => {
      console.log(error);
    });
  }

  obtenerPersona(id){
    const persona = this.listaPersonas.find(element => element.id === id);
    if (persona){
      return persona.nombre;
    }
  }

  obtenerAbonos(id){
    const abonos = this.listaAbonos.filter(element => element.prestamo === id);
    return abonos;
  }

  obtenerSuma(abonos){
    let suma = 0;
    abonos.forEach(element => {
      suma += element.valorAbono;
    });
    return suma;
  }

  open(prestamo) {
    const modalRef = this.modalService.open(CrearAbonoComponent, { centered: true });
    modalRef.componentInstance.prestamoSeleccionado = prestamo;
    modalRef.result.then(result => {
      if (result === true){
        this.iniciarValores();
      }
   });
  }

  openAbonos(prestamo, sumaAbonos) {
    const modalRef = this.modalService.open(ListarAbonosComponent, { centered: true });
    modalRef.componentInstance.idPrestamo = prestamo;
    modalRef.componentInstance.totalAbonos = sumaAbonos;
  }
}
