import { ETAPAS_DEVOPS, calcularProgreso, formatearSaludo } from './logic.js';

const lista = document.getElementById('lista-etapas');
const progresoTexto = document.getElementById('progreso-texto');
const barra = document.getElementById('progreso-barra');
const saludoEl = document.getElementById('saludo-dinamico');
const inputNombre = document.getElementById('input-nombre');

const marcadas = new Set();

function renderProgreso() {
  const pct = calcularProgreso(marcadas.size, ETAPAS_DEVOPS.length);
  progresoTexto.textContent = `${marcadas.size} de ${ETAPAS_DEVOPS.length} etapas revisadas (${pct}%)`;
  barra.style.width = `${pct}%`;
}

ETAPAS_DEVOPS.forEach((etapa) => {
  const li = document.createElement('li');
  li.className = 'etapa-item';

  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      marcadas.add(etapa.id);
    } else {
      marcadas.delete(etapa.id);
    }
    renderProgreso();
  });

  const texto = document.createElement('div');
  texto.innerHTML = `<strong>${etapa.nombre}</strong><p>${etapa.descripcion}</p>`;

  label.appendChild(checkbox);
  label.appendChild(texto);
  li.appendChild(label);
  lista.appendChild(li);
});

inputNombre.addEventListener('input', () => {
  saludoEl.textContent = formatearSaludo(inputNombre.value);
});

saludoEl.textContent = formatearSaludo('AIDJR05');
renderProgreso();
