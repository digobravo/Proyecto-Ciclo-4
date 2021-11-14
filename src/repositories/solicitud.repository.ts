import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Cliente, Inmueble} from '../models';
import {ClienteRepository} from './cliente.repository';
import {InmuebleRepository} from './inmueble.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.Id,
  SolicitudRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Solicitud.prototype.Id>;

  public readonly inmueble: HasOneRepositoryFactory<Inmueble, typeof Solicitud.prototype.Id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Solicitud, dataSource);
    this.inmueble = this.createHasOneRepositoryFactoryFor('inmueble', inmuebleRepositoryGetter);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
