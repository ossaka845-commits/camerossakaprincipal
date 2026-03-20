# CamerOssaka — Design v2 (Cameroun + Afrique + Europe)

## 1. Identité Visuelle Multiculturelle

### Couleurs — Fusion Cameroun / Afrique / Europe

**Couleurs primaires (Cameroun) :**
- **Vert Cameroun** : `#007A5E` — Espoir, forêt, croissance
- **Rouge** : `#CE1126` — Force, détermination
- **Jaune** : `#FCD116` — Soleil africain, richesse

**Couleurs secondaires (Afrique) :**
- **Terre d'ocre** : `#C4956A` — Terre africaine, authenticité
- **Terre brûlée** : `#8B4513` — Profondeur, racines
- **Sable** : `#E6D5AC` — Lumière, chaleur

**Couleurs tertiaires (Europe/Modernité) :**
- **Navy européen** : `#1A2744` — Professionnalisme, élégance
- **Gris perle** : `#F5F5F0` — Modernité, clarté
- **Or** : `#D4A03A` — Premium, excellence

### Typographie

**Titres :** `Sora` — Moderne, géométrique (influence européenne)
**Corps :** `Inter` — Lisible, professionnel
**Accents/Labels :** `IBM Plex Mono` — Technique, précision
**Textes spéciaux :** `Space Grotesk` — Touche contemporaine africaine

### Éléments Visuels Africains Subtils

- **Motifs géométriques** : Losanges, triangles (inspiration bogolan/mud cloth)
- **Textures** : Grain de sable, fibre de raphia subtile
- **Formes** : Courbes organiques rappelant les savanes et montagnes camerounaises

---

## 2. Architecture du Site

### Pages Principales

1. **Home** (`/`) — Accueil avec hero animé
2. **Work** (`/work`) — Portfolio des projets réalisés
3. **Services** (`/services`) — Services détaillés
4. **About** (`/about`) — À propos, histoire, valeurs
5. **Équipe** (`/equipe`) — Team et collaborateurs
6. **Contact** (`/contact`) — Contact + formulaires
7. **Devis** (`/devis`) — Demande de devis détaillée
8. **BTP Connexion** (`/btp-connexion`) — Espace recrutement

### Navigation

- Logo + sélecteur de langue (FR/DE) + menu principal
- Menu sticky avec fond flou

---

## 3. Système Multilingue

### Langues supportées
- **Français** (par défaut)
- **Allemand**

### Structure des traductions
```
/src/i18n/
  ├── fr.json (Français)
  └── de.json (Allemand)
```

---

## 4. Page Home

### Hero Section
- Vidéo de fond ou image : Chantier camerounais + équipement européen
- Titre : "CONSTRUIRE L'AVENIR" / "DIE ZUKUNFT BAUEN"
- Sous-titre : "De l'Afrique à l'Europe, l'excellence du BTP"
- CTA : "Demander un devis" + "Rejoindre BTP Connexion"

### Stats Bar
- 15+ ans d'expérience
- 500+ projets réalisés
- 3 continents
- 98% clients satisfaits

### Sections
1. **Nos Piliers** : BUILD / CREATE / DELIVER / MODERN / RELIABLE
2. **Nos Projets Phares** — Aperçu avec lien vers /work
3. **Pourquoi CamerOssaka** — Valeurs (Qualité, Innovation, Durabilité)
4. **CTA Final** — Devis ou recrutement

---

## 5. Page Work (/work)

### Layout
- Grille de projets filtrable par :
  - Type : Infrastructure, Bâtiment, Industriel
  - Localisation : Cameroun, Afrique, Europe
  - Année

### Carte Projet
- Image
- Titre
- Localisation (drapeau + ville)
- Date
- Surface / Budget
- Tags

### Projets exemples
1. **Stade Omnisports Yaoundé** — Cameroun
2. **Centre Commercial Douala** — Cameroun
3. **Autoroute Lagos-Abidjan** — Nigéria/Côte d'Ivoire
4. **Siège Social Berlin** — Allemagne
5. **Hôpital Universitaire** — Cameroun

---

## 6. Page Services (/services)

### Services détaillés

1. **Gros Œuvre**
   - Fondations, structures, béton armé
   
2. **Génie Civil**
   - Routes, ponts, barrages
   
