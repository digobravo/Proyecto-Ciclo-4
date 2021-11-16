import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Departamento, Municipio, TipoInmueble, Empleado, Solicitud} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {MunicipioRepository} from './municipio.repository';
import {TipoInmuebleRepository} from './tipo-inmueble.repository';
import {EmpleadoRepository} from './empleado.repository';
import {SolicitudRepository} from './solicitud.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.Id,
  InmuebleRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Inmueble.prototype.Id>;

  public readonly municipio: BelongsToAccessor<Municipio, typeof Inmueble.prototype.Id>;

  public readonly tipoInmueble: BelongsToAccessor<TipoInmueble, typeof Inmueble.prototype.Id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Inmueble.prototype.Id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Inmueble.prototype.Id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>, @repository.getter('TipoInmuebleRepository') protected tipoInmuebleRepositoryGetter: Getter<TipoInmuebleRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Inmueble, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.tipoInmueble = this.createBelongsToAccessorFor('tipoInmueble', tipoInmuebleRepositoryGetter,);
    this.registerInclusionResolver('tipoInmueble', this.tipoInmueble.inclusionResolver);
    this.municipio = this.createBelongsToAccessorFor('municipio', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipio', this.municipio.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
