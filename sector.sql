-- MySQL dump 10.13  Distrib 8.2.0, for macos14.0 (arm64)
--
-- Host: localhost    Database: Sector
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `registrationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'John','Doe','john22dыsoe@example.com','$2b$10$KRRAZOGqz17MnQ4ppPpDquXFvL.OD4/2vxcvySYPNx730AJlYDqg.','Male','1704749339208-1702915902573-12.png','2024-01-08 19:46:18','2024-01-08 19:46:18','2024-01-08 21:28:59'),(3,'John1','dsad','john2doe@example.com','$2b$10$WuoBIgyIDVPSrEQmsQdwae8PV3NuNO1fqdYRgygaUfssnlq3PsKLS','Male','photo-1704755607125-966740641.png','2024-01-08 19:51:12','2024-01-08 19:51:12','2024-01-08 23:13:27'),(4,'Jыoh2n1','Unknown','john22dыoe@example.com','$2b$10$qA7moRiYsexmVmRId6MVb.yya9ggjBw41rLNYe.IWByQFuMNbMD46',NULL,NULL,'2024-01-08 20:05:51','2024-01-08 20:05:51','2024-01-08 20:05:51'),(6,'dsad','Unknown','john22dыsodsae@example.com','$2b$10$Kd6tZcCh95WLjNjbAVJXce/IUxXnotmCR/XJR/Z5wxOr4hGQqM28u',NULL,NULL,'2024-01-08 22:07:28','2024-01-08 22:07:28','2024-01-08 22:07:28'),(8,'dsad','Unknown','john22ae@example.com','$2b$10$nfVJktOZLvxXFcjFQjaS2.EE.CDw.HGAXoY/Tw.V8j1irxchgMaY6',NULL,NULL,'2024-01-08 22:08:01','2024-01-08 22:08:01','2024-01-08 22:10:26'),(9,'nasd','Unknown','john2dsa2222ae@example.com','$2b$10$btf4HtPM5ACC8/YkUDhZu.Oeq3SmcenQyRSN/LgoI8UwPkCk7aP3y','Male',NULL,'2024-01-08 22:20:25','2024-01-08 22:20:25','2024-01-08 22:21:40'),(10,'dsa','Unknown','john2ds211a2222ae@example.com','$2b$10$L7U6nt2jhrDiD9pdH0Qf3.w2U.nXu1mUJAqUUXP4erqRvV3jokePG',NULL,NULL,'2024-01-08 22:41:20','2024-01-08 22:41:20','2024-01-08 22:41:20'),(11,'dsad','Unknown','danii@gmail.com','$2b$10$m9KBKxTUvrAqi4ADRWSYMe8zQzJuCLeEzaSLluXSDVRhjLrK0/X5y',NULL,NULL,'2024-01-08 22:58:23','2024-01-08 22:58:23','2024-01-08 22:58:23'),(12,'dsaddss','Unknown','ddsaniixs@gmail.com','$2b$10$7V74XDYoRbc2cAS2wThnZus1IpUYrciRvGYx6m2K1X01vhADTBlT2',NULL,NULL,'2024-01-08 23:01:59','2024-01-08 23:01:59','2024-01-08 23:01:59'),(13,'Daniil','Unknown','daniil@gmail.com','$2b$10$RC1gbtVLUcW0h2TKtFZu8e3lNt/1LEbEMIT9J4SuJAS6s/KFQM4GK','Male','photo-1704795321745-268457218.png','2024-01-09 10:08:28','2024-01-09 10:08:28','2024-01-09 10:15:21');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-09 14:02:35
