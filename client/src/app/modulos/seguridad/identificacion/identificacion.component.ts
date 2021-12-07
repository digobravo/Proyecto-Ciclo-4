import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
//const cryptoJS = require('crypto-js');
import * as cryptoJS from 'crypto-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgvalidador: FormGroup = this.fb.group({
    'usuario':['',[Validators.email, Validators.required]],
    'password':['',[Validators.required]]
  })
  constructor(private fb: FormBuilder, private servicioSeguridad:SeguridadService, private router:Router) { }

  ngOnInit(): void {

  }

  identificarUsuario (){
      
    let usuario = this.fgvalidador.controls['usuario'].value;
    let password = this.fgvalidador.controls['password'].value;
    let passwordcifrada = cryptoJS.MD5(password).toString();
    
    this.servicioSeguridad.identificar(usuario,passwordcifrada).subscribe((datos: any) => {
      
      this.servicioSeguridad.almacenarSesion(datos);
      this.router.navigate(['/inicio'])

    },(error:any)=>{
      //ko
      alert("Incorrecto")
    })
  }

}
