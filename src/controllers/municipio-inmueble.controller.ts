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
  Municipio,
  Inmueble,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioInmuebleController {
  constructor(
    @repository(MunicipioRepository) protected municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Municipio has many Inmueble',
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
    return this.municipioRepository.inmuebles(id).find(filter);
  }

  @post('/municipios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Municipio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Municipio.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInMunicipio',
            exclude: ['Id'],
            optional: ['municipioId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'Id'>,
  ): Promise<Inmueble> {
    return this.municipioRepository.inmuebles(id).create(inmueble);
  }

  @patch('/municipios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Municipio.Inmueble PATCH success count',
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
    return this.municipioRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/municipios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Municipio.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.municipioRepository.inmuebles(id).delete(where);
  }
}
