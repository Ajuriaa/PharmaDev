-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: pharmadev
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.20-MariaDB

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (4,'0607199901067','2021-10-23 07:38:59','2021-10-23 07:38:59','inactivo');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
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
  `inventarioId` int(11) NOT NULL AUTO_INCREMENT,
  `inventarioExistencias` float NOT NULL,
  `inventarioFechaCaducidad` date NOT NULL,
  `productoId` int(11) NOT NULL,
  PRIMARY KEY (`inventarioId`),
  KEY `inventario_FK` (`productoId`),
  CONSTRAINT `inventario_FK` FOREIGN KEY (`productoId`) REFERENCES `producto` (`productoId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratorio`
--

LOCK TABLES `laboratorio` WRITE;
/*!40000 ALTER TABLE `laboratorio` DISABLE KEYS */;
INSERT INTO `laboratorio` VALUES (1,'Lab L&L','Distribuidora de farmacos'),(2,'BAYER','una empresa quÃ­mico-farmacÃ©utica alemana fundada en Barmen, Alemania| en 1863.'),(3,'Pfizer','empresa farmacÃ©utica estadounidense que, despuÃ©s de diversas fusiones llevadas a cabo con Pharmacia and Upjohn y Parke Davis, es el laboratorio lÃ­der a nivel mundial en el sector farmacÃ©utico. '),(4,'gsk','empresa britÃ¡nica de productos farmacÃ©uticos, productos de cuidado dental y de cuidado de la salud.'),(5,'Roche','empresa que se dedica a la industria farmacÃ©utica, tiene sus sedes principales en las ciudad de Basilea (Suiza) y ParÃ­s, Francia.');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentacion`
--

LOCK TABLES `presentacion` WRITE;
/*!40000 ALTER TABLE `presentacion` DISABLE KEYS */;
INSERT INTO `presentacion` VALUES (1,'Tabletas','Caja blanca, pequeña de 12 unidades.'),(2,'Jarabe','Para principios activos solubles en agua, con alto contenido en azÃºcar'),(3,'Gotas',' presentaciones lÃ­quidas en las cuales el principio activo estÃ¡ mÃ¡s concentrado.'),(4,'Capsulas 100mg','Medicamentos sÃ³lidos formados por compresiÃ³n de sus constituyentes. 100Mg'),(5,'Inyeccion','Liquido ingresado en jeringa para introduccion directa en el clienta'),(6,'Capsulas 500mg','Medicamentos sÃ³lidos formados por compresiÃ³n de sus constituyentes. 500mg'),(7,'Polvo','El principio activo estÃ¡ en el polvo que debe prepararse antes de cada toma');
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
  `productoFechaCreado` datetime DEFAULT NULL,
  `productoFechaPublicado` datetime DEFAULT NULL,
  `productoFechaEditado` datetime DEFAULT NULL,
  `productoActivo` tinyint(1) NOT NULL,
  `presentacionId` int(11) NOT NULL,
  `laboratorioId` int(11) DEFAULT NULL,
  `productoImagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`productoId`),
  KEY `Producto_fk2` (`presentacionId`),
  KEY `producto_FK` (`laboratorioId`),
  CONSTRAINT `Producto_fk2` FOREIGN KEY (`presentacionId`) REFERENCES `presentacion` (`presentacionId`),
  CONSTRAINT `producto_FK` FOREIGN KEY (`laboratorioId`) REFERENCES `laboratorio` (`laboratorioId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (2,'Panadol Ultra',' contiene una combinaciÃ³n de ingredientes clÃ­nicamente comprobados para el alivio rÃ¡pido de 5 tipos de dolor fuerte*, inclusive, la migraÃ±a.','',50,'2021-10-29 08:37:16','2021-10-29 08:37:16',NULL,1,4,2,'https://i.ibb.co/Tk1wyBR/2.jpg'),(3,'Tosan Adulto','Jarabe contra la tos y siÌ�ntomas de la gripe.combate la tos. Expectorante: fluidifica la flema facilitando la expectoracioÌ�n. AntihistamiÌ�nico: descongestiona la nariz y los bronquios.','',80,'2021-10-29 08:40:55','2021-10-29 08:40:55',NULL,1,2,4,'https://i.ibb.co/z478dCV/3.jpg'),(4,'Aspirina','Detiene la producciÃ³n de ciertas sustancias naturales que causan fiebre, dolor, inflamaciÃ³n y coÃ¡gulos sanguÃ­neos.','',100,'2021-10-29 08:42:25','2021-10-29 08:42:25',NULL,1,4,2,'https://i.ibb.co/TBVBB39/4.jpg'),(5,'Viagra',' se usa para tratar la disfunciÃ³n erÃ©ctil en los hombres (impotencia; incapacidad para tener una erecciÃ³n o mantenerla).','',450,'2021-10-29 08:43:33','2021-10-29 08:43:33',NULL,1,6,5,'https://i.ibb.co/TB5j7Dq/5.jpg'),(6,'Sudagrip','Antigripal con acciÃ³n antiviral y descongestionante, para estados gripales severos con congestiÃ³n nasal, tos con flema, fiebre, rinitis severa, dolor de cabeza y cuerpo.','',450,'2021-10-29 08:45:43','2021-10-29 08:45:43',NULL,1,7,3,'https://i.ibb.co/4ZSd1y5/6.png'),(7,'DoloNeurobion','es un medicamento que sirve para combatir el dolor y la inflamaciÃ³n','',250,'2021-10-29 08:47:52','2021-10-29 08:47:52',NULL,1,4,3,'https://i.ibb.co/7kwkd70/7.jpg'),(8,'Emulsion de Scott','Se utiliza cuando el organismo requiere de admistraciÃ³n mayor de vitaminas A y D, fÃ³sforo y calcio.','',120,'2021-10-29 08:49:00','2021-10-29 08:49:00',NULL,1,2,2,'https://i.ibb.co/xYdFszQ/8.jpg'),(9,'Nazil','Nazil es un medicamento oftaÃ¡lmico que contiene el principio activo nafazolina y sirve para el alivio de malestares transitorios ','',1500,'2021-10-29 08:50:35','2021-10-29 08:50:35',NULL,1,2,3,'https://i.ibb.co/k3LRHsB/9.jpg');
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
  `usuarioTelefono` varchar(255) DEFAULT NULL,
  `usuarioCorreo` varchar(255) DEFAULT NULL,
  `usuarioContrasena` varchar(255) NOT NULL,
  `usuarioAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `usuarioRegistradoEl` datetime DEFAULT NULL,
  `usuarioFechaNacimiento` date DEFAULT NULL,
  `usuarioDireccion` varchar(255) DEFAULT NULL,
  `usuarioSexo` varchar(1) DEFAULT NULL,
  `usuarioUltimoLog` datetime DEFAULT NULL,
  PRIMARY KEY (`usuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('0601199900202','Quiroz L','89102570',NULL,'$2b$10$n35IKukAanQLPFjWL6SQ0O.q1LYJozEFfKbTJO5gAz9cz.DmPVSv.',0,'2021-11-07 11:19:28',NULL,NULL,NULL,NULL),('0601199900208','Bob Espnja','88888888',NULL,'$2b$10$RWJWZ4/0nOkY0a7HW6yV2eB7evx6pawOL5BbsJait6pwFwuRynOTW',0,'2021-11-08 04:14:09',NULL,NULL,NULL,NULL),('0607199901067','Lissbeth Peralta','96864916','lissbethperalta71@gmail.com','$2b$10$IrDfM6dKjy0h9orNwJvTWO/pvT1w1GYeBqVvRQ6AzTwoFb7095Bma',0,'2021-10-23 07:14:16','1999-10-15','Col. Nueva Esperanza','f','0000-00-00 00:00:00');
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

-- Dump completed on 2021-11-07 22:47:19
