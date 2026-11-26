# Analysis – Mein Lernskript
@subtitle Mündliche Wiederholungsprüfung
Mein Ziel: Ich möchte nicht nur Formeln auswendig lernen, sondern verstehen, was ich berechne, warum ich es berechne und wie ich bei einer anderen Aufgabenstellung selbstständig vorgehen kann.
## Aufgabe 1A – Geometrische Reihe
### Aufgabenstellung
„Man bestimme die Werte folgender beider Reihen.“ (Teil A)
$$S=\sum_{k=0}^{\infty}\frac{(-5)^{2k-3}}{4^{3\cdot k\cdot 2}}$$
### Was wollen wir herausfinden?
Wir wollen wissen, ob die Reihe konvergiert und gegen welchen Wert sie konvergiert. Das heißt: Wenn wir unendlich viele Glieder addieren, gegen welche Zahl nähert sich die Summe an?
### 1. Die Reihe erkennen
Zuerst müssen wir identifizieren, was für eine Reihe vorliegt. In diesem Fall ist es eine geometrische Reihe. Wir wollen unseren Ausdruck in die Form $a\cdot q^k$ bringen, damit wir $a$ und $q$ erkennen können.
$$S=\sum_{k=0}^{\infty}a\cdot q^k=\frac{a}{1-q},\qquad |q|<1$$
$a$ ist das erste Reihenglied (bei $k=0$), $q$ ist der Faktor, mit dem wir von einem Glied zum nächsten kommen.
### 2. Vereinfachen und a sowie q finden
$$(-5)^{2k-3}=\frac{(-5)^{2k}}{(-5)^3}=\frac{25^k}{-125}$$
$$4^{3\cdot k\cdot 2}=4^{6k}=(4^6)^k=4096^k$$
$$\frac{25^k}{-125\cdot4096^k}=-\frac{1}{125}\left(\frac{25}{4096}\right)^k$$
$$\boxed{a=-\frac{1}{125}},\qquad\boxed{q=\frac{25}{4096}}$$
### 3. Konvergenz prüfen und S berechnen
Nachdem wir $a$ und $q$ gefunden haben, prüfen wir zuerst, ob $|q|<1$ gilt. Erst dann dürfen wir die Formel für die unendliche geometrische Reihe verwenden.
$$\left|\frac{25}{4096}\right|<1\quad\Longrightarrow\quad\text{Die Reihe konvergiert.}$$
$$S=\frac{-\frac{1}{125}}{1-\frac{25}{4096}}$$
$$S=-\frac{1}{125}\cdot\frac{4096}{4071}$$
!$$S=-\frac{4096}{508875}\approx-0{,}008049$$
Das Ergebnis ist der Wert, dem sich die Summe immer weiter annähert, wenn wir immer mehr Glieder addieren.
## Aufgabe 1B – Partialbruchzerlegung und Teleskopsumme
### Aufgabenstellung
$$S=\sum_{k=0}^{\infty}\frac{1}{(k+3)(k+5)}$$
### 1. Partialbruchzerlegung
Wir haben im Nenner ein Produkt aus zwei Faktoren: $(k+3)$ und $(k+5)$. Wir schreiben den ursprünglichen Bruch als Summe zweier Brüche und suchen die unbekannten Koeffizienten $A$ und $B$.
Allgemein:
$$\frac{1}{(k+a)(k+b)}=\frac{A}{k+a}+\frac{B}{k+b}$$
$$\frac{1}{(k+3)(k+5)}=\frac{A}{k+3}+\frac{B}{k+5}$$
Wir multiplizieren beide Seiten mit dem gemeinsamen Nenner, damit die Brüche verschwinden.
$$1=A(k+5)+B(k+3)$$
Um $A$ und $B$ zu finden, setzen wir die Werte für $k$ ein, bei denen jeweils eine Klammer null wird. So bleibt immer nur eine Unbekannte übrig.
$$k=-3:\quad 1=A\cdot2+B\cdot0\quad\Rightarrow\quad A=\frac12$$
$$k=-5:\quad 1=A\cdot0+B\cdot(-2)\quad\Rightarrow\quad B=-\frac12$$
Jetzt setzen wir $A$ und $B$ in die Partialbruchzerlegung ein und klammern $1/2$ aus.
$$\frac{1}{(k+3)(k+5)}=\frac12\left(\frac1{k+3}-\frac1{k+5}\right)$$
### 2. Teleskop: Die ersten Brüche finden, die übrig bleiben
Wir schreiben die ersten Glieder aus, um zu sehen, welche Brüche sich gegenseitig aufheben. Das funktioniert wie eine Treppe: Ein negativer Bruch taucht weiter unten wieder als positiver Bruch auf.
$$\begin{array}{r|rrrrrrr}k=0&+\frac13&&-\frac15\\[5pt]k=1&&+\frac14&&-\frac16\\[5pt]k=2&&&+\frac15&&-\frac17\\[5pt]k=3&&&&+\frac16&&-\frac18\\[5pt]k=4&&&&&+\frac17&&-\frac19\end{array}$$
Beispiel: $-\frac15+\frac15=0$; $-\frac16+\frac16=0$; $-\frac17+\frac17=0$. Das Muster setzt sich fort. Der Faktor $\frac12$ steht vor der gesamten Summe.
Am Anfang bleiben nur $+\frac13$ und $+\frac14$ übrig.
Wichtig: Am Anfang interessieren uns nur die ersten Brüche, die nicht wegfallen. Sobald wir diese erkannt haben, konzentrieren wir uns ausschließlich auf die letzten Brüche mit $N$.
### 3. Die letzten Brüche mit N finden
Wir berechnen die Differenz zwischen den beiden Verschiebungen:
$$d=b-a=5-3=2$$
Deshalb bleiben am Anfang zwei positive und am Ende zwei negative Brüche übrig (für $N\ge1$).
Die Teilsumme $S_N$ endet bei $k=N$. Weil zwei negative Brüche übrig bleiben, setzen wir in den negativen Bruch $-\frac1{k+5}$ die letzten zwei $k$-Werte ein: $N-1$ und $N$.
$$k=N-1:\quad -\frac1{(N-1)+5}=-\frac1{N+4}$$
$$k=N:\quad -\frac1{N+5}$$
$$S_N=\frac12\left(\frac13+\frac14-\frac1{N+4}-\frac1{N+5}\right)$$
#### Allgemeines Muster
Bei $d=b-a>0$ betrachten wir die letzten $d$ Indizes: $N-(d-1),\ldots,N-2,N-1,N$. Bei $d=1$ nur $N$; bei $d=2$ die Werte $N-1,N$; bei $d=3$ die Werte $N-2,N-1,N$. Die Anzahl der letzten Brüche ist genau $d$ (wenn genügend Glieder vorhanden sind).
Beispiel $d=3$: $-\frac1{k+6}$, $k=N-2,N-1,N$.
$$\Rightarrow -\frac1{N+4},\quad-\frac1{N+5},\quad-\frac1{N+6}$$
### 4. Den Grenzwert berechnen
Jetzt betrachten wir die unendliche Reihe. Dafür lassen wir $N$ gegen unendlich gehen. Die ersten beiden Brüche sind konstant und bleiben stehen. Nur die letzten Brüche hängen von $N$ ab.
$$\lim_{N\to\infty}\frac1{N+4}=0$$
$$\lim_{N\to\infty}\frac1{N+5}=0$$
Wir ersetzen die Grenzwerte in der Teilsumme durch null und berechnen die verbleibenden Brüche.
$$S=\lim_{N\to\infty}S_N=\frac12\left(\frac13+\frac14-0-0\right)$$
$$S=\frac12\left(\frac4{12}+\frac3{12}\right)=\frac12\cdot\frac7{12}$$
!$$S=\frac7{24}\approx0{,}2917$$
Das ist der Wert, gegen den die unendliche Reihe konvergiert.
### Mein Schema für die Prüfung
Partialbruchzerlegung → A und B berechnen → erste Glieder ausschreiben → nicht wegfallende Anfangsbrüche finden → Differenz d bestimmen → letzte d Indizes einsetzen → Grenzwert bilden → übrige Brüche addieren.
@source Grundlage: analysis(3).pdf, Seiten 3–8. Persönliche Erklärung in eigenen Worten, sprachlich und mathematisch präzisiert.
## Aufgabe 2 – Quotientenkriterium
### Aufgabenstellung
Man überprüfe mit dem Quotientenkriterium, für welche Zahlen q folgende Reihe konvergiert.
$$\sum_{k=0}^{\infty}(k+1)\cdot k\cdot q^k$$
### 1. Was wollen wir herausfinden?
Wir wollen nicht den Wert der Summe berechnen, sondern herausfinden, für welche Werte von $q$ die Summe endlich bleibt bzw. konvergiert. $q$ ist der unbekannte Parameter, $k$ läuft gegen unendlich.
Das Quotientenkriterium untersucht, wie stark sich der Betrag eines Gliedes im Vergleich zum vorherigen Glied langfristig verändert.
$$\boxed{L=\lim_{k\to\infty}\left|\frac{a_{k+1}}{a_k}\right|}$$
$$\begin{array}{ll}L<1&\text{absolut konvergent}\\ L>1&\text{divergent}\\ L=1&\text{keine Aussage möglich}\end{array}$$
Bei $L=1$ den Randfall separat prüfen.
### 2. Den Grenzwert L berechnen
$$a_k=(k+1)\cdot k\cdot q^k$$
$$a_{k+1}=(k+2)\cdot(k+1)\cdot q^{k+1}$$
Wir ersetzen jedes $k$ durch $k+1$, um das nächste Glied zu erhalten. Dann teilen wir das nächste Glied durch das aktuelle Glied und vereinfachen (für $q\neq0$ und $k\ge1$).
$$\begin{aligned}L&=\lim_{k\to\infty}\left|\frac{(k+2)(k+1)q^{k+1}}{(k+1)kq^k}\right|\\[6pt]&=\lim_{k\to\infty}\left|\frac{k+2}{k}\cdot q\right|\\[6pt]&=\lim_{k\to\infty}\left|\left(1+\frac2k\right)\cdot q\right|\end{aligned}$$
$2/k$ geht gegen null, weil $k$ immer größer wird. $q$ bleibt konstant, solange wir den Grenzwert berechnen.
!$$L=|q|$$
### 3. Was mache ich mit L = |q|?
Das ist der entscheidende Schritt: Ich habe L berechnet. Jetzt setze ich das Ergebnis einfach in die feste Regel $L<1$ ein. Ich muss keinen weiteren Grenzwert berechnen.
$$L<1\quad\Rightarrow\quad |q|<1\quad\Rightarrow\quad -1<q<1$$
Der Betrag bedeutet Abstand von null. Deshalb gehören sowohl negative als auch positive Zahlen zwischen −1 und 1 zum Intervall.
### Übungsbeispiele: L in die Regel einsetzen
$$\begin{aligned}L=|2q|&\Rightarrow |2q|<1\\&\Rightarrow |q|<\frac12\\&\Rightarrow -\frac12<q<\frac12\end{aligned}$$
$$\begin{aligned}L=|5q|&\Rightarrow |5q|<1\\&\Rightarrow |q|<\frac15\\&\Rightarrow -\frac15<q<\frac15\end{aligned}$$
$$\begin{aligned}L=|4q|&\Rightarrow |4q|<1\\&\Rightarrow |q|<\frac14\\&\Rightarrow -\frac14<q<\frac14\end{aligned}$$
Merke: Den Betrag nicht weglassen! Sonst würde ich fälschlicherweise auch sehr große negative Zahlen zulassen.
Für die Originalaufgabe: $-1<q<1$ ($q=0$ ergibt direkt die Nullreihe).
Für $|q|>1$ ist die Reihe divergent. Die beiden Randfälle $q=-1$ und $q=1$ müssen noch separat untersucht werden, da dort $L=1$ gilt.
@source Grundlage: analysis(3).pdf, Seiten 9–12. Zusätzliche Übungsbeispiele aus unserer Besprechung.
### Ergänzung zu Aufgabe 2: Randfälle
Bei $q=1$ und $q=-1$ gilt $L=|q|=1$. Das Quotientenkriterium liefert hier keine Aussage. Deshalb setze ich beide Werte in das ursprüngliche Reihenglied $a_k=(k+1)kq^k$ ein.
$$q=1:\quad a_k=(k+1)k\quad\longrightarrow\quad 0,2,6,12,20,\ldots$$
$$q=-1:\quad a_k=(k+1)k(-1)^k\quad\longrightarrow\quad 0,-2,6,-12,20,\ldots$$
In beiden Fällen gehen die einzelnen Glieder nicht gegen null. Nach dem Nullfolgenkriterium divergiert die Reihe. Dass Glieder gegen null gehen, wäre dagegen allein noch kein Beweis für Konvergenz.
!$$q\in(-1,1)$$
## Aufgabe 3 – Regel von L'Hospital
### Aufgabenstellung
Mit der Regel von L'Hospital bestimme man den Wert von folgendem unbestimmten Ausdruck.
$$\lim_{x\to0}\frac{x\cdot\sin(x)}{\cos(x)-1}$$
### 1. Was ist das Ziel?
Ich will den Grenzwert eines Bruchs berechnen. Zuerst setze ich den Wert ein, gegen den x läuft. Hier gilt $\sin(0)=0$ und $\cos(0)=1$.
$$\frac{0\cdot\sin(0)}{\cos(0)-1}=\frac00$$
$0/0$ ist ein unbestimmter Ausdruck. Bei $0/0$ oder $\infty/\infty$ kann ich unter den Voraussetzungen von L'Hospital den Zähler und den Nenner getrennt ableiten. Ich verwende NICHT die Quotientenregel.
$$\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)}$$
### 2. Erste Ableitung
$$f(x)=x\sin(x),\qquad g(x)=\cos(x)-1$$
Im Zähler brauche ich die Produktregel: $(u\cdot v)'=u'v+uv'$.
$$f'(x)=1\cdot\sin(x)+x\cos(x)=\sin(x)+x\cos(x)$$
$$g'(x)=-\sin(x)$$
$$\lim_{x\to0}\frac{\sin(x)+x\cos(x)}{-\sin(x)}$$
$$\frac{0+0\cdot1}{-0}=\frac00$$
Es ist immer noch $0/0$. Daher darf ich die Regel erneut anwenden.
### 3. Zweite Ableitung
$$f''(x)=\cos(x)+\cos(x)-x\sin(x)=2\cos(x)-x\sin(x)$$
$$g''(x)=-\cos(x)$$
$$\lim_{x\to0}\frac{2\cos(x)-x\sin(x)}{-\cos(x)}$$
$$=\frac{2\cdot1-0\cdot0}{-1}$$
!$$\boxed{-2}$$
Mein Schema: Einsetzen → unbestimmten Ausdruck erkennen → Zähler und Nenner getrennt ableiten → erneut einsetzen → bei Bedarf wiederholen.
@source Grundlage: analysis(3).pdf, Seiten 13–16.
## Aufgabe 4 – Taylor-Reihe
### Aufgabenstellung
Man entwickle die rationale Funktion h(x) an der Stelle 0 in einer Taylor-Reihe.
$$h(x)=\frac{x+1}{(x+3)(x-3)}$$
### 1. Was will ich überhaupt berechnen?
Ich will eine Funktion in eine unendliche Summe von Potenzen von x umwandeln. Das Ergebnis ist keine einzelne Zahl, sondern eine andere Darstellung derselben Funktion innerhalb des Konvergenzbereichs.
$$h(x)=a_0+a_1x+a_2x^2+a_3x^3+\cdots$$
Die allgemeine Taylor-Formel an der Entwicklungsstelle 0 lautet (wenn die Taylor-Reihe die Funktion darstellt):
$$\boxed{f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(0)}{n!}\cdot x^n}$$
$f^{(n)}(0)$ bedeutet: n-mal ableiten und erst dann $x=0$ einsetzen. Bei $n=0$ nehme ich die ursprüngliche Funktion. $n!$ ist die Fakultät, und $0!=1$. Das $x^n$ am Ende bleibt stehen.
### Beispiel: Taylor-Reihe von eˣ
Bei $f(x)=e^x$ sind alle Ableitungen wieder $e^x$. Wenn ich darin $x=0$ einsetze, erhalte ich immer $e^0=1$.
$$n=0:\quad\frac{f(0)}{0!}x^0=\frac11\cdot1=1$$
$$n=1:\quad\frac{f'(0)}{1!}x=\frac11\cdot x=x$$
$$n=2:\quad\frac{f''(0)}{2!}x^2=\frac{x^2}{2}$$
$$n=3:\quad\frac{f'''(0)}{3!}x^3=\frac{x^3}{6}$$
$$n=4:\quad\frac{f^{(4)}(0)}{4!}x^4=\frac{x^4}{24}$$
!$$e^x=1+x+\frac{x^2}{2}+\frac{x^3}{6}+\frac{x^4}{24}+\cdots$$
Bei unserer Prüfungsaufgabe gibt es aber einen viel einfacheren Weg: Wir können eine bereits bekannte Reihe verwenden, statt viele komplizierte Ableitungen zu berechnen.
### 2. Warum sind die geometrische Reihe und der Bruch gleich?
Das war der wichtigste Punkt, den ich zuerst verstehen musste. Die Summe ist nicht eine unendliche Addition von $1/(1-q)$. Es ist die Summe von $q^n$. Der Bruch $1/(1-q)$ ist das Ergebnis dieser Summe.
$$\underbrace{\sum_{n=0}^{\infty}q^n}_{\text{Summe}}=\underbrace{1+q+q^2+q^3+\cdots}_{\text{Ausgeschrieben}}=\underbrace{\frac1{1-q}}_{\text{Ergebnis}},\qquad |q|<1$$
Woher kommt die Formel? Ich nehme zunächst eine endliche Summe bis N und multipliziere sie mit q. Dann subtrahiere ich beide Gleichungen.
$$\begin{array}{rcl}S_N&=&1+q+q^2+\cdots+q^N\\ qS_N&=&\phantom{1+{}}q+q^2+\cdots+q^N+q^{N+1}\end{array}$$
$$S_N-qS_N=1-q^{N+1}$$
$$S_N(1-q)=1-q^{N+1}$$
$$S_N=\frac{1-q^{N+1}}{1-q}$$
Wenn $|q|<1$, geht $q^{N+1}$ für $N\to\infty$ gegen null. Deshalb bleibt nur der Bruch $1/(1-q)$ übrig.
!$$S=\frac1{1-q}$$
Konkretes Zahlenbeispiel: $q=\frac12$. Die Summe $1+\frac12+\frac14+\frac18+\cdots$ nähert sich immer weiter der Zahl 2. Der Bruch ergibt genau dasselbe:
$$\frac1{1-\frac12}=2$$
In Aufgabe 1 haben wir eine unendliche Summe in einen Bruch umgewandelt. In Aufgabe 4 machen wir das Gegenteil. Es ist dieselbe Formel, nur in die andere Richtung.
### 3. Wie erkenne ich q?
$q$ ist hier einfach ein Platzhalter für den gesamten Ausdruck, der nach der 1 mit einem Minuszeichen im Nenner steht. Wenn ich $q$ erkenne, setze ich diesen Ausdruck in jedes $q^n$ der geometrischen Reihe ein.
$$\frac1{1-x}:\quad q=x\quad\Rightarrow\quad 1+x+x^2+x^3+\cdots$$
$$\begin{aligned}\frac1{1-2x}:\quad q&=2x\\&\Rightarrow 1+(2x)+(2x)^2+\cdots\\&=1+2x+4x^2+\cdots\end{aligned}$$
$$\begin{aligned}\frac1{1-x^2}:\quad q&=x^2\\&\Rightarrow 1+(x^2)+(x^2)^2+\cdots\\&=1+x^2+x^4+\cdots\end{aligned}$$
Diese Gleichheiten gelten jeweils nur für $|q|<1$. Ich ersetze zuerst q in der Summe und entwickle dann die einzelnen Summenglieder für $n=0,1,2,\ldots$
### 4. Originalaufgabe: Nenner umformen
$$h(x)=\frac{x+1}{(x+3)(x-3)}$$
Ich brauche die Form $1/(1-q)$. Zuerst multipliziere ich den Nenner aus. Die binomische Formel $(a+b)(a-b)=a^2-b^2$ hilft dabei.
$$(x+3)(x-3)=x^2-9$$
$$h(x)=\frac{x+1}{x^2-9}$$
Jetzt klammere ich −9 aus, weil ich im Nenner eine 1 haben möchte.
$$x^2-9=-9\left(1-\frac{x^2}{9}\right)$$
Kontrolle: $-9\cdot1=-9$ und $-9\cdot\left(-\frac{x^2}{9}\right)=x^2$. Die Umformung ist also richtig.
$$h(x)=\frac{x+1}{-9\left(1-\frac{x^2}{9}\right)}$$
$$h(x)=\underbrace{-\frac{x+1}{9}}_{\text{stehen lassen}}\cdot\underbrace{\frac1{1-\frac{x^2}{9}}}_{\text{Reihe}}$$
Den ersten Faktor $-(x+1)/9$ lasse ich vorerst stehen. Nur den zweiten Faktor wandle ich in eine Reihe um.
### 5. q identifizieren und einsetzen
$$\begin{aligned}\text{Allgemeine Formel:}&\quad \frac1{1-\color{#487fc1}{q}}\\[8pt]\text{Unsere Funktion:}&\quad\frac1{1-\color{#487fc1}{\frac{x^2}{9}}}\end{aligned}$$
!$$q=\frac{x^2}{9}$$
Das q wird nicht extra berechnet. Ich erkenne es durch direkten Vergleich der beiden Nenner. Genau dieses q verwende ich später auch für den Konvergenzradius.
$$\frac1{1-\frac{x^2}{9}}=\sum_{n=0}^{\infty}\left(\frac{x^2}{9}\right)^n$$
$$\begin{array}{rcl}n=0:&\left(\frac{x^2}{9}\right)^0&=1\\[5pt]n=1:&\left(\frac{x^2}{9}\right)^1&=\frac{x^2}{9}\\[5pt]n=2:&\left(\frac{x^2}{9}\right)^2&=\frac{x^4}{81}\\[5pt]n=3:&\left(\frac{x^2}{9}\right)^3&=\frac{x^6}{729}\end{array}$$
$$\frac1{1-\frac{x^2}{9}}=1+\frac{x^2}{9}+\frac{x^4}{81}+\frac{x^6}{729}+\cdots$$
Jetzt hole ich den ersten Faktor wieder dazu.
$$h(x)=-\frac{x+1}{9}\left(1+\frac{x^2}{9}+\frac{x^4}{81}+\cdots\right)$$
### 6. Ausmultiplizieren
$$h(x)=-\frac19(x+1)\left(1+\frac{x^2}{9}+\frac{x^4}{81}+\cdots\right)$$
Ich multipliziere $x+1$ mit jedem einzelnen Summenglied. Den Faktor $-1/9$ lasse ich bis zum Schluss außen stehen.
$$(x+1)\cdot1=x+1$$
$$(x+1)\cdot\frac{x^2}{9}=\frac{x^3}{9}+\frac{x^2}{9}$$
$$(x+1)\cdot\frac{x^4}{81}=\frac{x^5}{81}+\frac{x^4}{81}$$
$$h(x)=-\frac19\left(1+x+\frac{x^2}{9}+\frac{x^3}{9}+\frac{x^4}{81}+\frac{x^5}{81}+\cdots\right)$$
Jetzt multipliziere ich jedes Glied mit $-1/9$.
!$$h(x)=-\frac19-\frac{x}{9}-\frac{x^2}{81}-\frac{x^3}{81}-\frac{x^4}{729}-\frac{x^5}{729}-\cdots$$
### 7. Muster erkennen und als Summe schreiben
Die Exponenten im Zähler steigen um eins. Jeweils zwei aufeinanderfolgende Potenzen haben denselben Nenner. Ich gruppiere die Glieder paarweise und erkenne die allgemeine Form.
$$\begin{array}{c|c|c} n&\text{Zähler}&\text{Nenner}\\\hline0&x^0+x^1&9^1\\1&x^2+x^3&9^2\\2&x^4+x^5&9^3\\3&x^6+x^7&9^4\\\hline n&x^{2n}+x^{2n+1}&9^{n+1}\end{array}$$
$$\text{Allgemein:}\quad\frac{x^{2n}+x^{2n+1}}{9^{n+1}}$$
!$$h(x)=-\sum_{n=0}^{\infty}\frac{x^{2n}+x^{2n+1}}{9^{n+1}}$$
### 8. Konvergenzradius berechnen
Die geometrische Formel gilt nur, wenn $|q|<1$. Woher kommt q? Aus Schritt 5: Dort habe ich $1/(1-x^2/9)$ mit $1/(1-q)$ verglichen.
$$q=\frac{x^2}{9}$$
$$|q|<1$$
$$\left|\frac{x^2}{9}\right|<1$$
Da $x^2$ nicht negativ sein kann, kann ich den Betrag hier weglassen. Dann multipliziere ich mit 9.
$$\frac{x^2}{9}<1\quad\Rightarrow\quad x^2<9\quad\Rightarrow\quad |x|<3\quad\Rightarrow\quad -3<x<3$$
Bei $x=\pm3$ ist der ursprüngliche Nenner null; auch die Reihenglieder gehen dort nicht gegen null. Die Randpunkte gehören nicht zum Konvergenzintervall.
!$$x\in(-3,3),\qquad R=3$$
### Mein Schema für die Prüfung
Nenner vereinfachen → konstanten Faktor ausklammern → Form $1/(1-q)$ erkennen → q identifizieren → geometrische Reihe einsetzen → Potenzen vereinfachen → ausmultiplizieren → Muster als Summe schreiben → $|q|<1$ lösen und Randpunkte prüfen.
@source Grundlage: analysis(3).pdf, Seiten 17–21. Herleitung der geometrischen Formel und Beispiele aus unserer Besprechung.
### Persönlicher Übungsbedarf – Aufgabe 4
Ich habe die Idee und die Formeln der Taylor-Reihe verstanden. Meine Schwierigkeiten liegen noch in zwei konkreten Rechenschritten. Diese trainiere ich gezielt, nachdem ich alle sieben Prüfungsaufgaben verstanden habe.
#### 1. Brüche in die Form a/(1−q) umformen (hohe Priorität)
Ausklammern, Vorzeichen, binomische Formeln und Brüche umformen, bis im Nenner $1-q$ steht. Anschließend a (bzw. den äußeren Faktor) und q selbstständig erkennen. Der äußere Faktor darf auch von x abhängen.
$$\frac{x+1}{x^2-9}=-\frac{x+1}{9}\cdot\frac1{1-\frac{x^2}{9}}$$
#### 2. Muster erkennen und die Summenformel selbst aufstellen (hohe Priorität)
Aus ausgeschriebenen Taylor-Reihen die Regel für die Exponenten, Nenner, Vorzeichen und wiederkehrenden Gruppen ableiten. Die ersten Glieder mit $n=0,1,2,\ldots$ beschriften, eine allgemeine Formel in n finden und durch Einsetzen überprüfen.
$$-\frac19-\frac{x}{9}-\frac{x^2}{81}-\frac{x^3}{81}-\frac{x^4}{729}-\frac{x^5}{729}-\cdots$$
$$\Downarrow\quad\text{paarweise gruppieren}$$
$$-\sum_{n=0}^{\infty}\frac{x^{2n}+x^{2n+1}}{9^{n+1}}$$
Trainingsziel: Beide Schritte ohne Lösungsvorlage und auch bei veränderten Aufgaben sicher durchführen. Jetzt zunächst mit Aufgabe 5 fortfahren.
