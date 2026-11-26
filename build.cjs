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
function taylorDerivatives(){
const f=n=>n===0?"<i>f</i>":n<4?"<i>f</i>"+ "′".repeat(n):"<i>f</i><sup>(4)</sup>";
const rows=Array.from({length:5},(_,n)=>`<tr><td><span class="visual-math">${f(n)}(<i>x</i>) = <i>e</i><sup><i>x</i></sup></span></td><td><span class="visual-math">${f(n)}(<span class="pair-5">0</span>) = <i>e</i><sup class="pair-5">0</sup></span></td><td><strong class="pattern-group keep">1</strong></td></tr>`).join("");
return `<div class="study-visual taylor-derivatives"><div class="visual-heading">Warum steht im Zähler immer 1?</div><p class="visual-subtitle">Schritt 1: Ableitungen berechnen. Schritt 2: x = 0 einsetzen. Bei eˣ bleibt die Ableitung stets eˣ, und e⁰ = 1.</p><div class="visual-scroll"><table class="pattern-table" aria-label="Ableitungen von e hoch x und ihre Werte an der Stelle null"><thead><tr><th scope="col">Ableitung</th><th scope="col">0 einsetzen</th><th scope="col">Ergebnis</th></tr></thead><tbody>${rows}</tbody></table></div><div class="visual-legend"><span class="visual-key"><span class="key-dot pair-5"></span>Entwicklungsstelle 0</span><span class="visual-key"><span class="key-dot keep"></span>Wert für den Zähler</span></div></div>`;
}
function leastSquaresVisual(name){
const math=(s)=>`<span class="visual-math">${s}</span>`;
const pow=n=>n===0?"":n===1?"<i>t</i>":`<i>t</i><sup>${n}</sup>`;
const frac=(den)=>`<span class="stack-fraction"><span>2</span><span>${den}</span></span>`;
if(name==="least-squares-shift"){
return `<div class="study-visual"><div class="visual-heading">Intervall verschieben</div><div class="visual-scroll"><table class="pattern-table"><thead><tr><th>Original x</th><th class="pair-6">−2</th><th class="keep">Neue Variable t</th></tr></thead><tbody>${[1,2,3].map(v=>`<tr><td><span class="pattern-group pair-5">${v}</span></td><td class="pair-6">${v} − 2</td><td><span class="pattern-group keep">${v-2}</span></td></tr>`).join("")}</tbody></table></div><p class="visual-subtitle">x ∈ [1,3] → t ∈ [−1,1]</p></div>`;
}
if(name==="least-squares-integrals"){
return `<div class="study-visual"><div class="visual-heading">Meine Integraltabelle – einmal berechnen, immer wieder verwenden</div><div class="visual-scroll"><table class="pattern-table"><thead><tr><th scope="col">n</th>${Array.from({length:8},(_,n)=>`<th scope="col">${n}</th>`).join("")}</tr></thead><tbody><tr><th scope="row">Integral</th>${Array.from({length:8},(_,n)=>`<td><span class="pattern-group ${n%2?"tail":"keep"}">${n%2?"0":n===0?"2":frac(n+1)}</span></td>`).join("")}</tr></tbody></table></div><div class="visual-legend"><span class="visual-key"><span class="key-dot keep"></span>Gerade Potenzen: Wert bleibt</span><span class="visual-key"><span class="key-dot tail"></span>Ungerade Potenzen: Integral = 0</span></div></div>`;
}
const j=Number(name.slice("least-squares-".length));if(!Number.isInteger(j)||j<0||j>3)throw Error("Unknown least squares visual");
const terms=[["",4],["8",3],["24",2],["32",1],["17",0],["A",0],["B",1],["C",2],["D",3]];
const chips=terms.map(([co,n],i)=>{const exponent=n+j;const odd=exponent%2===1;return `<span class="pattern-group ${odd?"tail cancelled":"keep"}">${i===0?"":i>=5?"− ":"+ "}${co}${pow(exponent)}</span>`}).join("");
return `<div class="study-visual"><div class="visual-heading">R(t) mit ${j===0?"1":"t"+(j===1?"":j===2?"²":"³")} multiplizieren</div><p class="visual-subtitle">Erst die Exponenten addieren, dann die ungeraden Potenzen streichen. Die durchgestrichenen Terme sind nicht als Funktionen null; ihre Integrale über [−1,1] sind null.</p><div class="least-squares-terms">${chips}</div><div class="visual-legend"><span class="visual-key"><span class="key-dot keep"></span>Gerade Potenzen → integrieren</span><span class="visual-key"><span class="key-dot tail"></span>Ungerade Potenzen → Integral = 0</span></div></div>`;
}
function studyVisual(name){
if(name.startsWith('least-squares-'))return leastSquaresVisual(name);
if(name==='taylor-derivatives')return taylorDerivatives();
const frac=(d,sign="",cls="")=>`<span class="fraction-term ${cls}"><span class="term-sign">${sign}</span><span class="stack-fraction"><span>1</span><span>${d}</span></span></span>`;
const key=(cls,label)=>`<span class="visual-key"><span class="key-dot ${cls}"></span>${label}</span>`;
if(name==="telescope"){
let rows="";
for(let k=0;k<=4;k++){
let cells="";
for(let d=3;d<=9;d++){
const positive=d===k+3,negative=d===k+5;
const cls=d<=4?"keep":d>=8?"tail":"pair-"+d;
cells+=`<td>${positive||negative?frac(d,positive?"+":"−",cls+(d>=5&&d<=7?" cancelled":"")):""}</td>`;
}
rows+=`<tr><th scope="row"><i>k</i> = ${k}</th>${cells}</tr>`;
}
return `<div class="study-visual telescope-visual"><div class="visual-heading">Welche Brüche heben sich auf?</div><p class="visual-subtitle">Gleiche Farbe und gleicher Nenner, entgegengesetzte Vorzeichen: Die durchgestrichenen Paare ergeben null.</p><div class="visual-scroll"><table class="telescope-table" aria-label="Teleskopsumme: Paare mit Nenner 5, 6 und 7 heben sich auf. Die Anfangsbrüche 1/3 und 1/4 sowie die letzten negativen Brüche 1/8 und 1/9 bleiben in dieser endlichen Teilsumme."><thead><tr><th scope="col">Glied</th>${[3,4,5,6,7,8,9].map(d=>`<th scope="col">${d}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div><div class="visual-legend">${key("keep","Bleibt am Anfang")}${key("pair-5","Paar 5")}${key("pair-6","Paar 6")}${key("pair-7","Paar 7")}${key("tail","Endbrüche")}</div><div class="pair-proof">${[5,6,7].map(d=>`<div class="pair-check pair-${d}">${frac(d,"−")} <span>+</span> ${frac(d)} <span>= 0</span></div>`).join("")}</div><div class="visual-conclusion"><span>Nach dem Kürzen (bis k = 4):</span><span class="visual-math"><span class="keep">${frac(3,"+")} ${frac(4,"+")}</span> <span class="tail">${frac(8,"−")} ${frac(9,"−")}</span></span></div><p class="visual-subtitle">Der äußere Faktor 1/2 gilt für die ganze Summe. Die orangefarbenen Endbrüche bleiben bei dieser Teilsumme stehen, verschwinden aber für N → ∞.</p></div>`;
}
if(name==="quotient"){
return `<div class="study-visual quotient-visual"><div class="visual-heading">Gleiche Faktoren erkennen und kürzen</div><p class="visual-subtitle">Die violetten Faktoren sind identisch. Die blauen Potenzen werden mit der Potenzregel vereinfacht.</p><div class="visual-scroll"><div class="visual-math quotient-equation" aria-label="(k+2)(k+1) q hoch k+1 geteilt durch (k+1)k q hoch k ist gleich (k+2)/k mal q"><span class="stack-fraction wide-fraction"><span><span class="keep">(k+2)</span> <span class="pair-6 cancelled">(k+1)</span> <span class="pair-5">q<sup>k+1</sup></span></span><span><span class="pair-6 cancelled">(k+1)</span> <span class="keep">k</span> <span class="pair-5">q<sup>k</sup></span></span></span><span>=</span><span class="stack-fraction keep"><span>k+2</span><span>k</span></span><span>·</span><span class="pair-5">q</span></div></div><div class="visual-legend">${key("pair-6","Identischer Faktor: kürzen")}${key("pair-5","Potenzregel: q bleibt")}${key("keep","Übrige Faktoren")}</div></div>`;
}
if(name==="taylor-pattern"){
const row=(n,p1,p2,den,cls)=>`<tr><th scope="row">${n}</th><td><span class="pattern-group ${cls}"><i>x</i><sup>${p1}</sup> + <i>x</i><sup>${p2}</sup></span></td><td><span class="pattern-group ${cls}">9<sup>${den}</sup></span></td></tr>`;
return `<div class="study-visual"><div class="visual-heading">Das Muster in Zweiergruppen sehen</div><p class="visual-subtitle">Eine Farbe verbindet jeweils die beiden Potenzen mit ihrem gemeinsamen Nenner.</p><div class="visual-scroll"><table class="pattern-table" aria-label="Taylor-Muster: Zweiergruppen x hoch 2n und x hoch 2n plus 1, Nenner 9 hoch n plus 1"><thead><tr><th scope="col">n</th><th scope="col">Zähler</th><th scope="col">Nenner</th></tr></thead><tbody>${row(0,0,1,1,"pair-5")}${row(1,2,3,2,"pair-6")}${row(2,4,5,3,"pair-7")}${row(3,6,7,4,"tail")}${row("n","2n","2n+1","n+1","keep general-pattern")}</tbody></table></div><p class="visual-subtitle">Die erste Potenz ist immer 2n, die zweite ist 2n+1. Der Nenner beginnt bei 9¹ und wächst zu 9ⁿ⁺¹. Das Minuszeichen steht vor der gesamten Summe.</p></div>`;
}
throw Error("Unknown study visual: "+name);
}
function colorNativeMath(html){return html.replace(/<mi>(q|a|A|B)<\/mi>/g,(_,v)=>`<mi class="math-param-${v}">${v}</mi>`)}
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
if(line.startsWith('@visual ')){html+=studyVisual(line.slice(8));continue;}
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
const page=colorNativeMath(renderPage(read('lernskript.md'),template,math));
const formulaLibrary=renderFormulaLibrary(page,template);
if(errors.length){console.error('Math errors:',errors);process.exit(1)}
fs.writeFileSync(path.join(__dirname,'index.html'),page);
fs.writeFileSync(path.join(__dirname,'formelsammlung.html'),formulaLibrary);
console.log('Rendered',count,'formulas; no MathJax errors.');
