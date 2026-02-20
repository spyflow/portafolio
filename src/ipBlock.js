// URL de la API para obtener la geolocalización por IP
const geolocationApiUrl = 'http://ip-api.com/json/';

// Función que realiza la redirección
function checkAndRedirect() {
  console.log('[INFO] Iniciando check de geolocalización...');

  // Hacer una solicitud GET a la API de geolocalización
  fetch(geolocationApiUrl)
    .then(response => {
      console.log('[INFO] Respuesta recibida de la API:', response);
      return response.json();
    })
    .then(data => {
      console.log('[INFO] Datos de geolocalización recibidos:', data);

      // Verifica si la IP es de España o si es Movistar
      const country = data.country; // País de la IP
      const isp = data.isp; // Proveedor de servicio de internet

      console.log(`[INFO] País detectado: ${country}`);
      console.log(`[INFO] ISP detectado: ${isp}`);

      // Redirigir si el país es España o si el ISP es Movistar
      if (country === 'Spain' || (isp && isp.includes('Movistar'))) {
        console.log('[INFO] Condición cumplida, redirigiendo a https://www.google.com');
        window.location.href = 'https://www.google.com'; // Cambia esta URL por la de destino
      } else {
        console.log('[INFO] Condición no cumplida, no se realiza redirección.');
      }
    })
    .catch(error => {
      console.error('[ERROR] Error al obtener la geolocalización:', error);
    });
}

// Ejecutar la función al cargar la página
window.onload = () => {
  console.log('[INFO] Página cargada, ejecutando checkAndRedirect...');
  checkAndRedirect();
};
