import test from 'node:test';
import assert from 'node:assert/strict';
import { newState, loadState, evaluateAnswer, searchKnowledge } from '../src/model.mjs';

test('corrupt browser state falls back to a complete isolated demo', () => {
  assert.equal(loadState({ getItem: () => 'not json' }).clients.length, 8);
  assert.equal(loadState({ getItem: () => '{"version":1,"clients":[]}' }).knowledge.length, 6);
  const a = newState();
  a.clients[0].messages.push({ text: 'test' });
  assert.equal(newState().clients[0].messages.length, 3);
});

test('practice requires a question, client goal and concrete next action', () => {
  assert.equal(evaluateAnswer('Наша реклама самая лучшая, покупайте прямо сейчас.').score, 0);
  const result = evaluateAnswer('Подскажите, какой результат вы хотите получить? Подберу два варианта под вашу задачу и пришлю их сегодня.');
  assert.equal(result.score, 3);
  assert.equal(result.valid, true);
  assert.equal(evaluateAnswer('Цель? Предложу.').valid, false);
});

test('knowledge search cites only approved matching material', () => {
  const s = newState();
  s.knowledge.push({ id: 'draft', title: 'Дорого', body: 'дорого дорого', approved: false });
  const results = searchKnowledge(s.knowledge, 'Как отвечать на дорого?');
  assert.equal(results[0].id, 'price');
  assert.ok(results.every(x => x.approved && x.source));
  assert.deepEqual(searchKnowledge(s.knowledge, 'несуществующееслово'), []);
});
