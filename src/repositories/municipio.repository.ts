import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Municipio, MunicipioRelations, Departamento, Inmueble} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {InmuebleRepository} from './inmueble.repository';

export class MunicipioRepository extends DefaultCrudRepository<
  Municipio,
  typeof Municipio.prototype.Id,
  MunicipioRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Municipio.prototype.Id>;

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Municipio.prototype.Id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Municipio, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
