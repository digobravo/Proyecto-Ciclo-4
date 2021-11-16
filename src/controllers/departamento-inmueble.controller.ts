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
  Departamento,
  Inmueble,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoInmuebleController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Inmueble',
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
    return this.departamentoRepository.inmuebles(id).find(filter);
  }

  @post('/departamentos/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInDepartamento',
            exclude: ['Id'],
            optional: ['departamentoId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'Id'>,
  ): Promise<Inmueble> {
    return this.departamentoRepository.inmuebles(id).create(inmueble);
  }

  @patch('/departamentos/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Departamento.Inmueble PATCH success count',
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
    return this.departamentoRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/departamentos/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Departamento.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.departamentoRepository.inmuebles(id).delete(where);
  }
}
