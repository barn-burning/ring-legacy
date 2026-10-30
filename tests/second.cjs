
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


function fresh(){run('reset();selectCandidate(0);showPathChoice();choosePath("pro");beginSelectedCareer();completePrologue073();S.shortRun.enabled=false;playCareerBout(0,false)');}
fresh();run('F.max=8;F.offer.max=8;F.licenceGrade014=2;F.round=4;F.tacticalRecord092=[{round:1,opponent:"압박"},{round:2,opponent:"압박"},{round:3,opponent:"거리 유지"},{round:4,opponent:"압박"}];render()');
assert.equal(run('secondWindow016()'),true);
assert(run('coachingHtml()').includes('4R 종료 · 코너에서 본 장면'));
assert(!run('coachingHtml()').includes('카운터로 대응'));assert(run('coachingHtml()').includes('짧은 연타'));
run('setTactic("카운터")');
assert.equal(run('F.decision'),'카운터');
assert.equal(run('F.secondChange016'),true);
run('setTactic("압박")');assert.equal(run('F.decision'),'카운터');
run('F.round=3');assert.equal(run('secondWindow016()'),false);
run('F.round=4;F.licenceGrade014=1');assert.equal(run('secondWindow016()'),false);
console.log('PASS: A-grade 8R halftime second cue, counter hint, one change, B-grade excluded.');

run('F.max=6;F.offer.max=6;F.round=3;F.energy=[65,70];F.logs=["1R 첫 라운드", "2R 접전", "3R 압박"]');
run('F.tacticalRecord092=[{round:1,opponent:"압박"},{round:2,opponent:"압박"},{round:3,opponent:"카운터"}]');
assert.equal(run('cornerAdvice017(F).tactic'),'카운터');
assert(!run('coachingHtml()').includes('추천 작전'));assert(run('coachingHtml()').includes('다음 구간의 지시'));
assert(run('coachingHtml()').includes('공격 뒤에 짧게 응수'));
assert(run('boutRoundHistory017(F)').includes('1R 첫 라운드'));
assert(run('boutRoundHistory017(F)').includes('3R 압박'));
run('F.energy[0]=25');assert.equal(run('cornerAdvice017(F).tactic'),'거리 유지');
assert(run('cornerAdvice017(F).reason').includes('체력이 낮다'));
run('F.energy[0]=70;F.tacticalRecord092=[{round:1,opponent:"카운터"},{round:2,opponent:"카운터"},{round:3,opponent:"거리 유지"}]');assert.equal(run('cornerAdvice017(F).tactic'),'거리 유지');
run('F.tacticalRecord092=[{round:1,opponent:"거리 유지"},{round:2,opponent:"거리 유지"}]');assert.equal(run('cornerAdvice017(F).tactic'),'압박');
let prior=run('JSON.stringify(F)'),rng=run('seed');run('coachingHtml();boutRoundHistory017(F)');assert.equal(run('JSON.stringify(F)'),prior);assert.equal(run('seed'),rng);
console.log('PASS: 6R corner explains observed tactics, all round logs, low-energy override, no state or RNG mutation.');
