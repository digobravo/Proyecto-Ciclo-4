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
  Empleado,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleEmpleadoController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Inmueble.prototype.Id,
  ): Promise<Empleado> {
    return this.inmuebleRepository.empleado(id);
  }
}
