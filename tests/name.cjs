
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
