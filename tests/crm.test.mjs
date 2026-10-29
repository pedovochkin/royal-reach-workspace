import test from 'node:test';
import assert from 'node:assert/strict';
import { newState } from '../src/model.mjs';
import { needsReply, isOverdue, WORK_DAY, createDeadline, dateFields, deadlineLabel } from '../src/crm-model.mjs';

test('opening a chat does not clear a reply obligation; sending an answer does',()=>{
 const client=newState().clients[0];
 assert.equal(needsReply({...client,unread:false}),true);
 assert.equal(needsReply({...client,messages:[...client.messages,{from:'me',text:'Ответ'}]}),false);
 assert.equal(needsReply({...client,stage:4}),false);
});
test('24 hours starts at save, crosses midnight, and survives storage round trip',()=>{
 const now=Date.parse('2026-10-29T23:45:12+03:00');
 const task=JSON.parse(JSON.stringify({...createDeadline('within24h',null,null,now),done:false}));
 assert.equal(Date.parse(task.dueAt)-Date.parse(task.createdAt),86400000);
 assert.equal(task.date,'2026-10-30');
 assert.equal(task.time,'23:45');
 assert.equal(isOverdue(task,now+86400000-1),false);
 assert.equal(isOverdue(task,now+86400000),true);
 assert.equal(isOverdue({...task,done:true},now+90000000),false);
 assert.match(deadlineLabel(task,true),/24 часа.*30\.10\.2026 в 23:45/);
});
test('exact deadline uses Moscow time independent of browser timezone',()=>{
 const now=Date.parse('2026-10-29T10:00:00Z');
 const task=createDeadline('exact','2026-10-30','09:30',now);
 assert.equal(task.dueAt,'2026-10-30T06:30:00.000Z');
 assert.deepEqual(dateFields(task.dueAt),{date:'2026-10-30',time:'09:30'});
 assert.throws(()=>createDeadline('exact','','',now));
 assert.throws(()=>createDeadline('exact','2026-02-30','09:30',now));
});
test('overdue excludes completed tasks and uses the selected due date',()=>{
 const now=Date.parse(`${WORK_DAY}T12:00:00+03:00`);
 assert.equal(isOverdue({id:1,done:false},now),true);
 assert.equal(isOverdue({id:1,done:true},now),false);
 assert.equal(isOverdue({id:1,done:false,date:WORK_DAY},now),false);
});
