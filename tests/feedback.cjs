
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

function feedback(extra){return JSON.parse(run('JSON.stringify(boutFeedback016('+JSON.stringify({result:{winner:1,method:'UD'},energy:[70,70],a:{skill:60,punch:60,defense:60,stamina:60},b:{skill:60,punch:60,defense:60,stamina:60},...extra})+'))'));}
assert.equal(feedback({result:{winner:0,method:'UD'}}),null);
assert.equal(feedback({result:{winner:1,method:'KO'}}).label,'수비');
assert.equal(feedback({energy:[35,65]}).label,'체력');
assert.equal(feedback({tacticalRecord092:[{round:1,opponent:'압박',countered:false},{round:2,opponent:'압박',countered:false},{round:3,opponent:'거리 유지',countered:false}]}).label,'작전');
assert.equal(feedback({b:{skill:69,punch:60,defense:60,stamina:60}}).label,'기술');
assert.equal(feedback({result:{winner:null,method:'DRAW'}}).label,'기술');
console.log('PASS: win omitted, stoppage, stamina, tactical, stat-gap and draw coaching.');
