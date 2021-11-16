### Desarrollo Web Ciclo 4 Grupo 18
# Stackers 18 ★★★

Integrantes del Equipo:
* David Fernando Prieto
* Diego Bravo Arias
* Darwing David Mosquera

# Proyecto Inmobiliaria

Esta aplicación ha sido creada usando [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) con la siguente
[maquetación inicial de proyecto](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Instalar dependencias

Por defecto, ciertas dependencias fueron instaladas cuando se generó la aplicación.
Siempre que se modifiquen esas dependencias en el archivo `package.json`, ejecute el siguiente comando:

```sh
npm install
```

Para instalar solamente las dependancias resueltas en `package-lock.json`:

```sh
npm ci
```

## ejecutar la aplicación

```sh
npm start
```

Puede ejecutar tambien `node .` para omitir el paso de compilar.

Abra http://127.0.0.1:3000 en su navegador.

## Rebuild the project

Para compilar incrementalmente el proyecto:

```sh
npm run build
```

Para forzar una compilación completa limpiando los artefactos almacenados en caché::

```sh
npm run rebuild
```

## Solucionar problemas de formato y estilos de codigo

```sh
npm run lint
```

Para solucionar automaticamente dichos problemas:

```sh
npm run lint:fix
```

## Otros comandos útiles

- `npm run migrate`: Migrar esquemas de los modelos de la base de datos
- `npm run openapi-spec`: Genera una OpenAPI especifica en un archivo
- `npm run docker:build`: Crea una imagen _Docker_ para la aplicación
- `npm run docker:run`: Ejecuta esta aplicación dentro de un contenedor Docker

## Pruebas

```sh
npm test
```

## Qué sigue?

Porfavor revise la [documentación de LoopBack 4](https://loopback.io/doc/en/lb4/) para entender como puede seguir agregando funcionalidades a esta aplicación

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
