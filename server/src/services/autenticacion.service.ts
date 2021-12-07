import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository


  ) { }

  /*
   * Add service methods here
   */

  generarClave() {

    let clave = generador(8, false);

    return clave;
  }

  cifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();

    return claveCifrada;
  }

  identificarCliente(usuario: string, clave: string) {

    try {

      let c = this.clienteRepository.findOne({where: {Email: usuario, Clave: clave}});
      if (c) {
        return c;
      }
      return false;
    } catch {
      return false;
    }
  }

  generarTokenJWT(cliente: Cliente) {

    let token = jwt.sign({
      data: {
        id: cliente.Id,
        email: cliente.Email,
        nombre: cliente.Nombres + " " + cliente.Apellidos

      }
    },
      Llaves.claveJWT);
    return token;
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;

    } catch {
      return false;
    }

  }
}
