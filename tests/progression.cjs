
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
function fresh014(stance='orthodox'){
 run('reset();enterSelection085();selectCandidate(0);setStartingStance014("'+stance+'");showPathChoice();completePrologue073()');
}
fresh014('southpaw');
assert.equal(run('S.p.stance014'),'southpaw');assert.equal(run('S.p.style'),'미정');
assert.equal(run('S.classCareer014.active'),null);assert.equal(run('identityLine014(S.p)'),'사우스포');
run('saveGame();loadGame()');assert.equal(run('S.p.stance014'),'southpaw');
run('reset();enterSelection085();selectCandidate(0)');
assert.equal(run('draft.style'),'미정');let detail=run('detailHtml(draft)');assert(detail.includes('startingStance014'));assert(detail.includes('<small>기본 자세</small>'));assert(!detail.includes('undefined'));
run('setStartingStance014("southpaw");setPlayerName097("Another Name");renderSelection()');assert.equal(run('draft.stance014'),'southpaw');
fresh014();
run(`var base014={name:'test',id:'test-a',style:'슬러거',country:'대한민국',skill:70,punch:70,defense:70,stamina:70,chin:70,health:100,talent:'평범한 노력파',w:0,stance014:'orthodox',stanceExperience014:{orthodox:0,southpaw:0}};
var other014={...base014,id:'test-b',name:'other',style:'아웃복서',stance014:'southpaw',stanceExperience014:{orthodox:4,southpaw:0}};`);
let low=run('createBout(base014,other014,6)');assert.equal(low.a.style,'미정');assert.equal(low.b.style,'미정');assert.equal(run('matchUp(createBout(base014,other014,6).a,createBout(base014,other014,6).b)'),-2);
assert.equal(run('matchUp(createBout(other014,base014,6).a,createBout(other014,base014,6).b)'),2);
assert.equal(run('matchUp({...base014,matchGrade014:1},{...other014,stance014:"orthodox",matchGrade014:1})'),0);
assert.equal(run('scouting(base014,other014,6).style'),-2);assert.equal(run('scouting(base014,other014,8).style'),0);
run('base014.stanceExperience014.southpaw=4');assert.equal(run('scouting(base014,other014,6).style'),0);
run('base014.stanceExperience014.southpaw=0');
const matrix014=run(`(()=>{
 let rows={};
 for(let rounds of [4,6,8]){
  let sample={unfamiliar:0,familiar:0,sameResults:0};
  for(let i=0;i<1200;i++){
   seed=510000+i;let a=createBout(base014,other014,rounds);while(!a.result)stepBout(a,pick(['거리 유지','압박','카운터']));
   seed=510000+i;let b=createBout({...base014,stanceExperience014:{orthodox:0,southpaw:4}},other014,rounds);while(!b.result)stepBout(b,pick(['거리 유지','압박','카운터']));
   if(a.result.winner===0)sample.unfamiliar++;if(b.result.winner===0)sample.familiar++;
   if(JSON.stringify(a.result)===JSON.stringify(b.result))sample.sameResults++;
  }
  rows[rounds]=sample;
 }
 return rows;
})()`);
assert.equal(matrix014[8].sameResults,1200);assert(matrix014[6].familiar>matrix014[6].unfamiliar);assert(matrix014[6].familiar-matrix014[6].unfamiliar<240);
console.log('STANCE MATRIX',JSON.stringify(matrix014));
run('S.proLicence.grade=2');assert.equal(run('scouting(S.p,other014,6).style'),0);
function evidence014(name){
 const data={
  '아웃복서':{delta:{skill:3,defense:2,punch:0,stamina:0},tactics:{'거리 유지':5,'압박':0,'카운터':1},policy:'technical'},
  '인파이터':{delta:{skill:0,defense:2,punch:0,stamina:3},tactics:{'거리 유지':0,'압박':6,'카운터':0},policy:'power'},
  '슬러거':{delta:{skill:0,defense:0,punch:4,stamina:1},tactics:{'거리 유지':0,'압박':6,'카운터':0},policy:'power'},
  '복서펀처':{delta:{skill:2,defense:1,punch:2,stamina:1},tactics:{'거리 유지':3,'압박':3,'카운터':0},policy:'balanced'}
 }[name];
 run('var e014='+JSON.stringify(data)+';S.classCareer014.camps=Array.from({length:2},()=>({delta:{...e014.delta},policy:e014.policy}));S.classCareer014.bouts=Array.from({length:3},()=>({tactics:{...e014.tactics}}));S.classCareer014.totalCamps=2;S.classCareer014.totalBouts=3;');
}
for(const name of ['아웃복서','인파이터','슬러거','복서펀처']){
 fresh014();evidence014(name);run('S.proLicence.grade=1');assert(!run('classReadiness014("'+name+'").ready'));run('chooseClass014("'+name+'")');assert.equal(run('S.classCareer014.active'),null);
 run('S.proLicence.grade=2');assert(run('classReadiness014("'+name+'").ready'));
 const stats=run('JSON.stringify(GOAT_KEYS092.map(k=>S.p[k]))');run('chooseClass014("'+name+'")');assert.equal(run('S.classCareer014.active'),name);assert.equal(run('S.p.style'),name);assert.equal(run('JSON.stringify(GOAT_KEYS092.map(k=>S.p[k]))'),stats);
 run('applyStyleInfluence({"슬러거":100},"test");saveGame();loadGame()');assert.equal(run('S.classCareer014.active'),name);assert.equal(run('S.p.style'),name);
 assert.equal(run('createBout(S.p,S.roster[0],8).a.style'),name);assert(run('styleCareerHtml014()').includes(name));
}
evidence014('복서펀처');run('S.classCareer014.active="아웃복서";S.p.style="아웃복서";S.classCareer014.lastClassCamp=2;S.classCareer014.lastClassBout=3');
run('chooseClass014("복서펀처")');assert.equal(run('S.p.style'),'아웃복서');
run('S.classCareer014.totalCamps+=2;S.classCareer014.totalBouts+=2;chooseClass014("복서펀처")');assert.equal(run('S.p.style'),'복서펀처');assert(!run('canSwitchClass014()'));
run('S.classCareer014.totalCamps+=2;S.classCareer014.totalBouts+=2;S.phase="fighting";chooseClass014("아웃복서")');assert.equal(run('S.p.style'),'복서펀처');run('S.phase="decision"');
// Equal growth budgets and distinct, bounded specialization perks.
for(const name of ['아웃복서','인파이터','슬러거','복서펀처']){
 run('S.classCareer014.active="'+name+'";S.p.style="'+name+'";for(let k of GOAT_KEYS092)S.p[k]=60;S.p.potential=99;S.growthCarry=0;');
 assert.equal(run('Object.values(allocateStyleGrowth(8)).reduce((a,b)=>a+b,0)'),2);
}
run('S.classCareer014.active="인파이터";S.p.style="인파이터";var inside014=createBout(S.p,other014,8);seed=9123;stepBout(inside014,"압박");S.classCareer014.active="슬러거";S.p.style="슬러거";var slug014=createBout(S.p,other014,8);seed=9123;stepBout(slug014,"압박");');assert(run('inside014.energy[0]>slug014.energy[0]'));
// Real game flow records one camp and one completed fight, never another on rerender.
fresh014();run('S.tutorial074.done=true;S.phase="decision";playCareerBout(0,true)');
assert.equal(run('S.phase'),'post');assert.equal(run('S.classCareer014.totalCamps'),1);assert.equal(run('S.classCareer014.totalBouts'),1);assert(run('S.history[0].progression014'));
const count=run('JSON.stringify(S.p.stanceExperience014)');run('finishFight();render();saveGame();loadGame()');assert.equal(run('JSON.stringify(S.p.stanceExperience014)'),count);assert.equal(run('S.classCareer014.totalBouts'),1);
// Migrate actual old histories without changing identity, attributes or money.
const snapshot=run('JSON.stringify({money:S.money,stats:GOAT_KEYS092.map(k=>S.p[k]),name:S.p.name,portrait:S.p.portraitId})');
run('delete S.classCareer014;delete S.p.stanceExperience014;S.proLicence.grade=1;S.p.style="슬러거";progressionState014()');assert.equal(run('S.p.style'),'미정');assert.equal(run('S.classCareer014.active'),null);assert.equal(run('JSON.stringify({money:S.money,stats:GOAT_KEYS092.map(k=>S.p[k]),name:S.p.name,portrait:S.p.portraitId})'),snapshot);
run('delete S.classCareer014;S.proLicence.grade=2;S.p.style="카운터펀처";progressionState014();saveGame();loadGame()');assert.equal(run('S.classCareer014.active'),'카운터펀처');assert.equal(run('S.p.style'),'카운터펀처');assert(run('retirementArticle()').includes('카운터펀처'));
console.log('PASS: visible stance selection, no born class, bounded symmetric familiarity, A-grade exact neutrality, four earned specializations, retraining cooldown, no instant stat rewards, equal growth budgets, real progression once, legacy save migration.');

