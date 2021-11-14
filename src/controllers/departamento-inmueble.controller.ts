import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Departamento,
  Inmueble,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoInmuebleController {
  constructor(
    @repository(DepartamentoRepository)
    public departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.string('id') id: typeof Departamento.prototype.Id,
  ): Promise<Inmueble> {
    return this.departamentoRepository.inmueble(id);
  }
}
