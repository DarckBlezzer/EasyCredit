/*
Navicat MySQL Data Transfer

Source Server         : Blog
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : easycredit

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-06-24 15:54:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for plazos
-- ----------------------------
DROP TABLE IF EXISTS `plazos`;
CREATE TABLE `plazos` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `intervalo` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `interes` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of plazos
-- ----------------------------
INSERT INTO `plazos` VALUES ('1', '3', 'meses', '5');
INSERT INTO `plazos` VALUES ('2', '6', 'meses', '7');
INSERT INTO `plazos` VALUES ('3', '9', 'meses', '12');

-- ----------------------------
-- Table structure for solicitudes
-- ----------------------------
DROP TABLE IF EXISTS `solicitudes`;
CREATE TABLE `solicitudes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `monto` double NOT NULL,
  `edad` int(11) NOT NULL,
  `tarjeta_credito` tinyint(5) NOT NULL,
  `plazos_id` smallint(6) NOT NULL,
  `autorizado` tinyint(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `plazos_id` (`plazos_id`) USING BTREE,
  CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`plazos_id`) REFERENCES `plazos` (`id`),
  CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of solicitudes
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', 'antonio');
INSERT INTO `user` VALUES ('11', 'test');
INSERT INTO `user` VALUES ('12', 'test2');
INSERT INTO `user` VALUES ('13', 'test23');
INSERT INTO `user` VALUES ('14', 'teqwe');
INSERT INTO `user` VALUES ('15', 'qwe');
INSERT INTO `user` VALUES ('16', 'qweqwe');
INSERT INTO `user` VALUES ('17', 'testqweqwe');
INSERT INTO `user` VALUES ('18', 'testtt');
INSERT INTO `user` VALUES ('19', 'qweqweqweqw');
INSERT INTO `user` VALUES ('20', 'qweqweqweqweqwe');
INSERT INTO `user` VALUES ('21', 'qasdq');
INSERT INTO `user` VALUES ('22', '');
INSERT INTO `user` VALUES ('23', '[object Object]');
INSERT INTO `user` VALUES ('24', 'undefined');
INSERT INTO `user` VALUES ('25', 'Marco');
INSERT INTO `user` VALUES ('26', 'Marco antonio');
