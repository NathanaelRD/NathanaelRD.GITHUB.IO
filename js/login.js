// Login usando backend Node.js
const BACKEND_URL = 'http://localhost:3001'; // Cambia esto por la URL de tu backend en producción

document.getElementById('loginForm').addEventListener('submit', handleLogin);

async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch(`${BACKEND_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            // Guardar información del usuario en sessionStorage
            sessionStorage.setItem('user', JSON.stringify({
                username: data.user.username,
                role: data.user.rol_id, // Puedes mapear el rol si lo necesitas
                token: btoa(data.user.username + ':' + Date.now())
            }));

            // Redirigir según el rol (ajusta según tu lógica de roles)
            switch(data.user.rol_id) {
                case 1: // admin
                    window.location.href = 'panel/panel_admin.html';
                    break;
                case 2: // directiva
                    window.location.href = 'panel/directiva_general.html';
                    break;
                case 3: // dh (director)
                default:
                    window.location.href = 'panel/Reportes_Directores.html';
                    break;
            }
        } else {
            showError(data.error || 'Usuario o contraseña incorrectos');
        }
    } catch (error) {
        showError('Error de conexión con el servidor');
    }
}

// Puedes agregar aquí una función para registrar usuarios usando el backend
// Ejemplo:
// async function registerUser(username, password, email, rol_id) {
//   const response = await fetch(`${BACKEND_URL}/api/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password, email, rol_id })
//   });
//   return await response.json();
// }
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}