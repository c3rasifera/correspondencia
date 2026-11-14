# Nadal 2026 · desenvolupament

Aquesta carpeta conté la pàgina independent de venda de Nadal 2026. La referència i els originals són a `../assets/nadal-26/` (aquest és el nom real de la carpeta al repositori). El HERO fa servir `assets/images/matge-hero-nadal-26.png`, el PNG proporcionat per a la composició final; s'ha copiat sense retallar ni alterar-lo. `hero-referencia.png` es conserva només com a referència visual.

## Previsualització local

Des de la carpeta arrel del repositori, executa:

```sh
python3 -m http.server 8000
```

Després obre <http://localhost:8000/nadal-2026/>. Atura el servidor amb `Ctrl+C`.

## Recursos

- `styles.css` i `script.js` són exclusius d'aquesta edició.
- `assets/images/` conté els recursos optimitzats d'aquesta pàgina.
- `assets/fonts/` és per als fitxers tipogràfics locals.
- Les rutes de la pàgina són relatives (`./styles.css`, `./assets/...`). Quan el contingut es traslladi a l'arrel del domini, les mateixes rutes apuntaran als recursos de l'arrel.
- Els originals de `../assets/nadal-26/` s'han preservat. La còpia del producte s'ha reduït a 1272 × 1800 px i manté transparència perquè el fons crema es vegi al voltant de la composició.
- Les metadades `noindex` es mantindran durant la previsualització. No s'ha configurat cap publicació d'aquesta carpeta.
- El CTA principal porta a la secció de compra pendent; no hi ha cap enllaç de pagament ni recollida de dades.
- Les seccions indiquen com a pendents el preu, les dates d'enviament i les condicions comercials encara no confirmades.
