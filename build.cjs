const fs=require('node:fs');
const path=require('node:path');
const {mathjax}=require('mathjax-full/js/mathjax.js');
const {TeX}=require('mathjax-full/js/input/tex.js');
const {SVG}=require('mathjax-full/js/output/svg.js');
const {liteAdaptor}=require('mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler}=require('mathjax-full/js/handlers/html.js');
const {AllPackages}=require('mathjax-full/js/input/tex/AllPackages.js');
const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
const doc=mathjax.document('',{InputJax:new TeX({packages:AllPackages}),OutputJax:new SVG({fontCache:'none'})});
const read=p=>fs.readFileSync(path.join(__dirname,p),'utf8');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let errors=[],count=0;
function math(tex,display=false){count++;const html=adaptor.outerHTML(doc.convert(tex,{display}));if(/data-mjx-error|data-mml-node="merror"/.test(html))errors.push(tex);return html;}
function renderPage(raw,tpl,math){
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inline=s=>s.split(/(\$[^$]+\$)/g).map(y=>y.startsWith('$')&&y.endsWith('$')?math(y.slice(1,-1)):esc(y)).join('');
let html='',nav=[],n=0,section=false,sub=0,panel=false;
for(const line of raw.trim().split(/\r?\n/)){
if(line.startsWith('# ')){html+='<h1>'+esc(line.slice(2))+'</h1>';continue;}
if(line.startsWith('@subtitle ')){html+='<p class="subtitle">'+esc(line.slice(10))+'</p>';continue;}
if(line.startsWith('## ')){if(section)html+='</section>';const id='kapitel-'+ ++n;sub=0;const title=line.slice(3);nav.push('<a href="#'+id+'">'+esc(title.replace(/^Aufgabe /,''))+'</a>');html+='<section id="'+id+'" class="chapter"><header class="chapter-head"><span class="eyebrow">PRÜFUNGSVORBEREITUNG</span><h2>'+esc(title)+'</h2></header>';section=true;continue;}
if(line==='@formulas'){if(panel)throw Error('Nested panel');panel=true;html+='<section class="formula-panel" aria-labelledby="formeln-'+n+'"><h3 id="formeln-'+n+'">Allgemeine Formeln</h3><p class="panel-caption">Diese Formeln kennen und auf andere Aufgaben übertragen.</p>';continue;}
if(line==='@endformulas'){if(!panel)throw Error('Unmatched panel');panel=false;html+='</section>';continue;}
if(line.startsWith('@rule ')){html+='<h4>'+inline(line.slice(6))+'</h4>';continue;}
if(line.startsWith('### ')){html+='<h3 id="kapitel-'+n+'-schritt-'+ ++sub+'">'+esc(line.slice(4))+'</h3>';continue;}
if(line.startsWith('#### ')){html+='<h4>'+esc(line.slice(5))+'</h4>';continue;}
if(line.startsWith('@source ')){html+='<p class="source">'+esc(line.slice(8))+'</p>';continue;}
if(/^!?\$\$/.test(line)){if(!line.endsWith('$$'))throw Error('Math delimiter');const result=line.startsWith('!');html+='<div class="equation'+(result?' result':'')+'">'+(result?'<span class="result-label">ERGEBNIS</span>':'')+math(line.slice(result?3:2,-2),true)+'</div>';continue;}
if(line.trim())html+='<p'+(!section?' class="study-intro"':'')+'>'+inline(line)+'</p>';
}
if(panel)throw Error('Unclosed panel');if(section)html+='</section>';html+='<p class="footer">Analysis · Lernskript zur Prüfungsvorbereitung</p>';
return tpl.replace('{{NAV}}',()=>nav.join('')).replace('{{CONTENT}}',()=>html);
}
const page=renderPage(read('lernskript.md'),read('template.html'),math);
if(errors.length){console.error('Math errors:',errors);process.exit(1)}
fs.writeFileSync(path.join(__dirname,'index.html'),page);
console.log('Rendered',count,'formulas; no MathJax errors.');