3. **Construction Industrielle**
   - Usines, entrepôts, hangars
   
4. **Bâtiments Tertiaires**
   - Bureaux, commerces, hôtels
   
5. **Rénovation & Réhabilitation**
   - Restauration, mise aux normes
   
6. **Études & Conseil**
   - BIM, planning, expertise

### Par section
- Icône + Titre + Description + Réalisations liées

---

## 7. Page About (/about)

### Sections

1. **Notre Histoire**
   - Fondation au Cameroun
   - Expansion en Afrique
   - Ouverture Europe (Allemagne)
   
2. **Nos Valeurs**
   - Excellence (Or)
   - Intégrité (Vert)
   - Innovation (Jaune)
   - Solidarité (Rouge)
   
3. **Chiffres Clés**
   - Timeline animée
   
4. **Certifications**
   - ISO 9001, ISO 14001, etc.

---

## 8. Page Équipe (/equipe)

### Structure

1. **Direction**
   - CEO, CFO, CTO, Directeur des Opérations
   
2. **Équipes par Région**
   - Cameroun
   - Afrique (autres pays)
   - Europe
   
3. **Experts**
   - Ingénieurs, architectes, chefs de chantier

### Carte membre
- Photo
- Nom
- Poste
- Bio courte
- LinkedIn

---

## 9. Page Contact (/contact)

### Informations
- Adresses (Yaoundé, Douala, Berlin)
- Téléphones
- Emails
- Horaires

### Formulaire de contact général
- Nom
- Email
- Sujet
- Message

---

## 10. Page Devis (/devis)

### Formulaire complet

**Type de demandeur :**
- [ ] Particulier
- [ ] Entreprise
- [ ] Administration

**Informations personnelles :**
- Nom / Prénom
- Email
- Téléphone
- Entreprise (si applicable)
- Numéro de contribuable (si applicable)

**Projet :**
- Type de projet (select)
  - Construction neuve
  - Rénovation
  - Extension
  - Infrastructure
  - Autre
- Description détaillée
- Localisation (pays, ville)
- Budget estimé (fourchettes)
- Délai souhaité
- Documents (upload plans, etc.)

**Validation :**
- Checkbox conditions
- Captcha
- Bouton "Envoyer ma demande"

---

## 11. Page BTP Connexion (/btp-connexion)

### Concept
Espace dédié aux métiers du BTP pour :
- Postuler à des offres d'emploi
- Déposer une candidature spontanée
- Découvrir les métiers chez CamerOssaka

### Sections

1. **Hero**
   - "Rejoignez l'excellence du BTP"
   - Stats : X postes ouverts, Y collaborateurs
   
2. **Offres d'emploi**
   - Filtres : Métier, Localisation, Type de contrat
   - Liste des offres actives
   
3. **Métiers**
   - Grille des métiers : 
     - Maçon
     - Charpentier
     - Électricien
     - Plombier
     - Conducteur d'engins
     - Chef de chantier
     - Ingénieur
     - etc.
   
4. **Candidature spontanée**
   - Formulaire avec :
     - Civilité
     - Nom / Prénom
     - Email / Téléphone
     - Pays de résidence
     - Métier recherché
     - Expérience (années)
     - Niveau d'études
     - CV (upload)
     - Lettre de motivation
     - Portfolio (optionnel)
   
5. **Témoignages**
   - Collaborateurs actuels

---

## 12. Composants UI

### Sélecteur de langue
- Dropdown avec drapeaux
- FR 🇫🇷 / DE 🇩🇪

### Boutons
- Primaire : Fond vert cameroun, texte blanc
- Secondaire : Bordure or, texte or
- Accent : Fond jaune, texte noir

### Cartes
- Ombre subtile
- Hover : Légère élévation + bordure or

### Formulaires
- Bordure grise
- Focus : Bordure verte
- Labels en majuscules (mono)

---

## 13. Responsive

### Mobile
- Menu hamburger
- Empilement vertical
- Formulaires simplifiés
- Touch-friendly

### Tablette
- Grille 2 colonnes
- Navigation adaptée

---

## 14. Animations

- Scroll reveal (fade up)
- Hover sur cartes (élévation)
- Transition de page (fade)
- Compteurs animés pour les stats
- Parallax subtil sur hero
