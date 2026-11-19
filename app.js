(function(){
"use strict";
var RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
var FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;
var DEEP = /\/(article|section)\//.test(location.pathname);
var P = DEEP ? "../" : "";

/* ---------- 사진 연결 ---------- */
var TITLE_MAP = {
  "A friend's place in Seongsu":"8OUpItZi2DnYW70mhMpY6qSjGB0",
  "How to get to Seoul Station":"uFvbyTyskFaox3aJ02Vu1zJGn6w",
  "How to get to Jamsil":"7q3IBQuEvdNCqvoZcS43exLdnpE",
  "How to get to Gangnam":"Nd5m6XelAjQZh92qlKFinODQtNs",
  "How to get to Hongdae":"Z9HbUEvMpHiMSh56uJtboV1Uk",
  "PEER Coffee":"q3XtJRFtLg1zhMeDbUDcWKuf0",
  "Lowkey Seongsu":"byGQMjHHMpZbOVNkdCunM9ZEGL8",
  "Street toast at Multi Coffee":"isoe7AJB8i7cMjfSHAdqdHgdVh8",
  "Wang-galbitang":"oa4c5U82TjELn01MY1XzBA4wy3Q",
  "Da-i-so: they have everything":"JkNk87SuqUfi5646pHOymkPQA",
  "Eating fruit in Korea":"7BFhFDHJfuYhBxDlP3mkZuvpgo",
  "Water's free here":"4YJ5PeZHWrkCqJPgOaU82R57QY",
  "Seochon, by the palace wall":"vkpLi7UucM0H3FEUQI340YsXCg"
};
var ALL = []; for (var t in TITLE_MAP) ALL.push(TITLE_MAP[t]);
var HERO = ["8OUpItZi2DnYW70mhMpY6qSjGB0","uFvbyTyskFaox3aJ02Vu1zJGn6w",
  "7q3IBQuEvdNCqvoZcS43exLdnpE","Nd5m6XelAjQZh92qlKFinODQtNs","Z9HbUEvMpHiMSh56uJtboV1Uk"];
var SEC = {coffee:"q3XtJRFtLg1zhMeDbUDcWKuf0",eat:"oa4c5U82TjELn01MY1XzBA4wy3Q",
  places:"JkNk87SuqUfi5646pHOymkPQA",walks:"vkpLi7UucM0H3FEUQI340YsXCg",
  "getting-around":"uFvbyTyskFaox3aJ02Vu1zJGn6w",stay:"8OUpItZi2DnYW70mhMpY6qSjGB0"};

function put(im,key){ if(!im||!key)return;
  im.setAttribute("src", P+"images/"+key+".jpg"); im.removeAttribute("srcset"); }

function near(el){
  var p=el;
  for (var i=0;i<6&&p;i++){
    var tx=(p.innerText||"").trim();
    for (var k in TITLE_MAP) if (tx.indexOf(k)>=0) return TITLE_MAP[k];
    p=p.parentElement;
  }
  var alt=el.getAttribute("alt")||"";
  for (var k2 in TITLE_MAP) if (alt.indexOf(k2)>=0) return TITLE_MAP[k2];
  return null;
}

function fixImages(){
  var n=0;
  [].slice.call(document.querySelectorAll(".dlh-img")).forEach(function(im,i){
    put(im, HERO[i%HERO.length]); });
  [].slice.call(document.querySelectorAll(".dlh-tb")).forEach(function(b,i){
    put(b.querySelector("img"), HERO[i%HERO.length]); });
  [].slice.call(document.querySelectorAll(".dlsc-panel,.dlsc-p")).forEach(function(p){
    var k=p.dataset&&p.dataset.k; if(k&&SEC[k]) put(p.querySelector("img"), SEC[k]); });
  [].slice.call(document.querySelectorAll("img")).forEach(function(im){
    var s=im.getAttribute("src")||"";
    if (s.indexOf("images/")===0 || s.indexOf("../images/")===0) return;
    var m=s.match(/([A-Za-z0-9_-]{15,})\.(jpg|jpeg|png|webp)/);
    var key=(m&&ALL.indexOf(m[1])>=0)?m[1]:near(im);
    put(im, key||ALL[n++%ALL.length]);
  });
}

/* ---------- 404 iframe 제거 ---------- */
function clean(){
  [].slice.call(document.querySelectorAll("iframe")).forEach(function(f){
    var s=f.getAttribute("src")||"";
    if(!s||s.indexOf("_files")>=0||s.indexOf("edit")>=0) f.remove();
  });
}

/* ---------- 숨겨진 요소 보이게 ---------- */
function reveal(){
  [].slice.call(document.querySelectorAll(
    ".dlla-card,.dlla-c,.dlla-read li,.dlsc-row,.dlsc-r,.dlft-col,.dlh-wi,.dl-sec,.dl-hd"
  )).forEach(function(e){ e.classList.add("is-on","is-in"); e.style.opacity="1"; });
  [".dlh-top",".dlh-mast",".dlh-idx",".dlh-art",".dlh-left",".dlh-bar"].forEach(function(q){
    [].slice.call(document.querySelectorAll(q)).forEach(function(e){
      e.style.opacity="1"; e.style.translate="0"; });
  });
  [].slice.call(document.querySelectorAll(".dlh")).forEach(function(e){
    e.classList.add("is-live","is-in","is-fine","is-run"); });
  [].slice.call(document.querySelectorAll(".dlh-wire")).forEach(function(e){
    e.classList.add("is-live","is-in"); });
  [].slice.call(document.querySelectorAll(".dlft-wmw,.dlft-wm")).forEach(function(e){
    e.style.color="#fff"; e.style.opacity="1";
    [].slice.call(e.querySelectorAll("*")).forEach(function(k){
      k.style.color="#fff"; k.style.opacity="1"; k.style.translate="0 0"; });
  });
}

/* ---------- 제목 단어 쪼개기 ---------- */
function splitHead(el){
  if (el.dataset.sb) return;
  el.dataset.sb="1";
  var out="", i=0;
  [].slice.call(el.childNodes).forEach(function(nd){
    if (nd.nodeName==="BR"){ out+="<br>"; return; }
    var em=(nd.nodeName==="EM"||nd.nodeName==="I");
    (nd.textContent||"").split(/(\s+)/).forEach(function(w){
      if(!w.trim()){ out+=w; return; }
      out+='<span class="dl-hd-w"><span class="dl-hd-i'+(em?" is-acc":"")+
           '" style="transition-delay:'+(i*45)+'ms">'+w+"</span></span>";
      i++;
    });
  });
  el.innerHTML=out; el.classList.add("dl-hd","is-on");
}

/* ---------- 히어로 사진 전환 ---------- */
function hero(){
  var IM=[].slice.call(document.querySelectorAll(".dlh-img"));
  var RW=[].slice.call(document.querySelectorAll(".dlh-row"));
  var TB=[].slice.call(document.querySelectorAll(".dlh-tb"));
  if(!IM.length) return;
  IM.forEach(function(e,i){ e.classList.toggle("is-on", i===0); });
  if(RW[0]) RW[0].classList.add("is-on");
  var cur=0, timer=null;
  function show(i){
    if(i===cur) return; cur=i;
    IM.forEach(function(e,k){ e.classList.toggle("is-on",k===i); });
    TB.forEach(function(e,k){ e.classList.toggle("is-on",k===i); });
    RW.forEach(function(e,k){ e.classList.toggle("is-on",k===i); });
    var c=document.querySelector(".dlh-idx-c");
    if(c) c.textContent=String(i+1).padStart(2,"0")+" / "+String(IM.length).padStart(2,"0");
  }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }
  RW.forEach(function(r,i){ r.addEventListener("mouseenter",function(){ stop(); show(i); }); });
  TB.forEach(function(b,i){ b.addEventListener("click",function(e){ e.preventDefault(); stop(); show(i); }); });
  if(!RM){
    timer=setInterval(function(){ show((cur+1)%IM.length); }, 6000);
    var art=document.querySelector(".dlh-art");
    if(art) art.addEventListener("mouseenter", stop);
  }
}

/* ---------- 섹션 탭 ---------- */
function tabs(){
  var PN=[].slice.call(document.querySelectorAll(".dlsc-panel,.dlsc-p"));
  var TB=[].slice.call(document.querySelectorAll(".dlsc-tab,button[data-k]"));
  if(!PN.length||!TB.length) return;
  function pick(i){
    PN.forEach(function(p,k){
      var on=(k===i);
      p.classList.toggle("is-on",on);
      p.setAttribute("aria-hidden", on?"false":"true");
    });
    TB.forEach(function(t,k){ t.classList.toggle("is-on",k===i); });
  }
  pick(0);
  TB.forEach(function(t,i){
    t.addEventListener("mouseenter",function(){ pick(i); });
    t.addEventListener("click",function(e){ e.preventDefault(); pick(i); });
  });
}

/* ---------- 최신글 6개 ---------- */
function latest(){
  [].slice.call(document.querySelectorAll(".dlla-grid .dlla-card,.dlla-grid .dlla-c"))
    .forEach(function(c,i){ if(i>=6) c.style.display="none"; });
}

/* ---------- 시계 ---------- */
function clock(){
  function seoul(){ return new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul"})); }
  function tick(){
    var d=seoul();
    var t=String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
    [].slice.call(document.querySelectorAll("time,span")).forEach(function(e){
      var x=(e.textContent||"").trim();
      if(/^\d{2}:\d{2}$/.test(x)) e.textContent=t;
    });
  }
  tick(); setInterval(tick, 20000);
}

/* ---------- 부드러운 스크롤 ---------- */
function smooth(){
  if(RM||!FINE||window.__sbSm) return;
  window.__sbSm=1;
  var cu=window.scrollY, tg=cu, run=false;
  function lp(){
    cu+=(tg-cu)*0.1;
    if(Math.abs(tg-cu)<0.4){ cu=tg; run=false; }
    window.scrollTo(0,cu);
    if(run) requestAnimationFrame(lp);
  }
  window.addEventListener("wheel",function(e){
    if(e.ctrlKey) return;
    e.preventDefault();
    tg=Math.max(0, Math.min(tg+e.deltaY, document.documentElement.scrollHeight-innerHeight));
    if(!run){ run=true; requestAnimationFrame(lp); }
  },{passive:false});
  window.addEventListener("resize",function(){ tg=cu=window.scrollY; });
}

/* ---------- 커서 ---------- */
function cursor(){
  if(RM||!FINE) return;
  var c=document.querySelector(".dl-cur");
  if(!c){ c=document.createElement("div"); c.className="dl-cur"; document.body.appendChild(c); }
  c.innerHTML='<span class="dl-cur-dot"></span><span class="dl-cur-label">Read</span>';
  var x=0,y=0,px=0,py=0,st=false;
  document.addEventListener("mousemove",function(e){
    x=e.clientX; y=e.clientY;
    if(!st){ st=true; px=x; py=y; c.classList.add("is-on"); }
    c.classList.toggle("is-link", !!e.target.closest("a,button,.dlsc-tab,.dlh-row,.dlh-tb,.dlla-card,.dlar-card"));
  });
  document.addEventListener("mousedown",function(){ c.classList.add("is-press"); });
  document.addEventListener("mouseup",function(){ c.classList.remove("is-press"); });
  (function f(){ px+=(x-px)*0.2; py+=(y-py)*0.2;
    c.style.transform="translate("+px+"px,"+py+"px)"; requestAnimationFrame(f); })();
}

/* ---------- 페이지 전환 ---------- */
function transition(){
  var ld=document.querySelector(".dl-ld");
  if(!ld){
    ld=document.createElement("div"); ld.className="dl-ld";
    ld.innerHTML='<span class="dl-ld-m">STAY BUT \u53cb</span><span class="dl-ld-b"></span>';
    document.body.appendChild(ld);
  }
  ld.classList.remove("is-on");
  if(RM) return;
  document.addEventListener("click",function(e){
    var a=e.target.closest("a"); if(!a) return;
    var h=a.getAttribute("href")||"";
    if(!h||h.charAt(0)==="#") return;
    if(/^(mailto:|tel:)/.test(h)) return;
    if(a.target==="_blank") return;
    if(a.hostname&&a.hostname!==location.hostname) return;
    e.preventDefault(); ld.classList.add("is-on");
    setTimeout(function(){ location.href=a.href; }, 560);
  });
  window.addEventListener("pageshow",function(){ ld.classList.remove("is-on"); });
}

/* ---------- 실행 ---------- */
function run(){
  try{ clean(); }catch(e){}
  try{ fixImages(); }catch(e){}
  try{ reveal(); }catch(e){}
  try{
    if(!RM){
      [].slice.call(document.querySelectorAll(".dlh-t,.dlsc-h,.dlla-h,.dlsc-lt,.dlar-h,h1,h2"))
        .filter(function(e){ return e.offsetParent!==null && e.children.length<6
          && (e.textContent||"").trim().length>0 && (e.textContent||"").length<160; })
        .forEach(splitHead);
    }
  }catch(e){}
  try{ hero(); }catch(e){}
  try{ tabs(); }catch(e){}
  try{ latest(); }catch(e){}
  try{ clock(); }catch(e){}
  try{ smooth(); }catch(e){}
  try{ cursor(); }catch(e){}
  try{ transition(); }catch(e){}
  setTimeout(function(){ try{ clean(); fixImages(); reveal(); }catch(e){} }, 600);
  setTimeout(function(){ try{ clean(); fixImages(); reveal(); }catch(e){} }, 1800);
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", run);
else run();
})();
