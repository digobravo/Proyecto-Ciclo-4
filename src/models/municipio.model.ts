import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Departamento} from './departamento.model';

@model()
export class Municipio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @belongsTo(() => Departamento)
  departamentoId: string;


  constructor(data?: Partial<Municipio>) {
    super(data);
  }
}

export interface MunicipioRelations {
  // describe navigational properties here
}

export type MunicipioWithRelations = Municipio & MunicipioRelations;
