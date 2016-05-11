-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 19. 11 2015 kl. 18:34:32
-- Serverversion: 5.6.26
-- PHP-version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notrootuser`
--

DELIMITER $$
--
-- Procedurer
--
CREATE DEFINER=`notRootUser`@`localhost` PROCEDURE `allThePlanes`()
    NO SQL
SELECT * FROM planes$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `bought_tickets`
--

CREATE TABLE IF NOT EXISTS `bought_tickets` (
  `bought_id` int(11) NOT NULL,
  `bticket_id` int(11) NOT NULL,
  `buser_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Triggers/udløsere `bought_tickets`
--
DELIMITER $$
CREATE TRIGGER `ResetSoldTickets` AFTER DELETE ON `bought_tickets`
 FOR EACH ROW UPDATE tickets
INNER JOIN bought_tickets ON (tickets.ticket_id = bought_tickets.bticket_id)
SET tickets.ticket_sold = 0
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `planes`
--

CREATE TABLE IF NOT EXISTS `planes` (
  `plane_id` int(11) NOT NULL,
  `reg_id` varchar(8) NOT NULL,
  `plane_type` int(11) NOT NULL,
  `plane_inUse` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `planes`
--

INSERT INTO `planes` (`plane_id`, `reg_id`, `plane_type`, `plane_inUse`) VALUES
(1, 'MEP-3289', 1, 1),
(2, 'MEP-2132', 3, 1),
(3, 'IDS-1233', 2, 1),
(4, 'IDK-5432', 2, 0),
(5, 'LEA-3406', 4, 0),
(6, 'ODI-9894', 3, 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `plane_types`
--

CREATE TABLE IF NOT EXISTS `plane_types` (
  `type_id` int(11) NOT NULL,
  `plane_type` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `plane_types`
--

INSERT INTO `plane_types` (`type_id`, `plane_type`) VALUES
(1, 'Boeing 747'),
(2, 'Boeing 767'),
(3, 'Lockheed L-1011'),
(4, 'Concorde');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `tickets`
--

CREATE TABLE IF NOT EXISTS `tickets` (
  `ticket_id` int(11) NOT NULL,
  `ticket_from` varchar(4) NOT NULL,
  `ticket_to` varchar(4) NOT NULL,
  `ticket_dep` datetime NOT NULL,
  `ticket_arr` datetime NOT NULL,
  `ticket_price` int(11) NOT NULL,
  `ticket_sold` tinyint(1) NOT NULL DEFAULT '0',
  `plane_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `tickets`
--

INSERT INTO `tickets` (`ticket_id`, `ticket_from`, `ticket_to`, `ticket_dep`, `ticket_arr`, `ticket_price`, `ticket_sold`, `plane_id`) VALUES
(1, 'CPH', 'JFK', '2015-11-06 12:30:00', '2015-11-06 14:30:00', 8000, 0, 1),
(2, 'CPH', 'MIA', '2015-05-05 15:45:00', '2015-05-05 18:00:00', 9500, 0, 2),
(3, 'CPH', 'MEX', '2016-05-05 09:00:00', '2016-05-05 11:30:00', 6500, 0, 3),
(4, 'CPH', 'SIA', '2016-05-20 06:00:00', '2016-05-20 06:45:00', 9500, 0, 4),
(5, 'CPH', 'BCN', '2015-09-28 02:10:00', '2015-09-28 03:20:00', 4200, 0, 5),
(6, 'CPH', 'HND', '2015-09-18 08:30:00', '2015-09-18 12:35:00', 8200, 0, 6),
(7, 'CPH', 'SYD', '2015-11-01 00:45:00', '2015-11-01 04:20:00', 9500, 0, 6),
(8, 'CPH', 'RGA', '2015-12-17 18:00:00', '2015-12-17 20:15:00', 6700, 0, 5),
(9, 'CPH', 'ROM', '2015-11-26 10:10:00', '2015-11-26 10:40:00', 2300, 0, 4),
(10, 'CPH', 'BER', '2015-10-12 00:00:00', '2015-10-12 00:40:00', 3000, 0, 3),
(11, 'CPH', 'MOW', '2016-01-15 13:40:00', '2016-01-15 15:40:00', 50, 0, 2),
(12, 'CPH', 'FNJ', '2016-01-01 00:00:00', '2016-12-31 00:00:00', 9999, 0, 1);

--
-- Triggers/udløsere `tickets`
--
DELIMITER $$
CREATE TRIGGER `capLetterINS` BEFORE INSERT ON `tickets`
 FOR EACH ROW SET new.ticket_to = UCASE(new.ticket_to), new.ticket_from = UCASE(new.ticket_from)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `capLetterOPD` BEFORE UPDATE ON `tickets`
 FOR EACH ROW SET new.ticket_to = UCASE(new.ticket_to), new.ticket_from = UCASE(new.ticket_from)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_pw` varchar(50) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_mobile` varchar(12) NOT NULL,
  `user_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_pw`, `user_email`, `user_mobile`, `user_admin`) VALUES
(1, 'admin', '1234', 'test@test.com', '25374729', 1),
(2, 'user', '1234', 'user@user.com', '25374729', 0);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `bought_tickets`
--
ALTER TABLE `bought_tickets`
  ADD PRIMARY KEY (`bought_id`),
  ADD KEY `UpdateSoldTickets` (`bticket_id`),
  ADD KEY `deleteBoughtWUser` (`buser_id`);

--
-- Indeks for tabel `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`plane_id`);

--
-- Indeks for tabel `plane_types`
--
ALTER TABLE `plane_types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indeks for tabel `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `bought_tickets`
--
ALTER TABLE `bought_tickets`
  MODIFY `bought_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- Tilføj AUTO_INCREMENT i tabel `planes`
--
ALTER TABLE `planes`
  MODIFY `plane_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Tilføj AUTO_INCREMENT i tabel `plane_types`
--
ALTER TABLE `plane_types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Tilføj AUTO_INCREMENT i tabel `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `bought_tickets`
--
ALTER TABLE `bought_tickets`
  ADD CONSTRAINT `deleteBoughtWUser` FOREIGN KEY (`buser_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
