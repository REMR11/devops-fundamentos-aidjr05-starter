import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ETAPAS_DEVOPS,
  calcularProgreso,
  formatearSaludo,
} from '../public/logic.js';

test('el ciclo incluye las 7 etapas principales de DevOps', () => {
  assert.equal(ETAPAS_DEVOPS.length, 7);
});

test('calcularProgreso devuelve porcentajes correctos entre 0 y 100', () => {
  assert.equal(calcularProgreso(0, 7), 0);
  assert.equal(calcularProgreso(7, 7), 100);
  assert.equal(calcularProgreso(10, 7), 100);
  assert.equal(calcularProgreso(-2, 7), 0);
});

test('formatearSaludo incluye el nombre o usa equipo por defecto', () => {
  assert.match(formatearSaludo('Ana'), /¡Hola, Ana!/);
  assert.match(formatearSaludo('   '), /¡Hola, equipo!/);
});
