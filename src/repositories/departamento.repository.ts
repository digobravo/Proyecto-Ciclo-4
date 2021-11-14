import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Municipio, Inmueble} from '../models';
import {MunicipioRepository} from './municipio.repository';
import {InmuebleRepository} from './inmueble.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.Id,
  DepartamentoRelations
> {

  public readonly municipios: HasManyRepositoryFactory<Municipio, typeof Departamento.prototype.Id>;

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof Departamento.prototype.Id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Departamento, dataSource);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
    this.municipios = this.createHasManyRepositoryFactoryFor('municipios', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipios', this.municipios.inclusionResolver);
  }
}
