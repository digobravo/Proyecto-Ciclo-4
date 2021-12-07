import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
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

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Departamento.prototype.Id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Departamento, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.municipios = this.createHasManyRepositoryFactoryFor('municipios', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipios', this.municipios.inclusionResolver);
  }
}
