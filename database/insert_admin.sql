-- Inserta un rol de administrador si no existe
INSERT INTO roles (id, nombre, descripcion, nivel_acceso) 
VALUES (1, 'Administrador', 'Rol con acceso total al sistema', 10)
ON DUPLICATE KEY UPDATE nombre = 'Administrador';

-- Inserta un usuario administrador
INSERT INTO usuarios (username, password, email, rol_id, activo) 
VALUES ('admin', SHA2('admin123', 256), 'admin@example.com', 1, true)
ON DUPLICATE KEY UPDATE password = SHA2('admin123', 256), activo = true;
