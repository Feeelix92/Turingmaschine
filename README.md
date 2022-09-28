# Turingmaschine
## Projekt als Entwickler starten
1. GitHub Projekt klonen
2. In den Ordner webapp wechseln, `cd webapp` eingeben.
3. Verwendete Packages mit `npm install` installieren.
4. Vite Developer Server mit `npm run dev` starten.
5. Projekt im Browser erreichbar unter http://localhost:3000/

## Projekt für den Betrieb auf einem Server deployen
1. GitHub Projekt klonen, https://github.com/Feeelix92/Turingmaschine
2. In den Ordner webapp wechseln, im Terminal `cd webapp` eingeben.
3. Verwendete Packages mit `npm install` installieren.
4. `npm run build` erzeugt die Anwendung im Projektverzeichnis, im Ordner `build`.
5. Mit `npm run preview` kann die erzeugte Anwendung lokal getestet werden.
6. Die lokale Anwendung ist unter http://localhost:4173 erreichbar.

Weiterführende Informationen zum Deployment sind unter folgendem Link zu finden: https://vitejs.dev/guide/static-deploy.html.
### Ausgabepfad ändern
Der Ausgabepfad der erzeugten Anwendung kann in der Vite Config geändert werden (`/webapp/vite.config.ts`), indem der Pfad unter `outDir: resolve(__dirname, '../webapp/build')` angepasst wird.


### installierte Frameworks/Packages:
- ViteJs, https://vitejs.dev/ mit react-ts
- TailwindCSS, https://tailwindcss.com
- animejs, https://animejs.com/
- partyjs, https://party.js.org/
- react-toastify, https://www.npmjs.com/package/react-toastify 
- party.js, https://party.js.org/ 
- react-burger-menu, https://github.com/negomi/react-burger-menu 


[//]: # (Turing Favicon:)
[//]: # (<a href="https://www.flaticon.com/free-icons/mathematician" title="mathematician icons">Mathematician icons created by Freepik - Flaticon</a>)