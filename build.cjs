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
function renderFormulaLibrary(page,tpl){
const nav=page.match(/<nav aria-label="Kapitel">([\s\S]*?)<\/nav>/)?.[1];
if(!nav)throw Error("Chapter navigation not found");
const chapters=new Map([...page.matchAll(/<section id="kapitel-(\d+)" class="chapter"><header class="chapter-head"><span class="eyebrow">[^<]*<\/span><h2>([^<]*)<\/h2>/g)].map(m=>[m[1],m[2]]));
const panels=[...page.matchAll(/<section class="formula-panel" aria-labelledby="formeln-(\d+)">([\s\S]*?)<\/section>/g)];
if(!panels.length||panels.length!==chapters.size||new Set(panels.map(m=>m[1])).size!==panels.length)throw Error("Missing or duplicate general-formula panels");
let sections="",topics="",ruleCount=0,formulaCount=0;
for(const p of panels){
const id=p[1],title=chapters.get(id);
if(!title)throw Error("Formula panel without chapter");
const body=p[2].replace(/^<h3 id="formeln-\d+">Allgemeine Formeln<\/h3><p class="panel-caption">[^<]*<\/p>/,"");
const rules=(body.match(/<h4>/g)||[]).length;
const equations=(body.match(/class="equation(?: result)?"/g)||[]).length;
if(!rules||!equations)throw Error("Empty formula panel: "+id);
ruleCount+=rules;formulaCount+=equations;
topics+='<a href="#formeln-'+id+'">'+title.replace(/^Aufgabe /,"")+'</a>';
sections+='<section id="formeln-'+id+'" class="library-chapter" aria-labelledby="formelthema-'+id+'"><h2 id="formelthema-'+id+'">'+title+'</h2><a class="exercise-link" href="./index.html#kapitel-'+id+'">Zur vollständigen Aufgabe <span aria-hidden="true">↗</span></a><div class="formula-panel">'+body+'</div></section>';
}
const content='<h1>Formelsammlung</h1><p class="subtitle">Alle allgemeinen Formeln auf einen Blick</p><p class="formula-library-intro">Die wichtigsten Rechenregeln und Voraussetzungen aus allen bisher bearbeiteten Aufgaben. Nur allgemeine Formeln, ohne die ausführlichen Musterlösungen.</p><div class="library-meta"><span>'+panels.length+' Themenbereiche · '+ruleCount+' Rechenregeln · '+formulaCount+' Formelblöcke</span><a href="./index.html">Zum Lernskript</a></div><div class="library-topics" aria-label="Formelthemen">'+topics+'</div>'+sections+'<p class="footer">Analysis · Formelsammlung</p>';
return tpl.replace("Analysis – Mein Lernskript</title>","Formelsammlung – Analysis</title>").replace("<body>","<body data-view=\"formulas\">").replace('<a class="formula-link" href="./formelsammlung.html">','<a class="formula-link" href="./formelsammlung.html" aria-current="page">').replace('{{NAV}}',()=>nav.replace(/href="#kapitel-/g,'href="./index.html#kapitel-')).replace('{{CONTENT}}',()=>content);
}
const template=read('template.html');
const page=renderPage(read('lernskript.md'),template,math);
const formulaLibrary=renderFormulaLibrary(page,template);
if(errors.length){console.error('Math errors:',errors);process.exit(1)}
fs.writeFileSync(path.join(__dirname,'index.html'),page);
fs.writeFileSync(path.join(__dirname,'formelsammlung.html'),formulaLibrary);
console.log('Rendered',count,'formulas; no MathJax errors.');
