-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2021 at 11:43 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sky_router`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `bookingId` int(11) NOT NULL,
  `orderId` varchar(32) NOT NULL,
  `userId` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `total` int(32) NOT NULL,
  `insurance` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`bookingId`, `orderId`, `userId`, `scheduleId`, `total`, `insurance`, `status`) VALUES
(1, '', 1, 1, 1, 1, 1),
(2, '', 2, 2, 20, 1, 1),
(3, '20210129T111254655', 2, 2, 20, 1, 1),
(5, '20210201095752679', 1, 2, 2000000, 1, 0),
(6, '20210201100617069', 1, 2, 2000000, 1, 0),
(7, '20210201100644782', 1, 2, 2000000, 1, 0),
(8, '20210201102907503', 1, 2, 2000000, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `user_id_from` int(11) NOT NULL,
  `user_id_to` int(11) NOT NULL,
  `room_chat` int(11) NOT NULL,
  `chat_content` text NOT NULL,
  `status_read` enum('Read','Unread') NOT NULL DEFAULT 'Unread',
  `chat_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `chat_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`chat_id`, `user_id_from`, `user_id_to`, `room_chat`, `chat_content`, `status_read`, `chat_created_at`, `chat_updated_at`) VALUES
(1, 3, 7, 7005, 'Hallo Apa Kabar', 'Unread', '2021-01-29 13:45:34', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notificationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(20) NOT NULL,
  `text` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notificationId`, `userId`, `title`, `text`, `createdAt`) VALUES
