# DaviviendaShop

Aplicación móvil desarrollada en React Native (CLI) con TypeScript.

## Funcionalidades

-   Catálogo de productos (DummyJSON API)
-   Autenticación (login / registro)
-   Carrito de compras
-   Persistencia de sesión
-   Módulo nativo Toast (Android / iOS)
-   Tests unitarios

Proyecto desarrollado como prueba técnica, priorizando arquitectura
clara y buenas prácticas.

------------------------------------------------------------------------

## Instalación

``` bash
npm install
```

iOS (solo macOS):

``` bash
cd ios && pod install && cd ..
```

------------------------------------------------------------------------

## Ejecución

``` bash
npm start
npm run android
npm run ios
```

------------------------------------------------------------------------

## Stack

-   React Native CLI
-   TypeScript
-   React Navigation
-   Redux Toolkit + AsyncStorage
-   Zustand
-   Jest

------------------------------------------------------------------------

## Arquitectura

Separación por capas: - screens - components - navigation - store -
services - types - native

------------------------------------------------------------------------

## Tests

``` bash
npm test
npm run test:ci
```

------------------------------------------------------------------------

## Uso de herramientas asistidas por IA

Se utilizaron herramientas de asistencia de código como apoyo puntual
para estructura inicial y documentación.

Las decisiones arquitectónicas y de diseño fueron definidas manualmente
y el código fue validado mediante ejecución funcional y pruebas
automatizadas.