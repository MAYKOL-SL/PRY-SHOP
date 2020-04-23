-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shop` DEFAULT CHARACTER SET utf8 COLLATE utf8_estonian_ci ;
USE `shop` ;

-- -----------------------------------------------------
-- Table `shop`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`Product` (
  `idProduct` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `brand` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `colour` VARCHAR(45) NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`idProduct`))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `shop`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL DEFAULT '',
  `password` VARCHAR(100) NOT NULL DEFAULT '',
  `state` TINYINT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `state` TINYINT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NULL,
  `price` INT NULL,
  `size` VARCHAR(40) NULL,
  `colour` VARCHAR(40) NULL,
  `isdeleted` TINYINT NULL,
  `User_idUser` INT NOT NULL,
  `Category_idCategory` INT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  INDEX `fk_Product_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Product_Category1_idx` (`Category_idCategory` ASC),
  CONSTRAINT `fk_Product_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `shop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Product_Category1`
    FOREIGN KEY (`Category_idCategory`)
    REFERENCES `shop`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `isdeleted` TINYINT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `areacode` VARCHAR(50) NULL,
  `isdeleted` TINYINT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`city` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `isdeleted` VARCHAR(45) NULL,
  `Country_idCountry` INT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  INDEX `fk_City_Country_idx` (`Country_idCountry` ASC),
  CONSTRAINT `fk_City_Country`
    FOREIGN KEY (`Country_idCountry`)
    REFERENCES `shop`.`country` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`contact` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `isdeleted` VARCHAR(45) NOT NULL,
  `isactive` VARCHAR(45) NOT NULL,
  `website` VARCHAR(500) NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `User_idUser` INT NOT NULL,
  `Rol_idRol` INT NOT NULL,
  `City_idCity` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Contact_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Contact_Rol1_idx` (`Rol_idRol` ASC),
  INDEX `fk_Contact_City1_idx` (`City_idCity` ASC),
  CONSTRAINT `fk_Contact_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `shop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Contact_Rol1`
    FOREIGN KEY (`Rol_idRol`)
    REFERENCES `shop`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Contact_City1`
    FOREIGN KEY (`City_idCity`)
    REFERENCES `shop`.`city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`note`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`note` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL,
  `user_id` INT NOT NULL,
  `isdeleted` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_note_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_note_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `shop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


----------------------------------------------------------------
-- INIT DATABASE
----------------------------------------------------------------

CREATE DATABASE shop;

USE shop;
-- -----------------------------------------------------
-- Table `shop`.`user`
-- -----------------------------------------------------
CREATE TABLE users (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `state` TINYINT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`)
) engine=InnoDB default CHARSET=utf8;

-- -----------------------------------------------------
-- Table `shop`.`note`
-- -----------------------------------------------------
CREATE TABLE notes (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL,
  `isdeleted` VARCHAR(45) NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_user FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) engine=InnoDB default CHARSET=utf8;

-- -----------------------------------------------------
-- Table `shop`.`category`
-- -----------------------------------------------------
CREATE TABLE category (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `state` TINYINT NULL,
  `user_id` INT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_user_category FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) engine=InnoDB default CHARSET=utf8;

-- -----------------------------------------------------
-- Table `shop`.`product`
-- -----------------------------------------------------
CREATE TABLE product (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NULL,
  `image` VARCHAR(1000) NULL,
  `price` INT NULL,
  `size` VARCHAR(40) NULL,
  `color` VARCHAR(40) NULL,
  `isdeleted` TINYINT NULL,
  `user_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_user_product FOREIGN KEY (`user_id`) REFERENCES users(`id`),
  CONSTRAINT fk_category_product FOREIGN KEY (`category_id`) REFERENCES category (`id`)    
) engine=InnoDB default CHARSET=utf8;


-- -----------------------------------------------------
-- Table `shop`.`rol`
-- -----------------------------------------------------
CREATE TABLE rol (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `isdeleted` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_user_rol FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) engine=InnoDB default CHARSET=utf8;

-- -----------------------------------------------------
-- Table `shop`.`country`
-- -----------------------------------------------------
CREATE TABLE country (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `areacode` VARCHAR(50) NULL,
  `isdeleted` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_user_country FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) engine=InnoDB default CHARSET=utf8;

-- -----------------------------------------------------
-- Table `shop`.`city`
-- -----------------------------------------------------
CREATE TABLE city (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `isdeleted` TINYINT NOT NULL,
  `country_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_country FOREIGN KEY (`country_id`) REFERENCES country(`id`),
  CONSTRAINT fk_user_city FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) engine=InnoDB default CHARSET=utf8;

-- -----------------------------------------------------
-- Table `shop`.`contact`
-- -----------------------------------------------------
CREATE TABLE contact (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `image` VARCHAR(1000) NULL,
  `isdeleted` TINYINT NOT NULL,
  `website` VARCHAR(500) NULL,
  `user_id` INT NOT NULL,
  `rol_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_user_contact
    FOREIGN KEY (`user_id`)
    REFERENCES users(`id`),
    
  CONSTRAINT fk_rol_contact
    FOREIGN KEY (`rol_id`)
    REFERENCES rol(`id`),
    
  CONSTRAINT fk_city_contact
    FOREIGN KEY (`city_id`)
    REFERENCES city(`id`)   
) engine=InnoDB default CHARSET=utf8;


INSERT INTO `shop`.`category`
(`description`,
`state`,
`user_id`,
`created_at`)
VALUES
('Child',true,1, '2020-04-22 19:37:13');

INSERT INTO `shop`.`category`
(`description`,
`state`,
`user_id`,
`created_at`)
VALUES
('Woman',true,1, '2020-04-22 19:37:13');

INSERT INTO `shop`.`category`
(`description`,
`state`,
`user_id`,
`created_at`)
VALUES
('Man',true,1, '2020-04-22 19:37:13');



INSERT INTO `shop`.`country`
(`name`,`areacode`,`isdeleted`,`user_id`,`created_at`)
VALUES ('Bolivia','051',false,1,'2020-04-23 12:43:37');


INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('Cochabamba',false,1,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('La Paz',false,1,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('Santa Cruz',false,1,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('Pando',false,1,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('Oruro',false,1,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('Sucre',false,1,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('Tarija',false,1,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('Pando',false,1,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`city`
(`name`,`isdeleted`,`country_id`,`user_id`,`created_at`)
VALUES ('Beni',false,1,1,'2020-04-23 12:43:37');


INSERT INTO `shop`.`rol`
(`name`,`isdeleted`,`user_id`,`created_at`)
VALUES ('COE/Director',false,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`rol`
(`name`,`isdeleted`,`user_id`,`created_at`)
VALUES ('Gerente',false,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`rol`
(`name`,`isdeleted`,`user_id`,`created_at`)
VALUES ('Ventas',false,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`rol`
(`name`,`isdeleted`,`user_id`,`created_at`)
VALUES ('Marketing',false,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`rol`
(`name`,`isdeleted`,`user_id`,`created_at`)
VALUES ('TI',false,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`rol`
(`name`,`isdeleted`,`user_id`,`created_at`)
VALUES ('Socio',false,1,'2020-04-23 12:43:37');

INSERT INTO `shop`.`rol`
(`name`,`isdeleted`,`user_id`,`created_at`)
VALUES ('Otro',false,1,'2020-04-23 12:43:37');


