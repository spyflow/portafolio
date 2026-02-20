// URL de la API (ipinfo lite). Sin IP => usa la IP del usuario automáticamente.
const geolocationApiUrl = 'https://api.ipinfo.io/lite/me?token=576d6dbee8030b';

function checkAndRedirect() {
  console.log('[INFO] Iniciando check de geolocalización...');

  fetch(geolocationApiUrl)
    .then(response => {
      console.log('[INFO] Respuesta recibida de la API:', response);
      return response.json();
    })
    .then(data => {
      console.log('[INFO] Datos de geolocalización recibidos:', data);

      // ipinfo lite suele devolver country como código (p.ej. "ES")
      const country = data.country_code; // "ES", "US", etc.
      const isp = data.as_name; // en ipinfo normalmente viene como "org"

      console.log(`[INFO] País detectado: ${country}`);
      console.log(`[INFO] ISP/ORG detectado: ${isp}`);

      // Redirigir si el país es España o si el ISP/ORG contiene Movistar
      if (country === 'ES' || (isp && isp.includes('Movistar'))) {
        console.log('[INFO] Condición cumplida, redirigiendo a https://www.google.com');
        window.location.href = 'https://www.google.com';
      } else {
        console.log('[INFO] Condición no cumplida, no se realiza redirección.');
      }
    })
    .catch(error => {
      console.error('[ERROR] Error al obtener la geolocalización:', error);
    });
}

window.onload = () => {
  console.log('[INFO] Página cargada, ejecutando checkAndRedirect...');
  checkAndRedirect();
};
