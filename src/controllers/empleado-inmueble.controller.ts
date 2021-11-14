import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Inmueble,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoInmuebleController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.string('id') id: typeof Empleado.prototype.Id,
  ): Promise<Inmueble> {
    return this.empleadoRepository.inmueble(id);
  }
}
