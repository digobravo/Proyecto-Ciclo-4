import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoInmueble,
  Inmueble,
} from '../models';
import {TipoInmuebleRepository} from '../repositories';

export class TipoInmuebleInmuebleController {
  constructor(
    @repository(TipoInmuebleRepository)
    public tipoInmuebleRepository: TipoInmuebleRepository,
  ) { }

  @get('/tipo-inmuebles/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to TipoInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.string('id') id: typeof TipoInmueble.prototype.Id,
  ): Promise<Inmueble> {
    return this.tipoInmuebleRepository.inmueble(id);
  }
}
