const BACKEND_URL = 'http://localhost:3001'; // Cambia esto por la URL de tu backend en producción

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('registerMessage');

    try {
        const response = await fetch(`${BACKEND_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });
        const data = await response.json();
        if (data.success) {
            messageDiv.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
            messageDiv.className = 'text-success';
            messageDiv.style.display = 'block';
            document.getElementById('registerForm').reset();
        } else {
            messageDiv.textContent = data.error || 'Error en el registro.';
            messageDiv.className = 'text-danger';
            messageDiv.style.display = 'block';
        }
    } catch (error) {
        messageDiv.textContent = 'Error de conexión con el servidor.';
        messageDiv.className = 'text-danger';
        messageDiv.style.display = 'block';
    }
});
