-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2025 a las 17:07:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
 /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
 /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 /*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `latienda`
--

-- --------------------------------------------------------
-- Tabla USERS
-- --------------------------------------------------------

CREATE TABLE `users` (
  `ID_user` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Image` varchar(50) NOT NULL,
  `Pass` varchar(100) NOT NULL,
  `Type_user` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_user`);

ALTER TABLE `users`
  MODIFY `ID_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

-- --------------------------------------------------------
-- Tabla PRODUCTS (agregada desde el primer dump)
-- --------------------------------------------------------

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `name`, `description`, `price`, `stock`, `image`) VALUES
(1, 'Campera Denim Azul Clásica', 'Campera de jean para mujer, confeccionada en denim azul de alta calidad. Diseño clásico con bolsillos frontales, costuras reforzadas y un calce cómodo ideal para uso diario. Perfecta para combinar con cualquier outfit casual.', 42900, 18, 'ropa1.webp'),
(2, 'Top Deportivo Negro Essentials', 'Top deportivo de sujeción media, confeccionado en tela elástica y respirable. Ideal para entrenamientos, running o uso diario gracias a su calce cómodo y diseño moderno. Combina perfectamente con calzas deportivas.', 18500, 25, 'ropa3.webp'),
(3, 'Camperón Acolchado Premium con Capucha', 'Camperón femenino de invierno, confeccionado en material acolchado de alta protección térmica. Incluye capucha amplia con borde de piel sintética, cierre frontal completo y bolsillos laterales. Ideal para climas fríos y uso diario gracias a su diseño cómodo, moderno y resistente al viento.', 79990, 32, 'ropa5.webp'),
(4, 'Conjunto Deportivo', 'Conjunto deportivo compuesto por remera técnica de manga corta y biker de compresión suave. Fabricado con tela liviana, respirable y flexible, ideal para entrenamiento, running o uso diario. Color negro con logos Adidas en blanco.', 28900, 52, 'ropa7.webp'),
(5, 'Campera Puffy Acolchada', 'Campera puffy larga, súper abrigada y acolchada, ideal para días fríos. Cuenta con cierre frontal, capucha amplia tipo cuello alto para mayor protección térmica y bolsillos laterales. Color beige neutro, combinable y moderno.', 69900, 34, 'ropa8.webp'),
(6, 'Remera Básica de Algodón', 'Remera clásica de manga corta confeccionada en algodón suave y respirable. Posee un calce cómodo y versátil, ideal para uso diario o para combinar con outfits casuales. Color beige neutro, fácil de combinar con cualquier estilo.', 9500, 78, 'ropa10.webp');


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
 /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
 /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
