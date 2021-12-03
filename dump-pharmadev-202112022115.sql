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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CarritoEstado` varchar(255) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'actual',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UsuarioId` varchar(13) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UsuarioId` (`UsuarioId`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`UsuarioId`) REFERENCES `usuario` (`Id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (5,'orden-generada','2021-11-22 19:26:10','2021-12-02 22:25:20','0601199900202'),(6,'actual','2021-12-02 01:51:20','2021-12-02 01:51:20','0607199901067'),(7,'orden-generada','2021-12-02 22:25:20','2021-12-03 02:18:01','0601199900202'),(8,'orden-generada','2021-12-03 02:18:01','2021-12-03 03:07:31','0601199900202'),(9,'actual','2021-12-03 03:07:31','2021-12-03 03:07:31','0601199900202');
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritoproducto`
--

DROP TABLE IF EXISTS `carritoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carritoproducto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CarritoProductoCantidad` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CarritoId` int(11) DEFAULT NULL,
  `ProductoId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CarritoId` (`CarritoId`),
  KEY `ProductoId` (`ProductoId`),
  CONSTRAINT `carritoproducto_ibfk_1` FOREIGN KEY (`CarritoId`) REFERENCES `carrito` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carritoproducto_ibfk_2` FOREIGN KEY (`ProductoId`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritoproducto`
--

