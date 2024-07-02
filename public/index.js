document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('survey-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Aquí puedes procesar los datos del formulario si es necesario

        alert('Datos cargados con Éxito, gracias por tu apoyo');
        
        // Opcionalmente, puedes reiniciar el formulario
        form.reset();
    });
});