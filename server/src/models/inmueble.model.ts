import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Municipio} from './municipio.model';
import {TipoInmueble} from './tipo-inmueble.model';
import {Empleado} from './empleado.model';
import {Solicitud} from './solicitud.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @property({
    type: 'string',
    required: true,
  })
  Foto: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  Objeto: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @belongsTo(() => Municipio)
  municipioId: string;

  @belongsTo(() => TipoInmueble)
  tipoInmuebleId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