// Old mid-bout saves acquire frozen stance rules and resume exactly once.
fresh014('southpaw');run('S.tutorial074.done=true;S.proLicence.grade=1;S.phase="decision";makeOffers();playCareerBout(0,false)');assert.equal(run('S.phase'),'fighting');
run('delete F.licenceGrade014;for(let f of [F.a,F.b]){delete f.matchGrade014;delete f.stance014;delete f.stanceExperience014;}saveGame();loadGame()');
assert.equal(run('F.licenceGrade014'),1);assert.equal(run('F.a.matchGrade014'),1);assert.equal(run('F.a.stance014'),'southpaw');
run('while(!F.result)stepBout(F,F.decision);finishFight()');assert.equal(run('S.classCareer014.totalBouts'),1);
// Genuine B-to-A victory opens the specialization scene; no forced class.
fresh014();run('S.tutorial074.done=true;S.proLicence.grade=1;S.proLicence.points[6]=sharedGrades[1].target-.1;for(let k of GOAT_KEYS092)S.p[k]=95;S.p.chin=99;S.p.potential=99;S.phase="decision";var target014=S.roster.find(n=>n.w===S.p.w&&!n.retired&&!beltsOf(n).length);for(let k of GOAT_KEYS092)target014[k]=40;target014.chin=40;target014.health=100;target014.available=0;S.offers=[offerFor(target014,"normal",[])];playCareerBout(0,true)');
assert.equal(run('S.history[0].result'),'W');assert.equal(run('S.proLicence.grade'),2);assert.equal(run('S.eventView079'),'style014');assert(run('careerHome072()').includes('class-options014'));assert.equal(run('S.classCareer014.active'),null);
console.log('PASS: mid-bout migration/resume and genuine B-to-A specialization event.');
fresh014();run('S.tutorial074.done=true;S.proLicence.grade=1;S.money=100000;S.growthPolicy="balanced";for(let k of GOAT_KEYS092)S.p[k]=60;S.p.potential=99;investmentState()');
const weightBefore=run('currentGrowthWeights().punch'),campCount=run('S.classCareer014.totalCamps');
run('buyEquipment("gloves")');assert.equal(run('S.p.punch'),60);assert.equal(run('S.investments.equipment.gloves'),1);assert(run('currentGrowthWeights().punch')>weightBefore);assert.equal(run('S.classCareer014.totalCamps'),campCount);
assert(Math.abs(run('Object.values(currentGrowthWeights()).reduce((a,b)=>a+b,0)')-1)<1e-9);
assert(run('wallet080()').includes('정규 훈련 · 펀치 성장 비중'));assert(run('investmentHtml()').includes('슬러거 · 복서펀처 육성 보조'));
run('S.phase="decision";train(autoTrainingType())');assert.equal(run('S.classCareer014.totalCamps'),campCount+1);assert(run('S.classCareer014.camps.at(-1).weights.punch')>weightBefore);
for(const id of ['technical','power','complete','elite','world']){
 fresh014();run('S.money=1000000;S.p.potential=99;for(let k of GOAT_KEYS092)S.p[k]=60;investmentState()');
 const state=run('JSON.stringify({p:S.p,used:S.investments.campGrowthHistory,seed})'),preview=run('JSON.stringify(paidCampPreview014("'+id+'"))');
 assert.equal(run('JSON.stringify({p:S.p,used:S.investments.campGrowthHistory,seed})'),state);
 assert(run('campEffectLabel("'+id+'",paidCamps["'+id+'"])').includes('예상'));
 run('attendPaidCamp("'+id+'")');assert.equal(run('JSON.stringify(S.investments.lastAttendance.delta)'),preview);assert.equal(run('S.classCareer014.totalCamps'),1);
 let money=run('S.money');run('attendPaidCamp("'+id+'")');assert.equal(run('S.money'),money);assert.equal(run('S.classCareer014.totalCamps'),1);assert(run('campEffectLabel("'+id+'",paidCamps["'+id+'"])').includes('훈련 완료'));
}
fresh014();run('S.p.potential=80;S.p.skill=80;S.p.defense=60');assert.equal(run('paidCampPreview014("technical").defense'),1);assert.equal(run('paidCampPreview014("technical").skill'),undefined);
run('S.p.defense=80');assert.equal(run('Object.keys(paidCampPreview014("technical")).length'),0);
run('S.tutorial074.stage="policy"');const intro=run('tutorialHtml074()');assert(intro.includes('B급이 되면 테크니컬형과 파워형'));assert(!intro.includes('selectTutorialPolicy074('));
console.log('PASS: equipment unlocks and future training direction without instant stat gain, normalized weights, no class experience by shopping, camp previews exactly match paid outcomes, caps, no duplicate attendance, linked tutorial labels.');

