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
  Empleado,
  Inmueble,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoInmuebleController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.empleadoRepository.inmuebles(id).find(filter);
  }

  @post('/empleados/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInEmpleado',
            exclude: ['Id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'Id'>,
  ): Promise<Inmueble> {
    return this.empleadoRepository.inmuebles(id).create(inmueble);
  }

  @patch('/empleados/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Empleado.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.empleadoRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/empleados/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Empleado.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.empleadoRepository.inmuebles(id).delete(where);
  }
}
