window.__sb=function(){
  var RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
  var T={
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
  var F=[];for(var kk in T)F.push(T[kk]);
  function near(el){
    var p=el;
    for(var i=0;i<6&&p;i++){
      var tx=(p.innerText||"").trim();
      for(var k in T){if(tx.indexOf(k)>=0)return T[k];}
      p=p.parentElement;
    }
    var a=el.closest("a");
    if(a){var h=a.getAttribute("href")||"";
          for(var k2 in T){var sl=k2.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
                           if(h.indexOf(sl)>=0)return T[k2];}}
    var al=el.getAttribute("alt")||"";
    for(var k3 in T){if(al.indexOf(k3)>=0)return T[k3];}
    return null;
  }
  var n=0;
  document.querySelectorAll("img").forEach(function(im){
    var s=im.getAttribute("src")||"";
    if(s.indexOf("images/")===0)return;
    var m=s.match(/([A-Za-z0-9_-]{15,})\.(jpg|jpeg|png|webp)/);
    var k=(m&&F.indexOf(m[1])>=0)?m[1]:near(im);
    if(!k)k=F[n++%F.length];
    im.setAttribute("src","images/"+k+".jpg");
    im.removeAttribute("srcset");
  });
  function splitHead(el){
    if(el.dataset.sb)return;
    el.dataset.sb="1";
    var out="",i=0;
    [].slice.call(el.childNodes).forEach(function(nd){
      if(nd.nodeName==="BR"){out+="<br>";return;}
      var em=(nd.nodeName==="EM"||nd.nodeName==="I");
      (nd.textContent||"").split(/(\s+)/).forEach(function(w){
        if(!w.trim()){out+=w;return;}
        out+='<span class="dl-hd-w"><span class="dl-hd-i'+(em?" is-acc":"")+'" style="transition-delay:'+(i*45)+'ms">'+w+"</span></span>";
        i++;});});
    el.innerHTML=out;el.classList.add("dl-hd");}
  var HEADS=[].slice.call(document.querySelectorAll(".dlh-t,.dlsc-h,.dlla-h,.dlsc-lt,.dlsc-lead-t,h1,h2")).filter(function(e){return e.offsetParent!==null&&e.children.length<6&&(e.textContent||"").trim().length>0&&(e.textContent||"").length<160;});
  if(!RM)HEADS.forEach(splitHead);
  function on(e){e.classList.add("is-on","is-in");}
  if(RM){document.querySelectorAll(".dl-hd,.dl-sec,.dlh-img").forEach(on);}
  else{
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){on(e.target);io.unobserve(e.target);}});},{rootMargin:"0px 0px -6% 0px",threshold:0.06});
    document.querySelectorAll(".dl-hd,.dl-sec,.dlla-c,.dlla-read li,.dlsc-r,.dlsc-row,.dlft-col,.dlh-wi").forEach(function(e){io.observe(e);});}
  [".dlh-top",".dlh-mast",".dlh-idx",".dlh-art",".dlh-left",".dlh-bar"].forEach(function(q){
    document.querySelectorAll(q).forEach(function(e){e.style.opacity="1";e.style.translate="0";});});
  document.querySelectorAll(".dlh").forEach(function(e){e.classList.add("is-live","is-in","is-fine","is-run");});
  document.querySelectorAll(".dlh-wire").forEach(function(e){e.classList.add("is-live","is-in");});
  setTimeout(function(){var h=document.querySelector(".dlh");if(h)h.querySelectorAll(".dl-hd").forEach(on);},80);
  var IM=[].slice.call(document.querySelectorAll(".dlh-img"));
  var RW=[].slice.call(document.querySelectorAll(".dlh-row"));
  var TB=[].slice.call(document.querySelectorAll(".dlh-tb"));
  if(IM.length){
    IM.forEach(function(e,i){e.classList.toggle("is-on",i===0);});
    if(RW[0])RW[0].classList.add("is-on");
    var cur=0,t=null;
    function show(i){if(i===cur)return;cur=i;
                     IM.forEach(function(e,k){e.classList.toggle("is-on",k===i);});
                     TB.forEach(function(e,k){e.classList.toggle("is-on",k===i);});
                     RW.forEach(function(e,k){e.classList.toggle("is-on",k===i);});}
    function stop(){if(t){clearInterval(t);t=null;}}
    RW.forEach(function(r,i){r.addEventListener("mouseenter",function(){stop();show(i);});});
    TB.forEach(function(b,i){b.addEventListener("click",function(e){e.preventDefault();stop();show(i);});});
    if(!RM){t=setInterval(function(){show((cur+1)%IM.length);},6000);
            var art=document.querySelector(".dlh-art");if(art)art.addEventListener("mouseenter",stop);}}
  document.addEventListener("click",function(e){
    var t=e.target.closest("[data-k]");if(!t||!t.dataset.k)return;
    var k=t.dataset.k;
    document.querySelectorAll("button[data-k],.dlsc-tab").forEach(function(x){x.classList.toggle("is-on",x===t);});
    document.querySelectorAll(".dlsc-panel,.dlsc-p,.dlsc-pane").forEach(function(p){p.classList.toggle("is-on",p.dataset.k===k);});});
  if(!RM&&matchMedia("(pointer:fine)").matches){
    var c=document.querySelector(".dl-cur");
    if(c){var x=0,y=0,px=0,py=0,st=false;
          document.addEventListener("mousemove",function(e){x=e.clientX;y=e.clientY;
                                                            if(!st){st=true;px=x;py=y;c.classList.add("is-on");c.style.opacity="1";}
                                                            c.classList.toggle("is-link",!!e.target.closest("a,button"));});
          document.addEventListener("mousedown",function(){c.classList.add("is-press");});
          document.addEventListener("mouseup",function(){c.classList.remove("is-press");});
          (function loop(){px+=(x-px)*0.18;py+=(y-py)*0.18;
                           c.style.transform="translate("+px+"px,"+py+"px)";requestAnimationFrame(loop);})();}}
};
if(document.readyState!=="loading"){window.__sb();}else{document.addEventListener("DOMContentLoaded",window.__sb);}

