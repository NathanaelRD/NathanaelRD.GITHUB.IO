-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS zona2_db;
USE zona2_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'dr-aventureros', 'dr-conquistador', 'dr-guias', 'secretaria', 'tesorero') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de clubes
CREATE TABLE IF NOT EXISTS clubes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('aventureros', 'conquistadores', 'guias') NOT NULL,
    director_id INT,
    FOREIGN KEY (director_id) REFERENCES usuarios(id)
);

-- Tabla de miembros
CREATE TABLE IF NOT EXISTS miembros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('M', 'F') NOT NULL,
    club_id INT,
    clase VARCHAR(50),
    fecha_ingreso DATE NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    FOREIGN KEY (club_id) REFERENCES clubes(id)
);

-- Tabla de asistencias
CREATE TABLE IF NOT EXISTS asistencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    miembro_id INT,
    fecha DATE NOT NULL,
    estado ENUM('presente', 'ausente', 'tardanza') NOT NULL,
    FOREIGN KEY (miembro_id) REFERENCES miembros(id)
);

-- Tabla de eventos
CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    tipo ENUM('local', 'zonal') NOT NULL,
    club_id INT,
    FOREIGN KEY (club_id) REFERENCES clubes(id)
);

-- Tabla de finanzas
CREATE TABLE IF NOT EXISTS finanzas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('ingreso', 'gasto') NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    club_id INT,
    FOREIGN KEY (club_id) REFERENCES clubes(id)
);

-- Tabla de documentos
CREATE TABLE IF NOT EXISTS documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo ENUM('guia_seguimiento', 'registro_unidad', 'otro') NOT NULL,
    contenido TEXT NOT NULL,
    club_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubes(id)
);