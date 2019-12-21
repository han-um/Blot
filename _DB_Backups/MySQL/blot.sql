-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: BLOT
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.16.04.2

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
-- Table structure for table `library`
--

DROP TABLE IF EXISTS `library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `library` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projId` varchar(45) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `library_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library`
--

LOCK TABLES `library` WRITE;
/*!40000 ALTER TABLE `library` DISABLE KEYS */;
INSERT INTO `library` VALUES (21,'5dc5bf0369abf82b3866fa43',48),(30,'5dcc283057a4e02a5c257c5e',63),(31,'5dcc3a357ef0ca10985d19c4',57),(32,'5dcc2fe07ef0ca10985d1892',57),(33,'5dcc2ab557a4e02a5c257c7e',57),(34,'5dcc3f1086e7c82650d50fd5',60),(35,'5dcc3f1086e7c82650d50fd5',56),(36,'5dcc3f8386e7c82650d50fe2',63),(37,'5dcc3ff586e7c82650d5100f',56),(38,'5dcc2ab557a4e02a5c257c7e',62),(39,'5dcc2fe07ef0ca10985d1892',58),(40,'5dcc2fe07ef0ca10985d1892',59),(41,'5dcc35c97ef0ca10985d18d1',57),(42,'5dcc35c97ef0ca10985d18d1',58),(43,'5dcc35c97ef0ca10985d18d1',62),(44,'5dcc3bfe7ef0ca10985d19f7',63);
/*!40000 ALTER TABLE `library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `wAddr` varchar(45) NOT NULL,
  `image` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (39,'writer2','$2a$10$03HC50ZYo.qcMNs7HELBT.uCwWjFiKx8mbiM1nMolGj2rH3mPnEZS','writer2@naver.com','0x4aff875cb544368fd51b8f7fda6d247582b5b87c','1573220120893.PNG'),(40,'translator1','$2a$10$Hl9HI7Cdl8APqZwdvAER4O9dGNZQRJo3dqMEO6vNiUDH37mvoJW1W','sad','0x19f74f83114ad84736df48534f3b0c569ebcd419','1573228341863.PNG'),(42,'translator2','$2a$10$tYfdPJDHINj2qCFlJwxKyO4bYJrVvmr64K7It6jCVZ.yKO.p/JAZu','translator2@naver.com','0xad4abd5ba764b4cbd1c97219bb42365749f6d03c','1573228911172.PNG'),(43,'translator3','$2a$10$.qUJlsu4CtbKpY.smnUN.uC4u9ar1fdNanO0io1zx2bxYDQN6CjBW','translator3@naver.com','0x1c2ab35c73cd04279e8273832dc925d2db101d8e','1573229165771.PNG'),(44,'evaluator1','$2a$10$TeORKiu8MTNJutFyQBABOuYkOSrzdiCWwNlM.ao9v1dokQBsXXRIO','evaluator1@naver.com','0x9ca1e6b1fd6cd7633ecd12461d3d5129235d76bf','1573229644139.PNG'),(45,'evaluator2','$2a$10$VUApsoEAq/dogjlx7e.9su3OjsHLqC1yjBF.NhE6ROCTQV.Jqgvea','evaluator2@naver.com','0x162f692a95a89c63fb50a7026988a2016e5f1928','1573230698459.PNG'),(46,'evaluator3','$2a$10$HUk07mQqUw4BU/md1YBtS.mqzOkKapS1X2CnAS3yN3rKVEXyZnPKq','evaluator3@naver.com','0xa924e091ff0daec8237953124309818011b32563','1573231547322.PNG'),(48,'test1','$2a$10$DG8SiOCQ7NtSL0.XWnh8z.R/Pn0pmLJx81z.V/6HCE9VOOfpOak7G','1a@2b.3c','0x1C2ab35c73CD04279e8273832Dc925d2DB101D8e','1573387112953.jpg'),(49,'writer3','$2a$10$VNvG2CM0Fh5tZoAOIVKwQu/qEkAsZRQWF8xXhLil96WNwpCaJRhxG','writer3@naver.com','0x6f560ac6ede19461b28382816232c4dd50bd4843','1573486270435.PNG'),(56,'Andew','$2a$10$eV97nE.6moA/8GBT22cJo.cNNX6Ycjx2NVDXEpN7JB4pA4JSalPd2','Andew@naver.com','0x6f560ac6ede19461b28382816232c4dd50bd4843','userDefault.png'),(57,'Asher','$2a$10$LRdN7VjHS/wxVRgNwsUWR.irCr3mJ/GPw7fDnhqhj1dEdGdMwlrie','Asher@naver.com','0x19f74f83114ad84736df48534f3b0c569ebcd419','userDefault.png'),(58,'Bentley','$2a$10$9pIE9.r70Nhx74P3rhiXCuIOyvxW6s1u80.T6B.1Oh0fOIODarzAO','Bentley@naver.com','0xad4abd5ba764b4cbd1c97219bb42365749f6d03c','userDefault.png'),(59,'Brody','$2a$10$ot9.dZnq4klWXXnnDE8gfOHoslT1LwkAsD8fvGjBizqhAXZRdnSZC','Brody@naver.com','0x1c2ab35c73cd04279e8273832dc925d2db101d8e','userDefault.png'),(60,'Brooks','$2a$10$eDhPLGmG4B2asM7AOFmBQea7a4h3be0p9cwmFUwslfTY08kcksjdq','Brooks@naver.com','0x9ca1e6b1fd6cd7633ecd12461d3d5129235d76bf','userDefault.png'),(61,'Charles','$2a$10$XveWog.Vag1eslCwklzVF.8Cx8QjPOzSIT.eeAL6YDWkJlte7iZGm','Charles@naver.com','0x162f692a95a89c63fb50a7026988a2016e5f1928','userDefault.png'),(62,'Colin','$2a$10$v/HDbNxepI60aBy5n4ukReGoqdsUGutw7wd6oo1Ftoi.pNcW2A.YO','Colin@naver.com','0xa924e091ff0daec8237953124309818011b32563','userDefault.png'),(63,'Corbin','$2a$10$9UCQRUrjeI7OauTDEHKLDuh8m8oOXrh1W9xJoTX4HHbWWx8CckiYq','Corbin@naver.com','0x71fc9e71e8b15151919f9e78e9b16dfcfa2cb127','userDefault.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-21 12:30:48
