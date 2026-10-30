
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
const elements=new Map(), storage=new Map();
class El{constructor(tag='DIV'){this.tagName=tag.toUpperCase();this._html='';this.textContent='';this.classList={toggle(){},add(){},remove(){}};this.parentNode=null;this.style={};this.children=[];}
get innerHTML(){return this._html;}set innerHTML(v){this._html=v;}
append(...els){els.forEach(e=>{e.parentNode=this;this.children.push(e);});}
appendChild(e){this.append(e);return e;}
insertBefore(e){this.append(e);}closest(){return panel;}querySelector(){return null;}querySelectorAll(){return [];}scrollIntoView(){}setAttribute(){}remove(){this.parentNode=null;elements.delete(this.id); }}
const root=new El(),panel=new El();root.append(panel);
function el(id){if(!elements.has(id)){let e=new El();panel.append(e);elements.set(id,e);}return elements.get(id);}
const doc={body:root,getElementById:el,createElement:t=>new El(t),querySelectorAll:()=>[],querySelector:()=>null};
const context={document:doc,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},console,Math,Date,JSON,Set,confirm:()=>true,alert(){}};context.window=context;

let clock=0,nextTimer=1,timers=new Map();context.setTimeout=(fn,delay)=>{let id=nextTimer++;timers.set(id,{fn,at:clock+delay});return id;};context.clearTimeout=id=>timers.delete(id);context.Date=class extends Date{static now(){return clock;}};
function advanceTick(){let list=[...timers.entries()].sort((a,b)=>a[1].at-b[1].at);if(!list.length)return false;let [id,t]=list[0];timers.delete(id);clock=t.at;t.fn();return true;}
function finishSegment(){let steps=0;while(run('broadcastRunning()')&&steps++<1000){assert(advanceTick());}assert(steps<1000);}

vm.createContext(context);
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
function run(code){return vm.runInContext(code,context);}


function freshCamp(){run('reset();enterSelection085();selectCandidate(0);showPathChoice();completePrologue073();S.tutorial074.done=true;S.phase="decision";S.money=100000;storyState().active=null;makeOffers()');}
freshCamp();let before=run('JSON.stringify({money:S.money,stats:S.p,week:S.week})');run('prepareCareerBout017(0,false)');assert.equal(run('S.preFightCamp017.stage'),'select');assert.equal(run('JSON.stringify({money:S.money,stats:S.p,week:S.week})'),before);
assert(run('preFightCampHtml017()').includes('기본 트레이닝'));assert(run('preFightCampHtml017()').includes('테크니컬 캠프'));
run('cancelPreFightCamp017()');assert.equal(run('JSON.stringify({money:S.money,stats:S.p,week:S.week})'),before);
let quotedCost=run('effectiveCampCost("technical")');run('prepareCareerBout017(0,false);choosePreFightCamp017("technical");startPreFightCamp017()');assert.equal(run('S.preFightCamp017.stage'),'training');assert(run('preFightCampHtml017()').includes('줄넘기'));let count=0;while(run('S.preFightCamp017.stage')==='training'){assert(advanceTick());assert(++count<100);}
assert.equal(run('S.preFightCamp017.stage'),'ready');assert.equal(run('investmentState().campDoneAt'),run('shortCount()'));assert.equal(run('S.money'),100000-quotedCost);
let ready=run('JSON.stringify({money:S.money,p:S.p,week:S.week})');run('finishPreFightCamp017();finishPreFightCamp017();saveGame();loadGame()');assert.equal(run('JSON.stringify({money:S.money,p:S.p,week:S.week})'),ready);
run('enterPreparedBout017()');assert.equal(run('S.phase'),'fighting');assert.equal(run('S.preFightCamp017'),undefined);
// A used paid camp is retained; free choice never charges or grants another camp.
freshCamp();run('attendPaidCamp("power")');let money=run('S.money');run('prepareCareerBout017(0,true);choosePreFightCamp017("technical")');assert.equal(run('S.preFightCamp017.selected'),'basic');run('startPreFightCamp017();finishPreFightCamp017()');assert.equal(run('S.money'),money);assert.equal(run('investmentState().lastAttendance.id'),'power');run('enterPreparedBout017()');assert.equal(run('S.phase'),'post');
// No funds still allows the complete free preparation flow; render does not grant growth.
freshCamp();run('S.money=0;prepareCareerBout017(0,false);choosePreFightCamp017("world")');assert.equal(run('S.preFightCamp017.selected'),'basic');run('startPreFightCamp017();finishPreFightCamp017()');assert.equal(run('S.money'),0);assert.equal(run('S.phase'),'match');
ready=run('JSON.stringify(S.p)');run('cancelPreFightCamp017();prepareCareerBout017(0,false);startPreFightCamp017();finishPreFightCamp017()');assert.equal(run('JSON.stringify(S.p)'),ready);
// Changing opponents before settlement never charges a stale camp.
freshCamp();run('prepareCareerBout017(0,false);choosePreFightCamp017("world");startPreFightCamp017();S.offers=[];finishPreFightCamp017()');assert.equal(run('S.money'),100000);assert.equal(run('S.preFightCamp017'),undefined);
assert.equal((html.match(/<script>/g)||[]).length,1);assert.equal((html.match(/<\/script>/g)||[]).length,1);
console.log('PASS: camp choice, four animated drills, exact-once free/paid training, skip, save resume, used camp, no funds, stale offer and actual bout entry.');
