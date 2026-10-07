
(function(){
var DM=document.createElement('div'),$=function(i){return document.getElementById(i)||DM},fine=matchMedia('(hover:hover)').matches;


/* preloader / page arrival */
var pt=$('pt'),seen=0;try{seen=sessionStorage.getItem('trixSeen')}catch(x){}
function ready(){document.body.classList.add('ready')}
if($('pre')!==DM&&!seen){var t0=performance.now();(function c(now){var n=Math.min(100,(now-t0)/1300*100);pt.style.setProperty('--c',n);if(n<100)requestAnimationFrame(c);else{$('pre').classList.add('out');ready();try{sessionStorage.setItem('trixSeen',1)}catch(x){}setTimeout(function(){$('pre').style.display='none'},1300)}})(t0)}
else{if($('pre')!==DM)$('pre').style.display='none';ready()}
var tr=$('tr');
if(tr!==DM){requestAnimationFrame(function(){requestAnimationFrame(function(){tr.classList.remove('arr');tr.classList.add('lv');setTimeout(function(){tr.className='tr'},900)})})}
addEventListener('pageshow',function(e){if(e.persisted)tr.className='tr'});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
  var h=a.getAttribute('href')||'';if(!/^[\w-]+\.html$/.test(h)||tr===DM)return;e.preventDefault();document.body.classList.remove('menu');
  tr.classList.add('show');void tr.offsetWidth;tr.classList.add('go');setTimeout(function(){location.href=h},720)});
var cur=(location.pathname.split('/').pop()||'index.html');document.querySelectorAll('.links a,.mm a').forEach(function(a){if(a.getAttribute('href')===cur)a.classList.add('act')});
$('bg').addEventListener('click',function(){document.body.classList.toggle('menu')});

/* cursor + ripples + hero tilt */
var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,cr=$('cr'),cd=$('cd');
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;$('tilt').style.setProperty('--tx',(mx/innerWidth-.5)*2);$('tilt').style.setProperty('--ty',(my/innerHeight-.5)*2);
  if(!fine)return;var t=e.target.closest&&e.target.closest('.m,.next');cr.classList.toggle('v',!!(t&&t.classList.contains('m')));cr.textContent=t&&t.classList.contains('m')?'VIEW':'';cr.classList.toggle('h',!!e.target.closest('a,button,select,input,textarea')&&!(t&&t.classList.contains('m')))},{passive:true});
addEventListener('pointerdown',function(e){var r=document.createElement('i');r.className='rp';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);setTimeout(function(){r.remove()},700)});

/* scroll state: smoothed scroll value, progress bar, nav */
var sy=0,cy=0,last=0,nav=$('nav'),root=document.documentElement;
function loop(){
  rx+=(mx-rx)*.16;ry+=(my-ry)*.16;cr.style.transform='translate('+rx+'px,'+ry+'px)';cd.style.transform='translate('+mx+'px,'+my+'px)';
  sy=scrollY;cy+=(sy-cy)*.08;root.style.setProperty('--sy',cy.toFixed(1));
  var m=root.scrollHeight-innerHeight;$('bar').style.setProperty('--p',m>0?sy/m:0);
  nav.classList.toggle('s',sy>40);nav.classList.toggle('hide',sy>last&&sy>300);last=sy;
  requestAnimationFrame(loop)}
loop();

/* fireflies */
var cv=$('fx'),cx=cv.getContext('2d'),W,H,D=Math.min(devicePixelRatio||1,2),ps=[],cl=['61,255,107','184,255,61','39,211,182'];
function rs(){W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;cx.setTransform(D,0,0,D,0,0)}rs();addEventListener('resize',rs);
for(var i=0;i<(innerWidth<700?36:80);i++)ps.push({x:Math.random()*W,y:Math.random()*H,r:.6+Math.random()*2.2,v:.12+Math.random()*.5,p:Math.random()*6.28,c:cl[i%3]});
(function fx(t){cx.clearRect(0,0,W,H);ps.forEach(function(p){p.y-=p.v;p.x+=Math.sin(p.p+t*.0006)*.3;var dx=p.x-mx,dy=p.y-my,d=dx*dx+dy*dy;if(d<22000){var f=(1-d/22000)*1.6;p.x+=dx/Math.sqrt(d+1)*f;p.y+=dy/Math.sqrt(d+1)*f}
  if(p.y<-10){p.y=H+10;p.x=Math.random()*W}var a=.3+.7*Math.abs(Math.sin(p.p+t*.0014));
  cx.fillStyle='rgba('+p.c+','+a*.14+')';cx.beginPath();cx.arc(p.x,p.y,p.r*5,0,6.28);cx.fill();cx.fillStyle='rgba('+p.c+','+a+')';cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.28);cx.fill()});requestAnimationFrame(fx)})(0);

