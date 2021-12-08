import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [

  {
    path: 'identificar',
    component:IdentificacionComponent
  },{
    path: 'cerrarsesion',
    component:CerrarSesionComponent
  },{
    path: 'registro',
    component:RegistroComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
