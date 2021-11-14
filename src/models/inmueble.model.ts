import {Entity, hasOne, model, property} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Empleado} from './empleado.model';
import {Municipio} from './municipio.model';
import {TipoInmueble} from './tipo-inmueble.model';

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
  })
  Foto?: string;

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

  @hasOne(() => TipoInmueble)
  IdtipoInmueble: TipoInmueble;

  @hasOne(() => Departamento)
  Iddepartamento: Departamento;

  @hasOne(() => Municipio)
  Idmunicipio: Municipio;

  @hasOne(() => Empleado)
  Idempleado: Empleado;


  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
