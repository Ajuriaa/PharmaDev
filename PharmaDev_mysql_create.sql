CREATE TABLE `Laboratorio` (
	`laboratorioId` INT NOT NULL AUTO_INCREMENT,
	`laboratorioNombre` varchar(255) NOT NULL,
	`laboratorioDescripcion` varchar(255) NOT NULL,
	PRIMARY KEY (`laboratorioId`)
);

CREATE TABLE `Producto` (
	`productoId` INT NOT NULL AUTO_INCREMENT,
	`productoNombre` varchar(255) NOT NULL,
	`productoDescripcion` varchar(255) NOT NULL,
	`productoCodigo` varchar(255) NOT NULL,
	`productoPrecio` FLOAT NOT NULL,
	`productoFechaCreado` DATETIME NOT NULL,
	`productoFechaPublicado` DATETIME NOT NULL,
	`productoFechaEditado` DATETIME NOT NULL,
	`productoActivo` BOOLEAN NOT NULL,
	`categoriaId` INT NOT NULL,
	`marcaId` INT NOT NULL,
	`presentacionId` INT NOT NULL,
	PRIMARY KEY (`productoId`)
);

CREATE TABLE `Presentacion` (
	`presentacionId` INT NOT NULL AUTO_INCREMENT,
	`presentacionNombre` varchar(255) NOT NULL,
	`presentacionDescripcion` varchar(255) NOT NULL,
	PRIMARY KEY (`presentacionId`)
);

CREATE TABLE `Usuario` (
	`usuarioId` varchar(13) NOT NULL,
	`usuarioNombre` varchar(255) NOT NULL,
	`usuarioTelefono` varchar(255) NOT NULL,
	`usuarioCorreo` varchar(255) NOT NULL,
	`usuarioContrasena` varchar(255) NOT NULL,
	`usuarioAdmin` BOOLEAN NOT NULL,
	`usuarioRegistradoEl` DATETIME NOT NULL,
	`usuarioFechaNacimiento` DATE NOT NULL,
	`usuarioDireccion` varchar(255) NOT NULL,
	`usuarioSexo` varchar(1) NOT NULL,
	`usuarioUltimoLog` DATETIME NOT NULL,
	PRIMARY KEY (`usuarioId`)
);

CREATE TABLE `Carrito` (
	`carritoId` INT NOT NULL AUTO_INCREMENT,
	`usuarioId` INT NOT NULL,
	`carritoCreadoEl` DATETIME NOT NULL,
	`carritoActualizadoEl` DATETIME NOT NULL,
	`carritoEstado` varchar(255) NOT NULL,
	PRIMARY KEY (`carritoId`)
);

CREATE TABLE `CarritoProducto` (
	`carritoProductoId` INT NOT NULL AUTO_INCREMENT,
	`productoId` INT NOT NULL,
	`carritoId` INT NOT NULL,
	`carritoProductoFechaAñadido` DATETIME NOT NULL,
	`carritoProductoFechaActualizado` DATETIME NOT NULL,
	`carritoProductoCantidad` INT NOT NULL,
	`carritoProductoActivo` BOOLEAN NOT NULL,
	PRIMARY KEY (`carritoProductoId`)
);

CREATE TABLE `Inventario` (
	`inventarioId` INT NOT NULL,
	`inventarioExistencias` FLOAT NOT NULL,
	`inventarioFechaCaducidad` DATE NOT NULL,
	`productoId` INT NOT NULL
);

CREATE TABLE `Orden` (
	`ordenId` INT NOT NULL AUTO_INCREMENT,
	`usuarioId` INT NOT NULL,
	`ordenEstado` INT NOT NULL,
	`ordenSubtotal` FLOAT NOT NULL,
	`ordenDescuento` FLOAT NOT NULL,
	`ordenImpuestos` FLOAT NOT NULL,
	`ordenTotal` FLOAT NOT NULL,
	`ordenCreadoEl` DATETIME NOT NULL,
	`ordenActualizadoEl` DATETIME NOT NULL,
	PRIMARY KEY (`ordenId`)
);

CREATE TABLE `OrdenProducto` (
	`ordenProductoId` INT NOT NULL AUTO_INCREMENT,
	`productoId` INT NOT NULL,
	`ordenId` INT NOT NULL,
	`ordenProductoCantidad` INT NOT NULL,
	PRIMARY KEY (`ordenProductoId`)
);

ALTER TABLE `Producto` ADD CONSTRAINT `Producto_fk0` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`categoriaId`);

ALTER TABLE `Producto` ADD CONSTRAINT `Producto_fk1` FOREIGN KEY (`marcaId`) REFERENCES `Laboratorio`(`laboratorioId`);

ALTER TABLE `Producto` ADD CONSTRAINT `Producto_fk2` FOREIGN KEY (`presentacionId`) REFERENCES `Presentacion`(`presentacionId`);

ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_fk0` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`usuarioId`);

ALTER TABLE `CarritoProducto` ADD CONSTRAINT `CarritoProducto_fk0` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`productoId`);

ALTER TABLE `CarritoProducto` ADD CONSTRAINT `CarritoProducto_fk1` FOREIGN KEY (`carritoId`) REFERENCES `Carrito`(`carritoId`);

ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_fk0` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`productoId`);

ALTER TABLE `Orden` ADD CONSTRAINT `Orden_fk0` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`usuarioId`);

ALTER TABLE `OrdenProducto` ADD CONSTRAINT `OrdenProducto_fk0` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`productoId`);

ALTER TABLE `OrdenProducto` ADD CONSTRAINT `OrdenProducto_fk1` FOREIGN KEY (`ordenId`) REFERENCES `Orden`(`ordenId`);










