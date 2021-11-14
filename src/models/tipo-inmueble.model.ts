import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';

@model()
export class TipoInmueble extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  Participacion: number;

  @belongsTo(() => Inmueble)
  inmuebleId: string;

  constructor(data?: Partial<TipoInmueble>) {
    super(data);
  }
}

export interface TipoInmuebleRelations {
  // describe navigational properties here
}

export type TipoInmuebleWithRelations = TipoInmueble & TipoInmuebleRelations;
