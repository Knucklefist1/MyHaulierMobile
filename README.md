# MyHaulier Mobile (dansk README)

En React Native/Expo mobilapp der forbinder vognmænd og speditører. Denne aflevering fokuserer på lokal persistens via AsyncStorage, et simpelt analyse‑overblik og en letvægts chat‑UI (mock) i et professionelt B2B‑design.

## 📱 Demovideo

Se appen i brug: [MyHaulier Mobile Demo](https://youtu.be/demo-video-link) 

## 🆕 Opgave 2: Nye ting i denne iteration

### Nye skærme og funktioner
- Indstillinger og Notifikationer (gemmes i AsyncStorage)
- Analytics med virksomhedsoverblik (aftalte trucks, gennemsnitsrate m.m.)
- Manage Partnerships: to knapper i Analytics‑delen, der opretter/justerer partnerskaber (gemmes i AsyncStorage)
- Forbedret navigation (stack/tab) og bedre brugerflow

### Tekniske forbedringer
- Kerneindstillinger og partnerskaber gemmes i AsyncStorage
- Strammere struktur på skærme/komponenter
- Fjernet ubrugte Firebase‑dele, så appen kører uden ekstern backend. Det er dog målet at få etableret firebase 

## 🎨 Designsystem

Appen følger et B2B‑design, der matcher MyHaulier:

### Farver
- Primær: Deep blue (#1E3A8A)
- Sekundær: Rød (#EF4444)
- Status: Grøn, Orange, Rød
- Neutrale gråtoner til tekst/baggrunde

### Typografi
- Inter, responsive størrelser, vægte 400–700

### Komponenter
- Kort, knapper (primary/secondary/ghost), formularer med fokus‑tilstande, tabs/stacks

## 🚛 Funktioner

### For vognmænd
- Se jobs (mock), ansøg (mock), profil, kort

### For speditører
- Postings (mock), gennemse ansøgninger (mock), analytics‑overblik

### Fælles
- Lokal auth‑mock (FallbackAuthContext)
- Chat‑UI med mock‑data
- Offline‑venlig via AsyncStorage
- Responsivt og B2B‑orienteret UI

## 🛠 Teknologistak

- Frontend: React Native (Expo)
- Navigation: React Navigation v6
- Persistens: AsyncStorage
- State: React Context API

## 📦 Installation

Forudsætninger:
- Node.js (v16+)
- Expo CLI (`npm install -g @expo/cli`)

1) Klon og installer
```bash
git clone <repository-url>
cd MyHaulierMobile
npm install
```

2) Data (AsyncStorage)
Denne build bruger kun AsyncStorage (ingen ekstern backend).
Moduler:
- `utils/storage.js` (profil, token, indstillinger)
- `screens/forwarder/AnalyticsScreen.js` (læser `partnerships`)
- `screens/forwarder/ManagePartnershipsScreen.js` (opretter/justerer og gemmer `partnerships`)

3) Kør appen
```bash
# Start udviklingsserveren
npx expo start

# Kør på iOS‑simulator
npx expo start --ios

# Kør på Android‑emulator
npx expo start --android
```

## 💾 Data (lokal schema)
AsyncStorage‑nøgler:
- `user_profile`: serialiseret mock‑profil
- `app_settings`: indstillinger
- `partnerships`: objekt‑map, fx `{ ps_123: { forwarderId, status, trucksNeeded: { quantity }, currentRate, ... } }`

## 🔐 Sikkerhed
Ingen ekstern backend i denne build. Data lagres lokalt via AsyncStorage.

## 📂 Struktur (uddrag)

```
navigation/ForwarderTabs.js
screens/forwarder/AnalyticsScreen.js
screens/forwarder/ManagePartnershipsScreen.js
screens/shared/MapScreen.js
utils/storage.js
styles/
```

## 👥 Ansvarsfordeling

- Valdemar Andersen
  - Implementerede ChatScreen
  - Opdaterede OffersScreen, 
  - Integration af AsyncStorage i AvailabilityScreen
  - README-opdatering
  - Implementering af kamerafunktion til profilbillede

- Rasmus Pilemand
  - Udviklede Find Hauliers-udvidelsen med “Match %” og filterfunktion,
  - Refaktorerede navigation,
  - Opsatte testbuild
  - Dokumentation af tænke-højt-forløb.

## 🧪 Udviklingskørsel
```bash
npx expo start --tunnel

eller

npx expo start --ios

eller

npx expo start --android
```

