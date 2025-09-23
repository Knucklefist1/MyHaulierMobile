# MyHaulier Mobile - Logistik App

En React Native mobil applikation til logistik og transportstyring, udviklet med JavaScript.
## Funktioner

### Screens
1. **LandingScreen** - Roleselektion (Haulier/Freight Forwarder)
2. **HomeScreen** - Hoveddashboard med navigation knapper
3. **TaskListScreen** - Viser en liste af logistikopgaver med status og prioritet
4. **ProfileScreen** - Brugerprofil styring med redigeringsfunktion

### Navigation
- Stack navigation mellem screens
- Funktionelle knapper der navigerer til forskellige screens
- Tilbage navigation support

### Komponenter
- **Opgaveliste**: FlatList der viser logistikopgaver med status indikatorer
- **Profil Styring**: Redigerbar brugerprofil med formular inputs
- **Navigation Knapper**: Funktionelle knapper med korrekt styling

### Styling
- Separat global styles fil (`styles/globalStyles.js`)
- Konsistent farvepalette og typografi
- Responsivt design med korrekt afstand og skygger

## Installation

1. Installer dependencies:
   ```bash
   npm install
   ```

2. Start udviklingsserveren:
   ```bash
   npx expo start --tunnel
   ```

## Projekt Struktur

```
├── App.js                    # Hovedapp med navigation
├── screens/                  # Screen komponenter
│   ├── LandingScreen.js     # Roleselektion
│   ├── HomeScreen.js        # Hoveddashboard
│   ├── TaskListScreen.js    # Opgaveliste med FlatList
│   └── ProfileScreen.js     # Brugerprofil styring
├── styles/                  # Styling filer
│   └── globalStyles.js      # Globale styles
├── assets/                  # Billede assets
│   └── favicon.png
├── package.json
├── app.json
└── babel.config.js
```

## Demo Video

https://youtube.com/shorts/rMpyuuU70mE?feature=share

## Teknisk Implementering

- **React Native** med JavaScript
- **React Navigation** til screen navigation
- **useState** hooks til state management
- **FlatList** til effektiv listegengivelse
- **TouchableOpacity** til interaktive knapper
- **Custom styling** med StyleSheet


- Interaktiv opgaveliste med status indikatorer
- Redigerbar profil med formularvalidering
- Intuitiv navigation mellem screens
- Professionelt logistik-fokuseret design
- Roleselektion for forskellige brugertyper
