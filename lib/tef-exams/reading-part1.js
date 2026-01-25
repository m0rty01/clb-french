// TEF Mock Exams - Reading Comprehension Part 1 (Exams 1-10)
// Original content - Copyright free

export const READING_EXAMS_PART1 = [
  // ==================== EXAM 1: Daily Life ====================
  {
    id: 'reading-exam-1',
    examNumber: 1,
    title: 'Compréhension Écrite - Examen 1',
    theme: 'Daily Life',
    level: 'A2-B1',
    duration: 60,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Notices & Signs',
        description: 'Lisez les panneaux et avis',
        questions: [
          { id: 1, text: 'PHARMACIE DE GARDE\nOuverte dimanche et jours fériés\n9h-12h et 14h-19h\n15, rue de la République\nTél: 04 72 00 00 00', question: 'Quand la pharmacie est-elle ouverte le dimanche matin?', options: ['A) 8h-12h', 'B) 9h-12h', 'C) 9h-13h', 'D) 10h-12h'], correctAnswer: 1, explanation: '"9h-12h".' },
          { id: 2, text: 'SOLDES D\'HIVER\nJusqu\'à -50% sur une sélection\nDu 10 janvier au 20 février\nMagasin MODE EXPRESS', question: 'Quelle est la réduction maximale?', options: ['A) 30%', 'B) 40%', 'C) 50%', 'D) 60%'], correctAnswer: 2, explanation: '"-50%".' },
          { id: 3, text: 'AVIS AUX LOCATAIRES\nCoupure d\'eau prévue\nMardi 15 mars de 9h à 17h\nPour travaux de maintenance\nLa Direction', question: 'Pourquoi l\'eau sera-t-elle coupée?', options: ['A) Fuite d\'eau', 'B) Travaux de maintenance', 'C) Facture impayée', 'D) Grève'], correctAnswer: 1, explanation: '"travaux de maintenance".' },
          { id: 4, text: 'MENU DU JOUR - 15€\nEntrée: Soupe aux légumes\nPlat: Poulet rôti ou Poisson grillé\nDessert: Tarte aux pommes\nBoisson non comprise', question: 'Qu\'est-ce qui n\'est pas inclus?', options: ['A) L\'entrée', 'B) Le dessert', 'C) La boisson', 'D) Le plat'], correctAnswer: 2, explanation: '"Boisson non comprise".' },
          { id: 5, text: 'COURS DE YOGA\nTous niveaux\nMardi et Jeudi 18h-19h30\n20€ la séance ou 150€/mois\nInscription: www.yoga-zen.fr', question: 'Combien coûte l\'abonnement mensuel?', options: ['A) 100€', 'B) 120€', 'C) 150€', 'D) 180€'], correctAnswer: 2, explanation: '"150€/mois".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Emails & Messages',
        description: 'Lisez les correspondances',
        questions: [
          { id: 6, text: 'Objet: Confirmation de réservation\n\nMadame Martin,\nNous confirmons votre réservation pour 2 personnes du 15 au 18 mars (3 nuits).\nChambre double vue mer: 120€/nuit\nPetit-déjeuner inclus.\nArrivée à partir de 15h.\nCordialement,\nHôtel Beau Rivage', question: 'Combien de nuits sont réservées?', options: ['A) 2 nuits', 'B) 3 nuits', 'C) 4 nuits', 'D) 5 nuits'], correctAnswer: 1, explanation: '"3 nuits".' },
          { id: 7, text: '[Même email]', question: 'À quelle heure peut-on arriver?', options: ['A) 12h', 'B) 14h', 'C) 15h', 'D) 16h'], correctAnswer: 2, explanation: '"à partir de 15h".' },
          { id: 8, text: 'Salut Thomas,\nN\'oublie pas la fête d\'anniversaire de Marie samedi à 19h chez elle. On est 15 invités. J\'apporte le gâteau (50€). Tu peux apporter du vin? On fait 10€ chacun pour le cadeau commun.\nÀ samedi!\nPaul', question: 'Combien d\'invités à la fête?', options: ['A) 10', 'B) 12', 'C) 15', 'D) 20'], correctAnswer: 2, explanation: '"15 invités".' },
          { id: 9, text: '[Même message]', question: 'Combien pour le cadeau?', options: ['A) 5€', 'B) 8€', 'C) 10€', 'D) 15€'], correctAnswer: 2, explanation: '"10€ chacun".' },
          { id: 10, text: 'Madame, Monsieur,\nSuite à ma commande n°45678 du 5 janvier, je n\'ai toujours pas reçu mon colis prévu pour le 15 janvier. Merci de me donner des nouvelles sous 48h.\nCordialement,\nM. Dupont', question: 'Quel est le problème de M. Dupont?', options: ['A) Produit défectueux', 'B) Livraison en retard', 'C) Erreur de commande', 'D) Prix incorrect'], correctAnswer: 1, explanation: 'Colis non reçu = livraison en retard.' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Articles',
        description: 'Lisez les articles courts',
        questions: [
          { id: 11, text: 'Le télétravail en France\n\nDepuis 2020, le télétravail s\'est généralisé. 30% des salariés travaillent désormais de chez eux au moins 1 jour par semaine. Les avantages: gain de temps dans les transports et meilleur équilibre vie professionnelle/personnelle. Les inconvénients: isolement et difficulté à déconnecter.', question: 'Quel pourcentage de salariés télétravaille?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30%".' },
          { id: 12, text: '[Même article]', question: 'Quel est un avantage mentionné?', options: ['A) Salaire plus élevé', 'B) Gain de temps transport', 'C) Plus de vacances', 'D) Formation gratuite'], correctAnswer: 1, explanation: '"gain de temps dans les transports".' },
          { id: 13, text: 'Nouveau parc urbain\n\nLa ville de Lyon inaugure un nouveau parc de 5 hectares dans le 7ème arrondissement. Ouvert 7j/7 de 7h à 22h, il comprend une aire de jeux, 3 terrains de pétanque et un espace pour les chiens. Entrée gratuite. Parking payant: 2€/heure.', question: 'Quelle est la surface du parc?', options: ['A) 3 hectares', 'B) 4 hectares', 'C) 5 hectares', 'D) 7 hectares'], correctAnswer: 2, explanation: '"5 hectares".' },
          { id: 14, text: '[Même article]', question: 'Combien coûte le parking?', options: ['A) Gratuit', 'B) 1€/heure', 'C) 2€/heure', 'D) 3€/heure'], correctAnswer: 2, explanation: '"2€/heure".' },
          { id: 15, text: 'Économiser l\'eau\n\nChaque Français consomme en moyenne 150 litres d\'eau par jour. Pour réduire cette consommation, quelques gestes simples: prendre des douches courtes (5 minutes maximum), réparer les fuites, utiliser un lave-vaisselle plein. Ces actions peuvent réduire la facture de 30%.', question: 'Consommation d\'eau par jour/personne?', options: ['A) 100 litres', 'B) 120 litres', 'C) 150 litres', 'D) 200 litres'], correctAnswer: 2, explanation: '"150 litres".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Long Text',
        description: 'Lisez le texte long',
        questions: [
          { id: 16, text: 'Les marchés de Noël en France\n\nChaque année, de fin novembre à fin décembre, plus de 300 marchés de Noël s\'installent dans les villes françaises. Le plus célèbre, celui de Strasbourg, existe depuis 1570 et attire 2 millions de visiteurs. On y trouve des décorations, des cadeaux artisanaux et des spécialités culinaires comme le vin chaud et le pain d\'épices. Les marchés créent 5000 emplois saisonniers et génèrent 250 millions d\'euros de retombées économiques. Strasbourg est surnommée "Capitale de Noël" depuis 1992.', question: 'Depuis quand existe le marché de Strasbourg?', options: ['A) 1470', 'B) 1570', 'C) 1670', 'D) 1770'], correctAnswer: 1, explanation: '"depuis 1570".' },
          { id: 17, text: '[Même texte]', question: 'Combien de visiteurs à Strasbourg?', options: ['A) 1 million', 'B) 1,5 million', 'C) 2 millions', 'D) 3 millions'], correctAnswer: 2, explanation: '"2 millions".' },
          { id: 18, text: '[Même texte]', question: 'Combien d\'emplois créés?', options: ['A) 3000', 'B) 4000', 'C) 5000', 'D) 6000'], correctAnswer: 2, explanation: '"5000 emplois".' },
          { id: 19, text: '[Même texte]', question: 'Retombées économiques?', options: ['A) 150 millions', 'B) 200 millions', 'C) 250 millions', 'D) 300 millions'], correctAnswer: 2, explanation: '"250 millions".' },
          { id: 20, text: '[Même texte]', question: 'Depuis quand Strasbourg est "Capitale de Noël"?', options: ['A) 1982', 'B) 1987', 'C) 1992', 'D) 1997'], correctAnswer: 2, explanation: '"depuis 1992".' }
        ]
      }
    ]
  },

  // ==================== EXAM 2: Work & Employment ====================
  {
    id: 'reading-exam-2',
    examNumber: 2,
    title: 'Compréhension Écrite - Examen 2',
    theme: 'Work & Employment',
    level: 'B1',
    duration: 60,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Job Notices',
        description: 'Lisez les offres d\'emploi',
        questions: [
          { id: 1, text: 'OFFRE D\'EMPLOI\nAssistant(e) administratif(ve)\nCDI - 35h/semaine\nSalaire: 1800€ brut/mois\nExpérience: 2 ans minimum\nEnvoyez CV à: rh@entreprise.fr', question: 'Type de contrat?', options: ['A) CDD', 'B) CDI', 'C) Stage', 'D) Intérim'], correctAnswer: 1, explanation: '"CDI".' },
          { id: 2, text: '[Même offre]', question: 'Expérience requise?', options: ['A) 1 an', 'B) 2 ans', 'C) 3 ans', 'D) 5 ans'], correctAnswer: 1, explanation: '"2 ans minimum".' },
          { id: 3, text: 'STAGE MARKETING\n6 mois à partir de janvier\nIndemnité: 600€/mois\nBac+4/5 en marketing\nMaîtrise Excel et Powerpoint\nTélétravail: 2 jours/semaine', question: 'Durée du stage?', options: ['A) 3 mois', 'B) 4 mois', 'C) 6 mois', 'D) 12 mois'], correctAnswer: 2, explanation: '"6 mois".' },
          { id: 4, text: '[Même offre]', question: 'Jours de télétravail?', options: ['A) 1 jour', 'B) 2 jours', 'C) 3 jours', 'D) 4 jours'], correctAnswer: 1, explanation: '"2 jours/semaine".' },
          { id: 5, text: 'COMMERCIAL(E) TERRAIN\nSecteur: Île-de-France\nSalaire: 2500€ + commissions\nVéhicule de fonction fourni\nFormation assurée: 3 semaines\nPrise de poste: immédiate', question: 'Qu\'est-ce qui est fourni?', options: ['A) Téléphone', 'B) Ordinateur', 'C) Véhicule', 'D) Logement'], correctAnswer: 2, explanation: '"Véhicule de fonction".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Work Documents',
        description: 'Lisez les documents professionnels',
        questions: [
          { id: 6, text: 'Note de service\n\nObjet: Nouveaux horaires d\'été\nÀ partir du 1er juin, les horaires seront:\nLundi-Jeudi: 8h-16h30\nVendredi: 8h-12h\nPause déjeuner: 45 minutes\nDirection', question: 'Horaires du vendredi?', options: ['A) 8h-14h', 'B) 8h-12h', 'C) 9h-13h', 'D) 8h-16h30'], correctAnswer: 1, explanation: '"8h-12h".' },
          { id: 7, text: '[Même note]', question: 'Durée pause déjeuner?', options: ['A) 30 min', 'B) 45 min', 'C) 1h', 'D) 1h30'], correctAnswer: 1, explanation: '"45 minutes".' },
          { id: 8, text: 'CONVOCATION\nRéunion du personnel\nDate: Jeudi 15 mars à 14h\nLieu: Salle de conférence B\nOrdre du jour:\n- Bilan 1er trimestre\n- Nouveaux projets\n- Questions diverses\nPrésence obligatoire', question: 'Où a lieu la réunion?', options: ['A) Salle A', 'B) Salle B', 'C) Bureau directeur', 'D) Cafétéria'], correctAnswer: 1, explanation: '"Salle de conférence B".' },
          { id: 9, text: 'Compte-rendu d\'entretien annuel\n\nEmployé: M. Martin - Comptable\nDate: 10/01/2024\nObjectifs atteints: 4 sur 5 (80%)\nPoints forts: rigueur, ponctualité\nAxes d\'amélioration: communication orale\nAugmentation proposée: 3%\nProchain entretien: janvier 2025', question: 'Pourcentage d\'objectifs atteints?', options: ['A) 70%', 'B) 75%', 'C) 80%', 'D) 85%'], correctAnswer: 2, explanation: '"80%".' },
          { id: 10, text: '[Même compte-rendu]', question: 'Augmentation proposée?', options: ['A) 2%', 'B) 3%', 'C) 4%', 'D) 5%'], correctAnswer: 1, explanation: '"3%".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Articles Emploi',
        description: 'Lisez les articles sur l\'emploi',
        questions: [
          { id: 11, text: 'Le marché de l\'emploi en 2024\n\nLe taux de chômage en France est de 7,2%. Les secteurs qui recrutent le plus: l\'informatique (+15%), la santé (+12%) et la logistique (+8%). Le salaire moyen a augmenté de 3,5% sur un an. 45% des entreprises prévoient d\'embaucher cette année.', question: 'Taux de chômage?', options: ['A) 6,5%', 'B) 7%', 'C) 7,2%', 'D) 8%'], correctAnswer: 2, explanation: '"7,2%".' },
          { id: 12, text: '[Même article]', question: 'Secteur qui recrute le plus?', options: ['A) Santé', 'B) Logistique', 'C) Informatique', 'D) Commerce'], correctAnswer: 2, explanation: 'Informatique +15% (le plus élevé).' },
          { id: 13, text: 'La semaine de 4 jours\n\nDe plus en plus d\'entreprises testent la semaine de 4 jours. L\'expérience montre une augmentation de la productivité de 25% et une réduction de l\'absentéisme de 40%. Le salaire reste identique. 78% des salariés concernés sont favorables à ce nouveau rythme. Cependant, 35% des employeurs restent sceptiques.', question: 'Augmentation de productivité?', options: ['A) 15%', 'B) 20%', 'C) 25%', 'D) 30%'], correctAnswer: 2, explanation: '"25%".' },
          { id: 14, text: '[Même article]', question: 'Réduction de l\'absentéisme?', options: ['A) 30%', 'B) 35%', 'C) 40%', 'D) 45%'], correctAnswer: 2, explanation: '"40%".' },
          { id: 15, text: '[Même article]', question: '% de salariés favorables?', options: ['A) 68%', 'B) 73%', 'C) 78%', 'D) 85%'], correctAnswer: 2, explanation: '"78%".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Long Text',
        description: 'Lisez le texte long',
        questions: [
          { id: 16, text: 'L\'évolution du travail\n\nLe monde du travail a profondément changé ces dernières années. Le télétravail, autrefois marginal, concerne aujourd\'hui 35% des salariés français. Les espaces de coworking se multiplient: on en compte 3000 en France, contre 500 il y a 10 ans.\n\nLes nouvelles générations ont des attentes différentes: 60% des moins de 30 ans privilégient l\'équilibre vie pro/perso au salaire. Le CDI reste la norme (85% des emplois) mais le freelance progresse: 1 million de Français sont auto-entrepreneurs.\n\nLes compétences les plus recherchées: le numérique, l\'anglais et les soft skills (communication, adaptabilité). Les entreprises investissent 1500€ par salarié et par an en formation.', question: '% de salariés en télétravail?', options: ['A) 25%', 'B) 30%', 'C) 35%', 'D) 40%'], correctAnswer: 2, explanation: '"35%".' },
          { id: 17, text: '[Même texte]', question: 'Nombre d\'espaces coworking?', options: ['A) 2000', 'B) 2500', 'C) 3000', 'D) 3500'], correctAnswer: 2, explanation: '"3000".' },
          { id: 18, text: '[Même texte]', question: '% de moins de 30 ans privilégiant l\'équilibre?', options: ['A) 50%', 'B) 55%', 'C) 60%', 'D) 65%'], correctAnswer: 2, explanation: '"60%".' },
          { id: 19, text: '[Même texte]', question: 'Nombre d\'auto-entrepreneurs?', options: ['A) 500 000', 'B) 750 000', 'C) 1 million', 'D) 1,5 million'], correctAnswer: 2, explanation: '"1 million".' },
          { id: 20, text: '[Même texte]', question: 'Budget formation par salarié?', options: ['A) 1000€', 'B) 1200€', 'C) 1500€', 'D) 2000€'], correctAnswer: 2, explanation: '"1500€".' }
        ]
      }
    ]
  },

  // ==================== EXAM 3: Health ====================
  {
    id: 'reading-exam-3',
    examNumber: 3,
    title: 'Compréhension Écrite - Examen 3',
    theme: 'Health & Wellness',
    level: 'B1',
    duration: 60,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Health Notices',
        description: 'Lisez les notices santé',
        questions: [
          { id: 1, text: 'POSOLOGIE\nAdultes: 1 comprimé 3 fois par jour\nEnfants (6-12 ans): 1/2 comprimé 2 fois par jour\nDurée: 5 jours maximum\nÀ prendre pendant les repas\nNe pas dépasser la dose prescrite', question: 'Dose pour adultes?', options: ['A) 2 comprimés/jour', 'B) 3 comprimés/jour', 'C) 4 comprimés/jour', 'D) 6 comprimés/jour'], correctAnswer: 1, explanation: '"1 comprimé 3 fois par jour" = 3 comprimés.' },
          { id: 2, text: '[Même notice]', question: 'Durée maximale du traitement?', options: ['A) 3 jours', 'B) 5 jours', 'C) 7 jours', 'D) 10 jours'], correctAnswer: 1, explanation: '"5 jours maximum".' },
          { id: 3, text: 'CABINET MÉDICAL\nDr. Sophie Martin - Médecin généraliste\nConsultations sur rendez-vous\nLundi-Vendredi: 9h-12h et 14h-18h\nSamedi: 9h-12h\nTarif: 25€ (conventionné secteur 1)\nTél: 01 42 00 00 00', question: 'Tarif de consultation?', options: ['A) 20€', 'B) 23€', 'C) 25€', 'D) 30€'], correctAnswer: 2, explanation: '"25€".' },
          { id: 4, text: '[Même panneau]', question: 'Horaires du samedi?', options: ['A) Fermé', 'B) 9h-12h', 'C) 9h-14h', 'D) 10h-13h'], correctAnswer: 1, explanation: '"Samedi: 9h-12h".' },
          { id: 5, text: 'URGENCES\nNuméros à connaître:\n15 - SAMU (urgences médicales)\n18 - Pompiers\n112 - Urgences européennes\n114 - Urgences pour sourds/malentendants\nSOS Médecins: 3624 (24h/24)', question: 'Numéro du SAMU?', options: ['A) 12', 'B) 15', 'C) 17', 'D) 18'], correctAnswer: 1, explanation: '"15 - SAMU".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Health Documents',
        description: 'Lisez les documents médicaux',
        questions: [
          { id: 6, text: 'Ordonnance\nPatient: M. Pierre Durand\nDate: 15/03/2024\n\n1. Paracétamol 1000mg - 2 boîtes\n   1 comprimé toutes les 6 heures si douleur\n\n2. Antibiotique Amoxicilline 500mg\n   1 comprimé matin, midi et soir pendant 7 jours\n\nArrêt de travail: 3 jours\nDr. Martin', question: 'Durée du traitement antibiotique?', options: ['A) 3 jours', 'B) 5 jours', 'C) 7 jours', 'D) 10 jours'], correctAnswer: 2, explanation: '"pendant 7 jours".' },
          { id: 7, text: '[Même ordonnance]', question: 'Durée de l\'arrêt de travail?', options: ['A) 2 jours', 'B) 3 jours', 'C) 5 jours', 'D) 7 jours'], correctAnswer: 1, explanation: '"3 jours".' },
          { id: 8, text: 'Résultats d\'analyses\nPatient: Mme Marie Blanc\n\nGlycémie: 1,10 g/L (normale: 0,70-1,10)\nCholestérol total: 2,20 g/L (normale: < 2,00)\nTriglycérides: 1,30 g/L (normale: < 1,50)\n\nConclusion: Cholestérol légèrement élevé.\nRecommandation: Régime alimentaire.', question: 'Quel résultat est anormal?', options: ['A) Glycémie', 'B) Cholestérol', 'C) Triglycérides', 'D) Tous normaux'], correctAnswer: 1, explanation: 'Cholestérol 2,20 > normale 2,00.' },
          { id: 9, text: 'Carnet de vaccination\nVaccin COVID-19:\n- 1ère dose: 15/01/2021\n- 2ème dose: 15/02/2021\n- Rappel: 15/09/2021\n\nProchaine vaccination recommandée:\nGrippe saisonnière - Octobre 2024', question: 'Date du rappel COVID?', options: ['A) Janvier 2021', 'B) Février 2021', 'C) Septembre 2021', 'D) Octobre 2021'], correctAnswer: 2, explanation: '"15/09/2021".' },
          { id: 10, text: '[Même carnet]', question: 'Prochain vaccin recommandé?', options: ['A) COVID rappel', 'B) Grippe', 'C) Tétanos', 'D) Hépatite'], correctAnswer: 1, explanation: '"Grippe saisonnière".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Health Articles',
        description: 'Lisez les articles santé',
        questions: [
          { id: 11, text: 'Bien dormir\n\nLes adultes ont besoin de 7 à 8 heures de sommeil par nuit. Pourtant, 30% des Français dorment moins de 6 heures. Les conséquences: fatigue, stress, et risque accru de maladies (+40%). Conseils: éviter les écrans 1 heure avant de dormir, maintenir une température de 18°C dans la chambre, et se coucher à heures fixes.', question: 'Heures de sommeil recommandées?', options: ['A) 5-6h', 'B) 6-7h', 'C) 7-8h', 'D) 8-9h'], correctAnswer: 2, explanation: '"7 à 8 heures".' },
          { id: 12, text: '[Même article]', question: '% de Français dormant peu?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30%".' },
          { id: 13, text: '[Même article]', question: 'Température idéale pour dormir?', options: ['A) 16°C', 'B) 17°C', 'C) 18°C', 'D) 20°C'], correctAnswer: 2, explanation: '"18°C".' },
          { id: 14, text: 'L\'activité physique\n\nL\'OMS recommande 150 minutes d\'exercice modéré par semaine, soit 30 minutes 5 fois par semaine. En France, seuls 40% des adultes atteignent ce seuil. L\'activité physique réduit de 25% le risque de maladies cardiovasculaires et de 30% le risque de diabète.', question: 'Minutes d\'exercice recommandées/semaine?', options: ['A) 120 min', 'B) 140 min', 'C) 150 min', 'D) 180 min'], correctAnswer: 2, explanation: '"150 minutes".' },
          { id: 15, text: '[Même article]', question: '% d\'adultes atteignant le seuil?', options: ['A) 30%', 'B) 35%', 'C) 40%', 'D) 45%'], correctAnswer: 2, explanation: '"40%".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Long Text',
        description: 'Lisez le texte long',
        questions: [
          { id: 16, text: 'Le système de santé français\n\nLe système de santé français est considéré comme l\'un des meilleurs au monde. L\'Assurance Maladie rembourse en moyenne 70% des soins courants. Les 30% restants sont généralement pris en charge par les mutuelles complémentaires, dont 95% des Français sont équipés.\n\nLa France compte 220 000 médecins, soit 3,4 pour 1000 habitants. Cependant, certaines régions manquent de praticiens: ce sont les "déserts médicaux" qui concernent 8 millions de Français.\n\nLe budget de l\'Assurance Maladie est de 250 milliards d\'euros par an. Les dépenses de santé représentent 11% du PIB, contre 8% en moyenne dans l\'Union Européenne. Les médicaments représentent 15% des dépenses.', question: 'Remboursement moyen des soins?', options: ['A) 60%', 'B) 65%', 'C) 70%', 'D) 75%'], correctAnswer: 2, explanation: '"70%".' },
          { id: 17, text: '[Même texte]', question: '% de Français avec mutuelle?', options: ['A) 85%', 'B) 90%', 'C) 95%', 'D) 98%'], correctAnswer: 2, explanation: '"95%".' },
          { id: 18, text: '[Même texte]', question: 'Nombre de médecins en France?', options: ['A) 180 000', 'B) 200 000', 'C) 220 000', 'D) 250 000'], correctAnswer: 2, explanation: '"220 000".' },
          { id: 19, text: '[Même texte]', question: 'Personnes en désert médical?', options: ['A) 5 millions', 'B) 6 millions', 'C) 8 millions', 'D) 10 millions'], correctAnswer: 2, explanation: '"8 millions".' },
          { id: 20, text: '[Même texte]', question: 'Dépenses santé en % du PIB?', options: ['A) 9%', 'B) 10%', 'C) 11%', 'D) 12%'], correctAnswer: 2, explanation: '"11%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 4: Travel ====================
  {
    id: 'reading-exam-4',
    examNumber: 4,
    title: 'Compréhension Écrite - Examen 4',
    theme: 'Travel & Tourism',
    level: 'B1',
    duration: 60,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Travel Notices',
        description: 'Lisez les informations voyage',
        questions: [
          { id: 1, text: 'AÉROPORT\nVol AF123 Paris → Montréal\nDépart: 10h30 - Porte 24\nEmbarquement: 30 min avant\nBagages: 1 cabine (12kg) + 1 soute (23kg)\nEnregistrement: Terminal 2E', question: 'Poids max bagage cabine?', options: ['A) 8kg', 'B) 10kg', 'C) 12kg', 'D) 15kg'], correctAnswer: 2, explanation: '"12kg".' },
          { id: 2, text: '[Même panneau]', question: 'Terminal d\'enregistrement?', options: ['A) 2A', 'B) 2C', 'C) 2E', 'D) 2F'], correctAnswer: 2, explanation: '"Terminal 2E".' },
          { id: 3, text: 'HÔTEL ★★★★\nChambre double vue mer: 180€/nuit\nPetit-déjeuner buffet: 18€/personne\nParking: 15€/jour\nWi-Fi gratuit\nCheck-in: 15h / Check-out: 11h', question: 'Prix du parking/jour?', options: ['A) 10€', 'B) 12€', 'C) 15€', 'D) 20€'], correctAnswer: 2, explanation: '"15€".' },
          { id: 4, text: '[Même info]', question: 'Heure de check-out?', options: ['A) 10h', 'B) 11h', 'C) 12h', 'D) 14h'], correctAnswer: 1, explanation: '"11h".' },
          { id: 5, text: 'LOCATION VOITURE\nCatégorie B (citadine)\n45€/jour - kilométrage illimité\nAssurance tous risques incluse\nÂge minimum: 21 ans\nPermis depuis au moins 1 an', question: 'Prix journalier?', options: ['A) 35€', 'B) 40€', 'C) 45€', 'D) 50€'], correctAnswer: 2, explanation: '"45€/jour".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Travel Documents',
        description: 'Lisez les documents voyage',
        questions: [
          { id: 6, text: 'Confirmation de réservation\n\nCircuit: "Merveilles du Québec"\nDu 15 au 25 juillet (11 jours/10 nuits)\nPrix: 2850€/personne base double\nInclus: vols, hôtels 4★, excursions, guide\nNon inclus: repas, pourboires\n\nAcompte: 30% à la réservation\nSolde: 45 jours avant départ', question: 'Durée du circuit?', options: ['A) 8 jours', 'B) 10 jours', 'C) 11 jours', 'D) 14 jours'], correctAnswer: 2, explanation: '"11 jours".' },
          { id: 7, text: '[Même document]', question: 'Acompte demandé?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 50%'], correctAnswer: 2, explanation: '"30%".' },
          { id: 8, text: 'CONDITIONS D\'ANNULATION\n\nPlus de 60 jours avant: remboursement 100%\n60 à 30 jours: 50% retenus\n30 à 15 jours: 75% retenus\nMoins de 15 jours: pas de remboursement\n\nAssurance annulation recommandée: 4% du prix', question: 'Remboursement à 45 jours?', options: ['A) 100%', 'B) 75%', 'C) 50%', 'D) 25%'], correctAnswer: 2, explanation: '45 jours = entre 60 et 30 = 50% retenus.' },
          { id: 9, text: '[Même document]', question: 'Coût assurance annulation?', options: ['A) 2%', 'B) 3%', 'C) 4%', 'D) 5%'], correctAnswer: 2, explanation: '"4% du prix".' },
          { id: 10, text: 'Guide pratique Canada\n\nDocuments: Passeport valide + AVE (7$)\nDécalage horaire: -6h (Montréal)\nMonnaie: Dollar canadien (1€ ≈ 1,45 CAD)\nPrises électriques: Type A/B (adaptateur nécessaire)\nPourboire: 15-20% au restaurant', question: 'Prix de l\'AVE?', options: ['A) 5$', 'B) 7$', 'C) 10$', 'D) 15$'], correctAnswer: 1, explanation: '"7$".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Travel Articles',
        description: 'Lisez les articles voyage',
        questions: [
          { id: 11, text: 'Voyager en train en France\n\nLa SNCF transporte 5 millions de voyageurs par jour. Le TGV atteint 320 km/h et relie Paris à Lyon en 2 heures. Les billets sont 30% moins chers si achetés 3 mois à l\'avance. Le programme de fidélité offre 10% de réduction après 5 voyages.', question: 'Vitesse max du TGV?', options: ['A) 280 km/h', 'B) 300 km/h', 'C) 320 km/h', 'D) 350 km/h'], correctAnswer: 2, explanation: '"320 km/h".' },
          { id: 12, text: '[Même article]', question: 'Réduction billets anticipés?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 40%'], correctAnswer: 2, explanation: '"30%".' },
          { id: 13, text: 'Le tourisme durable\n\nLe tourisme représente 10% des émissions de CO2 mondiales. 60% des voyageurs se disent préoccupés par l\'environnement, mais seulement 25% modifient leurs habitudes. Les compensations carbone coûtent en moyenne 15€ par vol long-courrier. Les écolodges représentent désormais 8% de l\'offre hôtelière.', question: '% d\'émissions CO2 du tourisme?', options: ['A) 5%', 'B) 8%', 'C) 10%', 'D) 15%'], correctAnswer: 2, explanation: '"10%".' },
          { id: 14, text: '[Même article]', question: '% de voyageurs préoccupés?', options: ['A) 45%', 'B) 50%', 'C) 60%', 'D) 70%'], correctAnswer: 2, explanation: '"60%".' },
          { id: 15, text: '[Même article]', question: 'Coût compensation carbone vol?', options: ['A) 10€', 'B) 12€', 'C) 15€', 'D) 20€'], correctAnswer: 2, explanation: '"15€".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Long Text',
        description: 'Lisez le texte long',
        questions: [
          { id: 16, text: 'Le tourisme au Canada\n\nLe Canada accueille 22 millions de touristes par an, générant 100 milliards de dollars de revenus. Les principaux sites: les chutes du Niagara (14 millions de visiteurs), le Vieux-Québec (5 millions) et les Rocheuses canadiennes (4 millions).\n\nLa meilleure période pour visiter le Québec est de juin à septembre. L\'hiver (décembre-mars) attire les amateurs de ski et de motoneige. Le prix moyen d\'un séjour de 2 semaines au Canada est de 3500€ par personne.\n\nDepuis 2016, les Français n\'ont plus besoin de visa mais doivent obtenir une AVE (Autorisation de Voyage Électronique) pour 7$ canadiens, valable 5 ans. Le vol Paris-Montréal dure 7h30.', question: 'Touristes au Canada par an?', options: ['A) 18 millions', 'B) 20 millions', 'C) 22 millions', 'D) 25 millions'], correctAnswer: 2, explanation: '"22 millions".' },
          { id: 17, text: '[Même texte]', question: 'Visiteurs aux chutes Niagara?', options: ['A) 10 millions', 'B) 12 millions', 'C) 14 millions', 'D) 16 millions'], correctAnswer: 2, explanation: '"14 millions".' },
          { id: 18, text: '[Même texte]', question: 'Prix moyen séjour 2 semaines?', options: ['A) 2500€', 'B) 3000€', 'C) 3500€', 'D) 4000€'], correctAnswer: 2, explanation: '"3500€".' },
          { id: 19, text: '[Même texte]', question: 'Validité de l\'AVE?', options: ['A) 2 ans', 'B) 3 ans', 'C) 5 ans', 'D) 10 ans'], correctAnswer: 2, explanation: '"5 ans".' },
          { id: 20, text: '[Même texte]', question: 'Durée vol Paris-Montréal?', options: ['A) 6h30', 'B) 7h', 'C) 7h30', 'D) 8h'], correctAnswer: 2, explanation: '"7h30".' }
        ]
      }
    ]
  },

  // ==================== EXAM 5: Education ====================
  {
    id: 'reading-exam-5',
    examNumber: 5,
    title: 'Compréhension Écrite - Examen 5',
    theme: 'Education',
    level: 'B1-B2',
    duration: 60,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - School Notices',
        description: 'Lisez les avis scolaires',
        questions: [
          { id: 1, text: 'UNIVERSITÉ DE MONTRÉAL\nInscriptions 2024-2025\nDates: 1er mai - 30 juin\nFrais: 3800$/an (Québécois)\n       8500$/an (Canadiens)\n       18500$/an (Internationaux)\nDocuments: relevés de notes, CV, lettre de motivation', question: 'Frais pour étudiants québécois?', options: ['A) 3200$', 'B) 3500$', 'C) 3800$', 'D) 4200$'], correctAnswer: 2, explanation: '"3800$".' },
          { id: 2, text: '[Même avis]', question: 'Date limite d\'inscription?', options: ['A) 15 juin', 'B) 30 juin', 'C) 15 juillet', 'D) 31 août'], correctAnswer: 1, explanation: '"30 juin".' },
          { id: 3, text: 'BIBLIOTHÈQUE UNIVERSITAIRE\nHoraires d\'ouverture:\nLundi-Vendredi: 8h-22h\nSamedi: 9h-18h\nDimanche: 10h-17h\n\nPrêt: 10 livres max / 3 semaines\nRetard: 0,50$/jour', question: 'Heure de fermeture en semaine?', options: ['A) 20h', 'B) 21h', 'C) 22h', 'D) 23h'], correctAnswer: 2, explanation: '"22h".' },
          { id: 4, text: '[Même info]', question: 'Amende pour retard?', options: ['A) 0,25$/jour', 'B) 0,50$/jour', 'C) 1$/jour', 'D) 2$/jour'], correctAnswer: 1, explanation: '"0,50$/jour".' },
          { id: 5, text: 'COURS DE FRANÇAIS\nAlliance Française\nNiveaux: A1 à C2\nSession: 12 semaines\n60 heures de cours\nPrix: 450€\nTest de placement gratuit', question: 'Durée d\'une session?', options: ['A) 8 semaines', 'B) 10 semaines', 'C) 12 semaines', 'D) 15 semaines'], correctAnswer: 2, explanation: '"12 semaines".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Academic Documents',
        description: 'Lisez les documents académiques',
        questions: [
          { id: 6, text: 'Programme de Master\n\nMaster en Gestion Internationale\nDurée: 2 ans (4 semestres)\nCrédits: 120 ECTS\nStage obligatoire: 6 mois minimum\nNiveau d\'anglais requis: B2 minimum\n\nSélection sur dossier + entretien\nPlaces disponibles: 30', question: 'Crédits pour le Master?', options: ['A) 90 ECTS', 'B) 100 ECTS', 'C) 120 ECTS', 'D) 150 ECTS'], correctAnswer: 2, explanation: '"120 ECTS".' },
          { id: 7, text: '[Même programme]', question: 'Durée minimale du stage?', options: ['A) 3 mois', 'B) 4 mois', 'C) 6 mois', 'D) 12 mois'], correctAnswer: 2, explanation: '"6 mois minimum".' },
          { id: 8, text: 'Bourse d\'études\n\nBourse d\'excellence académique\nMontant: 5000€/an\nCritères:\n- Moyenne minimum: 14/20\n- Revenus familiaux < 35 000€/an\n- Assiduité obligatoire\n\nDossier à déposer avant le 15 septembre', question: 'Montant de la bourse?', options: ['A) 3000€', 'B) 4000€', 'C) 5000€', 'D) 6000€'], correctAnswer: 2, explanation: '"5000€".' },
          { id: 9, text: '[Même document]', question: 'Moyenne minimum requise?', options: ['A) 12/20', 'B) 13/20', 'C) 14/20', 'D) 15/20'], correctAnswer: 2, explanation: '"14/20".' },
          { id: 10, text: 'Relevé de notes\n\nÉtudiant: Marie Dupont\nSemestre: Automne 2023\n\nÉconomie: 16/20 (4 ECTS)\nMarketing: 14/20 (4 ECTS)\nAnglais: 15/20 (3 ECTS)\nStage: 17/20 (6 ECTS)\n\nMoyenne: 15,5/20\nMention: Bien', question: 'Note en Marketing?', options: ['A) 13/20', 'B) 14/20', 'C) 15/20', 'D) 16/20'], correctAnswer: 1, explanation: '"14/20".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Education Articles',
        description: 'Lisez les articles sur l\'éducation',
        questions: [
          { id: 11, text: 'L\'apprentissage des langues\n\nLes études montrent qu\'il faut environ 600 heures pour atteindre le niveau B2 en français. Les cours intensifs (20h/semaine) permettent d\'y arriver en 8 mois. L\'immersion linguistique augmente la vitesse d\'apprentissage de 40%. 75% des apprenants considèrent l\'oral comme la compétence la plus difficile.', question: 'Heures pour niveau B2?', options: ['A) 400h', 'B) 500h', 'C) 600h', 'D) 800h'], correctAnswer: 2, explanation: '"600 heures".' },
          { id: 12, text: '[Même article]', question: 'Gain avec immersion?', options: ['A) 20%', 'B) 30%', 'C) 40%', 'D) 50%'], correctAnswer: 2, explanation: '"40%".' },
          { id: 13, text: 'Les études à l\'étranger\n\n350 000 étudiants français partent étudier à l\'étranger chaque année. Les destinations préférées: Canada (25%), États-Unis (18%), Royaume-Uni (15%). Le coût moyen d\'une année d\'études au Canada est de 15 000€ tout compris. 85% des étudiants trouvent un emploi dans les 6 mois après leur retour.', question: 'Étudiants français à l\'étranger?', options: ['A) 250 000', 'B) 300 000', 'C) 350 000', 'D) 400 000'], correctAnswer: 2, explanation: '"350 000".' },
          { id: 14, text: '[Même article]', question: 'Destination préférée?', options: ['A) États-Unis', 'B) Canada', 'C) Royaume-Uni', 'D) Allemagne'], correctAnswer: 1, explanation: 'Canada 25% (le plus élevé).' },
          { id: 15, text: '[Même article]', question: '% trouvant emploi après retour?', options: ['A) 75%', 'B) 80%', 'C) 85%', 'D) 90%'], correctAnswer: 2, explanation: '"85%".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Long Text',
        description: 'Lisez le texte long',
        questions: [
          { id: 16, text: 'Le système éducatif français\n\nL\'éducation en France est obligatoire de 3 à 16 ans. L\'école publique est gratuite et laïque. Le système comprend: l\'école maternelle (3-6 ans), l\'école primaire (6-11 ans), le collège (11-15 ans) et le lycée (15-18 ans).\n\n85% des élèves sont scolarisés dans le public. Le taux de réussite au baccalauréat est de 91%. Après le bac, 65% des étudiants poursuivent dans le supérieur.\n\nLa France compte 2,8 millions d\'étudiants. Le budget de l\'Éducation nationale représente 55 milliards d\'euros, soit le premier poste de dépenses de l\'État. Un enseignant gagne en moyenne 2500€ net par mois.', question: 'Éducation obligatoire jusqu\'à?', options: ['A) 14 ans', 'B) 15 ans', 'C) 16 ans', 'D) 18 ans'], correctAnswer: 2, explanation: '"de 3 à 16 ans".' },
          { id: 17, text: '[Même texte]', question: '% d\'élèves dans le public?', options: ['A) 75%', 'B) 80%', 'C) 85%', 'D) 90%'], correctAnswer: 2, explanation: '"85%".' },
          { id: 18, text: '[Même texte]', question: 'Taux de réussite au bac?', options: ['A) 85%', 'B) 88%', 'C) 91%', 'D) 94%'], correctAnswer: 2, explanation: '"91%".' },
          { id: 19, text: '[Même texte]', question: 'Budget Éducation nationale?', options: ['A) 45 milliards', 'B) 50 milliards', 'C) 55 milliards', 'D) 60 milliards'], correctAnswer: 2, explanation: '"55 milliards".' },
          { id: 20, text: '[Même texte]', question: 'Salaire moyen enseignant?', options: ['A) 2000€', 'B) 2300€', 'C) 2500€', 'D) 2800€'], correctAnswer: 2, explanation: '"2500€".' }
        ]
      }
    ]
  },

  // ==================== EXAMS 6-10 (Abbreviated for file size) ====================
  // Exam 6: Environment
  {
    id: 'reading-exam-6', examNumber: 6, title: 'Compréhension Écrite - Examen 6', theme: 'Environment', level: 'B1-B2', duration: 60, totalQuestions: 20,
    sections: [
      { id: 'A', name: 'Section A', description: 'Notices environnementales', questions: [
        { id: 1, text: 'TRI SÉLECTIF\nBac jaune: plastiques, cartons\nBac vert: verre uniquement\nBac gris: déchets non recyclables\nComposteur: déchets organiques', question: 'Où va le verre?', options: ['A) Bac jaune', 'B) Bac vert', 'C) Bac gris', 'D) Composteur'], correctAnswer: 1, explanation: '"Bac vert".' },
        { id: 2, text: '[Suite]', question: 'Où va le carton?', options: ['A) Bac jaune', 'B) Bac vert', 'C) Bac gris', 'D) Composteur'], correctAnswer: 0, explanation: '"Bac jaune".' },
        { id: 3, text: 'ÉCONOMIES D\'ÉNERGIE\nRemplacez vos ampoules: LED = -80% consommation\nBaissez chauffage: -1°C = -7% facture\nÉteignez appareils en veille: 10% de la facture', question: 'Économie avec LED?', options: ['A) 60%', 'B) 70%', 'C) 80%', 'D) 90%'], correctAnswer: 2, explanation: '"-80%".' },
        { id: 4, text: '[Suite]', question: 'Part des appareils en veille?', options: ['A) 5%', 'B) 8%', 'C) 10%', 'D) 15%'], correctAnswer: 2, explanation: '"10%".' },
        { id: 5, text: 'PRIME VÉLO ÉLECTRIQUE\nMontant: jusqu\'à 400€\nConditions: revenus < 25 000€/an\nDélai: dossier sous 6 mois après achat', question: 'Montant max de la prime?', options: ['A) 300€', 'B) 350€', 'C) 400€', 'D) 500€'], correctAnswer: 2, explanation: '"400€".' }
      ]},
      { id: 'B', name: 'Section B', description: 'Documents environnement', questions: [
        { id: 6, text: 'Facture électricité\nConsommation: 3500 kWh/an\nTarif: 0,20€/kWh\nTotal: 700€\nÉmissions CO2: 400 kg', question: 'Consommation annuelle?', options: ['A) 3000 kWh', 'B) 3500 kWh', 'C) 4000 kWh', 'D) 4500 kWh'], correctAnswer: 1, explanation: '"3500 kWh".' },
        { id: 7, text: '[Suite]', question: 'Coût total annuel?', options: ['A) 600€', 'B) 650€', 'C) 700€', 'D) 750€'], correctAnswer: 2, explanation: '"700€".' },
        { id: 8, text: 'DPE - Diagnostic Performance Énergétique\nLogement: Classe D\nConsommation: 180 kWh/m²/an\nÉmissions: 30 kg CO2/m²/an\nRecommandations: isolation combles', question: 'Classe énergétique?', options: ['A) C', 'B) D', 'C) E', 'D) F'], correctAnswer: 1, explanation: '"Classe D".' },
        { id: 9, text: '[Suite]', question: 'Consommation/m²?', options: ['A) 150 kWh', 'B) 160 kWh', 'C) 180 kWh', 'D) 200 kWh'], correctAnswer: 2, explanation: '"180 kWh".' },
        { id: 10, text: 'Rapport recyclage 2023\nTaux recyclage France: 68%\nObjectif 2025: 75%\nMatériau le plus recyclé: verre (88%)', question: 'Taux actuel recyclage?', options: ['A) 58%', 'B) 63%', 'C) 68%', 'D) 73%'], correctAnswer: 2, explanation: '"68%".' }
      ]},
      { id: 'C', name: 'Section C', description: 'Articles environnement', questions: [
        { id: 11, text: 'Le réchauffement climatique\nLa température moyenne a augmenté de 1,5°C depuis 1850. Les glaciers ont perdu 30% de leur volume. Pour limiter le réchauffement à 2°C, il faut réduire les émissions de 45% d\'ici 2030.', question: 'Hausse de température?', options: ['A) 1°C', 'B) 1,2°C', 'C) 1,5°C', 'D) 2°C'], correctAnswer: 2, explanation: '"1,5°C".' },
        { id: 12, text: '[Suite]', question: 'Perte des glaciers?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30%".' },
        { id: 13, text: 'Les énergies renouvelables\nEn France: 25% de l\'électricité est renouvelable. Objectif 2030: 40%. Le nucléaire représente 70%. Les éoliennes produisent 8% de l\'électricité.', question: 'Part actuelle renouvelables?', options: ['A) 20%', 'B) 22%', 'C) 25%', 'D) 28%'], correctAnswer: 2, explanation: '"25%".' },
        { id: 14, text: '[Suite]', question: 'Part du nucléaire?', options: ['A) 60%', 'B) 65%', 'C) 70%', 'D) 75%'], correctAnswer: 2, explanation: '"70%".' },
        { id: 15, text: '[Suite]', question: 'Objectif renouvelables 2030?', options: ['A) 30%', 'B) 35%', 'C) 40%', 'D) 50%'], correctAnswer: 2, explanation: '"40%".' }
      ]},
      { id: 'D', name: 'Section D', description: 'Texte long', questions: [
        { id: 16, text: 'La pollution plastique\n\n8 millions de tonnes de plastique finissent dans les océans chaque année. À ce rythme, il y aura plus de plastique que de poissons en 2050. Le plastique met 450 ans à se décomposer. Les microplastiques sont présents chez 90% des espèces marines.\n\nLa France produit 5 millions de tonnes de déchets plastiques par an. Seulement 25% sont recyclés. L\'UE a interdit les plastiques à usage unique en 2021. L\'objectif est de recycler 100% des emballages d\'ici 2030.', question: 'Plastique dans océans/an?', options: ['A) 5 millions t', 'B) 6 millions t', 'C) 8 millions t', 'D) 10 millions t'], correctAnswer: 2, explanation: '"8 millions".' },
        { id: 17, text: '[Suite]', question: 'Décomposition du plastique?', options: ['A) 250 ans', 'B) 350 ans', 'C) 450 ans', 'D) 550 ans'], correctAnswer: 2, explanation: '"450 ans".' },
        { id: 18, text: '[Suite]', question: 'Espèces marines avec microplastiques?', options: ['A) 70%', 'B) 80%', 'C) 90%', 'D) 95%'], correctAnswer: 2, explanation: '"90%".' },
        { id: 19, text: '[Suite]', question: 'Plastique recyclé en France?', options: ['A) 15%', 'B) 20%', 'C) 25%', 'D) 30%'], correctAnswer: 2, explanation: '"25%".' },
        { id: 20, text: '[Suite]', question: 'Objectif recyclage 2030?', options: ['A) 80%', 'B) 90%', 'C) 100%', 'D) 75%'], correctAnswer: 2, explanation: '"100%".' }
      ]}
    ]
  },

  // Exams 7-10 follow similar structure with different themes
  { id: 'reading-exam-7', examNumber: 7, title: 'Compréhension Écrite - Examen 7', theme: 'Technology', level: 'B1-B2', duration: 60, totalQuestions: 20,
    sections: [
      { id: 'A', name: 'Section A', description: 'Notices tech', questions: [
        { id: 1, text: 'FORFAIT MOBILE\nAppels illimités France\nSMS illimités\nData: 80 Go en France, 15 Go en Europe\nPrix: 15,99€/mois sans engagement', question: 'Data en France?', options: ['A) 50 Go', 'B) 60 Go', 'C) 80 Go', 'D) 100 Go'], correctAnswer: 2, explanation: '"80 Go".' },
        { id: 2, text: '[Suite]', question: 'Prix mensuel?', options: ['A) 12,99€', 'B) 14,99€', 'C) 15,99€', 'D) 19,99€'], correctAnswer: 2, explanation: '"15,99€".' },
        { id: 3, text: 'ORDINATEUR PORTABLE\nProcesseur: Intel i7\nRAM: 16 Go\nSSD: 512 Go\nÉcran: 15,6 pouces\nGarantie: 2 ans\nPrix: 899€', question: 'Capacité RAM?', options: ['A) 8 Go', 'B) 12 Go', 'C) 16 Go', 'D) 32 Go'], correctAnswer: 2, explanation: '"16 Go".' },
        { id: 4, text: '[Suite]', question: 'Durée garantie?', options: ['A) 1 an', 'B) 2 ans', 'C) 3 ans', 'D) 5 ans'], correctAnswer: 1, explanation: '"2 ans".' },
        { id: 5, text: 'FIBRE OPTIQUE\nDébit: jusqu\'à 1 Gbit/s\nInstallation: gratuite\nBox TV incluse\nPrix: 29,99€/mois pendant 1 an\npuis 39,99€/mois', question: 'Prix 1ère année?', options: ['A) 24,99€', 'B) 29,99€', 'C) 34,99€', 'D) 39,99€'], correctAnswer: 1, explanation: '"29,99€".' }
      ]},
      { id: 'B', name: 'Section B', description: 'Documents tech', questions: [
        { id: 6, text: 'Contrat téléphone\nDurée: 24 mois\nMensualité: 35€\nAprès 12 mois: possibilité de changer de téléphone\nRésiliation anticipée: 50€ + mensualités restantes', question: 'Durée d\'engagement?', options: ['A) 12 mois', 'B) 18 mois', 'C) 24 mois', 'D) 36 mois'], correctAnswer: 2, explanation: '"24 mois".' },
        { id: 7, text: '[Suite]', question: 'Mensualité?', options: ['A) 25€', 'B) 30€', 'C) 35€', 'D) 40€'], correctAnswer: 2, explanation: '"35€".' },
        { id: 8, text: 'Conditions streaming\nAbonnement: 13,99€/mois\nÉcrans simultanés: 4 max\nQualité: jusqu\'à 4K\nTéléchargement: 25 titres max\nRésiliation: à tout moment', question: 'Prix abonnement?', options: ['A) 9,99€', 'B) 11,99€', 'C) 13,99€', 'D) 15,99€'], correctAnswer: 2, explanation: '"13,99€".' },
        { id: 9, text: '[Suite]', question: 'Écrans max?', options: ['A) 2', 'B) 3', 'C) 4', 'D) 5'], correctAnswer: 2, explanation: '"4".' },
        { id: 10, text: 'SAV informatique\nDélai intervention: 48h\nGarantie réparation: 3 mois\nDevis gratuit < 50€\nPrix main d\'œuvre: 45€/heure', question: 'Prix horaire?', options: ['A) 35€', 'B) 40€', 'C) 45€', 'D) 50€'], correctAnswer: 2, explanation: '"45€".' }
      ]},
      { id: 'C', name: 'Section C', description: 'Articles tech', questions: [
        { id: 11, text: 'L\'intelligence artificielle\nChatGPT compte 200 millions d\'utilisateurs actifs. 60% des entreprises utilisent l\'IA. La productivité augmente de 25% en moyenne. Le marché de l\'IA atteindra 500 milliards $ en 2025.', question: 'Utilisateurs ChatGPT?', options: ['A) 100 millions', 'B) 150 millions', 'C) 200 millions', 'D) 250 millions'], correctAnswer: 2, explanation: '"200 millions".' },
        { id: 12, text: '[Suite]', question: 'Entreprises utilisant l\'IA?', options: ['A) 40%', 'B) 50%', 'C) 60%', 'D) 70%'], correctAnswer: 2, explanation: '"60%".' },
        { id: 13, text: 'Cybersécurité\n40% des entreprises ont été victimes d\'une cyberattaque. Coût moyen: 50 000€. 80% des attaques sont dues à des erreurs humaines. Investissement en sécurité: +15% par an.', question: '% entreprises attaquées?', options: ['A) 30%', 'B) 35%', 'C) 40%', 'D) 50%'], correctAnswer: 2, explanation: '"40%".' },
        { id: 14, text: '[Suite]', question: 'Coût moyen attaque?', options: ['A) 30 000€', 'B) 40 000€', 'C) 50 000€', 'D) 60 000€'], correctAnswer: 2, explanation: '"50 000€".' },
        { id: 15, text: '[Suite]', question: '% erreurs humaines?', options: ['A) 60%', 'B) 70%', 'C) 80%', 'D) 90%'], correctAnswer: 2, explanation: '"80%".' }
      ]},
      { id: 'D', name: 'Section D', description: 'Texte long', questions: [
        { id: 16, text: 'La transformation numérique\n\nLe numérique représente 6% du PIB français. 90% des Français ont accès à internet. La 5G couvre 75% du territoire. Les achats en ligne représentent 15% du commerce de détail, soit 150 milliards d\'euros.\n\nLe télétravail concerne 35% des salariés. Les applications mobiles génèrent 5 milliards d\'euros. La France compte 10 000 startups tech employant 100 000 personnes.', question: 'Part du numérique dans PIB?', options: ['A) 4%', 'B) 5%', 'C) 6%', 'D) 8%'], correctAnswer: 2, explanation: '"6%".' },
        { id: 17, text: '[Suite]', question: 'Couverture 5G?', options: ['A) 60%', 'B) 70%', 'C) 75%', 'D) 80%'], correctAnswer: 2, explanation: '"75%".' },
        { id: 18, text: '[Suite]', question: 'E-commerce en milliards?', options: ['A) 120', 'B) 135', 'C) 150', 'D) 175'], correctAnswer: 2, explanation: '"150 milliards".' },
        { id: 19, text: '[Suite]', question: 'Nombre de startups tech?', options: ['A) 8 000', 'B) 9 000', 'C) 10 000', 'D) 12 000'], correctAnswer: 2, explanation: '"10 000".' },
        { id: 20, text: '[Suite]', question: 'Emplois startups tech?', options: ['A) 80 000', 'B) 90 000', 'C) 100 000', 'D) 120 000'], correctAnswer: 2, explanation: '"100 000".' }
      ]}
    ]
  },

  // Exams 8-10 abbreviated structure
  { id: 'reading-exam-8', examNumber: 8, title: 'Compréhension Écrite - Examen 8', theme: 'Culture', level: 'B1', duration: 60, totalQuestions: 20,
    sections: [
      { id: 'A', name: 'Section A', description: 'Affiches culturelles', questions: [
        { id: 1, text: 'EXPOSITION MONET\nGrand Palais Paris\nDu 15 mars au 30 juillet\n120 œuvres présentées\nTarif: 18€ / Réduit: 12€\nOuvert 10h-20h', question: 'Nombre d\'œuvres?', options: ['A) 80', 'B) 100', 'C) 120', 'D) 150'], correctAnswer: 2, explanation: '"120".' },
        { id: 2, text: '[Suite]', question: 'Tarif réduit?', options: ['A) 10€', 'B) 12€', 'C) 14€', 'D) 15€'], correctAnswer: 1, explanation: '"12€".' },
        { id: 3, text: 'CONCERT SYMPHONIQUE\nOrchestre National\nŒuvre: Symphonie n°9 de Beethoven\nDurée: 1h30 sans entracte\nPlaces: 35€ à 95€', question: 'Durée du concert?', options: ['A) 1h', 'B) 1h15', 'C) 1h30', 'D) 2h'], correctAnswer: 2, explanation: '"1h30".' },
        { id: 4, text: '[Suite]', question: 'Prix max des places?', options: ['A) 75€', 'B) 85€', 'C) 95€', 'D) 120€'], correctAnswer: 2, explanation: '"95€".' },
        { id: 5, text: 'FESTIVAL CINÉMA\n10 jours de projections\n150 films de 40 pays\nPass 5 films: 35€\nPass illimité: 80€', question: 'Nombre de films?', options: ['A) 100', 'B) 120', 'C) 150', 'D) 200'], correctAnswer: 2, explanation: '"150".' }
      ]},
      { id: 'B', name: 'Section B', description: 'Documents culturels', questions: [
        { id: 6, text: 'Programme théâtre\nPièce: Le Malade imaginaire\nAuteur: Molière\nReprésentations: 50\nDurée: 2h15 avec entracte\nÂge: à partir de 10 ans', question: 'Nombre de représentations?', options: ['A) 30', 'B) 40', 'C) 50', 'D) 60'], correctAnswer: 2, explanation: '"50".' },
        { id: 7, text: '[Suite]', question: 'Âge minimum?', options: ['A) 8 ans', 'B) 10 ans', 'C) 12 ans', 'D) 14 ans'], correctAnswer: 1, explanation: '"10 ans".' },
        { id: 8, text: 'Abonnement musée\nAccès illimité 1 an\nCollections permanentes + expositions\nVisites guidées: 50% réduction\nPrix: 65€ / Jeune (-26 ans): 35€', question: 'Prix abonnement jeune?', options: ['A) 25€', 'B) 30€', 'C) 35€', 'D) 45€'], correctAnswer: 2, explanation: '"35€".' },
        { id: 9, text: '[Suite]', question: 'Réduction visites guidées?', options: ['A) 25%', 'B) 30%', 'C) 50%', 'D) Gratuites'], correctAnswer: 2, explanation: '"50%".' },
        { id: 10, text: 'Cours de danse\n12 semaines - 24 séances\nStyles: salsa, bachata, kizomba\n10 élèves max par cours\nPrix: 280€ le trimestre', question: 'Prix du trimestre?', options: ['A) 200€', 'B) 240€', 'C) 280€', 'D) 320€'], correctAnswer: 2, explanation: '"280€".' }
      ]},
      { id: 'C', name: 'Section C', description: 'Articles culture', questions: [
        { id: 11, text: 'Le cinéma français\nLa France produit 300 films par an. 200 millions d\'entrées en salles. Le prix moyen du billet est de 10€. Les films français représentent 40% des entrées.', question: 'Films produits/an?', options: ['A) 200', 'B) 250', 'C) 300', 'D) 350'], correctAnswer: 2, explanation: '"300".' },
        { id: 12, text: '[Suite]', question: 'Prix moyen billet?', options: ['A) 8€', 'B) 9€', 'C) 10€', 'D) 12€'], correctAnswer: 2, explanation: '"10€".' },
        { id: 13, text: 'La lecture en France\n85% des Français lisent au moins 1 livre par an. Moyenne: 17 livres par lecteur. Le roman reste le genre préféré (70%). Les ventes de livres numériques représentent 10% du marché.', question: '% de lecteurs?', options: ['A) 75%', 'B) 80%', 'C) 85%', 'D) 90%'], correctAnswer: 2, explanation: '"85%".' },
        { id: 14, text: '[Suite]', question: 'Livres lus en moyenne?', options: ['A) 12', 'B) 15', 'C) 17', 'D) 20'], correctAnswer: 2, explanation: '"17".' },
        { id: 15, text: '[Suite]', question: 'Part du numérique?', options: ['A) 5%', 'B) 8%', 'C) 10%', 'D) 15%'], correctAnswer: 2, explanation: '"10%".' }
      ]},
      { id: 'D', name: 'Section D', description: 'Texte long', questions: [
        { id: 16, text: 'Le patrimoine français\n\nLa France compte 45 sites UNESCO, 40 000 monuments historiques et 8000 musées. Le Louvre est le musée le plus visité au monde avec 10 millions de visiteurs par an.\n\nLe budget du ministère de la Culture est de 4 milliards d\'euros. Les Journées du Patrimoine attirent 12 millions de visiteurs chaque année. 25 000 associations culturelles sont actives en France.', question: 'Sites UNESCO en France?', options: ['A) 35', 'B) 40', 'C) 45', 'D) 50'], correctAnswer: 2, explanation: '"45".' },
        { id: 17, text: '[Suite]', question: 'Visiteurs Louvre/an?', options: ['A) 8 millions', 'B) 9 millions', 'C) 10 millions', 'D) 12 millions'], correctAnswer: 2, explanation: '"10 millions".' },
        { id: 18, text: '[Suite]', question: 'Budget Culture?', options: ['A) 3 milliards', 'B) 3,5 milliards', 'C) 4 milliards', 'D) 5 milliards'], correctAnswer: 2, explanation: '"4 milliards".' },
        { id: 19, text: '[Suite]', question: 'Visiteurs Journées Patrimoine?', options: ['A) 8 millions', 'B) 10 millions', 'C) 12 millions', 'D) 15 millions'], correctAnswer: 2, explanation: '"12 millions".' },
        { id: 20, text: '[Suite]', question: 'Associations culturelles?', options: ['A) 15 000', 'B) 20 000', 'C) 25 000', 'D) 30 000'], correctAnswer: 2, explanation: '"25 000".' }
      ]}
    ]
  },

  { id: 'reading-exam-9', examNumber: 9, title: 'Compréhension Écrite - Examen 9', theme: 'Housing', level: 'B1', duration: 60, totalQuestions: 20,
    sections: [
      { id: 'A', name: 'Section A', description: 'Annonces immobilières', questions: [
        { id: 1, text: 'À LOUER\nAppartement T3 - 65m²\nLoyer: 850€ CC\nDépôt: 2 mois\n5ème étage avec ascenseur\nProche métro ligne 7', question: 'Surface appartement?', options: ['A) 55m²', 'B) 60m²', 'C) 65m²', 'D) 70m²'], correctAnswer: 2, explanation: '"65m²".' },
        { id: 2, text: '[Suite]', question: 'Étage?', options: ['A) 3ème', 'B) 4ème', 'C) 5ème', 'D) 6ème'], correctAnswer: 2, explanation: '"5ème".' },
        { id: 3, text: 'MAISON À VENDRE\n120m² - 4 chambres\nTerrain: 500m²\nGarage 2 voitures\nPrix: 350 000€\nDPE: Classe C', question: 'Nombre de chambres?', options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'], correctAnswer: 1, explanation: '"4".' },
        { id: 4, text: '[Suite]', question: 'Surface terrain?', options: ['A) 400m²', 'B) 450m²', 'C) 500m²', 'D) 600m²'], correctAnswer: 2, explanation: '"500m²".' },
        { id: 5, text: 'COLOCATION\nChambre 15m² dans appartement 80m²\nLoyer: 450€ tout compris\n2 colocataires actuels\nLibre 1er septembre', question: 'Loyer de la chambre?', options: ['A) 350€', 'B) 400€', 'C) 450€', 'D) 500€'], correctAnswer: 2, explanation: '"450€".' }
      ]},
      { id: 'B', name: 'Section B', description: 'Documents logement', questions: [
        { id: 6, text: 'Bail d\'habitation\nDurée: 3 ans renouvelable\nLoyer: 900€/mois\nCharges: 150€/mois\nDépôt garantie: 900€\nRévision annuelle selon indice IRL', question: 'Durée du bail?', options: ['A) 1 an', 'B) 2 ans', 'C) 3 ans', 'D) 6 ans'], correctAnswer: 2, explanation: '"3 ans".' },
        { id: 7, text: '[Suite]', question: 'Total loyer + charges?', options: ['A) 950€', 'B) 1000€', 'C) 1050€', 'D) 1100€'], correctAnswer: 2, explanation: '900 + 150 = 1050€.' },
        { id: 8, text: 'Assurance habitation\nFormule confort\nResponsabilité civile incluse\nVol, incendie, dégâts des eaux\nFranchise: 150€\nPrime annuelle: 180€', question: 'Prime annuelle?', options: ['A) 150€', 'B) 165€', 'C) 180€', 'D) 200€'], correctAnswer: 2, explanation: '"180€".' },
        { id: 9, text: '[Suite]', question: 'Montant franchise?', options: ['A) 100€', 'B) 120€', 'C) 150€', 'D) 200€'], correctAnswer: 2, explanation: '"150€".' },
        { id: 10, text: 'Devis travaux\nRénovation cuisine: 8000€\nSalle de bain: 6000€\nPeinture appartement: 2500€\nTotal TTC: 16 500€\nDélai: 6 semaines', question: 'Coût peinture?', options: ['A) 2000€', 'B) 2500€', 'C) 3000€', 'D) 3500€'], correctAnswer: 1, explanation: '"2500€".' }
      ]},
      { id: 'C', name: 'Section C', description: 'Articles immobilier', questions: [
        { id: 11, text: 'Le marché immobilier\nLes prix ont augmenté de 5% cette année. Le prix moyen au m² à Paris est de 10 500€. En province, la moyenne est de 3200€/m². Le taux d\'emprunt moyen est de 3,5%.', question: 'Hausse des prix?', options: ['A) 3%', 'B) 4%', 'C) 5%', 'D) 7%'], correctAnswer: 2, explanation: '"5%".' },
        { id: 12, text: '[Suite]', question: 'Prix/m² Paris?', options: ['A) 9500€', 'B) 10000€', 'C) 10500€', 'D) 11000€'], correctAnswer: 2, explanation: '"10 500€".' },
        { id: 13, text: 'Les aides au logement\nL\'APL peut atteindre 300€/mois. 6 millions de Français en bénéficient. Le prêt à taux zéro permet d\'emprunter jusqu\'à 40 000€. MaPrimeRénov\' finance jusqu\'à 20 000€ de travaux.', question: 'APL maximale?', options: ['A) 250€', 'B) 280€', 'C) 300€', 'D) 350€'], correctAnswer: 2, explanation: '"300€".' },
        { id: 14, text: '[Suite]', question: 'Bénéficiaires APL?', options: ['A) 4 millions', 'B) 5 millions', 'C) 6 millions', 'D) 7 millions'], correctAnswer: 2, explanation: '"6 millions".' },
        { id: 15, text: '[Suite]', question: 'Max MaPrimeRénov\'?', options: ['A) 15 000€', 'B) 18 000€', 'C) 20 000€', 'D) 25 000€'], correctAnswer: 2, explanation: '"20 000€".' }
      ]},
      { id: 'D', name: 'Section D', description: 'Texte long', questions: [
        { id: 16, text: 'Le logement en France\n\n58% des Français sont propriétaires. Le budget logement représente 28% des dépenses des ménages. La France compte 37 millions de logements dont 5 millions de logements sociaux.\n\nLe mal-logement touche 4 millions de personnes. 300 000 personnes sont sans domicile. Le gouvernement a pour objectif de construire 400 000 logements par an.', question: '% de propriétaires?', options: ['A) 52%', 'B) 55%', 'C) 58%', 'D) 62%'], correctAnswer: 2, explanation: '"58%".' },
        { id: 17, text: '[Suite]', question: 'Budget logement des ménages?', options: ['A) 22%', 'B) 25%', 'C) 28%', 'D) 32%'], correctAnswer: 2, explanation: '"28%".' },
        { id: 18, text: '[Suite]', question: 'Logements sociaux?', options: ['A) 4 millions', 'B) 4,5 millions', 'C) 5 millions', 'D) 6 millions'], correctAnswer: 2, explanation: '"5 millions".' },
        { id: 19, text: '[Suite]', question: 'Personnes mal-logées?', options: ['A) 2 millions', 'B) 3 millions', 'C) 4 millions', 'D) 5 millions'], correctAnswer: 2, explanation: '"4 millions".' },
        { id: 20, text: '[Suite]', question: 'Objectif construction/an?', options: ['A) 300 000', 'B) 350 000', 'C) 400 000', 'D) 500 000'], correctAnswer: 2, explanation: '"400 000".' }
      ]}
    ]
  },

  { id: 'reading-exam-10', examNumber: 10, title: 'Compréhension Écrite - Examen 10', theme: 'Food', level: 'A2-B1', duration: 60, totalQuestions: 20,
    sections: [
      { id: 'A', name: 'Section A', description: 'Menus et étiquettes', questions: [
        { id: 1, text: 'CARTE RESTAURANT\nMenu dégustation: 65€\n5 plats + accord vins\nMenu découverte: 45€\n3 plats au choix\nEnfant (-12 ans): 18€', question: 'Prix menu dégustation?', options: ['A) 55€', 'B) 60€', 'C) 65€', 'D) 75€'], correctAnswer: 2, explanation: '"65€".' },
        { id: 2, text: '[Suite]', question: 'Prix menu enfant?', options: ['A) 12€', 'B) 15€', 'C) 18€', 'D) 22€'], correctAnswer: 2, explanation: '"18€".' },
        { id: 3, text: 'ÉTIQUETTE PRODUIT\nYaourt nature bio\nPoids: 125g x 4\nÀ consommer avant le: 15/04/2024\nConserver entre 2°C et 6°C\nContient du lait', question: 'Nombre de pots?', options: ['A) 2', 'B) 4', 'C) 6', 'D) 8'], correctAnswer: 1, explanation: '"4".' },
        { id: 4, text: '[Suite]', question: 'Température conservation?', options: ['A) 0-4°C', 'B) 2-6°C', 'C) 4-8°C', 'D) 6-10°C'], correctAnswer: 1, explanation: '"2°C et 6°C".' },
        { id: 5, text: 'COURS DE CUISINE\nAtelier pâtisserie\nDurée: 3 heures\nParticipants: 8 max\nPrix: 75€ (matériel et ingrédients inclus)\nÀ partir de 14 ans', question: 'Durée du cours?', options: ['A) 2h', 'B) 2h30', 'C) 3h', 'D) 4h'], correctAnswer: 2, explanation: '"3 heures".' }
      ]},
      { id: 'B', name: 'Section B', description: 'Documents alimentaires', questions: [
        { id: 6, text: 'Recette: Quiche Lorraine\nPour 6 personnes\nPréparation: 20 min\nCuisson: 35 min à 180°C\n\nIngrédients:\n- 1 pâte brisée\n- 200g lardons\n- 3 œufs\n- 200ml crème fraîche', question: 'Temps de cuisson?', options: ['A) 25 min', 'B) 30 min', 'C) 35 min', 'D) 45 min'], correctAnswer: 2, explanation: '"35 min".' },
        { id: 7, text: '[Suite]', question: 'Température four?', options: ['A) 160°C', 'B) 170°C', 'C) 180°C', 'D) 200°C'], correctAnswer: 2, explanation: '"180°C".' },
        { id: 8, text: 'Menu semaine\nLundi: Poulet rôti\nMardi: Poisson grillé\nMercredi: Pâtes carbonara\nJeudi: Bœuf bourguignon\nVendredi: Pizza maison\nBudget: 80€ pour 4 personnes', question: 'Budget/semaine?', options: ['A) 60€', 'B) 70€', 'C) 80€', 'D) 100€'], correctAnswer: 2, explanation: '"80€".' },
        { id: 9, text: '[Suite]', question: 'Plat du jeudi?', options: ['A) Poulet', 'B) Poisson', 'C) Bœuf bourguignon', 'D) Pizza'], correctAnswer: 2, explanation: '"Bœuf bourguignon".' },
        { id: 10, text: 'Régime alimentaire\nApport journalier recommandé:\nCalories: 2000 kcal\nProtéines: 50g\nGlucides: 250g\nLipides: 70g\nFibres: 30g', question: 'Calories recommandées?', options: ['A) 1800 kcal', 'B) 2000 kcal', 'C) 2200 kcal', 'D) 2500 kcal'], correctAnswer: 1, explanation: '"2000 kcal".' }
      ]},
      { id: 'C', name: 'Section C', description: 'Articles alimentation', questions: [
        { id: 11, text: 'Le bio en France\n12% des surfaces agricoles sont en bio. Les ventes bio atteignent 13 milliards d\'euros. 80% des Français achètent bio au moins occasionnellement. Le surcoût moyen est de 30%.', question: 'Part des surfaces bio?', options: ['A) 8%', 'B) 10%', 'C) 12%', 'D) 15%'], correctAnswer: 2, explanation: '"12%".' },
        { id: 12, text: '[Suite]', question: 'Ventes bio en France?', options: ['A) 10 milliards', 'B) 11 milliards', 'C) 13 milliards', 'D) 15 milliards'], correctAnswer: 2, explanation: '"13 milliards".' },
        { id: 13, text: 'Le gaspillage alimentaire\nUn Français jette 30 kg de nourriture par an, dont 7 kg encore emballés. Coût: 400€ par ménage. 20% du gaspillage vient de la grande distribution.', question: 'Nourriture jetée/an?', options: ['A) 20 kg', 'B) 25 kg', 'C) 30 kg', 'D) 40 kg'], correctAnswer: 2, explanation: '"30 kg".' },
        { id: 14, text: '[Suite]', question: 'Coût du gaspillage/ménage?', options: ['A) 300€', 'B) 350€', 'C) 400€', 'D) 500€'], correctAnswer: 2, explanation: '"400€".' },
        { id: 15, text: '[Suite]', question: '% distribution?', options: ['A) 15%', 'B) 18%', 'C) 20%', 'D) 25%'], correctAnswer: 2, explanation: '"20%".' }
      ]},
      { id: 'D', name: 'Section D', description: 'Texte long', questions: [
        { id: 16, text: 'La gastronomie française\n\nLa France compte 650 restaurants étoilés dont 30 trois étoiles. La gastronomie génère 200 milliards d\'euros et emploie 1 million de personnes. Les Français dépensent 400€/mois en alimentation.\n\nLa baguette française a été inscrite au patrimoine UNESCO en 2022. 12 millions de baguettes sont vendues chaque jour. Le fromage: 400 variétés, 27 kg consommés par personne et par an.', question: 'Restaurants étoilés?', options: ['A) 500', 'B) 550', 'C) 650', 'D) 750'], correctAnswer: 2, explanation: '"650".' },
        { id: 17, text: '[Suite]', question: 'Emplois gastronomie?', options: ['A) 800 000', 'B) 900 000', 'C) 1 million', 'D) 1,2 million'], correctAnswer: 2, explanation: '"1 million".' },
        { id: 18, text: '[Suite]', question: 'Budget alimentation/mois?', options: ['A) 300€', 'B) 350€', 'C) 400€', 'D) 450€'], correctAnswer: 2, explanation: '"400€".' },
        { id: 19, text: '[Suite]', question: 'Baguettes/jour?', options: ['A) 8 millions', 'B) 10 millions', 'C) 12 millions', 'D) 15 millions'], correctAnswer: 2, explanation: '"12 millions".' },
        { id: 20, text: '[Suite]', question: 'Fromage consommé/personne/an?', options: ['A) 22 kg', 'B) 25 kg', 'C) 27 kg', 'D) 30 kg'], correctAnswer: 2, explanation: '"27 kg".' }
      ]}
    ]
  }
];

export function getReadingExamPart1(examNumber) {
  return READING_EXAMS_PART1.find(e => e.examNumber === examNumber);
}
