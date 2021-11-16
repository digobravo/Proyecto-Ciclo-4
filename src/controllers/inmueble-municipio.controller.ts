import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Municipio,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleMunicipioController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/municipio', {
    responses: {
      '200': {
        description: 'Municipio belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipio)},
          },
        },
      },
    },
  })
  async getMunicipio(
    @param.path.string('id') id: typeof Inmueble.prototype.Id,
  ): Promise<Municipio> {
    return this.inmuebleRepository.municipio(id);
  }
}
