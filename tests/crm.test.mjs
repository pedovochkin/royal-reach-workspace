import test from 'node:test';
import assert from 'node:assert/strict';
import { newState } from '../src/model.mjs';
import { needsReply, isOverdue, WORK_DAY } from '../src/crm-model.mjs';

test('opening a chat does not clear a reply obligation; sending an answer does',()=>{
 const client=newState().clients[0];
 assert.equal(needsReply({...client,unread:false}),true);
 assert.equal(needsReply({...client,messages:[...client.messages,{from:'me',text:'Ответ'}]}),false);
 assert.equal(needsReply({...client,stage:4}),false);
});
test('overdue excludes completed tasks and uses the selected due date',()=>{
 assert.equal(isOverdue({id:1,done:false}),true);
 assert.equal(isOverdue({id:1,done:true}),false);
 assert.equal(isOverdue({id:1,done:false,date:WORK_DAY}),false);
});
