
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
run('enterSelection085();selectCandidate(0);showPathChoice();completePrologue073();S.tutorial074.done=true');
assert.equal(run('scoreGoat092().total'),0);
assert.equal(run('JSON.stringify(S.goat092.initial)'),run('JSON.stringify(Object.fromEntries(GOAT_KEYS092.map(k=>[k,S.p[k]])))'));
run('S.money=987654321;S.honor080=100');assert.equal(run('scoreGoat092().total'),0);
run('S.p.potential=99;S.p.skill+=5;render()');assert(run('scoreGoat092().development')>0);
let developed=run('scoreGoat092().development');run('S.p.skill-=5;render()');assert.equal(run('scoreGoat092().development'),developed);
run('setGameScreen("match");playCareerBout(0,false)');
assert(run('!!F.offer.goatSnapshot092'));
run('beginBroadcastPhase()');finishSegment();
while(run('S.phase==="fighting"')){run('beginBroadcastPhase()');finishSegment();}
assert(run('!!S.history[0].goat092'));
assert.equal(run('S.history[0].goat092.weight'),run('S.p.w'));
run('var actualHistory092=S.history;var scoreBefore092=scoreGoat092();saveGame();loadGame()');
assert.equal(run('JSON.stringify(scoreGoat092())'),run('JSON.stringify(scoreBefore092)'));
// The same victory cannot be farmed for full points on each rematch.
run('var example092={result:"W",opponent:"fixture",opponentId:"fixture",amateur:false,stake:[],goat092:{side:"even",opponentRank:99,fitRounds:1,counterRounds:0}};S.history=[example092]');
let single=run('scoreGoat092().combat');run('S.history=[example092,example092]');assert(run('scoreGoat092().combat')<single*2);
let normal=run('scoreGoat092().combat');run('S.history=[{...example092,opponent:"boss",opponentId:"boss",goat092:{...example092.goat092,side:"underdog",opponentChampion:true,opponentRank:1}}]');
assert(run('scoreGoat092().combat')>single);
// Strong multi-division career reaches the ceiling without an honor/cash component.
run('S.history=Array.from({length:60},(_,i)=>({...example092,opponent:"elite"+i,opponentId:"elite"+i,stake:["WBA","WBC","IBF","WBO"],goat092:{side:"underdog",opponentRank:1,opponentChampion:true,weight:i%3,p4pAfter:1,heldBefore:["WBA"],heldAfter:["WBA","WBC","IBF","WBO"],fitRounds:8,counterRounds:5}}));for(let k of GOAT_KEYS092)S.goat092.peak[k]=S.goat092.initial[k]+25;S.titlesWon=4');
assert.equal(run('scoreGoat092().total'),10000);
assert(run('goatEnding092(scoreGoat092())').startsWith('GOAT'));
let maxScore=run('scoreGoat092().total');run('S.money=0;S.honor080=0');assert.equal(run('scoreGoat092().total'),maxScore);
// Restore legitimate history for the retirement/archive flow.
run('S.history=actualHistory092;S.phase="decision";safetyState().state="active";retire()');
assert.equal(run('S.phase'),'retired');
assert(el('endReport').innerHTML.includes('GOAT 점수 / 10,000'));
assert.equal(run('hallRecords()[0].goatScore'),run('scoreGoat092().total'));
let final=run('JSON.stringify(scoreGoat092())');run('render();saveGame();loadGame()');assert.equal(run('JSON.stringify(scoreGoat092())'),final);
console.log('PASS: true initial baseline, four capped categories, prestige/repeat modifiers, peak growth retained, no cash/honor score, saved ledger, GOAT tier gate, ending and local hall archive.');

