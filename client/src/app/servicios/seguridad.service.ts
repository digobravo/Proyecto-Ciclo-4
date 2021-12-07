import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url='http://localhost:3000';
  datosUsuarioSesion=new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());
  constructor(private http: HttpClient) {
    this.verificarSesionActual();
   }

  verificarSesionActual(){
    let datos = this.obtenerInformacionSesion();
    if(datos){
      this.refrescarDatosSesionActual(datos);
    }
  }

  refrescarDatosSesionActual(datos: ModeloIdentificar){

    this.datosUsuarioSesion.next(datos);
  }

  obtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioSesion.asObservable();
  }

  identificar (usuario: string, password: string): Observable<ModeloIdentificar> {
    
    return this.http.post<ModeloIdentificar>(`${this.url}/identificarCliente`,{
      usuario: usuario,
      clave: password,
    }
    )
    
  }

  almacenarSesion (datos:ModeloIdentificar){
    datos.estaidentificado=true;
    let stringdatos= JSON.stringify(datos);
    localStorage.setItem("datosSesion",stringdatos);
    this.refrescarDatosSesionActual(datos);
  }

  obtenerInformacionSesion(){
    let datosSesion = localStorage.getItem("datosSesion");
    if(datosSesion){
      let datos = JSON.parse(datosSesion);
      return datos;
    }else{
      return null;
    }
  }

  eliminarInformacionSesion(){
    localStorage.removeItem("datosSesion");
    this.refrescarDatosSesionActual(new ModeloIdentificar)
  }

  seHaInicidadoSesion(){
    let datosSesion = localStorage.getItem("datosSesion");
    return datosSesion;
  }

  ObtenerToken(){
    let datosSesion = localStorage.getItem("datosSesion");
    if(datosSesion){
      let datos = JSON.parse(datosSesion);
      return datos.tk
      
    }else{
      return ''
    }
  }
}
