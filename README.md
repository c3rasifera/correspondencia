# Correspondència Adlitteram · Nadal 2026

Web estàtica HTML/CSS/JS, sense dependències ni compilació. `/` mostra Nadal i `/estiu-2026/` conserva el disseny, fotografies i contingut d’estiu, amb compra tancada i retorn. Els ancoratges antics de la portada s’encaminen a l’arxiu.

## Inscripcions: Google Forms

La portada incrusta el formulari proporcionat per la propietària:
https://docs.google.com/forms/d/e/1FAIpQLSdwlTqS_KxE3WsVtFYU72Q_b54RiWNcvk2uBiC-CfwvEwA2vQ/viewform

Les dades s’envien directament a Google Forms. La web no desa dades en SQLite ni fa peticions a una API pròpia. No cal Python, D1, Workers ni credencials de Google al codi. Hi ha un enllaç alternatiu si el navegador bloqueja l’iframe. Google gestiona validació, consentiment i confirmació; no es mostra un èxit inventat des de la web.

S’han comprovat visualment els camps obligatoris de nom, correu i consentiment i la informació de privacitat del formulari. No s’ha enviat cap resposta ni verificat l’emmagatzematge al compte de la propietària.

### Gestió per la propietària

- A l’editor de Google Forms, obrir **Respostes** per consultar les inscripcions i descarregar-les en CSV.
- Opcionalment, vincular un Google Sheets des de la pestanya Respostes.
- Comprovar que el formulari accepta respostes i es pot obrir sense iniciar sessió. Afegir validació de format de correu si encara no està configurada.
- Google Forms no deduplica automàticament per correu: revisar i eliminar duplicats a la llista d’enviament. No activar «una resposta per persona» si es vol evitar exigir compte Google.
- Conservar una còpia del text del consentiment vigent amb la data de qualsevol canvi. El formulari actual no associa explícitament una versió a cada resposta.
- Configurar el missatge de confirmació al formulari: «Ja formes part de la llista preferent! Moltes gràcies per l’interès. T’escriuré quan Correspondència de Nadal estigui a punt, perquè puguis conèixer tots els detalls abans de l’obertura general.»
- Fer una inscripció de prova i comprovar-la a Respostes abans de publicar.
- Per a baixes o supressió, gestionar la petició a hola@gemmacalmet.cat i eliminar les dades tant de Forms com del full vinculat i dels CSV descarregats. Esborrar una resposta de Forms no elimina necessàriament la fila del full.
- Enviar els correus com fins ara, amb còpia oculta quan s’enviïn a diverses persones i facilitant la baixa. Eliminar la llista activa quan acabin les comunicacions d’aquesta edició.

## Veure el projecte

```sh
python3 -m http.server 8000
```

Obrir http://localhost:8000. El formulari de Google funciona independentment del servidor local. També es conserva `server.py serve` com a visor local, amb permís d’iframe per a Google; l’API antiga retorna 410. Les ordres `export` i `delete` de server.py són només per a possibles dades de l’antiga prova SQLite: no gestionen les respostes de Google Forms. No s’han eliminat bases existents.

## Cloudflare / GitHub Pages

Es pot publicar com a web estàtica. No cal backend ni base de dades pròpia. Incloure únicament `index.html`, `nadal.css`, `nadal.js`, `styles.css`, `script.js`, `privacitat.html`, `avis-legal.html`, `assets/` i `estiu-2026/`. El workflow Pages existent ja selecciona aquests fitxers. A Cloudflare Pages es pot usar un directori de sortida `dist` preparat amb aquesta mateixa llista, sense dependències. Si s’hi defineix una política CSP, ha de permetre `frame-src https://docs.google.com` i les fonts de Google.

No s’ha desplegat. Cal confirmació explícita abans de publicar. El formulari es configura des del compte de la propietària; no s’han canviat opcions, respostes ni permisos de Google. La política de privacitat local reflecteix Google Forms; confirmar les condicions de tractament aplicables al compte i completar les dades legals de titularitat quan correspongui.

## Verificació

Comprovació de sintaxi JS/Python i coherència de l’enllaç incrustat. Lectura del formulari real al navegador. Les proves anteriors de SQLite corresponen al prototip substituït, no a Google Forms. No hi ha compilació ni comprovador de tipus. El disseny propi continua responsive, però la presentació i el comportament dels camps incrustats són els de Google Forms.

## Harmonitzar el tema de Google Forms

A l’editor de Google Forms, obrir la paleta «Personalitza el tema». Triar el verd `#0A3323` com a color del tema i un fons crema clar entre les opcions disponibles. Fer servir una font serif per al títol si està disponible i una sans-serif per a preguntes i respostes. Evitar una imatge de capçalera gran que allargaria el formulari. Els canvis del tema de Google es reflecteixen a l’iframe; el CSS de la landing no modifica l’interior del formulari.
