// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>¡Mensaje Enviado!</h3>
            <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
        </div>
    `;
    document.body.appendChild(messageDiv);

    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Función para validar el formulario
function validateForm(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const telefono = document.getElementById('telefono');
    const email = document.getElementById('email');
    
    let isValid = true;
    
    // Limpiar todos los mensajes de error previos
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('invalid');
    });
    
    // Validar nombre (solo letras y espacios)
    if (!/^[A-Za-z\s]+$/.test(nombre.value)) {
        document.getElementById('nombreError').textContent = 'El nombre solo debe contener letras y espacios';
        nombre.classList.add('invalid');
        isValid = false;
    }
    
    // Validar apellido (solo letras y espacios)
    if (!/^[A-Za-z\s]+$/.test(apellido.value)) {
        document.getElementById('apellidoError').textContent = 'El apellido solo debe contener letras y espacios';
        apellido.classList.add('invalid');
        isValid = false;
    }
    
    // Validar teléfono (exactamente 8 números, comenzando con 6 o 7)
    if (!/^[67][0-9]{7}$/.test(telefono.value)) {
        document.getElementById('telefonoError').textContent = 'El teléfono debe comenzar con 6 o 7 y tener 8 dígitos';
        telefono.classList.add('invalid');
        isValid = false;
    }
    
    // Validar email
    if (!email.checkValidity()) {
        document.getElementById('emailError').textContent = 'Por favor, ingrese un correo electrónico válido';
        email.classList.add('invalid');
        isValid = false;
    }
    
    if (isValid) {
        showSuccessMessage();
        document.getElementById('contactForm').reset();
    }
    
    return false;
}

// Inicializar validaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const telefono = document.getElementById('telefono');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    
    // Prevenir números en nombre y apellido
    nombre.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    });

    apellido.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    });

    // Prevenir letras en teléfono
    telefono.addEventListener('input', function(e) {
        // Remover cualquier carácter que no sea número
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Limitar a 8 dígitos
        if (this.value.length > 8) {
            this.value = this.value.slice(0, 8);
        }
        
        // Si es el primer dígito, solo permitir 6 o 7
        if (this.value.length === 1 && this.value[0] !== '6' && this.value[0] !== '7') {
            this.value = '';
        }
    });
});
