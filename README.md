# Analysis – Mein Lernskript

Deutschsprachige Lernwebsite zur Analysis-Prüfung mit vorgerenderten LaTeX-Formeln, mobiloptimiertem Layout, Hell-/Dunkelmodus und Druckansicht.

**Single Source of Truth:** `lernskript.md` ist die einzige redaktionelle Quelle. `index.html` ist das veröffentlichte, daraus erzeugte Ergebnis. Neue Erklärungen, Aufgaben und persönliche Übungsnotizen werden ausschließlich hier gepflegt, nicht in Google Docs.

## Bearbeiten

- `##` Kapitel, `###` Abschnitt, `$...$` Inline-Mathematik, `$$...$$` Formelzeile, `!$$...$$` hervorgehobenes Ergebnis, `@source` Quellenhinweis.
- `npm install` und `npm run build` ausführen. Änderungen an `lernskript.md` und `index.html` gemeinsam committen.
- `template.html` ist das Layout; `build.cjs` erzeugt die vollständige eigenständige HTML-Seite mit MathJax SVG. Die erzeugte Datei funktioniert ohne externe Bibliotheken.

## Veröffentlichung

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.

Die Website ist öffentlich. Keine privaten Daten, Prüfungsdaten oder Originalprüfungsdateien veröffentlichen.
