# Analysis – Mein Lernskript

Deutschsprachige Lernwebsite zur Analysis-Prüfung mit vorgerenderten LaTeX-Formeln, mobiloptimiertem Layout, Hell-/Dunkelmodus und Druckansicht.

**Single Source of Truth:** `lernskript.md` ist die einzige redaktionelle Quelle. `index.html` (Lernskript) und `formelsammlung.html` (zentrale Formelübersicht) werden daraus erzeugt. Die Formelübersicht übernimmt automatisch die allgemeinen Formelblöcke sämtlicher Kapitel; sie wird nicht separat gepflegt. Neue Erklärungen, Aufgaben und persönliche Übungsnotizen werden ausschließlich hier gepflegt, nicht in Google Docs.

## Bearbeiten

- `##` Kapitel, `###` Abschnitt, `$...$` Inline-Mathematik, `$$...$$` Formelzeile, `!$$...$$` hervorgehobenes Ergebnis, `@source` Quellenhinweis. `@formulas` und `@endformulas` begrenzen die allgemeine Formelsammlung eines Kapitels; `@rule` kennzeichnet einzelne Regeln.
- `npm install` und `npm run build` ausführen. Änderungen an `lernskript.md` sowie beide erzeugten HTML-Seiten gemeinsam committen.
- `template.html` ist das Layout; `build.cjs` erzeugt die beiden vollständigen eigenständigen HTML-Seiten mit MathJax SVG. Jede erzeugte Datei funktioniert ohne externe Bibliotheken.

## Veröffentlichung

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.

Die Website ist öffentlich. Keine privaten Daten, Prüfungsdaten oder Originalprüfungsdateien veröffentlichen.
