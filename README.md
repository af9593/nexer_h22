# Hackathon H22 i Helsinborg: Felanmälning
## Steg 1: Felanmälan i app
* Fotografera felet
* Skriv en rubrik
* Skriv en beskrivning
* Lämna position 
* Om QR-kod finns skanna den
  * Om skanning sker i appen fylls alla formulär automatiskt och om du skannar med kamera hamnar du på en hemsida med formuläret ifyllt. Båda sätten kräver manuell bestämning av feltyp.
  * Position, typ (lyktstolpe), område (parkförvaltning) etc. fylls i automagiskt från QR-kod.
  * Välj feltyp i dropdown-lista: (trasig, elektriska komponenter synliga etc.)
  * Finns ingen relevant feltyp så väljer man det och lägger till en beskrivning.
* NFC skanning
  * Samma som att skanna QR-kod.

## Steg 2: Behandling av felanmälan
* NFC/QR-kod anmälningar med feltyp satt får prio automatiskt och kan skickas ut till entreprenör efter en snabb validering och godkännande från KC.
  * Detta skulle kunna skickas iväg automatiskt med en validering från KC i efterhand.
* NFC/QR-kod anmälningar utan feltyp får hanteras manuellt.
* Anmälan med beskrivning och/eller bild så skickas bilden och beskrivningen på bildbehandling samt NLP för att få labels för att sätta prio, feltyp etc. för att automatiskt skicka ut till entreprenör vid hög prio. Detta får manuellt verifieras en period för att bedömma modellens träffsäkerhet.
  * Vi har landat på en GCP-lösning då vi har en sandbox genom Nexer att använda. Bilden laddas upp och körs genom bildbehandling och texten körs genom texbehandling (NLP) och returnerar labels. Dessa körs sedan genom en ML-algoritm för att:
    * Prioritera
    * Sätta feltyp
    * Sätta rätt område (park, väg & vatten etc.)
    * Om tillräckligt många objekt är fotade i staden finns större möjlghet att utvinna position från bilden om position fattas från formuläret.
    * Bestämma rätt entreprenör
      * Om hög träffsäkerhet skickas serviceärendet direkt. (Valideras i efterhand)
  * För att optimera detta krävs dock mer data och träning av modeller.
  * Ett problem med lösningen är att vi i nuläget inte kan analysera svensk text. 
    * Detta är nog bara för vi kör en "out of the box"-lösning på GCP.

## Steg 3: ?????
## Steg 4: Profit

## Figma
*[Figma länk](https://www.figma.com/file/DSJ3b5kp1gJcTOzVlVNK9K/ett-b%C3%A4ttre-helsingborg?node-id=0%3A1)*
![Figma bild](/figma/figma_mockup.png)


## Analysering av data
Analysera alla felänmälningar för att kunna:
* Förutse vilka områden där mer resurser krävs under vissa tidpunkter på året.
  * Är vissa områden mer utsatta än andra?
    * Kan detta förebyggas?
* Förutse behov av service.
* Utvärdera entreprenörer
  * Hanteringstid av ärenden.
* Utvärdera leverantörer om produkter från samma leverantör ofta går sönder.
* Finns säkert mycket mer man kan använda denna datan till som vi inte kommer på i nuläget.
