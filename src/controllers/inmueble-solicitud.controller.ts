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
  Solicitud,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleSolicitudController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Inmueble.prototype.Id,
  ): Promise<Solicitud> {
    return this.inmuebleRepository.solicitud(id);
  }
}
