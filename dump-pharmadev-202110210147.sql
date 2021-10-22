-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: pharmadev
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `carritoId` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioId` varchar(13) NOT NULL,
  `carritoCreadoEl` datetime NOT NULL,
  `carritoActualizadoEl` datetime NOT NULL,
  `carritoEstado` varchar(255) NOT NULL,
  PRIMARY KEY (`carritoId`),
  KEY `carrito_FK` (`usuarioId`),
  CONSTRAINT `carrito_FK` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`usuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritoproducto`
--

DROP TABLE IF EXISTS `carritoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carritoproducto` (
  `carritoProductoId` int(11) NOT NULL AUTO_INCREMENT,
  `productoId` int(11) NOT NULL,
  `carritoId` int(11) NOT NULL,
  `carritoProductoFechaAñadido` datetime NOT NULL,
  `carritoProductoFechaActualizado` datetime NOT NULL,
  `carritoProductoCantidad` int(11) NOT NULL,
  `carritoProductoActivo` tinyint(1) NOT NULL,
  PRIMARY KEY (`carritoProductoId`),
  KEY `CarritoProducto_fk0` (`productoId`),
  KEY `CarritoProducto_fk1` (`carritoId`),
  CONSTRAINT `CarritoProducto_fk0` FOREIGN KEY (`productoId`) REFERENCES `producto` (`productoId`),
  CONSTRAINT `CarritoProducto_fk1` FOREIGN KEY (`carritoId`) REFERENCES `carrito` (`carritoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritoproducto`
--

LOCK TABLES `carritoproducto` WRITE;
/*!40000 ALTER TABLE `carritoproducto` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventario` (
  `inventarioId` int(11) NOT NULL,
  `inventarioExistencias` float NOT NULL,
  `inventarioFechaCaducidad` date NOT NULL,
  `productoId` int(11) NOT NULL,
  KEY `Inventario_fk0` (`productoId`),
  CONSTRAINT `Inventario_fk0` FOREIGN KEY (`productoId`) REFERENCES `producto` (`productoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laboratorio`
--

DROP TABLE IF EXISTS `laboratorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `laboratorio` (
  `laboratorioId` int(11) NOT NULL AUTO_INCREMENT,
  `laboratorioNombre` varchar(255) NOT NULL,
  `laboratorioDescripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`laboratorioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratorio`
--

LOCK TABLES `laboratorio` WRITE;
/*!40000 ALTER TABLE `laboratorio` DISABLE KEYS */;
/*!40000 ALTER TABLE `laboratorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS `orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orden` (
  `ordenId` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioId` varchar(13) NOT NULL,
  `ordenEstado` int(11) NOT NULL,
  `ordenSubtotal` float NOT NULL,
  `ordenDescuento` float NOT NULL,
  `ordenImpuestos` float NOT NULL,
  `ordenTotal` float NOT NULL,
  `ordenCreadoEl` datetime NOT NULL,
  `ordenActualizadoEl` datetime NOT NULL,
  PRIMARY KEY (`ordenId`),
  KEY `orden_FK` (`usuarioId`),
  CONSTRAINT `orden_FK` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`usuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenproducto`
--

DROP TABLE IF EXISTS `ordenproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordenproducto` (
  `ordenProductoId` int(11) NOT NULL AUTO_INCREMENT,
  `productoId` int(11) NOT NULL,
  `ordenId` int(11) NOT NULL,
  `ordenProductoCantidad` int(11) NOT NULL,
  PRIMARY KEY (`ordenProductoId`),
  KEY `OrdenProducto_fk0` (`productoId`),
  KEY `OrdenProducto_fk1` (`ordenId`),
  CONSTRAINT `OrdenProducto_fk0` FOREIGN KEY (`productoId`) REFERENCES `producto` (`productoId`),
  CONSTRAINT `OrdenProducto_fk1` FOREIGN KEY (`ordenId`) REFERENCES `orden` (`ordenId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenproducto`
--

LOCK TABLES `ordenproducto` WRITE;
/*!40000 ALTER TABLE `ordenproducto` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentacion`
--

DROP TABLE IF EXISTS `presentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presentacion` (
  `presentacionId` int(11) NOT NULL AUTO_INCREMENT,
  `presentacionNombre` varchar(255) NOT NULL,
  `presentacionDescripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`presentacionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentacion`
--

LOCK TABLES `presentacion` WRITE;
/*!40000 ALTER TABLE `presentacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `presentacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `productoId` int(11) NOT NULL AUTO_INCREMENT,
  `productoNombre` varchar(255) NOT NULL,
  `productoDescripcion` varchar(255) NOT NULL,
  `productoCodigo` varchar(255) NOT NULL,
  `productoPrecio` float NOT NULL,
  `productoFechaCreado` datetime NOT NULL,
  `productoFechaPublicado` datetime NOT NULL,
  `productoFechaEditado` datetime NOT NULL,
  `productoActivo` tinyint(1) NOT NULL,
  `marcaId` int(11) NOT NULL,
  `presentacionId` int(11) NOT NULL,
  PRIMARY KEY (`productoId`),
  KEY `Producto_fk1` (`marcaId`),
  KEY `Producto_fk2` (`presentacionId`),
  CONSTRAINT `Producto_fk1` FOREIGN KEY (`marcaId`) REFERENCES `laboratorio` (`laboratorioId`),
  CONSTRAINT `Producto_fk2` FOREIGN KEY (`presentacionId`) REFERENCES `presentacion` (`presentacionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `usuarioId` varchar(13) NOT NULL,
  `usuarioNombre` varchar(255) NOT NULL,
  `usuarioTelefono` varchar(255) NOT NULL,
  `usuarioCorreo` varchar(255) NOT NULL,
  `usuarioContrasena` varchar(255) NOT NULL,
  `usuarioAdmin` tinyint(1) NOT NULL,
  `usuarioRegistradoEl` datetime NOT NULL,
  `usuarioFechaNacimiento` date NOT NULL,
  `usuarioDireccion` varchar(255) NOT NULL,
  `usuarioSexo` varchar(1) NOT NULL,
  `usuarioUltimoLog` datetime NOT NULL,
  PRIMARY KEY (`usuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'pharmadev'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-21  1:47:24
