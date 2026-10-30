
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


run('enterSelection085();selectCandidate(0);showPathChoice();completePrologue073()');
assert(!run('tutorialHtml074()').includes('selectTutorialPolicy074('));
assert(run('tutorialHtml074()').includes('기본기 훈련 시작'));
for(let i=0;i<20&&timers.size;i++)advanceTick();assert.equal(run('lesson075().stage'),'policy');assert.equal(run('S.history.length'),0);
run('saveGame();loadGame()');for(let i=0;i<20&&timers.size;i++)advanceTick();assert.equal(run('lesson075().stage'),'policy');
run('beginIntroTraining021();fastMontage075()');
run('selectTutorialPolicy074("power");setGrowthPolicy("technical")');assert.equal(run('S.growthPolicy'),'balanced');
assert.equal(run('JSON.stringify(currentGrowthWeights())'),JSON.stringify({skill:.25,punch:.25,defense:.25,stamina:.25}));
let steps=0;while(run('lesson075().stage')!=='result'&&steps++<3000)assert(advanceTick());assert(steps<3000);
assert.equal(run('S.history.length'),5);assert.equal(run('lesson075().completed75'),4);assert.equal(run('S.growthPolicy'),'balanced');
assert(run('S.classCareer014.camps.every(c=>c.policy==="balanced")'));
let before=run('S.money');run('graduateTutorial074()');assert.equal(run('S.money'),before+1500);assert(run('S.trainingBranch018.pending'));
assert.equal(run('licenceState().grade'),1);assert(run('trainingBranchHtml018()').includes('테크니컬형'));assert(run('trainingBranchHtml018()').includes('파워형'));assert(!run('trainingBranchHtml018()').includes('chooseTrainingBranch018(\'balanced'));
let snapshot=run('JSON.stringify(S.p)');run('prepareCareerBout017(0);playCareerBout(0);chooseTrainingBranch018("balanced")');assert(run('S.trainingBranch018.pending'));assert.notEqual(run('S.phase'),'fighting');
run('chooseTrainingBranch018("technical")');assert.equal(run('S.growthPolicy'),'technical');assert.equal(run('JSON.stringify(S.p)'),snapshot);assert(!run('S.trainingBranch018.pending'));
let funds=run('S.money');run('graduateTutorial074();saveGame();loadGame()');assert.equal(run('S.money'),funds);assert.equal(run('S.growthPolicy'),'technical');
run('setGrowthPolicy("balanced")');assert.equal(run('S.growthPolicy'),'technical');run('setGrowthPolicy("power")');assert.equal(run('S.growthPolicy'),'power');
let budgets=[];for(let key of ['technical','power']){run('S.growthPolicy="'+key+'";S.growthCarry=0;for(let k of GOAT_KEYS092)S.p[k]=50;S.p.potential=99;S.investments.equipment={}');budgets.push(run('Object.values(allocateStyleGrowth(8)).reduce((a,b)=>a+b,0)'));}
assert.equal(budgets[0],budgets[1]);assert(run('currentGrowthWeights().punch>currentGrowthWeights().skill'));
console.log('PASS: automatic balanced C-grade training/four bouts/final, B-grade two-way branch, same growth budget, once-only grant and save persistence.');
