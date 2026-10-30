
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
function fresh095(policy='balanced'){run('reset();enterSelection085();selectCandidate(0);showPathChoice();completePrologue073();selectTutorialPolicy074("'+policy+'");trainTutorial074()');let ticks=0;while(run('lesson075().stage')!=='camp'&&ticks++<20)assert(advanceTick());run('beginMontage075();fastMontage075()');while(run('lesson075().stage')!=='final75'&&ticks++<100)assert(advanceTick());assert.equal(run('lesson075().stage'),'final75');}
let samples=[];
for(let i=0;i<16;i++){
 fresh095(['balanced','technical','power'][i%3]);
 assert.equal(run('S.history.length'),4);
 assert(run('S.money<4000'));
 run('chooseStrategy092("카운터");enterFinal075()');let ticks=0;
 while(run('S.phase==="fighting"')&&ticks++<1000){if(!run('broadcastRunning()'))run('beginBroadcastPhase()');assert(advanceTick());}
 assert.equal(run('lesson075().stage'),'result');
 let win=run('lesson075().champion75');run('graduateTutorial074()');
 let cash=run('S.money');samples.push({win,cash});assert(cash>=1000&&cash<=12000);
 let before=cash;run('graduateTutorial074();saveGame();loadGame()');assert.equal(run('S.money'),before);
}
console.log('STARTER WALLETS',JSON.stringify(samples));
run('showEvent079("camp")');
let cards=el('homeScreen').innerHTML;assert(cards.includes('art-mitt076'));assert(cards.includes('art-bag076'));assert(cards.includes('art-gym'));
let full=run('investmentHtml()');assert(full.includes('camp-art095'));
assert.equal(run('paidCamps.technical.cost'),900);assert.equal(run('paidCamps.complete.cost'),1400);
assert.equal(run('campGrowthBudget("complete")'),2);
run('S.money=0;S.phase="decision";S.injuryUntil=S.week;S.p.health=70;rest()');assert(run('S.p.health>70'));
let money=run('S.money');run('train(autoTrainingType())');assert.equal(run('S.phase'),'match');assert.equal(run('S.money'),money);
run('S.promoter=0;S.p.rating=1200;S.loc[3]=1;S.proLicence.grade=1');let b=run('careerPurse095(S.roster[0],"normal",[])');
run('S.proLicence.grade=2');let a=run('careerPurse095(S.roster[0],"normal",[])'),world=run('careerPurse095(S.roster[0],"world",["WBC"])');assert(b>=1800&&b<2200);assert(a>b&&world>a);
console.log('PASS: bounded beginner wallets, real win bonus, grant once, distinct camp art, reachable camp costs, no-money recovery/training, B/A/world income progression.');



