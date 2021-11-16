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
  Departamento,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleDepartamentoController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.string('id') id: typeof Inmueble.prototype.Id,
  ): Promise<Departamento> {
    return this.inmuebleRepository.departamento(id);
  }
}
