import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {TipoInmueble, TipoInmuebleRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class TipoInmuebleRepository extends DefaultCrudRepository<
  TipoInmueble,
  typeof TipoInmueble.prototype.Id,
  TipoInmuebleRelations
> {

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof TipoInmueble.prototype.Id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(TipoInmueble, dataSource);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
