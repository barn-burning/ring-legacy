
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





run('reset();enterSelection085();selectCandidate(0);showPathChoice();completePrologue073();S.tutorial074.done=true;S.phase="decision";S.money=100000;S.proLicence.grade=2;storyState().active=null;ensureWorld022()');
const initialSeed=run('seed');
const before=run('JSON.stringify(S.roster.map(f=>[f.id,f.wins,f.losses,f.skill,f.punch]))');
run('boxingWorldHtml022(); boxingWorldHtml022()');
assert.equal(run('JSON.stringify(S.roster.map(f=>[f.id,f.wins,f.losses,f.skill,f.punch]))'),before);
assert.equal(run('seed'),initialSeed);
run('advanceWeeks(8)');
const worldPage=run('boxingWorldHtml022()');
for(const name of JSON.parse(run('JSON.stringify(p4pList().slice(0,15).map(f=>f.name))')))assert(worldPage.includes(name));
const stats=run('JSON.stringify(S.roster.map(f=>[f.skill,f.punch]))');
run('var testA022=S.roster[0],testB022=S.roster.find(f=>f.w===testA022.w&&f.id!==testA022.id); var testBout022=createBout(testA022,testB022,8);stepBout(testBout022)');
assert.equal(run('JSON.stringify(S.roster.map(f=>[f.skill,f.punch]))'),stats);
run('delete S.roster[0].persona022;ensureWorld022()');
assert(run('S.roster[0].persona022.tempo'));
assert(run('S.world022.events.length')>0);
assert(run('S.world022.articles.every(a=>a.kind!=="bout"||S.world022.events.some(e=>e.id===a.eventId))'));
for(const id of ['gloves','shoes','bag','rope','speedbag','heavybag','doublebag','mitts','resistance','smart'])for(let tier=1;tier<=3;tier++){let tile=run('gearTile("'+id+'",'+tier+',"test")');assert(tile.includes('assets/equipment/'+id+'-023.png'));assert(fs.statSync('assets/equipment/'+id+'-023.png').size>1000);assert(tile.includes('Lv.'+tier));}
assert(run('S.world022.events.every(e=>e.aId!==e.bId)'));
const gear=run('Object.keys(gearNames022).map(id=>"<article><h2>"+equipmentCatalog[id].name+"</h2><div class=gear-preview-row>"+[1,2,3].map(t=>"<div>"+gearTile(id,t,equipmentCatalog[id].name)+"<p>"+gearNames022[id][t-1]+"</p></div>").join("")+"</div></article>").join("")');
if(process.env.RING_PREVIEW)fs.writeFileSync('.gear-preview.html',html.replace(/<script>[\s\S]*?<\/script>/,'').replace(/<main>[\s\S]*?<\/main>/,'<main><h1>장비 진화 · Lv.1 → Lv.2 → Lv.3</h1>'+gear+'</main>'));
if(process.env.RING_PREVIEW)fs.writeFileSync('.world-preview.html',html.replace('</script>',()=> 'S='+run('JSON.stringify(S)')+';S.gameScreen="world";render();</script>'));
console.log('PASS: 30 raster equipment tiers; world rendering preserves records; eight weeks produce linked real bout news.');
