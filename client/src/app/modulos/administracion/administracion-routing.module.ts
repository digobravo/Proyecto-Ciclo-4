import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionComponent } from '../seguridad/identificacion/identificacion.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { CrudInmuebleComponent } from './inmuebles/crud-inmueble/crud-inmueble.component';


const routes: Routes = [

  {
    path: 'crear-cliente',
    component: CrearClienteComponent,
  },
  {
    path: 'editar-cliente',
    component: EditarClienteComponent,
  },
  {
    path:'identificar',
    component: IdentificacionComponent,
  },
  {
    path:'crud-inmueble',
    component: CrudInmuebleComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
