// Backend básico con Express para login y registro
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');
const crypto = require('crypto'); // Importar módulo para cifrado

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta de registro de usuario
app.post('/api/register', (req, res) => {
  const { username, password, email, rol_id } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // Cifrar la contraseña antes de guardarla en la base de datos
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const query = 'INSERT INTO usuarios (username, password, email, rol_id) VALUES (?, ?, ?, ?)';
  connection.query(query, [username, hashedPassword, email, rol_id || 1], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, userId: results.insertId });
  });
});

// Ruta de login de usuario
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // Cifrar la contraseña ingresada para compararla con la base de datos
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  connection.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    res.json({ success: true, user: results[0] });
  });
});

// Ruta de registro de directores
app.post('/api/register/director', (req, res) => {
  const {
    nombre, apellido, fecha_nacimiento, telefono, celular, direccion,
    cargo, departamento, fecha_ingreso, hora_entrada, hora_salida,
    periodo_entrada, periodo_salida, dias_laborables, estado_civil, usuario_id
  } = req.body;

  if (!nombre || !apellido || !fecha_nacimiento) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO directores (nombre, apellido, fecha_nacimiento, telefono, celular, direccion, cargo, departamento, fecha_ingreso, hora_entrada, hora_salida, periodo_entrada, periodo_salida, dias_laborables, estado_civil, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [
    nombre, apellido, fecha_nacimiento, telefono, celular, direccion,
    cargo, departamento, fecha_ingreso, hora_entrada, hora_salida,
    periodo_entrada, periodo_salida, dias_laborables, estado_civil, usuario_id
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, directorId: results.insertId });
  });
});

// Ruta de registro de locutores
app.post('/api/register/locutor', (req, res) => {
  const {
    nombre, apellido, fecha_nacimiento, telefono, celular, direccion,
    programa, descripcion_programa, hora_inicio, hora_fin,
    periodo_inicio, periodo_fin, dias_trabajo, estado_civil,
    experiencia_anos, usuario_id
  } = req.body;

  if (!nombre || !apellido || !fecha_nacimiento) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO locutores (nombre, apellido, fecha_nacimiento, telefono, celular, direccion, programa, descripcion_programa, hora_inicio, hora_fin, periodo_inicio, periodo_fin, dias_trabajo, estado_civil, experiencia_anos, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [
    nombre, apellido, fecha_nacimiento, telefono, celular, direccion,
    programa, descripcion_programa, hora_inicio, hora_fin,
    periodo_inicio, periodo_fin, dias_trabajo, estado_civil,
    experiencia_anos, usuario_id
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, locutorId: results.insertId });
  });
});

// Ruta de registro de moderadores
app.post('/api/register/moderador', (req, res) => {
  const {
    nombre, apellido, fecha_nacimiento, telefono, celular, direccion,
    hora_inicio, hora_fin, periodo_inicio, periodo_fin,
    dias_moderacion, area_moderacion, nivel_experiencia,
    estado_civil, usuario_id
  } = req.body;

  if (!nombre || !apellido || !fecha_nacimiento) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO moderadores (nombre, apellido, fecha_nacimiento, telefono, celular, direccion, hora_inicio, hora_fin, periodo_inicio, periodo_fin, dias_moderacion, area_moderacion, nivel_experiencia, estado_civil, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [
    nombre, apellido, fecha_nacimiento, telefono, celular, direccion,
    hora_inicio, hora_fin, periodo_inicio, periodo_fin,
    dias_moderacion, area_moderacion, nivel_experiencia,
    estado_civil, usuario_id
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, moderadorId: results.insertId });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
