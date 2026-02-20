// 1) Servicio para obtener la IP pública del usuario
const ipifyUrl = 'https://api.ipify.org?format=json';

// 2) ipinfo lite con IP en la ruta
const ipinfoToken = '576d6dbee8030b';
const ipinfoLiteBaseUrl = 'https://api.ipinfo.io/lite/';

function checkAndRedirect() {
  console.log('[INFO] Iniciando check de geolocalización...');

  // Primero obtener la IP pública del usuario
  fetch(ipifyUrl)
    .then(r => {
      console.log('[INFO] Respuesta recibida de ipify:', r);
      return r.json();
    })
    .then(({ ip }) => {
      console.log('[INFO] IP pública detectada:', ip);

      const ipinfoUrl = `${ipinfoLiteBaseUrl}${encodeURIComponent(ip)}?token=${encodeURIComponent(ipinfoToken)}`;
      console.log('[INFO] Consultando ipinfo:', ipinfoUrl);

      // Luego consultar ipinfo usando la IP en la URL
      return fetch(ipinfoUrl);
    })
    .then(r => {
      console.log('[INFO] Respuesta recibida de ipinfo:', r);
      return r.json();
    })
    .then(data => {
      console.log('[INFO] Datos de geolocalización recibidos:', data);

      // ipinfo lite: country suele venir como código (por ejemplo "ES")
      const country = data.country;
      // "org" suele venir tipo "AS12345 Movistar ..."
      const isp = data.org || '';

      console.log(`[INFO] País detectado: ${country}`);
      console.log(`[INFO] ISP/ORG detectado: ${isp}`);

      if (country === 'ES' || (isp && isp.includes('Movistar'))) {
        console.log('[INFO] Condición cumplida, redirigiendo a https://www.google.com');
        window.location.href = 'https://www.google.com';
      } else {
        console.log('[INFO] Condición no cumplida, no se realiza redirección.');
      }
    })
    .catch(error => {
      console.error('[ERROR] Error en el flujo de geolocalización:', error);
    });
}

window.onload = () => {
  console.log('[INFO] Página cargada, ejecutando checkAndRedirect...');
  checkAndRedirect();
};
