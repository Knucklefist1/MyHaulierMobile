# MyHaulier Mobile

En React Native app bygget med Expo, der skal hjælpe vognmænd og speditører med at finde hinanden og administrere deres samarbejde. Appen er stadig i udvikling, men der er en fungerende prototype med lokal datalagring via AsyncStorage.

## Demo

Valdemar: https://youtu.be/ZPyvKncEhJ8  
Rasmus: https://www.youtube.com/watch?v=-r4uQmlC5rY

## Hvad er der i denne version?

Vi har fokuseret på at få de grundlæggende flows til at virke uden at skulle have en fuld backend kørende. Det betyder at alt gemmes lokalt på enheden via AsyncStorage. Det fungerer fint til at teste UI og brugerflow, men vi ved at vi skal have Firebase sat op på et tidspunkt.

### Nye features
- Indstillinger og notifikationer (gemmes lokalt)
- Analytics-skærm med overblik over partnerskaber og nøgletal
- Manage Partnerships hvor man kan oprette og justere partnerskaber
- Bedre navigation med tabs og stacks der faktisk giver mening
- Chat-UI (mock data for nu)

### Tekniske ændringer
- AsyncStorage bruges til at gemme profil, indstillinger og partnerships
- Ryddet op i strukturen så det er lettere at finde rundt
- Fjernet en del Firebase-kode der ikke blev brugt, så appen kan køre uden backend

## Design

Vi har prøvet at holde det professionelt og B2B-agtigt, så det matcher MyHaulier's brand. Det betyder primært blå farver (#1E3A8A), rød til vigtige handlinger (#EF4444), og en del gråtoner til tekst og baggrunde. Vi bruger Inter som skrifttype, og komponenterne er bygget op omkring kort, knapper og formularer der følger samme designprincipper.

## Hvad kan appen?

### For vognmænd
- Se tilgængelige jobs (mock data lige nu)
- Ansøge på jobs
- Administrere profil og tilgængelighed
- Se kort med jobs og partnerskaber

### For speditører
- Oprette jobopslag
- Gennemse ansøgninger
- Se analytics med overblik over partnerskaber og nøgletal
- Administrere partnerships

### Fælles funktioner
- Chat-UI (mock data)
- Lokal authentication (FallbackAuthContext)
- Indstillinger og notifikationer
- Alt gemmes lokalt, så det virker offline

## Teknologier

- React Native med Expo
- React Navigation v6 til navigation
- AsyncStorage til lokal datalagring
- React Context API til state management
- React Native Maps til kortvisning

## Sådan kommer du i gang

Du skal have Node.js (v16 eller nyere) og Expo CLI installeret.

```bash
# Klon repoet
git clone https://github.com/Knucklefist1/MyHaulierMobile/
cd MyHaulierMobile

# Installer dependencies
npm install

# Start udviklingsserveren
npx expo start
```

Fra der kan du vælge at køre på iOS simulator (`i`), Android emulator (`a`), eller scanne QR-koden med Expo Go appen på din telefon.

## Hvordan data gemmes

Alt gemmes lokalt i AsyncStorage. Der er tre hovednøgler vi bruger:

- `user_profile` - Brugerens profil
- `app_settings` - App-indstillinger
- `partnerships` - Partnerships mellem forwarders og hauliers, gemmes som et objekt hvor hver partnership har en unik ID

Hvis du vil se hvordan det bruges, kan du kigge i `utils/storage.js` og i de forskellige screens der gemmer/læser data.

## Projektstruktur

Det meste af koden ligger i `screens/` og `components/`. Navigation er sat op i `navigation/`, og vi har en `styles/` mappe med stylesheets for hver skærm. Services ligger i `services/` og hjælpefunktioner i `utils/`.

Vigtige filer:
- `navigation/ForwarderTabs.js` og `navigation/HaulierTabs.js` - Tab navigation for de to roller
- `screens/forwarder/AnalyticsScreen.js` - Analytics med partnerships
- `screens/forwarder/ManagePartnershipsScreen.js` - Opret/rediger partnerships
- `utils/storage.js` - AsyncStorage wrapper funktioner

## Hvem har lavet hvad?

**Valdemar Andersen**
- ChatScreen implementering
- OffersScreen opdateringer
- AsyncStorage integration i AvailabilityScreen
- Kamerafunktion til profilbillede
- README

**Rasmus Pilemand**
- Find Hauliers med "Match %" og filtre
- Navigation refactoring
- Test build setup
- Dokumentation af tænke-højt-test

## Kørsel

```bash
# Standard
npx expo start

# Med tunnel (hvis du har problemer med netværk)
npx expo start --tunnel

# Direkte til simulator/emulator
npx expo start --ios
npx expo start --android
```