(function(){
  var deep=(location.pathname.split("/staybut/")[1]||"").indexOf("/")>=0;
  if(!deep)return;
  function fix(){
    document.querySelectorAll("img").forEach(function(im){
      var s=im.getAttribute("src")||"";
      if(s.indexOf("images/")===0){im.setAttribute("src","../"+s);}
    });
  }
  fix();
  setTimeout(fix,200);
  setTimeout(fix,800);
})();w

(function(){
  var RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(!RM&&matchMedia("(hover:hover) and (pointer:fine)").matches){
    var c=document.querySelector(".dl-cur");
    if(!c){c=document.createElement("div");c.className="dl-cur";document.body.appendChild(c);}
    if(!c.querySelector(".dl-cur-dot"))c.innerHTML='<span class="dl-cur-dot"></span>';
    var x=0,y=0,px=0,py=0,st=false;
    document.addEventListener("mousemove",function(e){x=e.clientX;y=e.clientY;
                                                      if(!st){st=true;px=x;py=y;c.classList.add("is-on");}
                                                      c.classList.toggle("is-link",!!e.target.closest("a,button,.dlsc-tab,.dlh-row,.dlh-tb,.dlla-c,.dlar-card"));});
    document.addEventListener("mousedown",function(){c.classList.add("is-press");});
    document.addEventListener("mouseup",function(){c.classList.remove("is-press");});
    (function f(){px+=(x-px)*0.2;py+=(y-py)*0.2;
                  c.style.transform="translate("+px+"px,"+py+"px)";requestAnimationFrame(f);})();
  }
  var ld=document.querySelector(".dl-ld");
  if(!ld){ld=document.createElement("div");ld.className="dl-ld";
          ld.innerHTML='<span class="dl-ld-m">STAY BUT \u53cb</span><span class="dl-ld-b"></span>';
          document.body.appendChild(ld);}
  document.addEventListener("click",function(e){
    var a=e.target.closest("a");if(!a||RM)return;
    var h=a.getAttribute("href")||"";
    if(!h||h.charAt(0)==="#")return;
    if(/^(mailto:|tel:)/.test(h))return;
    if(a.target==="_blank")return;
    if(a.hostname&&a.hostname!==location.hostname)return;
    e.preventDefault();ld.classList.add("is-on");
    setTimeout(function(){location.href=a.href;},520);});
  window.addEventListener("pageshow",function(){ld.classList.remove("is-on");});
})();
