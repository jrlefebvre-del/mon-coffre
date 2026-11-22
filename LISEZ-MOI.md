# Mon Coffre — version web installable (PWA)

Même usage que l'app Xcode, mais sans Xcode ni câble : on l'installe depuis Safari.

## Contenu du dossier
- `index.html` : toute l'application.
- `manifest.webmanifest`, `icons/` : nom et icône sur l'écran d'accueil.
- `sw.js` : garde l'application disponible sans connexion. **Changer `VERSION` à chaque mise à jour.**

## Installer sur l'iPhone
1. Mettre ces fichiers en ligne sur une adresse **https://** (obligatoire pour le chiffrement).
2. Sur l'iPhone, ouvrir cette adresse dans **Safari**.
3. Bouton Partager (carré avec flèche ⬆︎), puis **« Sur l'écran d'accueil »**, puis Ajouter.
4. Ouvrir Mon Coffre **depuis l'icône** et créer le mot de passe maître.
   Safari et l'icône installée ne partagent pas leurs données.

## Sécurité
- Chiffrement AES-256, clé tirée du mot de passe maître (PBKDF2, 600 000 tours).
- Données gardées uniquement sur l'iPhone ; aucune connexion vers l'extérieur n'est autorisée par la page.
- Verrouillage en quittant l'application ou après 2 minutes sans activité.
- Mot de passe maître oublié = coffre illisible. Faire des sauvegardes chiffrées (⚙︎).

## Différences avec l'app Xcode
- Mot de passe maître au lieu de Face ID (Safari ne permet pas Face ID pour ce type de coffre).
- Le presse-papier ne s'efface pas tout seul après 60 s.
- Import/export en CSV (Excel : Enregistrer sous › CSV UTF-8) au lieu de .xlsx.
