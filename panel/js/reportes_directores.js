// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarModeradores();
    cargarDirectores();
    actualizarTabla();
});

// Función para cargar locutores en los selectores
function cargarLocutores() {
    const locutoresRegistrados = JSON.parse(localStorage.getItem('registrosLocutores')) || [];
    const locutor1Select = document.getElementById('locutor1');
    const locutor2Select = document.getElementById('locutor2');

    // Limpiar opciones existentes
    locutor1Select.innerHTML = '<option value="">Seleccione un locutor</option>';
    locutor2Select.innerHTML = '<option value="">Seleccione un locutor</option>';

    // Agregar locutores a los selectores desde registro_locutores.html
    locutoresRegistrados.forEach(locutor => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = locutor.nombre;
        option1.textContent = locutor.nombre;
        option2.value = locutor.nombre;
        option2.textContent = locutor.nombre;
        
        locutor1Select.appendChild(option1);
        locutor2Select.appendChild(option2.cloneNode(true));
    });
}

// Función para guardar registro
function guardarRegistro(event) {
    event.preventDefault();
    
    const registro = {
        horaInicio: document.getElementById('horaInicio').value,
        horaFin: document.getElementById('horaFin').value,
        categoria: obtenerCategoriasSeleccionadas(),
        nombre: document.getElementById('nombre').value,
        fecha: document.getElementById('fecha').value,
        presente: document.getElementById('presente').value,
        moderador1: document.getElementById('moderador1').value,
        moderador2: document.getElementById('moderador2').value,
        locutor1: document.getElementById('locutor1').value,
        locutor2: document.getElementById('locutor2').value,
        observaciones: document.getElementById('observaciones').value
    };

    const editIndex = document.getElementById('editIndex').value;
    
    if (editIndex === '-1') {
        registros.push(registro);
    } else {
        registros[parseInt(editIndex)] = registro;
    }

    localStorage.setItem('registrosReporteDirector', JSON.stringify(registros));
    actualizarTabla();
    limpiarFormulario();
}

// Función para obtener categorías seleccionadas
function obtenerCategoriasSeleccionadas() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value).join(', ');
}

// Función para limpiar formulario
function limpiarFormulario() {
    document.getElementById('registroForm').reset();
    document.getElementById('editIndex').value = '-1';
}

// Función para actualizar la tabla
function actualizarTabla() {
    const tbody = document.getElementById('registrosTabla');
    tbody.innerHTML = '';

    registros.forEach((registro, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${registro.horaInicio}</td>
            <td>${registro.horaFin}</td>
            <td>${registro.categoria}</td>
            <td>${registro.nombre}</td>
            <td>${registro.fecha}</td>
            <td>${registro.presente}</td>
            <td>${registro.moderador1}, ${registro.moderador2}</td>
            <td>${registro.locutor1}, ${registro.locutor2}</td>
            <td>${registro.observaciones}</td>
            <td>
                <button onclick="editarRegistro(${index})" class="btn btn-sm btn-primary">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="eliminarRegistro(${index})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para editar registro
function editarRegistro(index) {
    const registro = registros[index];
    document.getElementById('horaInicio').value = registro.horaInicio;
    document.getElementById('horaFin').value = registro.horaFin;
    
    // Marcar categorías
    const categorias = registro.categoria.split(', ');
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = categorias.includes(cb.value);
    });

    document.getElementById('nombre').value = registro.nombre;
    document.getElementById('fecha').value = registro.fecha;
    document.getElementById('presente').value = registro.presente;
    document.getElementById('moderador1').value = registro.moderador1;
    document.getElementById('moderador2').value = registro.moderador2;
    document.getElementById('locutor1').value = registro.locutor1;
    document.getElementById('locutor2').value = registro.locutor2;
    document.getElementById('observaciones').value = registro.observaciones;
    document.getElementById('editIndex').value = index;
}

// Función para eliminar registro
function eliminarRegistro(index) {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
        registros.splice(index, 1);
        localStorage.setItem('registrosReporteDirector', JSON.stringify(registros));
        actualizarTabla();
    }
}

// Función para exportar a PDF
function exportarPDF() {
    const doc = new jsPDF();
    
    doc.autoTable({
        head: [['Hora Inicio', 'Hora Fin', 'Categoría', 'Nombre', 'Fecha', 'Presente', 'Moderadores', 'Locutores', 'Observaciones']],
        body: registros.map(r => [
            r.horaInicio,
            r.horaFin,
            r.categoria,
            r.nombre,
            r.fecha,
            r.presente,
            `${r.moderador1}, ${r.moderador2}`,
            `${r.locutor1}, ${r.locutor2}`,
            r.observaciones
        ])
    });

    doc.save('reporte_directores.pdf');
}