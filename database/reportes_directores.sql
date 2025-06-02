-- Crear tabla de reportes_directores
CREATE TABLE reportes_directores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    director_id INT NOT NULL,
    fecha_reporte DATE NOT NULL,
    hora_entrada TIME,
    hora_salida TIME,
    periodo_entrada ENUM('AM', 'PM') NOT NULL,
    periodo_salida ENUM('AM', 'PM') NOT NULL,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (director_id) REFERENCES directores(id)
);