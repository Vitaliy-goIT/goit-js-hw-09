const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");let d=null;e.setAttribute("disabled","true"),t.addEventListener("click",(function(){t.setAttribute("disabled","true"),e.removeAttribute("disabled"),d=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(){clearInterval(d),t.removeAttribute("disabled"),e.setAttribute("disabled","true")}));
//# sourceMappingURL=01-color-switcher.c5e5178a.js.map
