/* Sistema · tecleo (01) y revelado (02), implementación de referencia accesible */
const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
function tecleo(el, ms = 22){
  if (rm) return;                                   // reduce: el texto simplemente está
  el.setAttribute('aria-label', el.textContent);    // lectura íntegra desde el inicio
  const nodos = [];
  (function walk(n){ [...n.childNodes].forEach(c => {
    if (c.nodeType === 3){ nodos.push({node:c, text:c.nodeValue}); c.nodeValue=''; } else walk(c);
  }); })(el);
  const cur = Object.assign(document.createElement('span'),
    {className:'cursor', style:'display:inline-block;width:.55em;height:1em;background:var(--ambar);animation:parpadeo 1s steps(2,start) infinite'});
  cur.setAttribute('aria-hidden','true'); el.appendChild(cur);
  let i=0, j=0;
  (function paso(){
    if (i >= nodos.length){ setTimeout(()=>{cur.remove(); el.removeAttribute('aria-label');}, 900); return; }
    const n = nodos[i];
    if (j < n.text.length){ n.node.nodeValue += n.text[j++]; el.appendChild(cur); setTimeout(paso, ms); }
    else { i++; j=0; paso(); }
  })();
}
if (!rm && 'IntersectionObserver' in window){
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  }), {rootMargin:'0px 0px -10% 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
