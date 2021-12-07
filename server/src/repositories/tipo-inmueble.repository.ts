import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {TipoInmueble, TipoInmuebleRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class TipoInmuebleRepository extends DefaultCrudRepository<
  TipoInmueble,
  typeof TipoInmueble.prototype.Id,
  TipoInmuebleRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof TipoInmueble.prototype.Id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(TipoInmueble, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
