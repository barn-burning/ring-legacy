
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
run('const regressionStart074=startCareer;startCareer=function(...args){regressionStart074(...args);if(S)delete S.tutorial074;};');

assert.deepEqual(JSON.parse(run('JSON.stringify(broadcastPlan(4).map(x=>x.end))')),[4]);
assert.deepEqual(JSON.parse(run('JSON.stringify(broadcastPlan(6).map(x=>x.end))')),[3,6]);
assert.deepEqual(JSON.parse(run('JSON.stringify(broadcastPlan(8).map(x=>x.end))')),[4,8]);
assert.deepEqual(JSON.parse(run('JSON.stringify(broadcastPlan(10).map(x=>x.end))')),[3,7,10]);
assert.deepEqual(JSON.parse(run('JSON.stringify(broadcastPlan(12).map(x=>x.end))')),[4,8,12]);
function fresh(){run('reset();selectCandidate(0);showPathChoice();choosePath("pro");beginSelectedCareer();completePrologue073();S.shortRun.enabled=false;playCareerBout(0,false)');}
fresh();let pauses=0;while(run('S.phase')==='fighting'){pauses++;run('beginBroadcastPhase()');finishSegment();assert(pauses<5);}assert.equal(run('S.history.length'),1);
run('var realBroadcastStep=stepBout;stepBout=function(f,t){f.round++;f.cards.forEach(c=>{c[0]+=10;c[1]+=9;});f.logs.push(f.round+"R 유효타 우세");if(f.round===2)f.downs[1]++;if(f.round===f.max)f.result={winner:0,method:"UD",round:f.round,cards:f.cards.map(c=>[...c])};};');
for(let [max,count] of [[4,1],[6,2],[8,2],[10,3],[12,3]]){
fresh();run('F.max='+max+';F.offer.max='+max+';render()');let choices=0;while(run('S.phase')==='fighting'){
assert.equal(run('F.round===broadcastPhase().start'),true);choices++;run('setTactic("압박");beginBroadcastPhase();setTactic("카운터")');assert.equal(run('F.decision'),'압박');
advanceTick();assert(parseFloat(el('broadcastProgressFill').style.width)>0);finishSegment();assert(choices<5);
}assert.equal(choices,count);assert(run('S.lastBoutBroadcast.events.some(e=>e.kind==="downwon")'));assert.equal(run('S.history.length'),1);
}
// The default short-career auto-start must not skip any later corner break.
for(let max of [6,8,10,12]){
fresh();run('F.max='+max+';F.offer.max='+max+';F.offer.type="normal";F.offer.stake=[];S.shortRun.enabled=true;beginBroadcastPhase()');
finishSegment();let pausedRound=run('F.round');assert.equal(pausedRound,run('broadcastPlan(F.max)[0].end'));
run('render();setBroadcastSpeed(1);render()');
for(let i=0;i<20&&timers.size;i++)advanceTick();
assert.equal(run('F.round'),pausedRound);assert.equal(run('broadcastRunning()'),false);
run('saveGame();loadGame()');for(let i=0;i<20&&timers.size;i++)advanceTick();
assert.equal(run('F.round'),pausedRound);assert.equal(run('broadcastRunning()'),false);
run('setTactic("카운터")');assert.equal(run('F.decision'),'카운터');
run('beginBroadcastPhase()');assert.equal(run('broadcastRunning()'),true);finishSegment();assert(run('F.round')>pausedRound);
}
console.log('PASS: short-career 6/8/10/12R corner waits through redraw, speed change and saved resume until manual start.');
fresh();run('beginBroadcastPhase()');while(run('F.round')<1)assert(advanceTick());run('saveGame();loadGame()');assert.equal(run('broadcastRunning()'),false);assert.equal(run('F.round'),1);run('setTactic("카운터")');assert.equal(run('F.decision'),'거리 유지');run('beginBroadcastPhase()');finishSegment();assert.equal(run('S.history.length'),1);
run('stepBout=function(f,t){f.round++;f.downs[1]++;f.logs.push("상대 다운");f.result={winner:0,method:"KO",round:f.round,cards:[[10,8],[10,8],[10,8]]};};');
fresh();run('beginBroadcastPhase()');finishSegment();assert.equal(run('S.phase'),'post');assert.equal(run('knockoutPresentation.method'),'KO');assert(run('knockoutHtml().includes("승부를 끝냈다!")'));assert.equal(run('S.lastBoutBroadcast.round'),1);assert.equal(run('S.history.length'),1);
run('finishFight()');assert.equal(run('S.history.length'),1);while(timers.size)advanceTick();assert.equal(run('knockoutPresentation'),null);
fresh();run('setBroadcastSpeed(2);beginBroadcastPhase()');let start=clock;finishSegment();assert(clock-start<2200);
run('stepBout=realBroadcastStep;reset()');assert.equal(run('broadcastRunning()'),false);
console.log('PASS: real bout integration; 4/6/8/10/12R coaching counts; smooth progress; actual down events; saved mid-phase resume and tactic lock; KO effect and single result settlement; speed and timer cleanup.');