// Career/gym gates apply to both shop views and the actual purchase operation.
fresh014();run('S.tutorial074.done=true;S.money=1000000;S.phase="decision";S.proLicence.grade=0;S.gym={level:0};S.investments={equipment:{},camp:null,log:[]};for(let k of GOAT_KEYS092)S.p[k]=50;S.p.potential=99');
assert.equal(run('Object.keys(equipmentCatalog).length'),10);
for(let id of ['gloves','shoes','bag','rope'])assert(run('equipmentAccess017("'+id+'").open'));
for(let id of ['speedbag','heavybag','doublebag','mitts','resistance','smart']){
 assert(!run('equipmentAccess017("'+id+'").open'));
 let before=run('JSON.stringify({p:S.p,money:S.money,equipment:S.investments.equipment})');run('buyEquipment("'+id+'")');
 assert.equal(run('JSON.stringify({p:S.p,money:S.money,equipment:S.investments.equipment})'),before);
 assert(run('gearTile("'+id+'",1,equipmentCatalog["'+id+'"].name)').includes('assets/equipment/'));
}
assert(!run('investmentHtml()').includes('undefined'));assert(!run('wallet080()').includes('undefined'));
assert(run('investmentHtml()').includes('해금 조건 · 체육관 Lv.4 + A급'));
run('expandGym()');assert.equal(run('S.gym.level'),1);
for(let id of ['speedbag','heavybag','doublebag'])assert(run('equipmentAccess017("'+id+'").open'));
run('S.gym.level=0;S.proLicence.grade=2');for(let id of ['doublebag','mitts'])assert(run('equipmentAccess017("'+id+'").open'));
assert(!run('equipmentAccess017("speedbag").open'));assert(!run('equipmentAccess017("resistance").open'));assert(!run('equipmentAccess017("smart").open'));
run('S.gym.level=2');assert(run('equipmentAccess017("resistance").open'));assert(!run('equipmentAccess017("smart").open'));
run('S.gym.level=3;S.proLicence.grade=1');assert(!run('equipmentAccess017("smart").open'));
run('S.proLicence.grade=2');assert(run('equipmentAccess017("smart").open'));
let weight=run('currentGrowthWeights().defense'),funds=run('S.money');run('buyEquipment("smart")');assert.equal(run('S.p.defense'),50);assert.equal(run('S.money'),funds-16000);assert(run('currentGrowthWeights().defense')>weight);
run('S.gym.level=0;S.proLicence.grade=0;buyEquipment("rope")');assert.equal(run('S.investments.equipment.rope'),1);assert(!run('equipmentAccess017("rope").open'));
run('S.proLicence.grade=2;buyEquipment("rope")');assert.equal(run('S.investments.equipment.rope'),2);assert(!run('equipmentAccess017("rope").open'));
run('S.gym.level=3;buyEquipment("rope")');assert.equal(run('S.investments.equipment.rope'),3);
funds=run('S.money');run('buyEquipment("rope")');assert.equal(run('S.money'),funds);
run('saveGame();loadGame()');assert.equal(run('S.investments.equipment.smart'),1);assert.equal(run('S.investments.equipment.rope'),3);
assert(Math.abs(run('Object.values(currentGrowthWeights()).reduce((a,b)=>a+b,0)')-1)<1e-9);
console.log('PASS: seven new equipment types, gym and licence OR/AND gates, blocked purchases, upgrade gates, distinct icons, persistent effects and saved ownership.');
