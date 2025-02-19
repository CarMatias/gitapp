# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2021-06-20
### Added

- Signo "-" y "+" en gastos e ingresos  resprectivamente y tests correspondiente
- Campo recurrente agregado al modelo y tests correspondiente
- Vista de egresos y tests correspondientes
- Borrar movimientos y test correspondiente

### Changed

- Bug de orden decendiente de movimientos y test correspondiente

## [1.1.0] - 2021-06-19
### Added

- Movimiento Alerta y su test 
- Descripcion al modelo y su test

### Changed

- Bug arreglado punto flotanto y su test
- Bug arreglado formato fecha y su test

## [1.0.1] - 2021-05-03

### Added

-   Cypress detection for running tests on memory
-   Cypress seed before each cypress test

### Changed

-   Creates tables on server init and avoids erase on shutdown

### Removed

-   Cypress experimental configuration

## [1.0.0] - 2021-04-26

### Added

-   Movements API
-   Home UI with charts and last movements
-   Incomes UI with last incomes

[unreleased]: https://github.com/frlp-utn-ingsoft/gitapp/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/frlp-utn-ingsoft/gitapp/releases/tag/v1.0.1
[1.0.0]: https://github.com/frlp-utn-ingsoft/gitapp/releases/tag/v1.0.0
