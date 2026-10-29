export const TIME_ZONE = 'Europe/Moscow';
const parts = value => Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
}).formatToParts(new Date(value)).map(p => [p.type, p.value]));
export function dateFields(value = Date.now()) {
  const p = parts(value);
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` };
}
export const WORK_DAY = dateFields().date;
const previousDay = () => dateFields(new Date(`${WORK_DAY}T12:00:00+03:00`).getTime() - 86400000).date;
export const taskDay = task => task.dueAt ? dateFields(task.dueAt).date : task.date || (task.id === 1 ? previousDay() : WORK_DAY);
export const taskDeadline = task => task.dueAt ? Date.parse(task.dueAt) : Date.parse(`${taskDay(task)}T${task.time || '23:59'}:00+03:00`);
export const isOverdue = (task, now = Date.now()) => !task.done && taskDeadline(task) <= now;
export function createDeadline(mode, date, time, now = Date.now()) {
  const createdAt = new Date(now).toISOString();
  const due = mode === 'within24h' ? now + 86400000 : Date.parse(`${date}T${time}:00+03:00`);
  if (!['exact', 'within24h'].includes(mode) || !Number.isFinite(due)) throw new Error('Укажите дату и время');
  if (mode === 'exact' && (dateFields(due).date !== date || dateFields(due).time !== time)) throw new Error('Проверьте дату и время');
  return { deadlineMode: mode, createdAt, dueAt: new Date(due).toISOString(), ...dateFields(due) };
}
export function deadlineLabel(task, full = false) {
  const { date, time } = task.dueAt ? dateFields(task.dueAt) : { date: taskDay(task), time: task.time || '23:59' };
  const [year, month, day] = date.split('-');
  const stamp = full ? `${day}.${month}.${year} в ${time}` : date === dateFields().date ? time : `${day}.${month} · ${time}`;
  return `${task.deadlineMode === 'within24h' ? '24 часа · до ' : full ? 'До ' : ''}${stamp}`;
}
export const needsReply = client => client.stage < 4 && client.messages.at(-1)?.from === 'client';
export const nextTask = (tasks, clientId) => tasks.find(t => t.clientId === clientId && !t.done);
