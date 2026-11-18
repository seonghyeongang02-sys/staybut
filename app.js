(function(){
'use strict';
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* 첫 화면 바로 보이기 */
['.dlh-top','.dlh-mast','.dlh-idx','.dlh-art','.dlh-left','.dlh-bar'].forEach(function(s){
  document.querySelectorAll(s).forEach(function(e){
    e.style.opacity='1'; e.style.translate='0';
  });
});
document.querySelectorAll('.dl-hd').forEach(function(e){e.classList.add('is-on')});
document.querySelectorAll('.dl-hd-i').forEach(function(e){e.style.translate='0 0'});

/* 히어로 사진 */
var imgs=[].slice.call(document.querySelectorAll('.dlh-img'));
var rows=[].slice.call(document.querySelectorAll('.dlh-row'));
var tbs=[].slice.call(document.querySelectorAll('.dlh-tb'));
if(imgs.length){
  imgs.forEach(function(im,i){ im.classList.toggle('is-on', i===0); });
  if(rows[0]) rows[0].classList.add('is-on');
  var cur=0, timer=null;
  function show(i){
    if(i===cur||i>=imgs.length) return;
    cur=i;
    imgs.forEach(function(im,k){im.classList.toggle('is-on',k===i)});
    tbs.forEach(function(b,k){b.classList.toggle('is-on',k===i)});
    rows.forEach(function(r,k){r.classList.toggle('is-on',k===i)});
    var n=document.querySelector('.dlh-idx-c');
    if(n) n.innerHTML=String(i+1).padStart(2,'0')+' / '+String(imgs.length).padStart(2,'0');
  }
  function stop(){ if(timer){clearInterval(timer); timer=null;} }
  rows.forEach(function(r,i){ r.addEventListener('mouseenter',function(){stop();show(i)}); });
  tbs.forEach(function(b,i){ b.addEventListener('click',function(e){e.preventDefault();stop();show(i)}); });
  if(!RM){
    timer=setInterval(function(){ show((cur+1)%imgs.length); },5200);
    var art=document.querySelector('.dlh-art');
    if(art) art.addEventListener('mouseenter',stop);
  }
}

/* 스크롤 등장 */
if(!RM && 'IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('is-on','is-in'); io.unobserve(e.target); }
    });
  },{rootMargin:'0px 0px -6% 0px',threshold:0.06});
  document.querySelectorAll('.dl-sec,.dl-hd,.dlsc-p,.dlla-c,.dlla-read li,.dlsc-r,.dlft-col')
    .forEach(function(e){io.observe(e)});
}else{
  document.querySelectorAll('.dl-sec,.dl-hd').forEach(function(e){e.classList.add('is-on','is-in')});
}

/* 섹션 탭 */
document.addEventListener('click',function(e){
  var t=e.target.closest('.dlsc-t,[data-k]');
  if(t && t.dataset && t.dataset.k){
    var k=t.dataset.k;
    document.querySelectorAll('.dlsc-t,[data-k]').forEach(function(x){
      if(x.classList.contains('dlsc-t')||x.tagName==='BUTTON') x.classList.toggle('is-on',x===t);
    });
    document.querySelectorAll('.dlsc-panel,.dlsc-p').forEach(function(p){
      p.classList.toggle('is-on', p.dataset.k===k);
    });
  }
});

/* 시계 */
function seoul(){ return new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Seoul'})); }
function tick(){
  var d=seoul();
  var t=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
  document.querySelectorAll('time').forEach(function(e){
    if(/^\d{2}:\d{2}$/.test(e.textContent.trim())) return;
  });
  document.querySelectorAll('.dlh-top span,.dlft-now span').forEach(function(e){
    if(/^Seoul\s+\d{2}:\d{2}$/.test(e.textContent.trim())) e.textContent='Seoul '+t;
    else if(/^\d{2}:\d{2}$/.test(e.textContent.trim())) e.textContent=t;
  });
}
tick(); setInterval(tick,20000);

/* 띠 */
document.querySelectorAll('.dlh-wire').forEach(function(w){ w.classList.add('is-live','is-in'); });
document.querySelectorAll('.dlh').forEach(function(h){ h.classList.add('is-live','is-in','is-fine','is-run'); });

/* 마우스 점 */
if(!RM && matchMedia('(pointer:fine)').matches){
  var c=document.querySelector('.dl-cur');
  if(c){
    var x=0,y=0,px=0,py=0,on=false;
    document.addEventListener('mousemove',function(e){
      x=e.clientX; y=e.clientY;
      if(!on){on=true;px=x;py=y;c.classList.add('is-on');}
    });
    document.addEventListener('mousedown',function(){c.classList.add('is-press')});
    document.addEventListener('mouseup',function(){c.classList.remove('is-press')});
    (function f(){ px+=(x-px)*0.18; py+=(y-py)*0.18;
      c.style.transform='translate('+px+'px,'+py+'px)'; requestAnimationFrame(f); })();
  }
}
})();
