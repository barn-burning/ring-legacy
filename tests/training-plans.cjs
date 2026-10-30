
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



function freshPlan(){run('reset();enterSelection085();selectCandidate(0);showPathChoice();completePrologue073();S.tutorial074.done=true;S.phase="decision";S.money=100000;S.p.stamina=80;S.p.health=100;S.proLicence.grade=1;storyState().active=null;makeOffers();var plannedOpponent019=S.offers[0].opponent||byId(S.offers[0].id);plannedOpponent019.style="아웃복서";plannedOpponent019.stamina=60;plannedOpponent019.stance014=stanceOf014(S.p)');}
freshPlan();let before=run('JSON.stringify({p:S.p,money:S.money,seed,training:S.training019})');assert.equal(run('recommendTraining019(plannedOpponent019,S.offers[0]).focus'),'entry');run('recommendTraining019(plannedOpponent019,S.offers[0]);themeAccess019("body");sparringPlan019(plannedOpponent019,"entry")');assert.equal(run('JSON.stringify({p:S.p,money:S.money,seed,training:S.training019})'),before);
run('prepareCareerBout017(0,false)');assert.equal(run('S.preFightCamp017.focus019'),'pace');let ui=run('preFightCampHtml017()');assert(ui.includes('의 특징'));assert(!ui.includes('코치의 추천 준비'));assert(ui.includes('선택한 준비로 훈련 시작'));assert(ui.includes('<details class="optional-preparation019">'));assert(ui.includes('캠프 종류 바꾸기'));
run('chooseTrainingTheme019("body")');assert.equal(run('S.preFightCamp017.focus019'),'pace');
run('S.gym={level:1}');before=run('JSON.stringify(S.p)');run('buyEquipment("heavybag")');assert.equal(run('JSON.stringify(S.p)'),before);assert.equal(run('S.training019'),undefined);assert(run('themeAccess019("body")'));
run('chooseTrainingTheme019("body");startPreFightCamp017();finishPreFightCamp017()');assert.equal(run('S.training019.totalCamps'),1);assert.equal(run('S.matchPreparation019.focus'),'body');assert.equal(run('S.matchPreparation019.opponentId'),run('plannedOpponent019.id'));assert(run('S.training019.mastery.body>=2&&S.training019.mastery.body<=4'));
let skill=run('S.training019.mastery.body'),funds=run('S.money');run('finishPreFightCamp017();render();saveGame();loadGame()');assert.equal(run('S.training019.mastery.body'),skill);assert.equal(run('S.money'),funds);
run('enterPreparedBout017()');assert.equal(run('S.phase'),'fighting');assert.equal(run('F.trainingSnapshot019.focus'),'body');assert.equal(run('F.decision'),'거리 유지');run('stopBroadcast();F.round=3;F.max=6;F.offer.max=6;F.energy=[70,70];F.damage=[0,0];F.downs=[0,0];F.tacticalRecord092=[{round:1,opponent:"거리 유지"},{round:2,opponent:"거리 유지"},{round:3,opponent:"거리 유지"}]');
assert(run('matchCornerAdvice019().trained'));ui=run('coachingHtml()');assert(ui.includes('이 지시로 다음 구간 시작'));assert(ui.includes('<details class="optional-preparation019">'));assert(!ui.includes('추천 지시'));
run('F.energy[0]=20');assert.equal(run('matchCornerAdvice019().tactic'),'거리 유지');assert(!run('matchCornerAdvice019().trained'));run('followCoach019()');assert.equal(run('F.decision'),'거리 유지');assert(run('broadcastRunning()'));run('stopBroadcast();while(!F.result)stepBout(F,F.decision);finishFight()');assert(run('S.history[0].training019'));assert.equal(run('S.training019.bouts'),1);assert.equal(run('S.matchPreparation019'),null);run('finishFight()');assert.equal(run('S.training019.bouts'),1);
// Preparation is opponent-specific; old mid-bout saves and NPC bouts stay unchanged.
run('var other019=S.roster.find(n=>n.id!==plannedOpponent019.id&&n.w===S.p.w);S.matchPreparation019={focus:"entry",opponentId:plannedOpponent019.id,at:S.history.length,readiness:.8};var wrong019=createBout(S.p,other019,6);var npc019=createBout(other019,plannedOpponent019,6)');assert.equal(run('wrong019.trainingSnapshot019.focus'),null);assert.equal(run('npc019.trainingSnapshot019'),undefined);
// Bounded effects replace part of the fixed triangle; pure recommendation never rolls dice.
run('var sample019=createBout(S.p,plannedOpponent019,6);var baseline019=createBout(S.p,plannedOpponent019,6);delete baseline019.trainingSnapshot019;var trainedEdge019=strategyEdge092(sample019,"압박","거리 유지");var oldEdge019=strategyEdge092(baseline019,"압박","거리 유지")');assert(Math.abs(run('trainedEdge019-oldEdge019'))<=7);assert.equal(run('sample019.trainingRounds019.length'),1);
run('S.gym.level=0;S.coach=0;S.p.health=60');assert.equal(run('sparringPlan019(plannedOpponent019,"entry").kind'),'비접촉 기술 연습');run('S.p.health=100;S.gym.level=1;S.coach=1');assert.equal(run('sparringPlan019(plannedOpponent019,"entry").kind'),'조건부 스파링');
before=run('JSON.stringify({p:S.p,seed,training:S.training019})');run('skillSummary019();styleChoices014();equipmentDescription014("heavybag")');assert.equal(run('JSON.stringify({p:S.p,seed,training:S.training019})'),before);
console.log('PASS: coach-first optional choices, target rehearsal, pure recommendations, gear unlocks without stat gifts, automatic sparring, exact-once mastery, saved preparation, trained corner, bounded distance control and NPC/legacy isolation.');

// A second visit before the same fight can neither change the learned focus nor farm mastery.
freshPlan();run('prepareCareerBout017(0,false);choosePreFightCamp017("basic");startPreFightCamp017();finishPreFightCamp017()');let learned=run('JSON.stringify(S.training019.mastery)'),total=run('S.training019.totalCamps');run('cancelPreFightCamp017();prepareCareerBout017(0,false);chooseTrainingTheme019("pace");startPreFightCamp017();finishPreFightCamp017()');assert.equal(run('JSON.stringify(S.training019.mastery)'),learned);assert.equal(run('S.training019.totalCamps'),total);
assert(run('wallet080()').includes('코치의 다음 장비 추천'));assert(run('wallet080()').includes('전체 장비와 해금 조건 보기'));
console.log('PASS: repeat-camp farming blocked and equipment recommendations remain optional.');

run('S.proLicence.grade=2;S.classCareer014.active=null;S.classCareer014.totalCamps=2;S.classCareer014.totalBouts=3;S.classCareer014.camps=Array.from({length:2},()=>({weights:{skill:.5,defense:.4,punch:.05,stamina:.05},policy:"technical"}));S.classCareer014.bouts=Array.from({length:3},()=>({tactics:{"카운터":4,"거리 유지":1,"압박":1}}));S.phase="decision"');assert(run('classReadiness014("카운터펀처").ready'));let boxerBefore=run('JSON.stringify(S.p)');run('chooseClass014("카운터펀처")');assert.equal(run('S.classCareer014.active'),'카운터펀처');assert.equal(run('S.p.skill'),JSON.parse(boxerBefore).skill);assert.equal(run('S.p.punch'),JSON.parse(boxerBefore).punch);
console.log('PASS: counterpuncher specialization requires technical training and actual counter rounds; no instant attribute rewards.');
