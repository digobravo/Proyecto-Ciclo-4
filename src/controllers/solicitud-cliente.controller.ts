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
  Solicitud,
  Cliente,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudClienteController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/cliente', {
    responses: {
      '200': {
        description: 'Solicitud has one Cliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente> {
    return this.solicitudRepository.cliente(id).get(filter);
  }

  @post('/solicituds/{id}/cliente', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInSolicitud',
            exclude: ['Id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'Id'>,
  ): Promise<Cliente> {
    return this.solicitudRepository.cliente(id).create(cliente);
  }

  @patch('/solicituds/{id}/cliente', {
    responses: {
      '200': {
        description: 'Solicitud.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.solicitudRepository.cliente(id).patch(cliente, where);
  }

  @del('/solicituds/{id}/cliente', {
    responses: {
      '200': {
        description: 'Solicitud.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.solicitudRepository.cliente(id).delete(where);
  }
}
