
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
assert.equal(run('LEGENDS015.length'),12);
assert.equal(run('new Set(LEGENDS015.map(l=>l.id)).size'),12);
for(const legend of JSON.parse(run('JSON.stringify(LEGENDS015)'))){assert(/^[가-힣 ]+$/.test(legend.name));assert(legend.source.startsWith('https://www.ringmagazine.com/fighters/'));assert(legend.ko<=legend.wins);assert(/^\d{4}–\d{4}$/.test(legend.career));}
assert.deepEqual(JSON.parse(run('JSON.stringify(LEGENDS015.find(l=>l.id==="tyson"))')).losses,7);
assert.deepEqual(JSON.parse(run('JSON.stringify(LEGENDS015.find(l=>l.id==="robinson"))')).draws,5);
assert.equal(run('rateText015(recordStats015(LEGENDS015.find(l=>l.id==="ali")).koRate)'),'60.7%');
assert.equal(run('rateText015(recordStats015(LEGENDS015.find(l=>l.id==="mayweather")).winRate)'),'100.0%');
assert.equal(run('rateText015(recordStats015({wins:0,losses:0,draws:0,ko:0}).koRate)'),'—');
assert.equal(run('rateText015(recordStats015({wins:5,losses:1,draws:1}).koRate)'),'—');
run('enterSelection085();selectCandidate(0);showPathChoice();completePrologue073();S.p.wins=12;S.p.losses=2;S.p.draws=1;S.p.ko=8');
const before=run('JSON.stringify({S,seed,score:scoreGoat092().total})');
const comparisonHtml=run('legendInner015("test")');assert(comparisonHtml.includes('12승 2패 1무'));assert(comparisonHtml.includes('53.3%'));assert(comparisonHtml.includes('무하마드 알리'));assert(!comparisonHtml.includes('NaN'));
assert.equal(run('JSON.stringify({S,seed,score:scoreGoat092().total})'),before);
run('chooseLegend015("marciano")');assert(run('legendInner015("test")').includes('49승 0패 0무'));run('chooseLegend015("unknown")');assert.equal(run('legendUi015.fighter'),'marciano');
storage.set(run('HALL_KEY'),JSON.stringify([{id:'past-career',name:'<img src=x onerror=alert(1)>',wins:20,losses:3,draws:1,ko:15,week:500,history:[],country:'대한민국',titles:1,reason:'은퇴'}]));
run('chooseLegendCareer015("past-career")');const past=run('legendInner015("archive")');assert(past.includes('20승 3패 1무'));assert(past.includes('62.5%'));assert(past.includes('&lt;img'));assert(!past.includes('<img src=x'));assert(run('hallHtml()').includes('레전드와 비교'));
run('chooseLegendCareer015("current")');assert.equal(run('legendSubject015().wins'),12);
run('S=null;legendUi015.career="current"');assert.equal(run('legendSubject015().wins'),20);assert(run('legendWidget015("start")').includes('레전드와 비교'));
console.log('PASS: 12 attributed profiles, verified record edge cases, correct KO denominator, zero/missing values, no combat/GOAT/state mutation, current and archived comparisons, safe names and choices.');
