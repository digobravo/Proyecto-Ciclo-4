import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Municipio,
  Inmueble,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioInmuebleController {
  constructor(
    @repository(MunicipioRepository)
    public municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to Municipio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.string('id') id: typeof Municipio.prototype.Id,
  ): Promise<Inmueble> {
    return this.municipioRepository.inmueble(id);
  }
}
