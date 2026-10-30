
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
function fresh(){run('reset();enterSelection085();selectCandidate(0);showPathChoice();completePrologue073()');}
fresh();
const first=run('S.openingQuote0911'),seedBefore=run('seed');
assert(run('OPENING_QUOTES0911.some(q=>q.id===S.openingQuote0911)'));
for(let i=0;i<5;i++)assert.equal(run('openingQuote0911().id'),first);
assert.equal(run('seed'),seedBefore);
run('saveGame();loadGame()');assert.equal(run('S.openingQuote0911'),first);
fresh();assert.notEqual(run('S.openingQuote0911'),first);
const realRandom=Math.random;
try{
 for(let i=0;i<5;i++){
  run('delete S.openingQuote0911;localStorage.setItem("ring-legacy-last-quote0911","");Math.random=()=>'+(i+.1)/5);
  const q=JSON.parse(run('JSON.stringify(openingQuote0911())'));
  assert.equal(q.id,run('OPENING_QUOTES0911['+i+'].id'));assert(q.source.startsWith('https://'));
 }
}finally{Math.random=realRandom;}
run('lesson075().stage="result";lesson075().resultPage079=1;lesson075().finalStarted75=true;lesson075().champion75=false;S.history=[{result:"L",method:"UD",cards:[[36,40],[36,40],[36,40]],round:4,week:S.week,w:S.p.w,opponent:"상대"}]');
const quoteHtml=run('tutorialHtml074()');assert(quoteHtml.includes('data-opening-quote0911'));assert(quoteHtml.includes(run('openingQuote0911().author')));
run('lesson075().done=true;S.phase="match";S.offers=S.roster.filter(n=>n.w===S.p.w).slice(0,4).map(n=>({id:n.id,name:"대전 제안",max:6,pay:1000,type:"normal"}));S.opponentChoice078=0');
let nav=run('offerNavigation0911()');assert(nav.includes('4명'));assert(nav.includes('다른 상대'));assert.equal((nav.match(/onclick="chooseOffer0911/g)||[]).length,4);
assert(run('boutFocus078()').includes('offer-picker0911'));assert(!run('boutFocus078()').includes('opponent-nav078'));
for(let i=0;i<4;i++){run('chooseOffer0911('+i+')');assert.equal(run('S.opponentChoice078'),i);assert(run('offerNavigation0911()').includes((i+1)+' / 4'));}
run('selectOpponent078(1)');assert.equal(run('S.opponentChoice078'),0);
run('selectOpponent078(-1)');assert.equal(run('S.opponentChoice078'),3);
run('chooseOffer0911(99)');assert.equal(run('S.opponentChoice078'),3);
run('S.phase="fighting";chooseOffer0911(0)');assert.equal(run('S.opponentChoice078'),3);
run('S.phase="match";S.offers=S.offers.slice(0,1);S.opponentChoice078=0');assert.equal((run('offerNavigation0911()').match(/disabled/g)||[]).length,2);
console.log('PASS: five sourced quotes, once per career, no consecutive repeat, save persistence, no simulation RNG consumption, rendered quote, all four proposals directly reachable, wraparound, one-offer and fight guards.');
