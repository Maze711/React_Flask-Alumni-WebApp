-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2025 at 10:11 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumni_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_primary_information`
--

CREATE TABLE `user_primary_information` (
  `ID` int(11) NOT NULL,
  `alumni_id` varchar(50) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `suffix` varchar(100) DEFAULT NULL,
  `gender` varchar(100) NOT NULL,
  `birthdate` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `number` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_primary_information`
--

INSERT INTO `user_primary_information` (`ID`, `alumni_id`, `last_name`, `first_name`, `middle_name`, `suffix`, `gender`, `birthdate`, `email`, `address`, `number`, `password`) VALUES
(1, 'A1001', 'Doe', 'John', 'Michael', 'Jr.', 'Male', '1990-01-15', 'john.doe@email.com', '123 Main St, City', '1234567890', '1234'),
(2, 'A1002', 'Smith', 'Jane', 'Elizabeth', NULL, 'Female', '1992-06-25', 'jane.smith@email.com', '456 Oak Rd, Town', '0987654321', '1234'),
(3, 'A1003', 'Lee', 'Mark', 'David', NULL, 'Male', '1988-11-10', 'mark.lee@email.com', '789 Pine Blvd, City', '1122334455', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `user_secondary_information`
--

CREATE TABLE `user_secondary_information` (
  `ID` int(11) NOT NULL,
  `alumni_id` varchar(50) NOT NULL,
  `college_department` enum('ACT','IT','CS') NOT NULL,
  `year_graduated` varchar(100) NOT NULL,
  `civil_status` varchar(100) NOT NULL,
  `work_status` varchar(100) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `role` enum('DEAN','ALUMNI','FACULTY') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_secondary_information`
--

INSERT INTO `user_secondary_information` (`ID`, `alumni_id`, `college_department`, `year_graduated`, `civil_status`, `work_status`, `job_title`, `role`) VALUES
(1, 'A1001', 'CS', '2012', 'Single', 'Employed', 'Software Engineer', 'DEAN'),
(2, 'A1002', 'IT', '2014', 'Married', 'Employed', 'Network Administrator', 'ALUMNI'),
(3, 'A1003', 'ACT', '2010', 'Single', 'Unemployed', '', 'ALUMNI');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_primary_information`
--
ALTER TABLE `user_primary_information`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `user_secondary_information`
--
ALTER TABLE `user_secondary_information`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_alumni` (`alumni_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_primary_information`
--
ALTER TABLE `user_primary_information`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_secondary_information`
--
ALTER TABLE `user_secondary_information`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_secondary_information`
--
ALTER TABLE `user_secondary_information`
  ADD CONSTRAINT `fk_alumni` FOREIGN KEY (`alumni_id`) REFERENCES `user_primary_information` (`alumni_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
