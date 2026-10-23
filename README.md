# Zielklinik-Matrix HD – Team-Daten

Dieses Repository versorgt die Zielklinik-Matrix-App (Android + HTML) mit dem gemeinsamen Datenstand.

| Datei | Inhalt | Vertraulich? |
|---|---|---|
| `daten.enc.json` | Klinikdaten, **verschlüsselt** (AES-256-GCM, Schlüssel aus dem Team-Passwort via PBKDF2-SHA256) | nein – ohne Passwort unlesbar |
| `app.json` | Aktuelle App-Version + Download-Link (löst in der App den Update-Hinweis aus) | nein |
| `apk/Zielklinik_Matrix_HD.apk` | Aktuelle Android-App | nein (enthält nur öffentliche Standarddaten) |

## Daten aktualisieren (Pfleger)
1. In der App Daten bearbeiten.
2. Menü **App & Downloads → Team-Sync → 🔐 Sync-Datei erstellen** → `daten.enc.json` wird gespeichert.
3. Hier im Repository **Add file → Upload files**, die Datei hochziehen (ersetzt die alte) → *Commit changes*.
4. Alle Apps holen den neuen Stand beim nächsten Start (bzw. „Jetzt aktualisieren“). GitHub puffert bis zu ca. 5 Minuten.

## Neue App-Version verteilen
1. APK unter `apk/` ersetzen (muss mit dem Team-Schlüssel `zielklinik.jks` signiert sein).
2. In `app.json` `versionCode`/`versionName` auf die Werte der neuen APK setzen.
3. Apps ab 2.3.0 zeigen dann „Jetzt aktualisieren“: Die App lädt die APK selbst, prüft Paketname, Version
   und Signatur und öffnet den Android-Installationsdialog. Fremd signierte APKs werden abgelehnt.

## Passwort ändern
Neues Passwort in der App eingeben, Sync-Datei erstellen, hochladen. Danach müssen alle Nutzer das neue Passwort einmal eingeben.

**Keine unverschlüsselten Klinikdaten oder Backups (.json) in dieses Repository legen!**
