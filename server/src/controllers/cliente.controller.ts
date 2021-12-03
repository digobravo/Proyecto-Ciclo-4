import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Cliente, Credenciales} from '../models';
import {ClienteRepository} from '../repositories';
import {AutenticacionService} from '../services';

const fetch = require('node-fetch');

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @post('/identificarCliente', {
    responses: {
      '200': {
        description: 'Identificación de usuarios'
      }
    }
  })

  async identificarCliente(
    @requestBody() credenciales: Credenciales
  ) {
    let c = await this.servicioAutenticacion.identificarCliente(credenciales.usuario, credenciales.clave);
    if (c) {
      let token = this.servicioAutenticacion.generarTokenJWT(c);
      return {
        datos: {
          nombre: c.Nombres,
          email: c.Email,
          id: c.Id
        },
        tk: token
      }
    }
    else {
      throw new HttpErrors[401]("Datos incorrectos");
    }
  }

  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['Id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'Id'>,
  ): Promise<Cliente> {

    let clave = this.servicioAutenticacion.generarClave();
    let claveCifrada = this.servicioAutenticacion.cifrarClave(clave);
    cliente.Clave = claveCifrada;
    let p = await this.clienteRepository.create(cliente);

    //notificación a usuario para

    let destino = cliente.Email;
    let asunto = 'Registro en la plataforma inmobiliaria'
    let mensaje = `Hola ${cliente.Nombres}, su nombre de usuario es su correo; ${cliente.Email} y su contraseña es: ${clave}`;
    fetch(`${Llaves.urlServicioNotificacion}/email?destino=${destino}&asunto=${asunto}&mensaje=${mensaje}`)
      .then((data: any) => {
        console.log(data);
      })
    return p;
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
