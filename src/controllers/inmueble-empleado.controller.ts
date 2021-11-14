import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Inmueble,
  Empleado,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleEmpleadoController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/empleado', {
    responses: {
      '200': {
        description: 'Inmueble has one Empleado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Empleado),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado> {
    return this.inmuebleRepository.empleado(id).get(filter);
  }

  @post('/inmuebles/{id}/empleado', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInInmueble',
            exclude: ['Id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'Id'>,
  ): Promise<Empleado> {
    return this.inmuebleRepository.empleado(id).create(empleado);
  }

  @patch('/inmuebles/{id}/empleado', {
    responses: {
      '200': {
        description: 'Inmueble.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.inmuebleRepository.empleado(id).patch(empleado, where);
  }

  @del('/inmuebles/{id}/empleado', {
    responses: {
      '200': {
        description: 'Inmueble.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.inmuebleRepository.empleado(id).delete(where);
  }
}