/* reveals + scramble */
var G='ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&';
function scr(el){var f=el.getAttribute('data-f')||el.textContent;el.setAttribute('data-f',f);var s=performance.now();(function u(now){var k=Math.min(1,(now-s)/900),o='';for(var i=0;i<f.length;i++)o+=(f[i]===' '||i<f.length*k)?f[i]:G[Math.floor(Math.random()*G.length)];el.textContent=o;if(k<1)requestAnimationFrame(u)})(s)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('sc'))scr(e.target);io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

/* videos: play in view, progress, lightbox */
var vs=[].slice.call(document.querySelectorAll('.m video'));
var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.3});
vs.forEach(function(v){vo.observe(v);var pg=v.parentNode.querySelector('.pg');v.addEventListener('timeupdate',function(){pg.style.setProperty('--v',v.currentTime/(v.duration||1))})});
var lb=$('lb'),lv=$('lbv');
document.querySelectorAll('.m').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var v=a.querySelector('video');lb.style.setProperty('--cx',e.clientX+'px');lb.style.setProperty('--cy',e.clientY+'px');lv.muted=false;lv.volume=1;lv.src=v.currentSrc||v.src;lv.currentTime=0;lv.play().catch(function(){});$('lbt').textContent=a.getAttribute('data-t').toUpperCase();lb.classList.add('on');document.body.style.overflow='hidden'})});
function close(){lb.classList.remove('on');lv.pause();lv.removeAttribute('src');document.body.style.overflow=''}
$('lbx').addEventListener('click',close);addEventListener('keydown',function(e){if(e.key==='Escape')close()});lb.addEventListener('click',function(e){if(e.target===lb)close()});

/* loadout */
var L=[['Anime edits','AMV','Smooth, hard-hitting anime edits with glitch cuts, shakes, glow and clean sync to the drop.',['Beat sync','Glitch','Speed ramps','Glow']],
['Gaming montages','COD / PUBG','Clutches, kills and funny moments turned into a montage people rewatch. Hitmarkers, zooms and drops included.',['Kill cuts','Zooms','Sound FX','Color']],
['YouTube','LONG FORM','Pacing and retention first. Clean cuts, captions, b-roll and sound that keeps viewers watching.',['Retention','Captions','B-roll','Audio']],
['Shorts and Reels','TIKTOK','Vertical edits made to stop the scroll in the first second.',['Hooks','Captions','Trends','9:16']],
['Commercials','BRANDS','Premium, polished visuals that make a brand look worth the price.',['Grade','Motion','Titles','Story']],
['Anything else','ANY VIDEO','If it is video, Trix can make it better. Tell him what you are building.',['Ideas','Custom','Fast','Polished']]];
var tb=$('tabs'),pn=$('pn'),eqEl=$('eq');
for(var q=0;q<18;q++){var b=document.createElement('i');b.style.animationDelay=(-Math.random()).toFixed(2)+'s';b.style.animationDuration=(.5+Math.random()*.8).toFixed(2)+'s';eqEl.appendChild(b)}
function pick(i){pn.classList.add('sw');[].forEach.call(tb.children,function(b,k){b.classList.toggle('on',k===i)});setTimeout(function(){pn.querySelector('h3').textContent=L[i][0];pn.querySelector('p').textContent=L[i][2];pn.querySelector('.ch').innerHTML=L[i][3].map(function(x){return '<span>'+x+'</span>'}).join('');pn.classList.remove('sw')},260)}
L.forEach(function(l,i){var b=document.createElement('button');b.innerHTML=l[0]+'<span>'+l[1]+'</span>';b.addEventListener('click',function(){pick(i)});b.addEventListener('mouseenter',function(){if(fine&&!b.classList.contains('on'))pick(i)});tb.appendChild(b)});if(tb!==DM)pick(0);
new IntersectionObserver(function(es,o){if(es[0].isIntersecting){$('steps').classList.add('in');o.disconnect()}},{threshold:.4}).observe($('steps'));

