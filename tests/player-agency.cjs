
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




function freshAgency(){run('reset();enterSelection085();selectCandidate(0);showPathChoice();completePrologue073();S.tutorial074.done=true;S.phase="decision";S.money=100000;S.proLicence.grade=1;storyState().active=null;makeOffers();var agencyOpponent020=S.offers[0].opponent||byId(S.offers[0].id);agencyOpponent020.style="아웃복서";agencyOpponent020.stance014=stanceOf014(S.p)');}
freshAgency();run('prepareCareerBout017(0,false)');assert.equal(run('S.preFightCamp017.selected'),'basic');assert.equal(run('S.preFightCamp017.focus019'),'pace');let view=run('preFightCampHtml017()');assert(view.includes('의 특징'));assert(!view.includes('코치의 추천 준비'));assert(!view.includes('압박으로 공간을'));
run('cancelPreFightCamp017();agencyOpponent020.style="카운터펀처";prepareCareerBout017(0,false)');assert.equal(run('S.preFightCamp017.focus019'),'pace');assert.equal(run('S.preFightCamp017.selected'),'basic');
let state=run('JSON.stringify({p:S.p,seed,training:S.training019,d:S.preFightCamp017})');run('preFightCampHtml017();watchPoint078(agencyOpponent020);matchupHtml(agencyOpponent020,S.offers[0])');assert.equal(run('JSON.stringify({p:S.p,seed,training:S.training019,d:S.preFightCamp017})'),state);
run('chooseTrainingTheme019("entry");startPreFightCamp017()');view=run('preFightCampHtml017()');assert(view.includes('art-rope076'));assert(!view.includes('<svg'));run('finishPreFightCamp017();S.fightStrategy="거리 유지";enterPreparedBout017()');assert.equal(run('S.phase'),'fighting');assert.equal(run('F.decision'),'거리 유지');assert.equal(run('broadcastRunning()'),false);run('beginBroadcastPhase()');assert.equal(run('broadcastRunning()'),false);
view=run('coachingHtml()');assert.equal((view.match(/onclick="choosePlayerOrder020/g)||[]).length,3);assert(!view.includes('추천'));assert(view.includes('공격량이 줄'));run('choosePlayerOrder020("카운터");startPlayerOrders020()');assert.equal(run('F.decision'),'카운터');assert(run('broadcastRunning()'));
run('stopBroadcast();F.round=3;F.max=6;F.offer.max=6;F.energy=[20,60];F.downs=[0,0];F.tacticalRecord092=[{round:1,opponent:"압박"},{round:2,opponent:"거리 유지"},{round:3,opponent:"카운터"}]');
view=run('coachingHtml()');assert(view.includes('우리 20%'));assert(!view.includes('거리 유지로'));assert(!view.includes('추천'));assert(view.includes('공격 뒤에 짧게 응수'));run('choosePlayerOrder020("압박");saveGame();loadGame()');assert.equal(run('F.decision'),'압박');run('startPlayerOrders020()');assert.equal(run('F.decision'),'압박');assert(run('broadcastRunning()'));
run('stopBroadcast();while(!F.result)stepBout(F,F.decision);finishFight()');assert(run('S.history[0].playerReview020.length>0'));assert(run('rewardsHtml()').includes('내 지시가 남긴 경기 내용'));let rows=run('S.history[0].playerReview020.length');run('finishFight()');assert.equal(run('S.history[0].playerReview020.length'),rows);
assert(!run('observedRoundText020("3R · A 유효타 우세 · 압박 / 상대 카운터")').includes('상대 카운터'));
assert(!run('broadcastEventHtml({kind:"round",round:3,title:"3R / 상대 압박",detail:""})').includes('상대 압박'));
const imageBytes=fs.readFileSync('assets/jump-rope-v020.png');assert.equal(imageBytes.toString('ascii',1,4),'PNG');assert.equal(imageBytes.readUInt32BE(16)/imageBytes.readUInt32BE(20),1.5);assert(imageBytes.length>100000);
console.log('PASS: observational scouting, opponent-independent camp defaults, no auto-selected tactics, three neutral orders, manual opening and corner resume, saved player choices, factual post-bout review and raster rope sprite.');