LOCK TABLES `carritoproducto` WRITE;
/*!40000 ALTER TABLE `carritoproducto` DISABLE KEYS */;
INSERT INTO `carritoproducto` VALUES (38,2,'2021-11-27 03:17:22','2021-11-27 03:17:22',5,1),(39,2,'2021-11-27 03:17:30','2021-11-27 03:17:30',5,2),(49,5,'2021-12-02 23:50:59','2021-12-02 23:50:59',7,11),(50,1,'2021-12-03 02:13:57','2021-12-03 02:13:57',7,9),(52,1,'2021-12-03 02:14:49','2021-12-03 02:14:49',7,23),(53,1,'2021-12-03 02:39:09','2021-12-03 02:39:09',8,1),(54,1,'2021-12-03 02:40:45','2021-12-03 02:40:45',8,2),(55,1,'2021-12-03 02:40:48','2021-12-03 02:40:48',8,3),(56,1,'2021-12-03 02:40:51','2021-12-03 02:40:51',8,5),(57,1,'2021-12-03 02:40:54','2021-12-03 02:40:54',8,6);
/*!40000 ALTER TABLE `carritoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `InventarioExistencia` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `InventarioFechaCaducidad` datetime DEFAULT NULL,
  `ProductoId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductoId` (`ProductoId`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`ProductoId`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,'50','2021-12-31 00:00:00',1),(2,'50','2021-12-31 00:00:00',2),(3,'50','2021-12-31 00:00:00',3),(4,'50','2021-12-31 00:00:00',4),(5,'50','2021-12-31 00:00:00',5),(6,'50','2021-12-31 00:00:00',6),(7,'50','2021-12-31 00:00:00',7),(8,'50','2021-12-31 00:00:00',8),(9,'50','2021-12-31 00:00:00',9),(10,'50','2021-12-31 00:00:00',10),(11,'50','2021-12-31 00:00:00',11),(12,'50','2021-12-31 00:00:00',12),(13,'50','2021-12-31 00:00:00',13),(14,'50','2021-12-31 00:00:00',14),(15,'50','2021-12-31 00:00:00',15),(16,'50','2021-12-31 00:00:00',16),(17,'50','2021-12-31 00:00:00',17),(18,'50','2021-12-31 00:00:00',18),(19,'50','2021-12-31 00:00:00',19),(20,'50','2021-12-31 00:00:00',20),(21,'50','2021-12-31 00:00:00',21),(22,'50','2021-12-31 00:00:00',22),(23,'50','2021-12-31 00:00:00',23),(24,'50','2021-12-31 00:00:00',24),(25,'50','2021-12-31 00:00:00',25),(26,'50','2021-12-31 00:00:00',26),(27,'50','2021-12-31 00:00:00',27),(28,'50','2021-12-31 00:00:00',28),(29,'50','2021-12-31 00:00:00',29),(30,'50','2021-12-31 00:00:00',30);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laboratorio`
--

DROP TABLE IF EXISTS `laboratorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `laboratorio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `LaboratorioNombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `LaboratorioDescripcion` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LaboratorioNombre` (`LaboratorioNombre`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratorio`
--

LOCK TABLES `laboratorio` WRITE;
/*!40000 ALTER TABLE `laboratorio` DISABLE KEYS */;
INSERT INTO `laboratorio` VALUES (1,'BAYER','una empresa químico-farmacéutica alemana fundada en Barmen, Alemania| en 1863.'),(2,'Pfizer','empresa farmacéutica estadounidense que, después de diversas fusiones llevadas a cabo con Pharmacia and Upjohn y Parke Davis, es el laboratorio líder a nivel mundial en el sector farmacéutico. '),(3,'gsk','empresa británica de productos farmacéuticos, productos de cuidado dental y de cuidado de la salud.'),(4,'Roche','empresa que se dedica a la industria farmacéutica, tiene sus sedes principales en las ciudad de Basilea (Suiza) y Parí­s, Francia.'),(5,'Vive',NULL),(6,'Cosmetica Internacional S.A.',NULL),(7,'Lihebcen',NULL),(8,'MK',NULL),(9,'Finlay',NULL),(10,'Huggies',NULL),(11,'Zambon',NULL),(12,'Vitaflenaco',NULL),(13,'MC',NULL),(14,'GLAXOSMITHKLINE',NULL),(15,'P&G',NULL),(16,'Pharmainsa',NULL),(17,'Broncolin',NULL),(18,'Genomma Lab',NULL),(19,'Infarma',NULL),(23,'PAILL',NULL),(24,'FARMAMEDICA S.A',NULL),(25,'Erma',NULL),(26,'Quimifar S.A',NULL),(27,'Sophia SA de CV',NULL),(28,'Dolo-Neurobión®N',NULL);
/*!40000 ALTER TABLE `laboratorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS `orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `OrdenEstado` varchar(255) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'pendiente',
  `OrdenSubtotal` float NOT NULL,
  `OrdenDescuento` float NOT NULL,
  `OrdenImpuesto` float NOT NULL,
  `OrdenTotal` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UsuarioId` varchar(13) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UsuarioId` (`UsuarioId`),
  CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`UsuarioId`) REFERENCES `usuario` (`Id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
INSERT INTO `orden` VALUES (1,'pendiente',260,0,39,299,'2021-12-02 22:25:20','2021-12-02 22:25:20','0601199900202'),(2,'pendiente',250,0,37.5,287.5,'2021-12-03 02:18:01','2021-12-03 02:18:01','0601199900202'),(3,'pendiente',930,0,139.5,1069.5,'2021-12-03 03:07:31','2021-12-03 03:07:31','0601199900202');
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenproducto`
--

DROP TABLE IF EXISTS `ordenproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordenproducto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `OrdenProductoCantidad` int(11) NOT NULL,
  `OrdenId` int(11) DEFAULT NULL,
  `ProductoId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrdenId` (`OrdenId`),
  KEY `ProductoId` (`ProductoId`),
  CONSTRAINT `ordenproducto_ibfk_1` FOREIGN KEY (`OrdenId`) REFERENCES `orden` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ordenproducto_ibfk_2` FOREIGN KEY (`ProductoId`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenproducto`
--

LOCK TABLES `ordenproducto` WRITE;
/*!40000 ALTER TABLE `ordenproducto` DISABLE KEYS */;
INSERT INTO `ordenproducto` VALUES (1,2,1,1),(2,2,1,2),(3,5,2,11),(4,1,2,9),(5,1,2,23),(6,1,3,1),(7,1,3,6),(8,1,3,5),(9,1,3,2),(10,1,3,3);
/*!40000 ALTER TABLE `ordenproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentacion`
--

DROP TABLE IF EXISTS `presentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presentacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PresentacionNombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `PresentacionDescripcion` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PresentacionNombre` (`PresentacionNombre`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentacion`
--

LOCK TABLES `presentacion` WRITE;
/*!40000 ALTER TABLE `presentacion` DISABLE KEYS */;
INSERT INTO `presentacion` VALUES (1,'Tabletas','Caja blanca, pequeña de 12 unidades.'),(2,'Jarabe','Para principios activos solubles en agua, con alto contenido en azúcar'),(3,'Gotas','presentaciones lí­quidas en las cuales el principio activo está más concentrado.'),(4,'Capsulas 100mg','Medicamentos sólidos formados por compresón de sus constituyentes. 100Mg'),(5,'Inyeccion','Liquido ingresado en jeringa para introduccion directa en el clienta'),(6,'Capsulas 500mg','Medicamentos sólidos formados por compresión de sus constituyentes. 500mg'),(7,'Polvo','El principio activo está en el polvo que debe prepararse antes de cada toma'),(13,'Presevativos','Un preservativo, profiláctico o condón es un dispositivo de barrera con forma de funda utilizado durante una relación sexual para reducir la probabilidad de embarazo o el contagio de infecciones de transmisión sexual.'),(14,'Pomada','son formas farmacéuticas consecuencia de la utilización de grasas o sustancias de propiedades similares para aplicaciÃ³n de principios activos en la piel.'),(15,'Frasco 120G',NULL),(16,'Caja 100 piezas-negro',NULL),(17,'CREMA TUBO X 15 GRAMOS',NULL),(18,'Caja 48 UND',NULL),(19,'Capsulas 30 UND',NULL),(20,'Tabletas 500mg',NULL),(21,'Capsulas blandas  30UND',NULL),(22,'Capletas 50 UND',NULL),(23,'Jabón',NULL);
/*!40000 ALTER TABLE `presentacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ProductoNombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `ProductoDescripcion` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ProductoPrecio` float NOT NULL,
  `productoActivo` tinyint(1) DEFAULT 1,
  `productoImagen` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LaboratorioId` int(11) DEFAULT NULL,
  `PresentacionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductoNombre` (`ProductoNombre`),
  KEY `LaboratorioId` (`LaboratorioId`),
  KEY `PresentacionId` (`PresentacionId`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`LaboratorioId`) REFERENCES `laboratorio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`PresentacionId`) REFERENCES `presentacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Panadol Ultra','Contiene una combinación de ingredientes clí­nicamente comprobados para el alivio rápido de 5 tipos de dolor fuerte*, inclusive, la migraña.',50,1,'http://192.168.0.2:7777/products/2.jpg','2021-10-29 08:50:35','2021-10-29 08:50:35',3,4),(2,'Tosan Adulto','Jarabe contra la tos y síntomas de la gripe.combate la tos. Expectorante: fluidifica la flema facilitando la expectoración. Antihistamínico: descongestiona la nariz y los bronquios.',80,1,'http://192.168.0.2:7777/products/3.jpg','2021-10-29 08:50:35','2021-10-29 08:50:35',19,2),(3,'Aspirina','Detiene la producción de ciertas sustancias naturales que causan fiebre, dolor, inflamación y coágulos sanguí­neos.',100,1,'http://192.168.0.2:7777/products/4.jpg','2021-10-29 08:50:35','2021-10-29 08:50:35',1,1),(4,'Viagra','Se usa para tratar la disfunción eréctil en los hombres (impotencia; incapacidad para tener una erección o mantenerla).',450,1,'http://192.168.0.2:7777/products/5.jpg','2021-10-29 08:50:35','2021-10-29 08:50:35',2,6),(5,'Sudagrip','Antigripal con acción antiviral y descongestionante, para estados gripales severos con congestión nasal, tos con flema, fiebre, rinitis severa, dolor de cabeza y cuerpo.',450,1,'http://192.168.0.2:7777/products/6.jpg','2021-10-29 08:50:35','2021-10-29 08:50:35',23,7),(6,'DoloNeurobion','Es un medicamento que sirve para combatir el dolor y la inflamación',250,1,'http://192.168.0.2:7777/products/7.jpg','2021-10-29 08:50:35','2021-10-29 08:50:35',28,4),(7,'Emulsion de Scott','Se utiliza cuando el organismo requiere de admistración mayor de vitaminas A y D, fósforo y calcio.',120,1,'http://192.168.0.2:7777/products/8.jpg','2021-10-29 08:50:35','2021-10-29 08:50:35',3,2),(8,'Nazil','Nazil es un medicamento oftálmico que contiene el principio activo nafazolina y sirve para el alivio de malestares transitorios',1500,1,'http://192.168.0.2:7777/products/9.jpg','2021-10-29 08:50:35','2021-10-29 08:50:35',27,3),(9,'Preservativos Vive','es la marca lider de condones de látex en la región centroamericana con ventas de mÃ¡s de 26 millones de unidades anuales. Nuestra marca forma parte de la organización que más condones vende en el mundo. ¡Condones vive: Divertidos, originales y seguros!',120,1,'http://192.168.0.2:7777/products/10.png','2021-11-22 08:50:35','2021-11-22 08:50:35',5,13),(10,'Nodor Ice','Mezcla de eucalipto, mentol, alcanfor, árnica y aceite de césamo',60,1,'http://192.168.0.2:7777/products/11.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',6,15),(11,'Mascarilla KF94','son un modelo de mascarillas fabricado en Corea del Norte que une los diseños de las N95 norteamericanas y de los cubrebocas de tela.',10,1,'http://192.168.0.2:7777/products/12.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',26,16),(12,'Clobegen','Combina el efecto sostenido antiinflamatorio, antiprurá­tico y vasoconstrictor de la betametasona en forma de dipropionato, con la acción antimicática de amplio espectro del clotrimazol y el efecto antibiótico de amplio espectro del sulfato de gentamicina',299,1,'http://192.168.0.2:7777/products/13.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',8,17),(13,'Tiamina','ayuda a las células del organismo a convertir carbohidratos en energía. El papel principal de los carbohidratos es suministrar energía al cuerpo, especialmente al cerebro y al sistema nervioso.',500,1,'http://192.168.0.2:7777/products/14.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',25,5),(14,'Toallitas Humedas','Cada toallita está inspirada en tu abrazo, por eso es suave y delicada con la piel de tu bebé.',200,1,'http://192.168.0.2:7777/products/15.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',10,18),(15,'FISIOGEN','es un complemento alimenticio de pirofosfato férrico en liposomas (Ultraferá)',350,1,'http://192.168.0.2:7777/products/16.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',11,19),(16,'Azitromicina','es un antibiótico de amplio espectro del grupo de macrólidos que actúa contra varias bacterias grampositivas y gramnegativas.',120,1,'http://192.168.0.2:7777/products/17.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',23,20),(17,'Vitaflenaco','Su innovadora fórmula combina diclofenaco y vitaminas del complejo B, aliviando rápidamente el dolor y la inflamación de origen nervioso,',50,1,'http://192.168.0.2:7777/products/18.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',24,21),(18,'Musflex','está indicado como coadyuvante en el descanso, terapia física u otras medidas para la disminución del dolor asociado con dolor musculoesquelético.',100,1,'http://192.168.0.2:7777/products/19.jpg','2021-11-22 08:50:35','2021-11-22 08:50:35',13,22),(19,'Panadol Multisintomas','Elimina los sintomas de la gripe',130,1,'http://192.168.0.2:7777/products/multisintomas.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',1,4),(20,'Cofal','L-mentol Salicilato de metilo',70,1,'http://192.168.0.2:7777/products/cofal.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',13,14),(21,'Pastillas Vick','tabletas mentoladas que alivia el dolor en la garganta',10,1,'http://192.168.0.2:7777/products/vick.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',15,1),(22,'Pastilla Tapon','antidiarreico',210,1,'http://192.168.0.2:7777/products/tapon.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',16,21),(23,'Lubricante vive','sustancia dirigida a suplir la humedad natural de la zona íntima.',80,1,'http://192.168.0.2:7777/products/lubricante.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',5,14),(24,'Sukrol Vigor','suplemento vitamínico que sirve para combatir el estrés, insomnio, cansancio y fortalecer el desempeño mental.',200,1,'http://192.168.0.2:7777/products/sukrol.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',17,4),(25,'Genoprazol','alivia la gastritis',250,1,'http://192.168.0.2:7777/products/genoprazol.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',18,17),(26,'Gripex','alivia los sintomas de la gripe',160,1,'http://192.168.0.2:7777/products/gripex.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',19,1),(27,'Acetaminofen',' el dolor ligero o moderado de dolores de cabeza, dolores musculares, períodos menstruales, resfriados y gargantas irritadas, dolores de muelas, dolores de espalda y para reducir la fiebre',60,1,'http://192.168.0.2:7777/products/acetaminofen.png','2021-11-26 08:50:35','2021-11-26 08:50:35',3,1),(28,'Diclofenaco','antiinflamatorio que posee actividades anal­gésicas y antipiréticas y está indicado por vía oral e intramuscular ',80,1,'http://192.168.0.2:7777/products/diclofenaco.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',3,5),(29,'Jabon Asepxia','tratamiento para el acne',93,1,'http://192.168.0.2:7777/products/asepxia.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',18,23),(30,'Nikson','combate la hemorroides',300,1,'http://192.168.0.2:7777/products/nikson.jpg','2021-11-26 08:50:35','2021-11-26 08:50:35',18,1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `Id` varchar(13) COLLATE utf8_spanish_ci NOT NULL,
  `usuarioNombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `usuarioTelefono` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuarioCorreo` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuarioContrasena` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuarioDireccion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuarioFechaNacimiento` datetime DEFAULT NULL,
  `usuarioSexo` varchar(1) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuarioAdmin` tinyint(4) DEFAULT 0,
  `usuarioRegistradoEl` datetime DEFAULT NULL,
  `usuarioUltimoLog` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `usuarioTelefono` (`usuarioTelefono`),
  UNIQUE KEY `usuarioCorreo` (`usuarioCorreo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('0601199900202','Bob Esponja','89102570','quirozlener@gmail.com','$2b$10$jXQ8A7/D39Pz13rCjs6.N.TsR/ZOiI0lxLXa9y3H804bZA2LbDr2G',NULL,NULL,NULL,0,'2021-11-22 19:26:10','2021-12-03 03:11:56'),('0607199901067','Lissbeth Peralta','96864916','lissbethperalta70@gmail.com','$2b$10$.9tIbyDPjGKfjjvuo6fn9OisN542bTSyPPaZOB5selWcNCYQxIGnS',NULL,NULL,NULL,0,'2021-12-02 01:51:20','2021-12-02 01:51:21');
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

-- Dump completed on 2021-12-02 21:15:21
