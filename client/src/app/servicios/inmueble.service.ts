import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { ModeloInmueble } from '../modelos/inmueble.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  url = 'http://localhost:3000';
  token:string='';
  constructor(private http: HttpClient, private seguridadServicio:SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken()
   }
  

  ObtenerRegistros():Observable<ModeloInmueble[]> {

    return this.http.get<ModeloInmueble[]>(`${this.url}/inmuebles`)
  }


  }


 

