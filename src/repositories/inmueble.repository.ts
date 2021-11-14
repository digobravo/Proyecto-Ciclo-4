import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, TipoInmueble, Departamento, Municipio, Empleado, Solicitud} from '../models';
import {TipoInmuebleRepository} from './tipo-inmueble.repository';
import {DepartamentoRepository} from './departamento.repository';
import {MunicipioRepository} from './municipio.repository';
import {EmpleadoRepository} from './empleado.repository';
import {SolicitudRepository} from './solicitud.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.Id,
  InmuebleRelations
> {

  public readonly tipoInmueble: HasOneRepositoryFactory<TipoInmueble, typeof Inmueble.prototype.Id>;

  public readonly departamento: HasOneRepositoryFactory<Departamento, typeof Inmueble.prototype.Id>;

  public readonly municipio: HasOneRepositoryFactory<Municipio, typeof Inmueble.prototype.Id>;

  public readonly empleado: HasOneRepositoryFactory<Empleado, typeof Inmueble.prototype.Id>;

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Inmueble.prototype.Id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('TipoInmuebleRepository') protected tipoInmuebleRepositoryGetter: Getter<TipoInmuebleRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Inmueble, dataSource);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.empleado = this.createHasOneRepositoryFactoryFor('empleado', empleadoRepositoryGetter);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.municipio = this.createHasOneRepositoryFactoryFor('municipio', municipioRepositoryGetter);
    this.registerInclusionResolver('municipio', this.municipio.inclusionResolver);
    this.departamento = this.createHasOneRepositoryFactoryFor('departamento', departamentoRepositoryGetter);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.tipoInmueble = this.createHasOneRepositoryFactoryFor('tipoInmueble', tipoInmuebleRepositoryGetter);
    this.registerInclusionResolver('tipoInmueble', this.tipoInmueble.inclusionResolver);
  }
}
