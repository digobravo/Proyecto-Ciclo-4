import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Inmueble} from './inmueble.model';

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

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  constructor(data?: Partial<Municipio>) {
    super(data);
  }
}

export interface MunicipioRelations {
  // describe navigational properties here
}

export type MunicipioWithRelations = Municipio & MunicipioRelations;
