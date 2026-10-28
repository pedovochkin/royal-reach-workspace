import test from 'node:test';
import assert from 'node:assert/strict';
import { newState } from '../src/model.mjs';
import { canVisit, scopeData, applyScopedUpdate } from '../src/access.mjs';

test('employee sees own clients and tasks, manager sees the whole team', () => {
  const state = newState();
  assert.equal(scopeData(state, 'manager').clients.length, 8);
  assert.deepEqual(scopeData(state, 'employee').clients.map(c => c.id), ['alex', 'marina']);
  assert.equal(scopeData(state, 'employee').tasks.length, 2);
  assert.equal(canVisit('employee', 'team'), false);
  assert.equal(canVisit('employee', 'integrations'), false);
  assert.equal(canVisit('manager', 'team'), true);
});

test('employee update preserves colleagues and cannot approve shared knowledge', () => {
  const state = newState();
  const others = state.clients.filter(c => c.owner !== 1);
  const updated = applyScopedUpdate(state, 'employee', d => ({
    ...d,
    clients: d.clients.map(c => ({ ...c, stage: 3 })),
    tasks: d.tasks.map(t => ({ ...t, done: true })),
    knowledge: [], reviews: [{ id: 'unauthorized', clientId: 'alex' }],
    pendingReviews: [{ clientId: 'alex', note: 'Needs approval' }],
  }));
  assert.deepEqual(updated.clients.filter(c => c.owner !== 1), others);
  assert.equal(updated.clients.find(c => c.id === 'alex').stage, 3);
  assert.equal(updated.tasks.find(t => t.clientId === 'dmitry').done, false);
  assert.deepEqual(updated.knowledge, state.knowledge);
  assert.deepEqual(updated.reviews, []);
  assert.equal(updated.pendingReviews[0].owner, 1);
});
