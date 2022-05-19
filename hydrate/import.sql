USE ip2location;

DROP TABLE IF EXISTS `ip2location_db11_tmp`;
CREATE TABLE `ip2location_db11_tmp` LIKE `ip2location_db11`;
LOAD DATA LOCAL
	INFILE 'IP2LOCATION-LITE-DB11.CSV'
INTO TABLE
	`ip2location_db11_tmp`
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 0 LINES;

DROP PROCEDURE IF EXISTS update_ip2location_db11();
DELIMITER //
CREATE PROCEDURE update_ip2location_db11()
BEGIN
	START TRANSACTION;
	SET @recCount = (select count(*) from `ip2location_db11_tmp`);
	If @recCount > 2000000 THEN
		DELETE FROM `ip2location_db11`;
		SELECT *
			INTO `ip2location_db11`
			FROM `ip2location_db11_tmp`;
		COMMIT;
	ELSE
		ROLLBACK;
	END IF;

END //
DELIMITER ;
CALL update_ip2location_db11();

DROP PROCEDURE update_ip2location_db11();
DROP TABLE IF EXISTS `ip2location_db11_tmp`;
