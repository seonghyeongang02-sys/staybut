(function(){
  var F=["3JqKTZR9R9BnmQPX0RoTzxmmt8A","3ccMNwnCqajk3sOcqtApRd63OU","4YJ5PeZHWrkCqJPgOaU82R57QY","7BFhFDHJfuYhBxDlP3mkZuvpgo","7q3IBQuEvdNCqvoZcS43exLdnpE","8OUpItZi2DnYW70mhMpY6qSjGB0","9kROihuf1YZMhALe1v5DF2CHSo","FPdVK4lCcqe2HXfoeZ9IZTt51E","JkNk87SuqUfi5646pHOymkPQA","LyWQDyTmPmSux87dV0CWhmfVXs","Nd5m6XelAjQZh92qlKFinODQtNs","QP6VhMQaWXH0trJuSRbagg97DZs","Tajqu0qAJafZP7EzDPfxZQRHc","UtuhTpzaDzBw6wwSJx6RORLaI","Z9HbUEvMpHiMSh56uJtboV1Uk","byGQMjHHMpZbOVNkdCunM9ZEGL8"];
  var n=0;
  document.querySelectorAll("img").forEach(function(im){
    var s=im.getAttribute("src")||"";
    if(s.indexOf("images/")===0)return;
    var k=F[n++%F.length];
    im.setAttribute("src","images/"+k+".jpg");
    im.removeAttribute("srcset");
  });
  [".dlh-top",".dlh-mast",".dlh-idx",".dlh-art",".dlh-left",".dlh-bar"].forEach(function(q){
    document.querySelectorAll(q).forEach(function(e){e.style.opacity="1";e.style.translate="0";});
  });
  document.querySelectorAll(".dl-hd").forEach(function(e){e.classList.add("is-on");});
  document.querySelectorAll(".dl-hd-i").forEach(function(e){e.style.translate="0 0";});
  document.querySelectorAll(".dl-sec").forEach(function(e){e.classList.add("is-on","is-in");});
  document.querySelectorAll(".dlh").forEach(function(e){e.classList.add("is-live","is-in","is-fine","is-run");});
  document.querySelectorAll(".dlh-wire").forEach(function(e){e.classList.add("is-live","is-in");});
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
    t=setInterval(function(){show((cur+1)%IM.length);},5200);
  }
  document.addEventListener("click",function(e){
    var t=e.target.closest("[data-k]");if(!t||!t.dataset.k)return;
    var k=t.dataset.k;
    document.querySelectorAll("button[data-k]").forEach(function(x){x.classList.toggle("is-on",x===t);});
    document.querySelectorAll(".dlsc-panel,.dlsc-p").forEach(function(p){p.classList.toggle("is-on",p.dataset.k===k);});
  });
})();
