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
function inline(s){return s.split(/(\$[^$]+\$)/g).map(x=>x.startsWith('$')&&x.endsWith('$')?math(x.slice(1,-1)):esc(x)).join('')}
let html='',nav=[],n=0,section=false,sub=0;
for(const line of read('lernskript.md').trim().split(/\r?\n/)){
 if(line.startsWith('# ')){html+='<h1>'+esc(line.slice(2))+'</h1>';continue;}
 if(line.startsWith('@subtitle ')){html+='<p class="subtitle">'+esc(line.slice(10))+'</p>';continue;}
 if(line.startsWith('## ')){if(section)html+='</section>';const id='kapitel-'+ ++n;sub=0;const title=line.slice(3);nav.push('<a href="#'+id+'">'+esc(title.replace(/^Aufgabe /,''))+'</a>');html+='<section id="'+id+'" class="chapter"><header class="chapter-head"><span class="eyebrow">PRÜFUNGSVORBEREITUNG</span><h2>'+esc(title)+'</h2></header>';section=true;continue;}
 if(line.startsWith('### ')){html+='<h3 id="kapitel-'+n+'-schritt-'+ ++sub+'">'+esc(line.slice(4))+'</h3>';continue;}
 if(line.startsWith('#### ')){html+='<h4>'+esc(line.slice(5))+'</h4>';continue;}
 if(line.startsWith('@source ')){html+='<p class="source">'+esc(line.slice(8))+'</p>';continue;}
 if(/^!?\$\$/.test(line)){if(!line.endsWith('$$'))throw Error('Missing math delimiter: '+line);const result=line.startsWith('!');const tex=line.slice(result?3:2,-2);html+='<div class="equation'+(result?' result':'')+'">'+(result?'<span class="result-label">ERGEBNIS</span>':'')+math(tex,true)+'</div>';continue;}
 if(line.trim())html+='<p>'+inline(line)+'</p>';
}
if(section)html+='</section>';
html+='<p class="footer">Analysis · Lernskript zur Prüfungsvorbereitung</p>';
if(errors.length){console.error('Math errors:',errors);process.exit(1)}
const template=read('template.html');
if(!template.includes('{{NAV}}')||!template.includes('{{CONTENT}}'))throw Error('Template incomplete');
const page=template.replace('{{NAV}}',()=>nav.join('')).replace('{{CONTENT}}',()=>html);
fs.writeFileSync(path.join(__dirname,'index.html'),page);
console.log('Rendered',count,'formulas; no MathJax errors. Chapters:',n);
