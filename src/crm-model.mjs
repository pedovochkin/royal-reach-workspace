// The prototype uses a fixed working day so sample deadlines stay consistent.
export const WORK_DAY = '2026-10-28';
export const taskDay = task => task.date || (task.id === 1 ? '2026-10-27' : WORK_DAY);
export const isOverdue = task => !task.done && taskDay(task) < WORK_DAY;
export const needsReply = client => client.stage < 4 && client.messages.at(-1)?.from === 'client';
export const nextTask = (tasks, clientId) => tasks.find(t => t.clientId === clientId && !t.done);
