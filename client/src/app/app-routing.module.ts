import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadModule } from './modulos/seguridad/seguridad.module';
import { CreditosComponent } from './plantilla/creditos/creditos.component';
import { EmpresaComponent } from './plantilla/empresa/empresa.component';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: 'seguridad',
    loadChildren: () =>
      import('./modulos/seguridad/seguridad.module').then(
        (x) => x.SeguridadModule
      ),
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./modulos/administracion/administracion.module').then(
        (x) => x.AdministracionModule
      ),
  },
  {
    path: 'inmuebles',
    loadChildren: () =>
      import('./modulos/inmuebles/inmuebles.module').then(
        (x) => x.InmueblesModule
      ),
  },
  {
    path: 'empresa',
    component: EmpresaComponent,
  },
  {
    path: 'creditos',
    component: CreditosComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
