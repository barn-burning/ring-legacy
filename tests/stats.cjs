
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
const original=run('JSON.stringify({p:S.p,fans:S.fans,money:S.money})');
const initial=run('statBars016(false)');
assert.equal((initial.match(/role="progressbar"/g)||[]).length,4);
assert(initial.includes(' / 100'));
assert.equal(run('JSON.stringify({p:S.p,fans:S.fans,money:S.money})'),original);
const before=run('Object.fromEntries(STAT_KEYS016.map(k=>[k,S.p[k]]))');
run('S.p.skill+=2;captureGrowth016('+JSON.stringify(before)+')');
const grown=run('statBars016(true)');
assert(grown.includes('aria-label="기술" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+(before.skill+2)+'"'));
assert(grown.includes('--from016:'+before.skill+'%;--to016:'+(before.skill+2)+'%'));
assert(grown.includes('<em>+2</em>'));
assert.equal((grown.match(/gained016/g)||[]).length,1);
console.log('PASS: four current /100 bars, accessible values, exact animated camp delta, no rendering mutation.');

run("S.media={articles:[{week:2,headline:'새로운 도전',body:'오늘의 경기',quote:'다음 링을 기다린다'}],mood:50,lastLevel:0,seen:{}};S.eventView079='coach';S.gameScreen='home'");
run("showEvent079('news')");
assert.equal(run('S.newsPopup016'),true);
assert.equal(run('S.eventView079'),'coach');
assert.equal(run('S.gameScreen'),'home');
assert(run('newsPopupHtml016()').includes('새로운 도전'));
run('closeNews016()');
assert.equal(run('S.newsPopup016'),false);
assert.equal(run('S.eventView079'),'coach');
console.log('PASS: newspaper opens and closes over the current scene.');

run("S.history=[{week:3,opponent:'다른 상대',result:'W'}]");
assert(run('newsPopupHtml016()').includes('지난 신문 · '));
run("S.history[0].week=2;S.history[0].opponent=undefined;S.media.articles[0].opponent=undefined;S.media.articles[0].result='W'");
assert(run('newsPopupHtml016()').includes('경기 후 언론 반응 · '));
