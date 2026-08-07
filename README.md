# Calcolatrice ☆

Calcolatrice web a tema lilla con modalità scientifica ed animazioni ☆

## Descrizione

Questa è una calcolatrice in HTML, CSS e JavaScript con: 
- tema scuro e pulsanti con accenti lilla
- modalità scientifica espandibile
- funzioni `sin`, `cos`, `tan`, `log`, `√x`, `∛x`, `x²`, `xʸ`
- sfondo con animazione

## Funzionalità principali

- `x²` eleva al quadrato il valore corrente
- `xʸ` permette l’elevazione a potenza
- `%` calcola la percentuale del valore corrente
- `C` resetta la calcolatrice
- `±` cambia il segno
- toggle scientifico mostra/nasconde i pulsanti scientifici

## Anteprima

Apri `index.html` in un browser moderno per visualizzare l’interfaccia.

## Uso locale

### Opzione 1: apri direttamente

1. Apri `index.html` con un browser.
2. Assicurati che `calculator.css`, `calculator.js` e `p5-sketch.js` siano nella stessa cartella.
3. Se hai `Aesthetic_Study.mp4`, lascialo nella stessa cartella se vuoi utilizzare il video di sfondo.

### Opzione 2: server locale

Se il browser blocca il caricamento locale, esegui un server HTTP semplice:

```bash
cd "c:/Users/samnt/OneDrive/Documenti/GITHUB/Calcolatrice"
python -m http.server 8000
```

Poi apri:

```text
http://localhost:8000/index.html
```

## Docker

Il repository include anche un `Dockerfile` per compilare `main.c` con GCC.

### Costruzione immagine

```bash
docker build -t calcolatrice-c .
```

### Esecuzione

```bash
docker run --rm calcolatrice-c
```

## Struttura del progetto

- `index.html` — interfaccia utente della calcolatrice
- `calculator.css` — stili e tema dark/lilla
- `calculator.js` — logica della calcolatrice e toggle scientifico
- `p5-sketch.js` — eventuali effetti grafici / decorazioni
- `Aesthetic_Study.mp4` — video di sfondo locale
- `Dockerfile` — costruzione del progetto `main.c`
- `main.c` — programma C incluso nel repository

## Note

- Se vuoi usare un’immagine invece del video di sfondo, puoi sostituire il file `Aesthetic_Study.mp4` con un file immagine e aggiornare `calculator.css`.
- Il pulsante `scient.` mostra la modalitò scientifica e cambia verso alla freccia quando viene attivata o disattivata.

## Preview

![preview](preview.png) ![preview-scient](preview-scient.png)
