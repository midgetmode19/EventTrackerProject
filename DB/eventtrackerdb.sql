-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eventtrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventtrackerdb` ;

-- -----------------------------------------------------
-- Schema eventtrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventtrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `eventtrackerdb` ;

-- -----------------------------------------------------
-- Table `fuel_tracker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fuel_tracker` ;

CREATE TABLE IF NOT EXISTS `fuel_tracker` (
  `id` INT NOT NULL,
  `trip_miles` INT NULL,
  `fuel_cost` DOUBLE NOT NULL,
  `gallons_per_fill` DOUBLE NULL,
  `date_of_refuel` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS eventuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'eventuser'@'localhost' IDENTIFIED BY 'eventuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'eventuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `fuel_tracker`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtrackerdb`;
INSERT INTO `fuel_tracker` (`id`, `trip_miles`, `fuel_cost`, `gallons_per_fill`, `date_of_refuel`) VALUES (1, 318, 32.96, 10.893, '2018-08-05');
INSERT INTO `fuel_tracker` (`id`, `trip_miles`, `fuel_cost`, `gallons_per_fill`, `date_of_refuel`) VALUES (2, 296, 29.18, 9.987, '2018-08-13');
INSERT INTO `fuel_tracker` (`id`, `trip_miles`, `fuel_cost`, `gallons_per_fill`, `date_of_refuel`) VALUES (3, 304, 31.06, 10.206, '2018-08-22');
INSERT INTO `fuel_tracker` (`id`, `trip_miles`, `fuel_cost`, `gallons_per_fill`, `date_of_refuel`) VALUES (4, 334, 33.76, 10.907, '2018-08-30');
INSERT INTO `fuel_tracker` (`id`, `trip_miles`, `fuel_cost`, `gallons_per_fill`, `date_of_refuel`) VALUES (5, 319, 32.48, 10.576, '2018-09-06');
INSERT INTO `fuel_tracker` (`id`, `trip_miles`, `fuel_cost`, `gallons_per_fill`, `date_of_refuel`) VALUES (6, 298, 30.09, 10.109, '2018-09-14');

COMMIT;

