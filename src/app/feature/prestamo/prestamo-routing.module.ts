import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
import { ListarPrestamoComponent } from './components/listar-prestamo/listar-prestamo.component';
import { CrearPrestamoComponent } from './components/crear-prestamo/crear-prestamo.component';

const routes: Routes = [{
  path: '',
  component: PrestamoComponent,
  children: [
    {
      path: 'crear',
      component: CrearPrestamoComponent
    },{
      path: 'listar',
      component: ListarPrestamoComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestamoRoutingModule { }
