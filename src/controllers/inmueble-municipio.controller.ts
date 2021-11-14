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
  Municipio,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleMunicipioController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/municipio', {
    responses: {
      '200': {
        description: 'Inmueble has one Municipio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Municipio),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Municipio>,
  ): Promise<Municipio> {
    return this.inmuebleRepository.municipio(id).get(filter);
  }

  @post('/inmuebles/{id}/municipio', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Municipio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {
            title: 'NewMunicipioInInmueble',
            exclude: ['Id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) municipio: Omit<Municipio, 'Id'>,
  ): Promise<Municipio> {
    return this.inmuebleRepository.municipio(id).create(municipio);
  }

  @patch('/inmuebles/{id}/municipio', {
    responses: {
      '200': {
        description: 'Inmueble.Municipio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {partial: true}),
        },
      },
    })
    municipio: Partial<Municipio>,
    @param.query.object('where', getWhereSchemaFor(Municipio)) where?: Where<Municipio>,
  ): Promise<Count> {
    return this.inmuebleRepository.municipio(id).patch(municipio, where);
  }

  @del('/inmuebles/{id}/municipio', {
    responses: {
      '200': {
        description: 'Inmueble.Municipio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Municipio)) where?: Where<Municipio>,
  ): Promise<Count> {
    return this.inmuebleRepository.municipio(id).delete(where);
  }
}
