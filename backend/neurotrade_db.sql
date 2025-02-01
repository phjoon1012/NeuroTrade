-- MySQL dump 10.13  Distrib 9.2.0, for macos14.7 (arm64)
--
-- Host: localhost    Database: neurotrade_db
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can add bot statistics',8,'add_botstatistics'),(30,'Can change bot statistics',8,'change_botstatistics'),(31,'Can delete bot statistics',8,'delete_botstatistics'),(32,'Can view bot statistics',8,'view_botstatistics'),(33,'Can add trade',9,'add_trade'),(34,'Can change trade',9,'change_trade'),(35,'Can delete trade',9,'delete_trade'),(36,'Can view trade',9,'view_trade'),(37,'Can add bot',10,'add_bot'),(38,'Can change bot',10,'change_bot'),(39,'Can delete bot',10,'delete_bot'),(40,'Can view bot',10,'view_bot');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$oAydpsc4WedwUvVdQoIowZ$robhCDrJkYPPK9aOiAYFZtQ172u5A7waVSfAfZ29zCs=','2025-02-01 07:03:08.963334',1,'hyeonjoonpark','','','max001012@gmail.com',1,1,'2025-02-01 07:02:41.863233');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bot_statistics`
--

DROP TABLE IF EXISTS `bot_statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bot_statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bot_id` int NOT NULL,
  `total_trades` int DEFAULT '0',
  `win_rate` decimal(5,2) DEFAULT NULL,
  `avg_trading_rate` decimal(10,2) DEFAULT NULL,
  `total_trade_volume` decimal(15,2) DEFAULT NULL,
  `number_of_users` int DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bot_id` (`bot_id`),
  CONSTRAINT `bot_statistics_ibfk_1` FOREIGN KEY (`bot_id`) REFERENCES `bots` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_statistics`
--

LOCK TABLES `bot_statistics` WRITE;
/*!40000 ALTER TABLE `bot_statistics` DISABLE KEYS */;
INSERT INTO `bot_statistics` VALUES (1,1,150,0.75,0.03,50000.00,10,'2025-02-01 13:09:13'),(2,2,200,0.65,0.04,80000.00,15,'2025-02-01 13:09:13'),(3,3,100,0.85,0.02,30000.00,5,'2025-02-01 13:09:13');
/*!40000 ALTER TABLE `bot_statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bots`
--

DROP TABLE IF EXISTS `bots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text,
  `premium` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bots`
--

LOCK TABLES `bots` WRITE;
/*!40000 ALTER TABLE `bots` DISABLE KEYS */;
INSERT INTO `bots` VALUES (1,'BTC Scalper','A bot that performs high-frequency scalping on BTC.',1,'2025-02-01 13:08:42'),(2,'ETH Trend Follower','A bot that trades based on trend following for ETH.',0,'2025-02-01 13:08:42'),(3,'LTC Arbitrage','A bot that identifies arbitrage opportunities in LTC.',1,'2025-02-01 13:08:42');
/*!40000 ALTER TABLE `bots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2025-02-01 08:03:36.412787','2','testuser',1,'[{\"added\": {}}]',7,1),(2,'2025-02-01 08:04:19.839685','2','testuser',2,'[]',7,1),(3,'2025-02-01 08:05:16.232908','2','testuser',2,'[{\"changed\": {\"fields\": [\"Superuser status\"]}}]',7,1),(4,'2025-02-01 08:06:26.848791','2','testuser',2,'[{\"changed\": {\"fields\": [\"Password\"]}}]',7,1),(5,'2025-02-01 08:07:32.389533','2','testuser',3,'',7,1),(6,'2025-02-01 11:52:56.880330','3','test',1,'[{\"added\": {}}]',7,1),(7,'2025-02-01 14:17:58.158613','3','test',3,'',7,1),(8,'2025-02-01 14:51:12.937330','1','pjoon',2,'[{\"changed\": {\"fields\": [\"Api key\", \"Api secret\"]}}]',7,1),(9,'2025-02-01 14:56:18.639369','4','test',1,'[{\"added\": {}}]',7,1),(10,'2025-02-01 15:05:03.118116','4','test',3,'',7,1),(11,'2025-02-01 15:05:21.126874','5','testuser',1,'[{\"added\": {}}]',7,1),(12,'2025-02-01 15:08:29.535501','5','testuser',3,'',7,1),(13,'2025-02-01 15:09:00.217381','6','phjoon',1,'[{\"added\": {}}]',7,1),(14,'2025-02-01 15:20:50.543723','7','test',1,'[{\"added\": {}}]',7,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(10,'users','bot'),(8,'users','botstatistics'),(9,'users','trade'),(7,'users','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-02-01 06:30:41.633752'),(2,'auth','0001_initial','2025-02-01 06:30:41.747020'),(3,'admin','0001_initial','2025-02-01 06:30:41.770285'),(4,'admin','0002_logentry_remove_auto_add','2025-02-01 06:30:41.772828'),(5,'admin','0003_logentry_add_action_flag_choices','2025-02-01 06:30:41.775295'),(6,'contenttypes','0002_remove_content_type_name','2025-02-01 06:30:41.794373'),(7,'auth','0002_alter_permission_name_max_length','2025-02-01 06:30:41.804844'),(8,'auth','0003_alter_user_email_max_length','2025-02-01 06:30:41.813959'),(9,'auth','0004_alter_user_username_opts','2025-02-01 06:30:41.816605'),(10,'auth','0005_alter_user_last_login_null','2025-02-01 06:30:41.827692'),(11,'auth','0006_require_contenttypes_0002','2025-02-01 06:30:41.828204'),(12,'auth','0007_alter_validators_add_error_messages','2025-02-01 06:30:41.830534'),(13,'auth','0008_alter_user_username_max_length','2025-02-01 06:30:41.843825'),(14,'auth','0009_alter_user_last_name_max_length','2025-02-01 06:30:41.858933'),(15,'auth','0010_alter_group_name_max_length','2025-02-01 06:30:41.865042'),(16,'auth','0011_update_proxy_permissions','2025-02-01 06:30:41.867861'),(17,'auth','0012_alter_user_first_name_max_length','2025-02-01 06:30:41.879388'),(18,'sessions','0001_initial','2025-02-01 06:30:41.885993'),(19,'users','0001_initial','2025-02-01 06:30:41.890147'),(20,'users','0002_user_groups_user_is_active_user_is_staff_and_more','2025-02-01 07:08:53.596499'),(21,'users','0003_bot_trade_botstatistics','2025-02-01 07:15:09.489098');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('1dg0u9pb4a7dl4wn5gihvvt3jca58eds','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teBgE:HQGcycnPL_Xe0CgUYK5F5nL0W40LLNh5NnSSXdcEMzY','2025-02-15 11:28:54.011227'),('1lywmy0rivmazkdykp9y7gcs7ubjwdxh','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teDut:fA6F2j-IDYcpeqDkSKoRA4UgcmcAl0jjvCUWshMuemI','2025-02-15 13:52:11.981404'),('1uh6su9ucgetyui0vz3uu2gyz64jkpm1','e30:1teC1V:OnS8CcjKagfyhYg-3Jzyr52WHM805SNkkG3Wya0wVb4','2025-02-15 11:50:53.769074'),('26yzi23lvoi9xelpp326omskpr02v9dv','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teEFL:Pe6J-dWlzqEr0vNThcczfGMTYvKn-LZmLEYFhuM5H24','2025-02-15 14:13:19.874718'),('4ob5dxbu3u2v0e2amaw5ifgyfau411tv','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1te7dk:l8ib9tRbrd5l3nJkGHv-Xk9tnjw_WDh1OfzUux3OI6s','2025-02-15 07:10:04.200134'),('6yh5mkrkfvozagz3c9gvoda9zwkd8i0w','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teEJL:rLJieluaUy00QjK2PJ0KdxVbQEYlpozXcVj03ZyG7NA','2025-02-15 14:17:27.731587'),('9errfvipmv1afqk5ek5v3vonzrjwotgn','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teCdt:X4xku4HRuPSEcSkXXtgmUSl5M2Ltuew8JJ2m4Hzy4fI','2025-02-15 12:30:33.068530'),('9os4yiechoa2mmtgvie18gvl3k1j58mg','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teBee:ek7TzvSz8zGAwUHGDloJdzHl_Itw7IsGCu0Gpc9wJfI','2025-02-15 11:27:16.346612'),('9zvy6ae0ec8n0h4j0f0frxhki6voxx10','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teFIE:0jiTknZ9MuYjMJGgdcPWTdv2qZuWMUtByY6djA3kWsk','2025-02-15 15:20:22.260077'),('bs5wm7d79yfgbdk18tt3ylzl3bo6xwbu','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teBTW:QxK6EGR-g0yFZIWa0MciuzL2ZRlF4HLn1w4mj34yGus','2025-02-15 11:15:46.376124'),('davf92moc11k5sfwh0t8kupk5v27olcs','e30:1teC1l:N8APOSgNjOTRMglJ7suakoarkJHjypxiFC4uaTE0GcA','2025-02-15 11:51:09.941834'),('g6gdcipwmmalgo9r14bcmu5jnmr31mdz','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teESZ:VuYNW-UbeyWI-JyuUdApTm7_9Wsea2Mlop1UHIHqENk','2025-02-15 14:26:59.113216'),('ha80qr2sntjo9k1gwi10xqst1954b0p0','e30:1teC1m:jFXO6RQNvGx8c5hRF5KnPSNTXkY9P_6pM7lDAneWhyc','2025-02-15 11:51:10.283385'),('i2nscm8zltyr1s7yphnoz78imskzca9n','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teC92:RHdERr5GUQBt7hDkyfUQCwsNhmxEzC9Tw2GRsx9vo-A','2025-02-15 11:58:40.145940'),('nvanvonezf307rkcmc9ng32lcg2i715v','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teEas:zqNyv3h_pTu30_gNcT8qQBcBZT4Ax8nlAuraP_DoQMA','2025-02-15 14:35:34.691513'),('p40ore278hfsmc7jel0z2vpwm8k6uj7c','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teC7h:ZNl-wVYLOs9FltkS7HU2v6t7zUXFWGZccgPAeMxZeCs','2025-02-15 11:57:17.092830'),('pvgio3yh19sybyphqbamfv56xhvwbsfn','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teBmf:yQbAMNtuIe6SccHj_5jIIo3N1P2atUUDOuJe-wDwfOs','2025-02-15 11:35:33.642099'),('qmef6vynqivc6byslb4i966pqvm85iqg','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teC2J:LXfnMldAY8M1XJInt4MYAofd5hqzTyw65hp-DQwPs3Q','2025-02-15 11:51:43.787583'),('r1gblz7ufa6m911p6u8hs5ux9581vhqb','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teBss:0yfYaZA1sSp98wAXJK8idmb6HqiGO0eA2mx2UhDtrL8','2025-02-15 11:41:58.304036'),('smx9wlfwetzbguaz5t42auusizy0w570','e30:1teC1k:818FoGI34AcErN1-sRvjxDe8gvp3N4KAa-F9Dr6VuP4','2025-02-15 11:51:08.816492'),('u5hmgxnsgjpjyylzle3debjk4flk8x4c','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teCFG:jgm8v0wSd5GdYj58u0WrY9Ql3seM63gFGHRTpSC4WCU','2025-02-15 12:05:06.118910'),('u8chxgzof7snfbodpxabjucfcc9udqe9','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teEV0:QkONM5PsdlbHWPP9jKzl5I2-uClSkOmG8jytcMgXYeE','2025-02-15 14:29:30.772250'),('w1r08dsap5yezo95e2c4aiqxib5aadpv','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teEj8:Kdjt-sTICC_OxcjOts73QlMs6RBTzjwKIHentSZXs7Q','2025-02-15 14:44:06.583211'),('wn17h2pq1vyr6jbrrzrb4e0a0gtikg1s','e30:1teC1v:chgOiCwcXkctOhnYmsleEQUU984CDhk08q_B0z5cPtU','2025-02-15 11:51:19.719449'),('yhmovg25iktsrohlbho0alcznoqkr8do','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teEns:XsacLEcv3iLmtmBKPc2WsTS3BgFHNUhvAjyMyGlqV00','2025-02-15 14:49:00.022759'),('yx4a5p7elsang9r117wbkhl185dvuwfe','.eJxVjMsOwiAQRf-FtSGAPF267zcQhhmkaiAp7cr479qkC93ec859sZi2tcZt0BJnZBcm2el3g5Qf1HaA99Runefe1mUGviv8oINPHel5Pdy_g5pG_dZWkwheFq-d1RqIlDVJeQD02WkIGVCgIEPeJZllkeAEKdTWhwJng-z9AePuOD0:1teCC4:xAdMahfexVDAutb2XuPiI9apT9mtxS-_qIazcxX9_S4','2025-02-15 12:01:48.746096');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trades`
--

DROP TABLE IF EXISTS `trades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `bot_id` int NOT NULL,
  `trade_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `trade_type` enum('BUY','SELL') NOT NULL,
  `asset` varchar(100) DEFAULT NULL,
  `amount` decimal(15,4) DEFAULT NULL,
  `price` decimal(15,4) DEFAULT NULL,
  `profit_loss` decimal(15,4) DEFAULT NULL,
  `status` enum('PENDING','COMPLETED','FAILED') DEFAULT 'PENDING',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `bot_id` (`bot_id`),
  CONSTRAINT `trades_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `trades_ibfk_2` FOREIGN KEY (`bot_id`) REFERENCES `bots` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trades`
--

LOCK TABLES `trades` WRITE;
/*!40000 ALTER TABLE `trades` DISABLE KEYS */;
/*!40000 ALTER TABLE `trades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `api_key` varchar(255) DEFAULT NULL,
  `api_secret` varchar(255) DEFAULT NULL,
  `is_subscribed` tinyint(1) DEFAULT '0',
  `bot_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `bot_id` (`bot_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`bot_id`) REFERENCES `bots` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser','testpassword123','testuser@example.com','APIKEY123','APISECRET456',1,NULL,'2025-02-01 06:08:48','2025-02-01 06:08:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_bot`
--

DROP TABLE IF EXISTS `users_bot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_bot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `premium` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_bot`
--

LOCK TABLES `users_bot` WRITE;
/*!40000 ALTER TABLE `users_bot` DISABLE KEYS */;
INSERT INTO `users_bot` VALUES (1,'Momentum Trader','A bot that trades based on momentum.',1,'2025-02-01 16:23:59.000000');
/*!40000 ALTER TABLE `users_bot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_botstatistics`
--

DROP TABLE IF EXISTS `users_botstatistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_botstatistics` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_trades` int NOT NULL,
  `win_rate` decimal(5,2) NOT NULL,
  `avg_trading_rate` decimal(10,2) NOT NULL,
  `total_trade_volume` decimal(20,2) NOT NULL,
  `number_of_users` int NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `bot_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_botstatistics_bot_id_f8ea23e1_fk_users_bot_id` (`bot_id`),
  CONSTRAINT `users_botstatistics_bot_id_f8ea23e1_fk_users_bot_id` FOREIGN KEY (`bot_id`) REFERENCES `users_bot` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_botstatistics`
--

LOCK TABLES `users_botstatistics` WRITE;
/*!40000 ALTER TABLE `users_botstatistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_botstatistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_trade`
--

DROP TABLE IF EXISTS `users_trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_trade` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `trade_time` datetime(6) NOT NULL,
  `trade_type` varchar(10) NOT NULL,
  `asset` varchar(50) NOT NULL,
  `amount` decimal(20,8) NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `profit_loss` decimal(20,2) NOT NULL,
  `status` varchar(10) NOT NULL,
  `bot_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_trade_bot_id_092695ca_fk_users_bot_id` (`bot_id`),
  KEY `users_trade_user_id_2f202414_fk_users_user_id` (`user_id`),
  CONSTRAINT `users_trade_bot_id_092695ca_fk_users_bot_id` FOREIGN KEY (`bot_id`) REFERENCES `users_bot` (`id`),
  CONSTRAINT `users_trade_user_id_2f202414_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_trade`
--

LOCK TABLES `users_trade` WRITE;
/*!40000 ALTER TABLE `users_trade` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_trade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user`
--

DROP TABLE IF EXISTS `users_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(254) NOT NULL,
  `api_key` varchar(255) DEFAULT NULL,
  `api_secret` varchar(255) DEFAULT NULL,
  `is_subscribed` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user`
--

LOCK TABLES `users_user` WRITE;
/*!40000 ALTER TABLE `users_user` DISABLE KEYS */;
INSERT INTO `users_user` VALUES (1,'pjoon','pbkdf2_sha256$600000$ncp499iHCFt48ue5cHQS52$D9w3BLOJ4FhwNNPlZG06YMHizX2/QqIsFx0oZRWsKs8=','max001012@gmail.com','123456','123456',0,'2025-02-01 07:09:45.188518','2025-02-01 14:51:12.933752',1,1,1,'2025-02-01 15:20:22.255172'),(6,'phjoon','pbkdf2_sha256$600000$puODUkdlC8JcNjELZhHJ36$0maal4k8Lsb9W+FHDahomHAsqDIMb4R8OsDE/VCqI5k=','phjoon@umich.edu','1234','1234',0,'2025-02-01 15:09:00.209686','2025-02-01 15:09:00.209704',1,0,0,'2025-02-01 15:10:37.508499'),(7,'test','pbkdf2_sha256$600000$CZwUjsb28a9LFks8OHta3x$QM0MJQ1uVVS0HtIeGnW3QhyjrpG1Ab2C6iDaeS5Mfd0=','hyeonjoonp@gmail.com','1234','pbkdf2_sha256$600000$2jukVbMkCA6K6Ex9CnouC2$TMyMqTc8uVyiS2FqJF4BFdynBwQklh5wfd90bYeIitA=',1,'2025-02-01 15:20:50.535485','2025-02-01 15:20:50.535510',1,1,0,NULL);
/*!40000 ALTER TABLE `users_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_groups`
--

DROP TABLE IF EXISTS `users_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_groups_user_id_group_id_b88eab82_uniq` (`user_id`,`group_id`),
  KEY `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `users_user_groups_user_id_5f6f5a90_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_groups`
--

LOCK TABLES `users_user_groups` WRITE;
/*!40000 ALTER TABLE `users_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_user_permissions`
--

DROP TABLE IF EXISTS `users_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_user_permissions_user_id_permission_id_43338c45_uniq` (`user_id`,`permission_id`),
  KEY `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_user_user_permissions_user_id_20aca447_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_user_permissions`
--

LOCK TABLES `users_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-02  1:50:05
