/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : localhost:3306
 Source Schema         : perpustakaan

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 09/11/2023 07:10:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `publication_year` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `author` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT current_timestamp,
  `updated_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (2, 'Senja di Alaska', '2023', ' Abellstr25', 'assets/images/books/1699437562733.jpg', '2023-11-08 16:59:22', '2023-11-08 16:59:22');
INSERT INTO `books` VALUES (3, 'The Line Between Loss & Wonders', '2022', 'Ayra Sirait', 'assets/images/books/1699437605695.jpg', '2023-11-08 17:00:05', '2023-11-08 17:00:05');
INSERT INTO `books` VALUES (4, 'English Classics: The Tell Tale Heart And Other Stories', '2023', 'EDGAR ALLAN POE', 'assets/images/books/1699437701365.jpg', '2023-11-08 17:01:41', '2023-11-08 17:01:41');
INSERT INTO `books` VALUES (5, 'Adam, Hawa, Dan Durian', '2021', 'Garin Nugroho', 'assets/images/books/1699437804199.jpg', '2023-11-08 17:03:24', '2023-11-08 17:03:24');
INSERT INTO `books` VALUES (6, 'Garis Takdir Untuk Hawa', '2023', 'Dutahappygirl', 'assets/images/books/1699437862482.jpg', '2023-11-08 17:04:22', '2023-11-08 17:04:22');
INSERT INTO `books` VALUES (7, 'Belajar Pemrograman Python untuk Guru dan Murid', '2022', 'Jubilee Enterprise', 'assets/images/books/1699437913965.jpg', '2023-11-08 17:05:13', '2023-11-08 17:05:13');
INSERT INTO `books` VALUES (8, 'Yang Telah Lama Pergi', '2023', 'Tere Liye', 'assets/images/books/1699437952118.jpg', '2023-11-08 17:05:52', '2023-11-08 17:05:52');
INSERT INTO `books` VALUES (9, 'The Black Shadow', '2017', 'Angel El Cherid', 'assets/images/books/1699437991661.jpg', '2023-11-08 17:06:31', '2023-11-08 17:06:31');
INSERT INTO `books` VALUES (10, 'Rasa', '2019', 'Nuril Basri', 'assets/images/books/1699438017390.jpg', '2023-11-08 17:06:57', '2023-11-08 17:06:57');
INSERT INTO `books` VALUES (11, 'Berdamai dengan Rasa Sepi', '2023', 'Prihatini', 'assets/images/books/1699438059230.jpg', '2023-11-08 17:07:39', '2023-11-08 17:07:39');
INSERT INTO `books` VALUES (12, 'The Visual MBA', '2022', 'Jason Barron', 'assets/images/books/1699439772508.jpg', '2023-11-08 17:36:12', '2023-11-08 17:36:12');

-- ----------------------------
-- Table structure for loans
-- ----------------------------
DROP TABLE IF EXISTS `loans`;
CREATE TABLE `loans`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `status` enum('loaned','returned') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'loaned',
  `due_date` date NOT NULL,
  `loan_date` date NULL DEFAULT NULL,
  `return_date` date NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT current_timestamp,
  `updated_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `LOAN_TO_BOOK`(`book_id` ASC) USING BTREE,
  INDEX `LOAN_TO_USER`(`user_id` ASC) USING BTREE,
  CONSTRAINT `LOAN_TO_BOOK` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `LOAN_TO_USER` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of loans
-- ----------------------------
INSERT INTO `loans` VALUES (1, 2, 5, 'returned', '2023-11-16', '2023-11-06', '2023-11-09', '2023-11-08 19:54:41', '2023-11-09 07:08:49');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'user',
  `created_at` datetime NULL DEFAULT current_timestamp,
  `updated_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Admin', 'admin.myperpus@gmail.com', '$2b$10$15FAfDSWkqWkr/jsKgINL.rJNDq9chP51USyxM5O3CBCPMOjhTo5O', 'admin', '2023-11-08 15:06:45', '2023-11-08 15:06:56');
INSERT INTO `users` VALUES (2, 'Arief Nur Hidayah', 'ariefnhidayah@gmail.com', '$2b$10$zRVs8S/5N871wmXNqZ1q0eY/2bOBLR/5kr6iRq2XOXE3tMQXfLNmC', 'user', '2023-11-08 15:07:47', '2023-11-08 15:07:47');

SET FOREIGN_KEY_CHECKS = 1;
