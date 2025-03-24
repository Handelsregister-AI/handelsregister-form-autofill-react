# Handelsregister Form Autofill

Dieses Projekt demonstriert, wie man mit React ein Formular automatisch mit Unternehmensdaten aus der Handelsregister.ai API befüllen kann.

## Features

- Unternehmensuche nach Namen
- Automatisches Anreichern mit Daten aus dem Handelsregister 


## Installation und Start

1. Repository klonen
```bash
git clone https://github.com/Handelsregister-AI/handelsregister-form-autofill-react.git
cd handelsregister-form-autofill-react
```

2. Abhängigkeiten installieren
```bash
npm install
```

3. Entwicklungsserver starten
```bash
npm start
```

4. Die Anwendung wird unter [http://localhost:3000](http://localhost:3000) geöffnet

## API-Konfiguration

Um die handelsregister.ai API zu nutzen, benötigst du einen API-Schlüssel. Du kannst dich kostenlos auf [handelsregister.ai](https://handelsregister.ai) registrieren und dort in deinem Account-Bereich einen persönlichen API-Schlüssel generieren.

Erstelle danach eine `.env`-Datei im Root-Verzeichnis des Projekts und füge deinen API-Schlüssel hinzu:

```
REACT_APP_API_KEY=DeinAPISchlüssel
```

## Verwendung

1. Gib den Firmennamen im Suchfeld ein
2. Das Formular wird automatisch mit den verfügbaren Unternehmensdaten befüllt

## Warum mit die API von handelsregister.ai nutzen?

Die Integration von handelsregister.ai in deine Anwendung bietet zahlreiche Vorteile:

- **Zeitersparnis durch Automatisierung**: Spare wertvolle Zeit bei der Erfassung von Unternehmensdaten durch automatisches Befüllen von Formularen.
- **Höchste Datenqualität**: Greife direkt auf offizielle Handelsregistereinträge zu und minimiere Fehler bei der Dateneingabe.
- **Immer aktuelle Daten**: Die API bietet stets aktuelle Informationen aus dem Handelsregister, ohne manuelle Nachforschungen.
- **Umfassende Unternehmensinformationen**: Erhalte detaillierte Daten wie Firmenname, Rechtsform, Adresse, Vertretungsberechtigte und mehr.
- **Einfache Integration**: Die API lässt sich problemlos in bestehende Systeme und Workflows integrieren.
- **Compliance-Unterstützung**: Vereinfache die Einhaltung von KYC- und Compliance-Anforderungen durch zuverlässige Unternehmensdaten.
- **Kosteneffizient**: Reduziere den Aufwand für manuelle Datenrecherche und -eingabe erheblich.
- **Verbesserte Benutzerfreundlichkeit**: Biete deinen Nutzern ein reibungsloses Erlebnis durch automatisch befüllte Formulare.

Diese Demo-Anwendung zeigt, wie einfach du die leistungsstarke handelsregister.ai API in deine eigenen Projekte integrieren kannst.

## Technologien

- React.js
- Axios für API-Anfragen
- CSS für das Styling

## License

This project is licensed under the MIT License. See the LICENSE file for details.