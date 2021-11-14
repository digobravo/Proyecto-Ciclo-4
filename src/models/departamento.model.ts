import {Entity, hasMany, model, property} from '@loopback/repository';
import {Municipio} from './municipio.model';

@model()
export class Departamento extends Entity {
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

  @hasMany(() => Municipio)
  municipios: Municipio[];



  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
