export const ETAPAS_DEVOPS = [
  {
    id: 'plan',
    nombre: '1. Plan (Planificar)',
    descripcion:
      'Definir qué vamos a construir antes de tocar código (issues, tareas, metas).',
  },
  {
    id: 'code',
    nombre: '2. Code (Programar)',
    descripcion:
      'Escribir código en una rama aparte y guardarlo con commits claros.',
  },
  {
    id: 'build',
    nombre: '3. Build (Construir)',
    descripcion:
      'Preparar los archivos listos para ejecutarse o publicarse (por ejemplo, carpeta dist/).',
  },
  {
    id: 'test',
    nombre: '4. Test (Probar)',
    descripcion:
      'Ejecutar pruebas automáticas para detectar errores antes de publicar.',
  },
  {
    id: 'release',
    nombre: '5. Release (Preparar entrega)',
    descripcion:
      'Aprobar el Pull Request y dejar lista la versión en la rama main.',
  },
  {
    id: 'deploy',
    nombre: '6. Deploy (Desplegar)',
    descripcion:
      'Publicar la aplicación automáticamente (por ejemplo en GitHub Pages).',
  },
  {
    id: 'operate',
    nombre: '7. Operate & Monitor (Operar y vigilar)',
    descripcion:
      'Comprobar que el sitio sigue en línea y revisar errores o tiempos de respuesta.',
  },
];

export function calcularProgreso(completadas, total = ETAPAS_DEVOPS.length) {
  if (total <= 0) {
    return 0;
  }
  const seguras = Math.max(0, Math.min(completadas, total));
  return Math.round((seguras / total) * 100);
}

export function formatearSaludo(nombre = 'equipo') {
  const limpio = String(nombre).trim() || 'equipo';
  return `¡Hola, ${limpio}! Pipeline listo para construir, probar y desplegar.`;
}
