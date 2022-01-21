import { NgModule } from '@angular/core';

import { PrestamoRoutingModule } from './prestamo-routing.module';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
import { ListarPrestamoComponent } from './components/listar-prestamo/listar-prestamo.component';
import { SharedModule } from '@shared/shared.module';
import { PrestamoService } from './shared/service/prestamo.service';
import { CrearPrestamoComponent } from './components/crear-prestamo/crear-prestamo.component';
import { CrearAbonoComponent } from './components/crear-abono/crear-abono.component';
import { ListarAbonosComponent } from './components/listar-abonos/listar-abonos.component';


@NgModule({
  declarations: [
    PrestamoComponent,
    ListarPrestamoComponent,
    CrearPrestamoComponent,
    CrearAbonoComponent,
    ListarAbonosComponent
  ],
  imports: [
    SharedModule,
    PrestamoRoutingModule
  ],
  providers: [PrestamoService]
})
export class PrestamoModule { }
