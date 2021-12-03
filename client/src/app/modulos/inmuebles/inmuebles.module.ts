import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmueblesRoutingModule } from './inmuebles-routing.module';
import { AsignarInmuebleComponent } from './asignar-inmueble/asignar-inmueble.component';


@NgModule({
  declarations: [
    AsignarInmuebleComponent
  ],
  imports: [
    CommonModule,
    InmueblesRoutingModule
  ]
})
export class InmueblesModule { }
