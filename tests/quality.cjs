
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
function quality(h){return JSON.parse(run('JSON.stringify(victoryQuality099('+JSON.stringify(h)+'))'));}
const ko={result:'W',method:'KO',round:2,cards:[[20,18],[20,18],[20,18]]};
assert.equal(quality(ko).rate,.15);assert.equal(quality({...ko,method:'TKO'}).rate,.15);
assert.equal(quality({...ko,result:'L'}).rate,0);assert.equal(quality({...ko,result:'D'}).rate,0);
assert.equal(quality({result:'W',method:'UD',round:8,cards:[[78,74],[78,74],[78,74]]}).rate,.15);
assert.equal(quality({result:'W',method:'UD',round:8,cards:[[77,75],[77,75],[77,75]]}).rate,0);
assert.equal(quality({result:'W',method:'SD',round:8,cards:[[80,72],[72,80],[80,72]]}).rate,0);
assert.equal(quality({result:'W',method:'UD',round:8,cards:[[80,72],[80,72]]}).rate,0);
assert.equal(quality({result:'W',method:'UD',round:8,cards:[[80,null],[80,72],[80,72]]}).rate,0);
for(let round of [4,6,8,10,12])assert.equal(quality({result:'W',method:'UD',round,cards:Array.from({length:3},()=>[round*10,round*9])}).rate,.15);
run('enterSelection085();selectCandidate(0);showPathChoice();completePrologue073();S.tutorial074.done=true');
function points(hs){run('S.history='+JSON.stringify(hs));return run('scoreGoat092().combat');}
const fixture={...ko,opponentId:'quality-test',goat092:{side:'even',opponentRank:99}};
assert.equal(points([{...fixture,method:'SD'}]),100);
assert.equal(points([fixture]),115);
assert.equal(points([{...fixture,method:'UD',round:8,cards:[[78,74],[78,74],[78,74]]}]),115);
assert.equal(points([fixture,fixture]),173); // Same repeat discount applies to bonus.
assert.equal(points([{...fixture,result:'L'}]),0);
assert(points(Array.from({length:100},(_,i)=>({...fixture,opponentId:'unique'+i,goat092:{side:'underdog',opponentChampion:true}})))<=3500);
run('S.history=['+JSON.stringify(fixture)+'];S.lastFightRewards=null');
assert(run('rewardsHtml()').includes('GOAT 경기 점수 +15%'));
const matrix=run(`(()=>{
  const base={name:'test',country:'대한민국',w:0,skill:70,punch:70,defense:70,stamina:70,chin:70,health:100,talent:'평범한 노력파',style:'복서펀처'};
  const profiles={technical:{skill:80,defense:80,punch:60,stamina:60,style:'아웃복서',tactic:'거리 유지'},power:{skill:60,defense:60,punch:80,stamina:80,style:'슬러거',tactic:'압박'}};
  let out={};
  for(const [key,profile] of Object.entries(profiles)){
    let row={bouts:0,wins:0,stoppages:0,decisions:0,bonus:0};
    for(let rounds of [4,8,12])for(let style of styles)for(let i=0;i<300;i++){
      seed=12345+i+rounds*1000+styles.indexOf(style)*100000;
      let f=createBout({...base,...profile,id:'player'},{...base,id:'opponent',style},rounds);
      while(!f.result)stepBout(f,profile.tactic);
      row.bouts++;
      if(f.result.winner===0){row.wins++;let h={result:'W',...f.result};row.bonus+=victoryQuality099(h).rate;if(['KO','TKO'].includes(h.method))row.stoppages++;else row.decisions++;}
    }
    row.meanWinBonus=row.bonus/row.wins;out[key]=row;
  }
  return out;
})()`);
console.log('QUALITY BALANCE',JSON.stringify(matrix));
assert(Math.abs(matrix.technical.meanWinBonus-matrix.power.meanWinBonus)<.05,'Average victory bonus gap must stay below five percentage points in the fixture matrix.');
console.log('PASS: symmetric maximum reward, no stacking, close/split/invalid exclusions, round normalization, repeat discount, score cap, receipt, and style bonus matrix.');
