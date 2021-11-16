import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Inmueble} from './inmueble.model';

@model()
export class Solicitud extends Entity {
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
  TipoSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  Mensaje: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaSolicitud: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Inmueble)
  inmuebleId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
