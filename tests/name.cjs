
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

run('enterSelection085();selectCandidate(0)');
const original=run('draft.name'), stats=run('JSON.stringify(draft.spec)'), face=run('draft.portraitId');
assert(run('detailHtml(draft)').includes('id="playerName097"'));
run('setPlayerName097("   ")');assert.equal(run('draft.name'),original);
run('setPlayerName097("  Kim   Ring  ")');assert.equal(run('draft.name'),'Kim Ring');
assert.equal(run('JSON.stringify(draft.spec)'),stats);assert.equal(run('draft.portraitId'),face);
run('setPlayerName097("<Boxer>\\"Test");renderSelection()');assert(el('start').innerHTML.includes('&lt;Boxer&gt;'));
run('setPlayerName097("New Champion");showPathChoice();completePrologue073();saveGame();loadGame()');
assert.equal(run('S.p.name'),'New Champion');assert.equal(run('S.creationProfile.name'),'New Champion');
console.log('PASS: generated fallback, custom name, escaped input, unchanged attributes/portrait, career and saved identity.');

for(let c=0;c<12;c++)for(let i=0;i<40;i++)assert(/^[가-힣 ]+$/.test(run('nameFor('+c+')')));
assert.equal(run('localizeLegacy098("Hiro Tanaka vs Joao Silva")'),'다나카 히로 vs 주앙 시우바');
const migrated=JSON.parse(run('JSON.stringify(localizeLegacy098({id:"career-Jack Brooks",name:"Jack Brooks",history:[{opponent:"Luis Morales",story:"Luis Morales 승리"}]}))'));
assert.equal(migrated.id,'career-Jack Brooks');assert.equal(migrated.name,'잭 브룩스');assert.equal(migrated.history[0].opponent,'루이스 모랄레스');
run('S.roster[0].name="Alex Miller";S.noteName098="Luis Morales";saveGame();loadGame()');
assert.equal(run('S.roster[0].name'),'앨릭스 밀러');assert.equal(run('S.noteName098'),'루이스 모랄레스');assert.equal(run('S.p.name'),'New Champion');
assert.equal(run('localizeLegacy098("Jack Brooks", "Jack Brooks")'),'Jack Brooks');
console.log('PASS: all locales generate Hangul; language-specific spellings; legacy records migrate without changing IDs; custom player name survives.');

for(const weight of [2,6,8,10,12,16]){
 run('reset();enterSelection085();selectCandidate(0)');
 const before=run('JSON.stringify(draft.spec)');
 run('setPlayerName097("Custom Boxer");setStartingWeight0910('+weight+')');
 assert.equal(run('draft.w'),weight);assert.equal(run('draft.name'),'Custom Boxer');assert.equal(run('JSON.stringify(draft.spec)'),before);
 assert(run('detailHtml(draft)').includes('value="'+weight+'" selected'));
 run('setStartingWeight0910(3)');assert.equal(run('draft.w'),weight);
 run('showPathChoice();completePrologue073();saveGame();loadGame()');assert.equal(run('S.p.w'),weight);assert.equal(run('S.p.name'),'Custom Boxer');assert(run('S.roster.some(n=>n.w===S.p.w)'));
 run('setStartingWeight0910(2)');assert.equal(run('S.p.w'),weight);
}
run('reset();enterSelection085();selectCandidate(0);detailHtml(draft);setPlayerName097("Other Name");restoreGeneratedName0910()');
assert.equal(run('draft.name'),run('draft.generatedName097'));assert.equal(run('draft.customName097'),false);
console.log('PASS: all six starting divisions, consistent roster/save identity, invalid and mid-career changes blocked, attributes retained, default name restored.');
