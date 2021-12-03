import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Codeudor, CodeudorRelations} from '../models';

export class CodeudorRepository extends DefaultCrudRepository<
  Codeudor,
  typeof Codeudor.prototype.Id,
  CodeudorRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Codeudor, dataSource);
  }
}
