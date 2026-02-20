// URL de la API para obtener la geolocalización por IP
const geolocationApiUrl = 'http://ip-api.com/json/';

// Función que realiza la redirección
function checkAndRedirect() {
  // Hacer una solicitud GET a la API de geolocalización
  fetch(geolocationApiUrl)
    .then(response => response.json())
    .then(data => {
      // Verifica si la IP es de España o si es Movistar
      const country = data.country; // País de la IP
      const isp = data.isp; // Proveedor de servicio de internet

      // Redirigir si el país es España o si el ISP es Movistar
      if (country === 'Spain' || isp.includes('Movistar')) {
        window.location.href = 'https://www.google.com'; // Cambia esta URL por la de destino
      }
    })
    .catch(error => {
      console.error('Error al obtener la geolocalización:', error);
    });
}

// Ejecutar la función al cargar la página
window.onload = checkAndRedirect;