/* beat lab */
var AC,NB,run=0,T0,nx,st=0,spb=.5,idx=0,sc=0,cb=0,bs=0,stage=$('stage'),sl=$('sl'),pics=['assets/p1.jpg','assets/p2.jpg','assets/p3.jpg','assets/pic.jpg'].map(function(u){return 'url('+u+')'}),tm;
sl.style.backgroundImage=pics[0];
function ns(t,d,f,ty,v){var s=AC.createBufferSource();s.buffer=NB;var fl=AC.createBiquadFilter();fl.type=ty;fl.frequency.value=f;var g=AC.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(fl);fl.connect(g);g.connect(AC.destination);s.start(t);s.stop(t+d)}
function kick(t){var o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(1,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.32)}
function re(el,c){el.classList.remove(c);void el.offsetWidth;el.classList.add(c)}
function vis(i){if(!run)return;if(i%2)return;re(stage,'p');var b=i/2;if(b%2===0){idx=(idx+1)%pics.length;sl.style.backgroundImage=pics[idx];re(stage,'f')}}
function pump(){while(nx<AC.currentTime+.15){if(st%2===0){kick(nx);if(st%8===2||st%8===6)ns(nx,.18,1800,'bandpass',.5)}else ns(nx,.05,7000,'highpass',.16);(function(i,t){setTimeout(function(){vis(i)},Math.max(0,(t-AC.currentTime)*1000))})(st,nx);nx+=spb/2;st++}}
function ringf(){if(!run)return;var ph=((AC.currentTime-T0)/spb)%1;$('ring').style.transform='scale('+(3-2*ph)+')';requestAnimationFrame(ringf)}
$('play').addEventListener('click',function(){
  if(run){run=0;clearInterval(tm);stage.classList.remove('run');this.textContent='▶ Play the beat';return}
  if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();NB=AC.createBuffer(1,AC.sampleRate*.5,AC.sampleRate);var d=NB.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=Math.random()*2-1}
  AC.resume();run=1;st=0;nx=AC.currentTime+.2;T0=nx;sc=cb=0;$('sc').textContent=0;$('cb').textContent=0;stage.classList.add('run');tm=setInterval(pump,25);ringf();this.textContent='■ Stop'});
function tap(){if(!run){$('play').click();return}var x=(AC.currentTime-T0)%spb,d=Math.min(x,spb-x),r=$('rate'),s;
  if(d<.09){s='PERFECT';sc+=100+cb*10;cb++}else if(d<.17){s='GOOD';sc+=50;cb++}else{s='MISS';cb=0}
  r.textContent=s;r.style.color=s==='MISS'?'var(--pink)':'var(--g)';re(r,'on');re(stage,'p');if(s!=='MISS')re(stage,'f');bs=Math.max(bs,sc);$('sc').textContent=sc;$('cb').textContent=cb;$('bs').textContent=bs}
$('tap').addEventListener('pointerdown',function(e){e.preventDefault();tap()});stage.addEventListener('pointerdown',tap);
addEventListener('keydown',function(e){if(e.code==='Space'&&run&&document.activeElement.tagName!=='TEXTAREA'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();tap()}});

/* form to WhatsApp */
var fm=$('fm'),op=$('open');function openF(){fm.classList.add('open');op.setAttribute('aria-expanded','true')}
op.addEventListener('click',function(){openF();setTimeout(function(){fm.scrollIntoView({behavior:'smooth',block:'center'})},60)});
document.querySelectorAll('[data-open]').forEach(function(e){e.addEventListener('click',openF)});
fm.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(fm),v=function(k){return String(d.get(k)||'').trim()};
  var t="Hi Trix, I'm "+v('name')+(v('brand')?' from '+v('brand'):'')+". I have a project for you.\n\nProject: "+v('type')+(v('deadline')?'\nDeadline: '+v('deadline'):'')+(v('budget')?'\nBudget: '+v('budget'):'')+"\n\nAbout it:\n"+v('about');
  var u='https://wa.me/2347075832308?text='+encodeURIComponent(t),a=document.createElement('a');a.href=u;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();
  $('out').innerHTML='Opening WhatsApp with your brief. <a href="'+u+'" target="_blank" rel="noopener" style="color:var(--g)">Tap here if it did not open.</a>'});

/* magnetic buttons */
if(fine)document.querySelectorAll('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.2+'px,'+(e.clientY-r.top-r.height/2)*.3+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
/* work filters */
document.querySelectorAll('.chips button').forEach(function(b){b.addEventListener('click',function(){var f=b.getAttribute('data-f');document.querySelectorAll('.chips button').forEach(function(x){x.classList.toggle('on',x===b)});
  document.querySelectorAll('.wg .m').forEach(function(m){var show=f==='all'||m.getAttribute('data-c')===f;m.classList.toggle('off',!show);if(show){m.classList.remove('in');setTimeout(function(){m.classList.add('in')},40)}})})});
})();
