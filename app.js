const API_URL = 'https://api.spacexdata.com/v5/launches';

// Elemento raíz de la aplicación
const app = document.getElementById('app');

// Función para cargar lanzamientos
async function loadLaunches() {
  const response = await fetch(API_URL);
  const launches = await response.json();
  renderLaunches(launches);
}

// Función para renderizar lanzamientos
function renderLaunches(launches) {
  app.innerHTML = '';
  const launchContainer = document.createElement('div');
  launchContainer.classList.add('launch-container');

  launches.forEach(launch => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${launch.links.patch.small}" alt="${launch.name}">
      <div class="card-details">
        <h3>${launch.name}</h3>
        <p>Fecha: ${new Date(launch.date_utc).toLocaleDateString()}</p>
      </div>
    `;
    card.addEventListener('click', () => showLaunchDetails(launch));
    launchContainer.appendChild(card);
  });
  app.appendChild(launchContainer);
}

// Función para mostrar detalles de un lanzamiento
function showLaunchDetails(launch) {
  app.innerHTML = `
    <button onclick="loadLaunches()">Volver</button>
    <h2>${launch.name}</h2>
    <img src="${launch.links.patch.small}" alt="${launch.name}">
    <p>Fecha de Despegue: ${new Date(launch.date_utc).toLocaleString()}</p>
    <p>Número de Vuelo: ${launch.flight_number}</p>
    ${launch.failures.length > 0 ? `<p>Fallas: ${launch.failures.map(failure => failure.reason).join(', ')}</p>` : '<p>No hubo fallas</p>'}
    <p>Detalles: ${launch.details ? launch.details : 'No disponible'}</p>
  `;
}

// Inicia la aplicación cargando los lanzamientos
loadLaunches();
