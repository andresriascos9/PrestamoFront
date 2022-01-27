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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-prestamo',
  templateUrl: './listar-prestamo.component.html'
})
export class ListarPrestamoComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });
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
    }, error => this.error(error.error.mensaje));

    this.personasService.consultar().subscribe(info => {
      this.listaPersonas = info;
    }, error => this.error(error.error.mensaje));

    this.abonoService.consultar().subscribe(info => {
      this.listaAbonos = info;
    }, error => this.error(error.error.mensaje));
  }

  obtenerPersona(id){
    const persona = this.listaPersonas.find(element => element.id === id);
    if (persona){
      return persona.nombre;
    }
      return "No se pudo obtener el nombre de la persona";
  }

  obtenerAbonos(id){
    return this.listaAbonos.filter(element => element.prestamo === id);
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

  error(mensaje){
    let enPantalla = false;
    this.notificacion.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
    if (this.notificacion.isVisible()) {
      enPantalla = true;
    }
    return enPantalla;
  }
}
