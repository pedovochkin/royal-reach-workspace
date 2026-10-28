// These scopes model the prototype's UI. Production authorization belongs on the server.
export const roleViews = {
  manager: ['overview', 'inbox', 'clients', 'team', 'knowledge', 'integrations'],
  employee: ['overview', 'inbox', 'clients', 'academy', 'knowledge'],
};
export const canVisit = (role, page) => (roleViews[role] || roleViews.employee).includes(page);
export function scopeData(state, role, userId = 1) {
  if (role === 'manager') return state;
  const clients = state.clients.filter(c => c.owner === userId);
  const ids = new Set(clients.map(c => c.id));
  return {
    ...state, clients,
    tasks: state.tasks.filter(t => ids.has(t.clientId) || (!t.clientId && (t.owner || 1) === userId)),
    reviews: state.reviews.filter(r => ids.has(r.clientId)),
    pendingReviews: (state.pendingReviews || []).filter(r => ids.has(r.clientId)),
    knowledge: state.knowledge.filter(k => k.approved),
  };
}
export function applyScopedUpdate(state, role, recipe, userId = 1) {
  if (role === 'manager') return recipe(state);
  const before = scopeData(state, role, userId);
  const next = recipe(before);
  const ownClientIds = new Set(before.clients.map(c => c.id));
  const otherClientIds = new Set(state.clients.filter(c => c.owner !== userId).map(c => c.id));
  const clients = next.clients.filter(c => !otherClientIds.has(c.id)).map(c => ({ ...c, owner: userId }));
  const allowedClientIds = new Set(clients.map(c => c.id));
  const ownTaskIds = new Set(before.tasks.map(t => t.id));
  const otherTaskIds = new Set(state.tasks.filter(t => !ownTaskIds.has(t.id)).map(t => t.id));
  const tasks = next.tasks.filter(t => !otherTaskIds.has(t.id) && (!t.clientId || allowedClientIds.has(t.clientId))).map(t => ({ ...t, owner: userId }));
  return {
    ...state,
    clients: [...state.clients.map(c => ownClientIds.has(c.id) ? clients.find(x => x.id === c.id) : c).filter(Boolean), ...clients.filter(c => !ownClientIds.has(c.id))],
    tasks: [...state.tasks.map(t => ownTaskIds.has(t.id) ? tasks.find(x => x.id === t.id) : t).filter(Boolean), ...tasks.filter(t => !ownTaskIds.has(t.id))],
    pendingReviews: [
      ...(state.pendingReviews || []).filter(r => !ownClientIds.has(r.clientId)),
      ...(next.pendingReviews || []).filter(r => allowedClientIds.has(r.clientId)).map(r => ({ ...r, owner: userId })),
    ],
    completed: next.completed, xp: next.xp, dailyDone: next.dailyDone,
    streak: next.streak, goal: next.goal, activity: next.activity,
    // Approved shared knowledge and reviews can only be changed in manager view.
  };
}