(1, 1, 'Tickets  Booked', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to', '2021-01-31 04:53:05'),
(2, 1, 'Congratulation', 'booking paid off, Sed ut perspiciatis unde omnis iste natus error sit voluptatem', '2021-01-31 04:53:35'),
(3, 1, 'Tickets  Booked', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to', '2021-02-01 09:57:53'),
(4, 1, 'Tickets  Booked', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to', '2021-02-01 10:06:17'),
(5, 1, 'Tickets  Booked', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to', '2021-02-01 10:06:45'),
(6, 1, 'Tickets  Booked', 'Finish Your Payment in this link https://app.sandbox.midtrans.com/snap/v2/vtweb/ce400f6d-e296-4ac7-b', '2021-02-01 10:29:08');

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `passengerId` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `title` varchar(5) NOT NULL,
  `fullname` varchar(32) NOT NULL,
  `nationality` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `passenger`
--

INSERT INTO `passenger` (`passengerId`, `bookingId`, `title`, `fullname`, `nationality`) VALUES
(1, 1, 'mr', 'anka', 'indo'),
(2, 1, 'mr', 'abdul', 'indo'),
(3, 1, 'mr', 'anka', 'indonesia');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `user_id_from` int(11) NOT NULL,
  `user_id_to` int(11) NOT NULL,
  `room_chat` int(11) NOT NULL,
  `room_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `room_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `user_id_from`, `user_id_to`, `room_chat`, `room_created_at`, `room_updated_at`) VALUES
(1, 3, 7, 7005, '2021-01-28 19:03:28', '0000-00-00 00:00:00'),
(2, 7, 3, 7005, '2021-01-28 19:03:29', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `scheduleId` int(11) NOT NULL,
  `airlanes` varchar(64) NOT NULL,
  `date` date NOT NULL,
  `takeOff` varchar(64) NOT NULL,
  `takeOffAirport` varchar(100) NOT NULL,
  `takeOffTime` datetime NOT NULL,
  `landing` varchar(64) NOT NULL,
  `landingAirport` varchar(100) NOT NULL,
  `landingTime` datetime NOT NULL,
  `Duration` varchar(60) NOT NULL,
  `luggage` int(11) NOT NULL,
  `inflightMeal` int(11) NOT NULL,
  `wifi` int(11) NOT NULL,
  `direct` int(11) NOT NULL,
  `transit` varchar(3) NOT NULL,
  `class` varchar(20) NOT NULL,
  `refun` int(11) NOT NULL,
  `reschedule` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`scheduleId`, `airlanes`, `date`, `takeOff`, `takeOffAirport`, `takeOffTime`, `landing`, `landingAirport`, `landingTime`, `Duration`, `luggage`, `inflightMeal`, `wifi`, `direct`, `transit`, `class`, `refun`, `reschedule`, `price`) VALUES
(1, 'Lion Air', '2021-02-09', 'Jakarta', 'Bandara Soekarno Hatta (CGK)', '2021-02-09 05:00:00', 'Yogyakarta', 'Bandara Internasional Yogyakarta (YIA)', '2021-02-09 07:50:00', '1 Hour 50 Minutes', 1, 0, 1, 1, '', 'economy', 0, 1, 150),
(2, 'Batik Air', '2021-02-09', 'Jakarta', 'Bandara Soekarno Hatta (CGK)', '2021-02-09 05:00:00', 'Yogyakarta', 'Bandara Internasional Yogyakarta (YIA)', '2021-02-09 08:00:00', '2 Hours', 1, 0, 0, 0, '2x', 'economy', 0, 0, 200),
(3, 'Sriwijaya', '2021-02-09', 'Jakarta', 'Bandara Soekarno Hatta (CGK)', '2021-02-09 07:45:00', 'Yogyakarta', 'Bandara Internasional Yogyakarta (YIA)', '2021-02-09 10:40:00', '1 Hour 55 Minutes', 1, 1, 1, 0, '1', 'economy', 0, 1, 220),
(4, 'Garuda', '2021-02-09', 'Jakarta', 'Bandara Soekarno Hatta (CGK)', '2021-02-09 08:20:00', 'Yogyakarta', 'Bandara Internasional Yogyakarta (YIA)', '2021-02-09 10:50:00', '1 Hour 30 minutes', 1, 1, 1, 1, '', 'First Class', 1, 1, 400),
(5, 'Citilink', '2021-02-09', 'Jakarta', 'Bandara Soekarno Hatta (CGK)', '2021-02-09 13:05:00', 'Yogyakarta', 'Bandara Internasional Yogyakarta (YIA)', '2021-02-09 16:00:00', '1 Hour 55 Minutes', 1, 1, 1, 1, '', 'Business', 1, 0, 300),
(6, 'Air Asia', '2021-02-09', 'Jakarta', 'Bandara Soekarno Hatta (CGK)', '2021-02-09 18:40:00', 'Yogyakarta', 'Bandara Internasional Yogyakarta (YIA)', '2021-02-09 21:35:00', '1 Hour 55 Minutes', 1, 1, 0, 0, '2x', 'economy', 1, 0, 250),
(8, 'Lion Air', '2021-02-09', 'Semarang, Jawa Tengah', 'Bandara Ahmad Yani (SRG)', '2021-02-09 05:00:00', 'Kabupaten Biak Numfor, Papua', 'Bandara Frans Kaisiepo (BIK)', '2021-02-09 07:50:00', '1 Hour 50 Minutes', 1, 0, 1, 1, '', 'economy', 0, 1, 150),
(9, 'Batik Air', '2021-02-09', 'Semarang, Jawa Tengah', 'Bandara Ahmad Yani (SRG)', '2021-02-09 05:00:00', 'Kabupaten Biak Numfor, Papua', 'Bandara Frans Kaisiepo (BIK)', '2021-02-09 08:00:00', '2 Hours', 1, 0, 0, 0, '2x', 'economy', 0, 0, 200),
(10, 'Sriwijaya', '2021-02-09', 'Semarang, Jawa Tengah', 'Bandara Ahmad Yani (SRG)', '2021-02-09 07:45:00', 'Kabupaten Biak Numfor, Papua', 'Bandara Frans Kaisiepo (BIK)', '2021-02-09 10:40:00', '1 Hour 55 Minutes', 1, 1, 1, 0, '1', 'economy', 0, 1, 220),
(11, 'Garuda', '2021-02-09', 'Semarang, Jawa Tengah', 'Bandara Ahmad Yani (SRG)', '2021-02-09 08:20:00', 'Kabupaten Biak Numfor, Papua', 'Bandara Frans Kaisiepo (BIK)', '2021-02-09 10:50:00', '1 Hour 30 minutes', 1, 1, 1, 1, '', 'First Class', 1, 1, 400),
(12, 'Citilink', '2021-02-09', 'Semarang, Jawa Tengah', 'Bandara Ahmad Yani (SRG)', '2021-02-09 13:05:00', 'Kabupaten Biak Numfor, Papua', 'Bandara Frans Kaisiepo (BIK)', '2021-02-09 16:00:00', '1 Hour 55 Minutes', 1, 1, 1, 1, '', 'Business', 1, 0, 300),
(13, 'Air Asia', '2021-02-09', 'Semarang, Jawa Tengah', 'Bandara Ahmad Yani (SRG)', '2021-02-09 18:40:00', 'Kabupaten Biak Numfor, Papua', 'Bandara Frans Kaisiepo (BIK)', '2021-02-09 21:35:00', '1 Hour 55 Minutes', 1, 1, 0, 0, '2x', 'economy', 1, 0, 250);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` int(11) NOT NULL,
  `user_phone` varchar(255) NOT NULL,
  `user_image` varchar(255) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_city` varchar(255) NOT NULL,
  `user_post_code` int(11) NOT NULL,
  `user_status` int(11) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_code`, `user_name`, `user_email`, `user_password`, `user_role`, `user_phone`, `user_image`, `user_address`, `user_city`, `user_post_code`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(3, 'x0xypqx33jaz2n2u', 'Vincent', 'vincent_cars@yahoo.com', '$2b$10$zG0vj/8eVueSz1xi3/9vTOwSvsBbfRqnnBZ0ggGdLPLT.pvgztEwW', 1, '02198081876', '2021-01-27T15-00-16.154Zp', 'Bekasi Harapan Indah', 'Bekasi', 17131, 1, '2021-01-27 21:16:09', '2021-01-27 15:00:16'),
(7, '', 'Shincai', 'toastermedia26@gmail.com', '$2b$10$6DCIzweHul/n/N4iMQOhy.t.5jsZzhpqpxH4IbiPaN3mms.xEiON6', 1, '081285117650', '', 'Harapan Indah Bekasi block wz 12', 'Bekasi', 17131, 1, '2021-01-28 15:59:21', '0000-00-00 00:00:00'),
(8, 'bpi4n5z6dovslyyw', 'vincent junior', 'liekian71@gmail.com', '$2b$10$Ro39vzTiN9IaCk1OmaF.QetHOGAYzcSozIfeqtv3PqWOzOdJZy/NG', 1, '', '', '', '', 0, 0, '2021-01-29 12:51:42', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingId`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notificationId`);

--
-- Indexes for table `passenger`
--
ALTER TABLE `passenger`
  ADD PRIMARY KEY (`passengerId`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`scheduleId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `bookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notificationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `passenger`
--
ALTER TABLE `passenger`
  MODIFY `passengerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
