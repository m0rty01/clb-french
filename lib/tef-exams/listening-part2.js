// TEF Mock Exams - Listening Comprehension Part 2 (Exams 11-20)
// Original content - Copyright free

export const LISTENING_EXAMS_PART2 = [
  // ==================== EXAM 11: Sports & Leisure ====================
  {
    id: 'listening-exam-11',
    examNumber: 11,
    title: 'Compréhension Orale - Examen 11',
    theme: 'Sports & Leisure',
    level: 'B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations sportives',
        questions: [
          { id: 1, audioDescription: '[Audio: Salle de sport]', audioText: 'Coach: "L\'abonnement annuel coûte 450€, soit 37,50€ par mois. Accès illimité 7j/7."', question: 'Prix annuel?', options: ['A) 400€', 'B) 420€', 'C) 450€', 'D) 480€'], correctAnswer: 2, explanation: '"450€".' },
          { id: 2, audioDescription: '[Audio: Piscine]', audioText: 'Maître-nageur: "La piscine fait 50 mètres. Profondeur: 2 mètres côté plongeoir."', question: 'Longueur de la piscine?', options: ['A) 25 m', 'B) 33 m', 'C) 50 m', 'D) 100 m'], correctAnswer: 2, explanation: '"50 mètres".' },
          { id: 3, audioDescription: '[Audio: Tennis]', audioText: 'Réservation: "Le court est libre à 18h. Location: 15€ l\'heure."', question: 'Prix de location?', options: ['A) 10€', 'B) 12€', 'C) 15€', 'D) 20€'], correctAnswer: 2, explanation: '"15€".' },
          { id: 4, audioDescription: '[Audio: Marathon]', audioText: 'Organisateur: "Le marathon fait 42 km. Départ à 9h, fermeture de parcours à 15h."', question: 'Distance du marathon?', options: ['A) 21 km', 'B) 35 km', 'C) 42 km', 'D) 50 km'], correctAnswer: 2, explanation: '"42 km".' },
          { id: 5, audioDescription: '[Audio: Ski]', audioText: 'Vendeur: "Le forfait semaine est à 280€. Il donne accès aux 150 km de pistes."', question: 'Prix du forfait?', options: ['A) 220€', 'B) 250€', 'C) 280€', 'D) 300€'], correctAnswer: 2, explanation: '"280€".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Actualités Sportives',
        description: 'Informations sportives',
        questions: [
          { id: 6, audioDescription: '[Audio: Radio sport]', audioText: 'L\'équipe de France a gagné 3-1. Mbappé a marqué un doublé, Griezmann le troisième but.', question: 'Score du match?', options: ['A) 2-0', 'B) 2-1', 'C) 3-1', 'D) 3-2'], correctAnswer: 2, explanation: '"3-1".' },
          { id: 7, audioDescription: '[Audio: Tour de France]', audioText: 'L\'étape d\'aujourd\'hui fait 185 km avec 3 cols à franchir. Arrivée prévue vers 17h30.', question: 'Distance de l\'étape?', options: ['A) 150 km', 'B) 170 km', 'C) 185 km', 'D) 200 km'], correctAnswer: 2, explanation: '"185 km".' },
          { id: 8, audioDescription: '[Audio: Tennis]', audioText: 'Roland Garros: 128 joueurs et joueuses en simple. Le prize money atteint 50 millions d\'euros.', question: 'Nombre de joueurs?', options: ['A) 96', 'B) 112', 'C) 128', 'D) 256'], correctAnswer: 2, explanation: '"128".' },
          { id: 9, audioDescription: '[Audio: JO]', audioText: 'Paris 2024: 10 500 athlètes de 206 pays. 329 épreuves dans 32 sports différents.', question: 'Nombre d\'athlètes?', options: ['A) 8 000', 'B) 9 500', 'C) 10 500', 'D) 12 000'], correctAnswer: 2, explanation: '"10 500".' },
          { id: 10, audioDescription: '[Audio: Record]', audioText: 'Nouveau record du monde du 100 mètres: 9,58 secondes. Le précédent était de 9,69 secondes.', question: 'Nouveau record?', options: ['A) 9,45 s', 'B) 9,52 s', 'C) 9,58 s', 'D) 9,63 s'], correctAnswer: 2, explanation: '"9,58 secondes".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Discussions',
        description: 'Conversations sportives',
        questions: [
          { id: 11, audioDescription: '[Audio: Entraîneur]', audioText: 'Coach: "L\'entraînement est de 2 heures, 3 fois par semaine. Prochain match dans 12 jours."', question: 'Durée de l\'entraînement?', options: ['A) 1h30', 'B) 2h', 'C) 2h30', 'D) 3h'], correctAnswer: 1, explanation: '"2 heures".' },
          { id: 12, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Prochain match dans?', options: ['A) 7 jours', 'B) 10 jours', 'C) 12 jours', 'D) 15 jours'], correctAnswer: 2, explanation: '"12 jours".' },
          { id: 13, audioDescription: '[Audio: Randonnée]', audioText: 'Guide: "Le sentier fait 18 km avec un dénivelé de 1200 mètres. Prévoir 7 heures de marche."', question: 'Dénivelé total?', options: ['A) 800 m', 'B) 1000 m', 'C) 1200 m', 'D) 1500 m'], correctAnswer: 2, explanation: '"1200 mètres".' },
          { id: 14, audioDescription: '[Audio: Club]', audioText: 'Président: "Le club compte 350 licenciés dont 120 jeunes de moins de 18 ans."', question: 'Nombre de licenciés?', options: ['A) 280', 'B) 320', 'C) 350', 'D) 400'], correctAnswer: 2, explanation: '"350".' },
          { id: 15, audioDescription: '[Audio: Compétition]', audioText: 'Juge: "Le score final est de 8,5 sur 10. C\'est la meilleure note de la journée."', question: 'Score obtenu?', options: ['A) 7,5', 'B) 8,0', 'C) 8,5', 'D) 9,0'], correctAnswer: 2, explanation: '"8,5".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Reportages',
        description: 'Documentaires sportifs',
        questions: [
          { id: 16, audioDescription: '[Audio: Histoire du foot]', audioText: 'La Coupe du Monde a lieu tous les 4 ans. La France l\'a remportée 2 fois: en 1998 et 2018.', question: 'Fréquence de la Coupe?', options: ['A) 2 ans', 'B) 3 ans', 'C) 4 ans', 'D) 5 ans'], correctAnswer: 2, explanation: '"4 ans".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Victoires de la France?', options: ['A) 1', 'B) 2', 'C) 3', 'D) 4'], correctAnswer: 1, explanation: '"2 fois".' },
          { id: 18, audioDescription: '[Audio: Santé sport]', audioText: '60% des Français pratiquent une activité sportive régulière. Le jogging est le sport préféré avec 12 millions de pratiquants.', question: 'Français sportifs réguliers?', options: ['A) 45%', 'B) 50%', 'C) 60%', 'D) 70%'], correctAnswer: 2, explanation: '"60%".' },
          { id: 19, audioDescription: '[Audio: Économie sport]', audioText: 'Le sport en France représente 38 milliards d\'euros et 400 000 emplois directs.', question: 'Valeur économique?', options: ['A) 30 milliards', 'B) 35 milliards', 'C) 38 milliards', 'D) 45 milliards'], correctAnswer: 2, explanation: '"38 milliards".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Les femmes représentent désormais 40% des licenciés sportifs contre 30% il y a 20 ans.', question: '% de femmes licenciées?', options: ['A) 30%', 'B) 35%', 'C) 40%', 'D) 45%'], correctAnswer: 2, explanation: '"40%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 12: Finance & Banking ====================
  {
    id: 'listening-exam-12',
    examNumber: 12,
    title: 'Compréhension Orale - Examen 12',
    theme: 'Finance & Banking',
    level: 'B1-B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations bancaires',
        questions: [
          { id: 1, audioDescription: '[Audio: Guichet banque]', audioText: 'Conseiller: "Votre compte courant est à découvert de 150€. Les frais sont de 8€."', question: 'Montant du découvert?', options: ['A) 100€', 'B) 120€', 'C) 150€', 'D) 180€'], correctAnswer: 2, explanation: '"150€".' },
          { id: 2, audioDescription: '[Audio: Carte bancaire]', audioText: 'Agent: "La carte Gold coûte 12€ par mois. Plafond de retrait: 1500€ par semaine."', question: 'Coût mensuel carte Gold?', options: ['A) 8€', 'B) 10€', 'C) 12€', 'D) 15€'], correctAnswer: 2, explanation: '"12€".' },
          { id: 3, audioDescription: '[Audio: Virement]', audioText: 'Client: "Je voudrais faire un virement de 3000€ vers l\'étranger." Conseiller: "Les frais sont de 25€."', question: 'Frais de virement?', options: ['A) 15€', 'B) 20€', 'C) 25€', 'D) 30€'], correctAnswer: 2, explanation: '"25€".' },
          { id: 4, audioDescription: '[Audio: Épargne]', audioText: 'Conseiller: "Le livret A rapporte 3% par an. Plafond: 22 950€."', question: 'Taux du livret A?', options: ['A) 2%', 'B) 2,5%', 'C) 3%', 'D) 3,5%'], correctAnswer: 2, explanation: '"3%".' },
          { id: 5, audioDescription: '[Audio: Prêt]', audioText: 'Banquier: "Pour ce prêt de 200 000€, la mensualité serait de 950€ sur 25 ans."', question: 'Mensualité du prêt?', options: ['A) 850€', 'B) 900€', 'C) 950€', 'D) 1000€'], correctAnswer: 2, explanation: '"950€".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Actualités Financières',
        description: 'Informations économiques',
        questions: [
          { id: 6, audioDescription: '[Audio: Bourse]', audioText: 'Le CAC 40 a clôturé en hausse de 1,5% à 7500 points. Volume d\'échanges: 4 milliards d\'euros.', question: 'Hausse du CAC 40?', options: ['A) 0,8%', 'B) 1,2%', 'C) 1,5%', 'D) 2%'], correctAnswer: 2, explanation: '"1,5%".' },
          { id: 7, audioDescription: '[Audio: Inflation]', audioText: 'L\'inflation atteint 4,2% sur un an. Les prix alimentaires ont augmenté de 8%.', question: 'Taux d\'inflation?', options: ['A) 3,5%', 'B) 3,8%', 'C) 4,2%', 'D) 4,8%'], correctAnswer: 2, explanation: '"4,2%".' },
          { id: 8, audioDescription: '[Audio: Taux]', audioText: 'La BCE maintient son taux directeur à 4%. Une baisse est possible en juin.', question: 'Taux directeur BCE?', options: ['A) 3%', 'B) 3,5%', 'C) 4%', 'D) 4,5%'], correctAnswer: 2, explanation: '"4%".' },
          { id: 9, audioDescription: '[Audio: Chômage]', audioText: 'Le taux de chômage baisse à 7,1%. C\'est le plus bas depuis 15 ans.', question: 'Taux de chômage?', options: ['A) 6,5%', 'B) 6,8%', 'C) 7,1%', 'D) 7,5%'], correctAnswer: 2, explanation: '"7,1%".' },
          { id: 10, audioDescription: '[Audio: PIB]', audioText: 'La croissance française est de 0,9% ce trimestre. Les prévisions annuelles tablent sur 1,2%.', question: 'Croissance trimestrielle?', options: ['A) 0,6%', 'B) 0,8%', 'C) 0,9%', 'D) 1,1%'], correctAnswer: 2, explanation: '"0,9%".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conseils Financiers',
        description: 'Consultations financières',
        questions: [
          { id: 11, audioDescription: '[Audio: Conseiller patrimoine]', audioText: 'Conseiller: "Je vous recommande de diversifier: 60% actions, 30% obligations, 10% liquidités."', question: '% recommandé en actions?', options: ['A) 50%', 'B) 55%', 'C) 60%', 'D) 70%'], correctAnswer: 2, explanation: '"60%".' },
          { id: 12, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: '% en obligations?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30%".' },
          { id: 13, audioDescription: '[Audio: Assurance vie]', audioText: 'Agent: "Ce contrat a rapporté 4,5% l\'an dernier. Frais de gestion: 0,6% par an."', question: 'Rendement du contrat?', options: ['A) 3,5%', 'B) 4%', 'C) 4,5%', 'D) 5%'], correctAnswer: 2, explanation: '"4,5%".' },
          { id: 14, audioDescription: '[Audio: Retraite]', audioText: 'Conseiller: "À 65 ans, vous toucherez environ 1800€ de retraite par mois."', question: 'Retraite estimée?', options: ['A) 1500€', 'B) 1650€', 'C) 1800€', 'D) 2000€'], correctAnswer: 2, explanation: '"1800€".' },
          { id: 15, audioDescription: '[Audio: Impôts]', audioText: 'Expert: "Votre tranche d\'imposition est à 30%. Vous pouvez déduire jusqu\'à 10 000€."', question: 'Tranche d\'imposition?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30%".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Analyses',
        description: 'Analyses économiques',
        questions: [
          { id: 16, audioDescription: '[Audio: Budget France]', audioText: 'Le déficit public français est de 4,9% du PIB. La dette atteint 110% du PIB, soit 3000 milliards d\'euros.', question: 'Déficit public?', options: ['A) 3,9%', 'B) 4,5%', 'C) 4,9%', 'D) 5,5%'], correctAnswer: 2, explanation: '"4,9%".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Dette en % du PIB?', options: ['A) 95%', 'B) 100%', 'C) 110%', 'D) 120%'], correctAnswer: 2, explanation: '"110%".' },
          { id: 18, audioDescription: '[Audio: Épargne française]', audioText: 'Les Français épargnent en moyenne 15% de leurs revenus. L\'encours des livrets atteint 500 milliards d\'euros.', question: 'Taux d\'épargne moyen?', options: ['A) 10%', 'B) 12%', 'C) 15%', 'D) 18%'], correctAnswer: 2, explanation: '"15%".' },
          { id: 19, audioDescription: '[Audio: Crypto]', audioText: 'Le Bitcoin est à 40 000€. 8% des Français possèdent des cryptomonnaies.', question: 'Cours du Bitcoin?', options: ['A) 30 000€', 'B) 35 000€', 'C) 40 000€', 'D) 45 000€'], correctAnswer: 2, explanation: '"40 000€".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Le SMIC a augmenté de 5% cette année pour atteindre 1766€ brut par mois.', question: 'SMIC brut mensuel?', options: ['A) 1650€', 'B) 1700€', 'C) 1766€', 'D) 1800€'], correctAnswer: 2, explanation: '"1766€".' }
        ]
      }
    ]
  },

  // ==================== EXAM 13: Transportation ====================
  {
    id: 'listening-exam-13',
    examNumber: 13,
    title: 'Compréhension Orale - Examen 13',
    theme: 'Transportation',
    level: 'A2-B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations de transport',
        questions: [
          { id: 1, audioDescription: '[Audio: Guichet SNCF]', audioText: 'Agent: "Paris-Lyon en TGV: 2h05. Départs toutes les 30 minutes. Tarif: 79€."', question: 'Durée du trajet?', options: ['A) 1h45', 'B) 2h05', 'C) 2h30', 'D) 3h'], correctAnswer: 1, explanation: '"2h05".' },
          { id: 2, audioDescription: '[Audio: Taxi]', audioText: 'Chauffeur: "La prise en charge est de 4€, puis 1,50€ du kilomètre. Comptez 25€ pour l\'aéroport."', question: 'Prix au kilomètre?', options: ['A) 1,20€', 'B) 1,35€', 'C) 1,50€', 'D) 1,80€'], correctAnswer: 2, explanation: '"1,50€".' },
          { id: 3, audioDescription: '[Audio: Location vélo]', audioText: 'Agent: "L\'abonnement annuel est à 40€. Première demi-heure gratuite à chaque trajet."', question: 'Prix abonnement?', options: ['A) 30€', 'B) 35€', 'C) 40€', 'D) 50€'], correctAnswer: 2, explanation: '"40€".' },
          { id: 4, audioDescription: '[Audio: Métro]', audioText: 'Agent: "Le carnet de 10 tickets coûte 16€. Le ticket à l\'unité est à 2,10€."', question: 'Prix du carnet?', options: ['A) 12€', 'B) 14€', 'C) 16€', 'D) 18€'], correctAnswer: 2, explanation: '"16€".' },
          { id: 5, audioDescription: '[Audio: Auto-école]', audioText: 'Moniteur: "Le forfait permis comprend 20 heures de conduite pour 1200€."', question: 'Heures de conduite?', options: ['A) 15', 'B) 18', 'C) 20', 'D) 25'], correctAnswer: 2, explanation: '"20 heures".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Annonces Transport',
        description: 'Informations de transport',
        questions: [
          { id: 6, audioDescription: '[Audio: Aéroport]', audioText: 'Vol AF1234 pour New York, embarquement porte 32. Départ dans 45 minutes. Durée: 8h15.', question: 'Numéro de porte?', options: ['A) 28', 'B) 30', 'C) 32', 'D) 35'], correctAnswer: 2, explanation: '"Porte 32".' },
          { id: 7, audioDescription: '[Audio: Autoroute]', audioText: 'Bouchon de 15 km sur l\'A6 direction Paris. Temps de parcours rallongé de 45 minutes.', question: 'Longueur du bouchon?', options: ['A) 10 km', 'B) 12 km', 'C) 15 km', 'D) 20 km'], correctAnswer: 2, explanation: '"15 km".' },
          { id: 8, audioDescription: '[Audio: Bus]', audioText: 'La ligne 42 est déviée jusqu\'à 18h en raison de travaux. Arrêt temporaire place de la République.', question: 'Fin de la déviation?', options: ['A) 16h', 'B) 17h', 'C) 18h', 'D) 19h'], correctAnswer: 2, explanation: '"18h".' },
          { id: 9, audioDescription: '[Audio: Ferry]', audioText: 'Traversée Marseille-Ajaccio: 11 heures de nuit. Tarif véhicule + 2 passagers: 180€.', question: 'Durée traversée?', options: ['A) 8h', 'B) 10h', 'C) 11h', 'D) 12h'], correctAnswer: 2, explanation: '"11 heures".' },
          { id: 10, audioDescription: '[Audio: Covoiturage]', audioText: 'Paris-Bordeaux: 3 places disponibles. Départ 7h, arrivée 12h. Prix: 35€ par passager.', question: 'Prix par passager?', options: ['A) 25€', 'B) 30€', 'C) 35€', 'D) 40€'], correctAnswer: 2, explanation: '"35€".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Discussions',
        description: 'Conversations sur le transport',
        questions: [
          { id: 11, audioDescription: '[Audio: Mécanicien]', audioText: 'Mécanicien: "La vidange coûte 80€. Les freins sont usés, comptez 250€ pour les changer."', question: 'Prix de la vidange?', options: ['A) 60€', 'B) 70€', 'C) 80€', 'D) 90€'], correctAnswer: 2, explanation: '"80€".' },
          { id: 12, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Prix des freins?', options: ['A) 200€', 'B) 220€', 'C) 250€', 'D) 280€'], correctAnswer: 2, explanation: '"250€".' },
          { id: 13, audioDescription: '[Audio: Assurance auto]', audioText: 'Agent: "Votre prime annuelle est de 650€. En cas d\'accident, franchise de 300€."', question: 'Prime annuelle?', options: ['A) 550€', 'B) 600€', 'C) 650€', 'D) 700€'], correctAnswer: 2, explanation: '"650€".' },
          { id: 14, audioDescription: '[Audio: Voiture électrique]', audioText: 'Vendeur: "Cette voiture a 400 km d\'autonomie. Recharge complète en 8 heures sur prise normale."', question: 'Autonomie?', options: ['A) 300 km', 'B) 350 km', 'C) 400 km', 'D) 450 km'], correctAnswer: 2, explanation: '"400 km".' },
          { id: 15, audioDescription: '[Audio: Contrôle technique]', audioText: 'Inspecteur: "Le contrôle coûte 70€ et est valable 2 ans. Prochain contrôle en mars 2026."', question: 'Prix du contrôle?', options: ['A) 50€', 'B) 60€', 'C) 70€', 'D) 80€'], correctAnswer: 2, explanation: '"70€".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Reportages',
        description: 'Documentaires sur le transport',
        questions: [
          { id: 16, audioDescription: '[Audio: Mobilité France]', audioText: 'Les Français parcourent en moyenne 12 000 km par an en voiture. 75% utilisent leur voiture quotidiennement.', question: 'Km annuels moyens?', options: ['A) 10 000', 'B) 11 000', 'C) 12 000', 'D) 14 000'], correctAnswer: 2, explanation: '"12 000 km".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: '% utilisant la voiture chaque jour?', options: ['A) 65%', 'B) 70%', 'C) 75%', 'D) 80%'], correctAnswer: 2, explanation: '"75%".' },
          { id: 18, audioDescription: '[Audio: TGV]', audioText: 'Le réseau TGV transporte 120 millions de passagers par an. La vitesse maximale est de 320 km/h.', question: 'Passagers TGV par an?', options: ['A) 100 millions', 'B) 110 millions', 'C) 120 millions', 'D) 130 millions'], correctAnswer: 2, explanation: '"120 millions".' },
          { id: 19, audioDescription: '[Audio: Aviation]', audioText: 'Roissy est le 2ème aéroport européen avec 75 millions de passagers. 500 destinations desservies.', question: 'Passagers à Roissy?', options: ['A) 60 millions', 'B) 70 millions', 'C) 75 millions', 'D) 80 millions'], correctAnswer: 2, explanation: '"75 millions".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Les vélos en libre-service comptent 30 millions d\'utilisations par an à Paris. Réduction de 20% des émissions CO2.', question: 'Utilisations vélos/an?', options: ['A) 20 millions', 'B) 25 millions', 'C) 30 millions', 'D) 35 millions'], correctAnswer: 2, explanation: '"30 millions".' }
        ]
      }
    ]
  },

  // ==================== EXAM 14: Family & Relationships ====================
  {
    id: 'listening-exam-14',
    examNumber: 14,
    title: 'Compréhension Orale - Examen 14',
    theme: 'Family & Relationships',
    level: 'A2-B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations familiales',
        questions: [
          { id: 1, audioDescription: '[Audio: Mairie]', audioText: 'Officier: "Le mariage aura lieu le 15 juin à 15h. Capacité de la salle: 50 personnes."', question: 'Date du mariage?', options: ['A) 10 juin', 'B) 12 juin', 'C) 15 juin', 'D) 20 juin'], correctAnswer: 2, explanation: '"15 juin".' },
          { id: 2, audioDescription: '[Audio: Crèche]', audioText: 'Directrice: "La crèche accueille les enfants de 3 mois à 3 ans. Tarif: 8€ de l\'heure."', question: 'Âge maximum?', options: ['A) 2 ans', 'B) 2,5 ans', 'C) 3 ans', 'D) 4 ans'], correctAnswer: 2, explanation: '"3 ans".' },
          { id: 3, audioDescription: '[Audio: Réunion famille]', audioText: 'Maman: "On sera 25 pour le repas de Noël. Je commande la dinde pour 12 personnes."', question: 'Nombre d\'invités?', options: ['A) 20', 'B) 22', 'C) 25', 'D) 30'], correctAnswer: 2, explanation: '"25".' },
          { id: 4, audioDescription: '[Audio: Anniversaire]', audioText: 'Enfant: "J\'ai 8 ans aujourd\'hui!" Maman: "Oui, et tu auras 15 amis à ta fête samedi."', question: 'Âge de l\'enfant?', options: ['A) 6 ans', 'B) 7 ans', 'C) 8 ans', 'D) 9 ans'], correctAnswer: 2, explanation: '"8 ans".' },
          { id: 5, audioDescription: '[Audio: Médecin]', audioText: 'Médecin: "Le bébé pèse 3,5 kg et mesure 52 cm. Tout est parfait!"', question: 'Poids du bébé?', options: ['A) 3 kg', 'B) 3,2 kg', 'C) 3,5 kg', 'D) 4 kg'], correctAnswer: 2, explanation: '"3,5 kg".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages',
        description: 'Messages familiaux',
        questions: [
          { id: 6, audioDescription: '[Audio: Faire-part]', audioText: 'Nous avons le plaisir de vous annoncer la naissance de Léa, le 5 mars à 8h30. 3,2 kg, 50 cm.', question: 'Heure de naissance?', options: ['A) 7h30', 'B) 8h00', 'C) 8h30', 'D) 9h00'], correctAnswer: 2, explanation: '"8h30".' },
          { id: 7, audioDescription: '[Audio: Invitation]', audioText: 'Pour fêter nos 25 ans de mariage, nous organisons une fête le 20 septembre. Merci de confirmer avant le 10.', question: 'Années de mariage?', options: ['A) 20 ans', 'B) 22 ans', 'C) 25 ans', 'D) 30 ans'], correctAnswer: 2, explanation: '"25 ans".' },
          { id: 8, audioDescription: '[Audio: École]', audioText: 'Rappel: réunion parents-professeurs le jeudi 12 à 18h. Durée prévue: 2 heures.', question: 'Heure de la réunion?', options: ['A) 17h', 'B) 17h30', 'C) 18h', 'D) 18h30'], correctAnswer: 2, explanation: '"18h".' },
          { id: 9, audioDescription: '[Audio: Camp vacances]', audioText: 'Camp d\'été pour les 8-14 ans. Du 1er au 15 juillet. Prix: 600€ tout compris.', question: 'Durée du camp?', options: ['A) 10 jours', 'B) 12 jours', 'C) 15 jours', 'D) 3 semaines'], correctAnswer: 2, explanation: 'Du 1er au 15 = 15 jours.' },
          { id: 10, audioDescription: '[Audio: Babysitting]', audioText: 'Recherche babysitter les mercredis après-midi pour 2 enfants. Tarif: 12€ de l\'heure.', question: 'Tarif horaire?', options: ['A) 8€', 'B) 10€', 'C) 12€', 'D) 15€'], correctAnswer: 2, explanation: '"12€".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        description: 'Discussions familiales',
        questions: [
          { id: 11, audioDescription: '[Audio: Couple]', audioText: 'Marie: "On est ensemble depuis 5 ans et fiancés depuis 6 mois. Le mariage est prévu dans 1 an."', question: 'Durée relation?', options: ['A) 3 ans', 'B) 4 ans', 'C) 5 ans', 'D) 6 ans'], correctAnswer: 2, explanation: '"5 ans".' },
          { id: 12, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Fiancés depuis?', options: ['A) 3 mois', 'B) 4 mois', 'C) 6 mois', 'D) 1 an'], correctAnswer: 2, explanation: '"6 mois".' },
          { id: 13, audioDescription: '[Audio: Grand-parents]', audioText: 'Grand-mère: "J\'ai 4 petits-enfants: 2 filles et 2 garçons. L\'aîné a 12 ans, le plus jeune 3 ans."', question: 'Nombre de petits-enfants?', options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'], correctAnswer: 1, explanation: '"4".' },
          { id: 14, audioDescription: '[Audio: Vacances]', audioText: 'Papa: "Cette année, on part 3 semaines en août. On loue une maison pour 1500€."', question: 'Durée des vacances?', options: ['A) 2 semaines', 'B) 3 semaines', 'C) 4 semaines', 'D) 1 mois'], correctAnswer: 1, explanation: '"3 semaines".' },
          { id: 15, audioDescription: '[Audio: Études]', audioText: 'Parents: "Notre fils est en 3ème année de médecine. Il lui reste 7 ans avant d\'être médecin."', question: 'Années restantes?', options: ['A) 5 ans', 'B) 6 ans', 'C) 7 ans', 'D) 8 ans'], correctAnswer: 2, explanation: '"7 ans".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Témoignages',
        description: 'Histoires de famille',
        questions: [
          { id: 16, audioDescription: '[Audio: Famille nombreuse]', audioText: 'Nous avons 5 enfants entre 4 et 16 ans. Les courses représentent 800€ par mois. La maison fait 180m².', question: 'Nombre d\'enfants?', options: ['A) 4', 'B) 5', 'C) 6', 'D) 7'], correctAnswer: 1, explanation: '"5 enfants".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Budget courses?', options: ['A) 600€', 'B) 700€', 'C) 800€', 'D) 900€'], correctAnswer: 2, explanation: '"800€".' },
          { id: 18, audioDescription: '[Audio: Divorce]', audioText: 'Statistiquement, 45% des mariages finissent par un divorce en France. La durée moyenne du mariage avant divorce est de 15 ans.', question: 'Taux de divorce?', options: ['A) 35%', 'B) 40%', 'C) 45%', 'D) 50%'], correctAnswer: 2, explanation: '"45%".' },
          { id: 19, audioDescription: '[Audio: Natalité]', audioText: 'La France compte 1,8 enfant par femme. L\'âge moyen du premier enfant est de 31 ans.', question: 'Taux de natalité?', options: ['A) 1,6', 'B) 1,7', 'C) 1,8', 'D) 2,0'], correctAnswer: 2, explanation: '"1,8".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Les familles monoparentales représentent 25% des familles avec enfants. 85% sont dirigées par des femmes.', question: '% familles monoparentales?', options: ['A) 18%', 'B) 20%', 'C) 25%', 'D) 30%'], correctAnswer: 2, explanation: '"25%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 15: Immigration & Administration ====================
  {
    id: 'listening-exam-15',
    examNumber: 15,
    title: 'Compréhension Orale - Examen 15',
    theme: 'Immigration & Administration',
    level: 'B1-B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Démarches administratives',
        questions: [
          { id: 1, audioDescription: '[Audio: Préfecture]', audioText: 'Agent: "Votre titre de séjour est valable 4 ans. Renouvellement 2 mois avant expiration."', question: 'Durée de validité?', options: ['A) 2 ans', 'B) 3 ans', 'C) 4 ans', 'D) 5 ans'], correctAnswer: 2, explanation: '"4 ans".' },
          { id: 2, audioDescription: '[Audio: Mairie]', audioText: 'Employé: "La carte d\'identité coûte 25€ pour les majeurs. Délai: 3 semaines."', question: 'Prix carte d\'identité?', options: ['A) 15€', 'B) 20€', 'C) 25€', 'D) 30€'], correctAnswer: 2, explanation: '"25€".' },
          { id: 3, audioDescription: '[Audio: Consulat]', audioText: 'Agent: "Le visa touriste permet un séjour de 90 jours maximum sur 180 jours."', question: 'Durée max du séjour?', options: ['A) 60 jours', 'B) 75 jours', 'C) 90 jours', 'D) 120 jours'], correctAnswer: 2, explanation: '"90 jours".' },
          { id: 4, audioDescription: '[Audio: CAF]', audioText: 'Conseiller: "Votre dossier APL est accepté. Vous recevrez 350€ par mois à partir du 1er du mois prochain."', question: 'Montant APL?', options: ['A) 280€', 'B) 320€', 'C) 350€', 'D) 400€'], correctAnswer: 2, explanation: '"350€".' },
          { id: 5, audioDescription: '[Audio: OFII]', audioText: 'Formateur: "Le contrat d\'intégration comprend 400 heures de français et 24 heures d\'éducation civique."', question: 'Heures de français?', options: ['A) 300', 'B) 350', 'C) 400', 'D) 500'], correctAnswer: 2, explanation: '"400 heures".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Informations Officielles',
        description: 'Annonces administratives',
        questions: [
          { id: 6, audioDescription: '[Audio: Service public]', audioText: 'Pour obtenir la nationalité française, vous devez résider en France depuis 5 ans et avoir le niveau B1 en français.', question: 'Années de résidence requises?', options: ['A) 3 ans', 'B) 4 ans', 'C) 5 ans', 'D) 7 ans'], correctAnswer: 2, explanation: '"5 ans".' },
          { id: 7, audioDescription: '[Audio: RSA]', audioText: 'Le RSA pour une personne seule est de 607€ par mois. Majoration de 50% pour un couple.', question: 'RSA personne seule?', options: ['A) 550€', 'B) 580€', 'C) 607€', 'D) 650€'], correctAnswer: 2, explanation: '"607€".' },
          { id: 8, audioDescription: '[Audio: Permis conduire]', audioText: 'Échange de permis étranger: délai de 6 mois pour les ressortissants hors UE. Coût: 25€.', question: 'Délai d\'échange?', options: ['A) 3 mois', 'B) 4 mois', 'C) 6 mois', 'D) 12 mois'], correctAnswer: 2, explanation: '"6 mois".' },
          { id: 9, audioDescription: '[Audio: Sécurité sociale]', audioText: 'L\'inscription à la sécurité sociale est gratuite et obligatoire. Délai de traitement: 4 à 6 semaines.', question: 'Délai de traitement max?', options: ['A) 3 semaines', 'B) 4 semaines', 'C) 6 semaines', 'D) 8 semaines'], correctAnswer: 2, explanation: '"6 semaines".' },
          { id: 10, audioDescription: '[Audio: Impôts]', audioText: 'Première déclaration d\'impôts obligatoire si revenus supérieurs à 10 777€ par an pour une personne seule.', question: 'Seuil de déclaration?', options: ['A) 8 000€', 'B) 9 500€', 'C) 10 777€', 'D) 12 000€'], correctAnswer: 2, explanation: '"10 777€".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Consultations',
        description: 'Rendez-vous administratifs',
        questions: [
          { id: 11, audioDescription: '[Audio: Avocat immigration]', audioText: 'Avocat: "La procédure de regroupement familial prend entre 12 et 18 mois. Les frais de dossier sont de 200€."', question: 'Durée procédure min?', options: ['A) 6 mois', 'B) 9 mois', 'C) 12 mois', 'D) 15 mois'], correctAnswer: 2, explanation: '"12 mois".' },
          { id: 12, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Frais de dossier?', options: ['A) 150€', 'B) 175€', 'C) 200€', 'D) 250€'], correctAnswer: 2, explanation: '"200€".' },
          { id: 13, audioDescription: '[Audio: Traducteur]', audioText: 'Traducteur: "La traduction officielle coûte 35€ par page. Délai: 3 jours ouvrés."', question: 'Prix par page?', options: ['A) 25€', 'B) 30€', 'C) 35€', 'D) 40€'], correctAnswer: 2, explanation: '"35€".' },
          { id: 14, audioDescription: '[Audio: Notaire]', audioText: 'Notaire: "L\'apostille coûte 15€ par document. Service sous 48 heures."', question: 'Prix apostille?', options: ['A) 10€', 'B) 12€', 'C) 15€', 'D) 20€'], correctAnswer: 2, explanation: '"15€".' },
          { id: 15, audioDescription: '[Audio: Association]', audioText: 'Bénévole: "Notre permanence aide 200 personnes par mois. Nous avons 15 bénévoles."', question: 'Personnes aidées/mois?', options: ['A) 150', 'B) 175', 'C) 200', 'D) 250'], correctAnswer: 2, explanation: '"200".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Statistiques',
        description: 'Données sur l\'immigration',
        questions: [
          { id: 16, audioDescription: '[Audio: Immigration France]', audioText: 'La France accueille 250 000 nouveaux résidents par an. 50% viennent pour raisons familiales, 25% pour le travail.', question: 'Nouveaux résidents/an?', options: ['A) 200 000', 'B) 225 000', 'C) 250 000', 'D) 300 000'], correctAnswer: 2, explanation: '"250 000".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: '% pour raisons familiales?', options: ['A) 40%', 'B) 45%', 'C) 50%', 'D) 55%'], correctAnswer: 2, explanation: '"50%".' },
          { id: 18, audioDescription: '[Audio: Naturalisation]', audioText: '90 000 personnes obtiennent la nationalité française chaque année. Le délai moyen est de 18 mois.', question: 'Naturalisations/an?', options: ['A) 70 000', 'B) 80 000', 'C) 90 000', 'D) 100 000'], correctAnswer: 2, explanation: '"90 000".' },
          { id: 19, audioDescription: '[Audio: Étudiants]', audioText: '400 000 étudiants étrangers sont inscrits en France. 30% viennent d\'Afrique, 25% d\'Asie.', question: 'Étudiants étrangers?', options: ['A) 300 000', 'B) 350 000', 'C) 400 000', 'D) 450 000'], correctAnswer: 2, explanation: '"400 000".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: '13% de la population française est née à l\'étranger. La communauté algérienne est la plus importante avec 1,5 million de personnes.', question: '% nés à l\'étranger?', options: ['A) 10%', 'B) 11%', 'C) 13%', 'D) 15%'], correctAnswer: 2, explanation: '"13%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 16: Canadian Life ====================
  {
    id: 'listening-exam-16',
    examNumber: 16,
    title: 'Compréhension Orale - Examen 16',
    theme: 'Canadian Life',
    level: 'B1-B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations au Canada',
        questions: [
          { id: 1, audioDescription: '[Audio: Tim Hortons]', audioText: 'Employé: "Un café double-double et un beigne, ça fait 4,50$ avec les taxes."', question: 'Prix total?', options: ['A) 3,50$', 'B) 4,00$', 'C) 4,50$', 'D) 5,00$'], correctAnswer: 2, explanation: '"4,50$".' },
          { id: 2, audioDescription: '[Audio: Métro Montréal]', audioText: 'Annonce: "Prochaine station Berri-UQAM. Correspondance lignes orange et jaune."', question: 'Nombre de correspondances?', options: ['A) 1', 'B) 2', 'C) 3', 'D) 4'], correctAnswer: 1, explanation: 'Lignes orange et jaune = 2.' },
          { id: 3, audioDescription: '[Audio: Épicerie]', audioText: 'Caissier: "Les bleuets du Québec sont en spécial: 3,99$ la pinte au lieu de 5,99$."', question: 'Prix en spécial?', options: ['A) 2,99$', 'B) 3,49$', 'C) 3,99$', 'D) 4,49$'], correctAnswer: 2, explanation: '"3,99$".' },
          { id: 4, audioDescription: '[Audio: Service Québec]', audioText: 'Agent: "Le renouvellement de permis coûte 118$ pour 2 ans."', question: 'Prix renouvellement?', options: ['A) 98$', 'B) 108$', 'C) 118$', 'D) 128$'], correctAnswer: 2, explanation: '"118$".' },
          { id: 5, audioDescription: '[Audio: Hydro-Québec]', audioText: 'Agent: "Votre facture est de 85$ pour ce mois. Le tarif est de 6,3 cents le kWh."', question: 'Montant facture?', options: ['A) 65$', 'B) 75$', 'C) 85$', 'D) 95$'], correctAnswer: 2, explanation: '"85$".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Actualités Canadiennes',
        description: 'Informations sur le Canada',
        questions: [
          { id: 6, audioDescription: '[Audio: Météo Canada]', audioText: 'Avertissement de tempête hivernale: 25 cm de neige prévus. Températures de -15°C avec refroidissement éolien de -25°C.', question: 'Neige prévue?', options: ['A) 15 cm', 'B) 20 cm', 'C) 25 cm', 'D) 30 cm'], correctAnswer: 2, explanation: '"25 cm".' },
          { id: 7, audioDescription: '[Audio: Économie]', audioText: 'Le salaire minimum au Québec passe à 15,75$ de l\'heure. Une augmentation de 50 cents.', question: 'Nouveau salaire minimum?', options: ['A) 14,75$', 'B) 15,25$', 'C) 15,75$', 'D) 16,25$'], correctAnswer: 2, explanation: '"15,75$".' },
          { id: 8, audioDescription: '[Audio: Immigration]', audioText: 'Le Canada accueillera 500 000 immigrants cette année. Le Québec en recevra 60 000.', question: 'Immigrants au Canada?', options: ['A) 400 000', 'B) 450 000', 'C) 500 000', 'D) 550 000'], correctAnswer: 2, explanation: '"500 000".' },
          { id: 9, audioDescription: '[Audio: Logement]', audioText: 'Le loyer moyen à Montréal est de 1500$ par mois pour un 4½. Une hausse de 8% en un an.', question: 'Loyer moyen?', options: ['A) 1200$', 'B) 1350$', 'C) 1500$', 'D) 1650$'], correctAnswer: 2, explanation: '"1500$".' },
          { id: 10, audioDescription: '[Audio: Université]', audioText: 'Les frais de scolarité à l\'UQAM sont de 3500$ par an pour les Québécois, 9000$ pour les Canadiens hors Québec.', question: 'Frais pour Québécois?', options: ['A) 2500$', 'B) 3000$', 'C) 3500$', 'D) 4000$'], correctAnswer: 2, explanation: '"3500$".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Vie Quotidienne',
        description: 'Conversations canadiennes',
        questions: [
          { id: 11, audioDescription: '[Audio: RAMQ]', audioText: 'Agent: "Votre carte d\'assurance maladie est valable 4 ans. Le renouvellement est gratuit."', question: 'Validité de la carte?', options: ['A) 2 ans', 'B) 3 ans', 'C) 4 ans', 'D) 5 ans'], correctAnswer: 2, explanation: '"4 ans".' },
          { id: 12, audioDescription: '[Audio: Garderie]', audioText: 'Éducatrice: "La place en CPE coûte 8,85$ par jour. Liste d\'attente: environ 2 ans."', question: 'Prix CPE/jour?', options: ['A) 7,50$', 'B) 8,35$', 'C) 8,85$', 'D) 9,50$'], correctAnswer: 2, explanation: '"8,85$".' },
          { id: 13, audioDescription: '[Audio: SAQ]', audioText: 'Vendeur: "Cette bouteille de vin québécois est à 18$. La taxe provinciale sur l\'alcool est de 15%."', question: 'Prix de la bouteille?', options: ['A) 15$', 'B) 16$', 'C) 18$', 'D) 20$'], correctAnswer: 2, explanation: '"18$".' },
          { id: 14, audioDescription: '[Audio: Bell]', audioText: 'Agent: "Le forfait internet illimité est à 75$ par mois. Installation: 50$ de frais uniques."', question: 'Forfait mensuel?', options: ['A) 55$', 'B) 65$', 'C) 75$', 'D) 85$'], correctAnswer: 2, explanation: '"75$".' },
          { id: 15, audioDescription: '[Audio: Bixi]', audioText: 'Agent: "L\'abonnement annuel Bixi est à 99$. Les 45 premières minutes sont incluses."', question: 'Prix annuel Bixi?', options: ['A) 79$', 'B) 89$', 'C) 99$', 'D) 109$'], correctAnswer: 2, explanation: '"99$".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Culture Canadienne',
        description: 'Documentaires sur le Canada',
        questions: [
          { id: 16, audioDescription: '[Audio: Géographie]', audioText: 'Le Canada est le deuxième plus grand pays du monde avec 10 millions de km². Population: 40 millions d\'habitants.', question: 'Superficie Canada?', options: ['A) 8 millions km²', 'B) 9 millions km²', 'C) 10 millions km²', 'D) 12 millions km²'], correctAnswer: 2, explanation: '"10 millions km²".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Population Canada?', options: ['A) 35 millions', 'B) 38 millions', 'C) 40 millions', 'D) 45 millions'], correctAnswer: 2, explanation: '"40 millions".' },
          { id: 18, audioDescription: '[Audio: Québec]', audioText: 'Le Québec compte 8,5 millions d\'habitants. 80% sont francophones. Montréal est la 2ème ville francophone du monde.', question: 'Population Québec?', options: ['A) 7,5 millions', 'B) 8 millions', 'C) 8,5 millions', 'D) 9 millions'], correctAnswer: 2, explanation: '"8,5 millions".' },
          { id: 19, audioDescription: '[Audio: Climat]', audioText: 'L\'hiver canadien dure 5 mois en moyenne. À Montréal, il tombe 2 mètres de neige par an.', question: 'Durée de l\'hiver?', options: ['A) 3 mois', 'B) 4 mois', 'C) 5 mois', 'D) 6 mois'], correctAnswer: 2, explanation: '"5 mois".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Le Canada accueille 21 millions de touristes par an. Les chutes du Niagara reçoivent 12 millions de visiteurs.', question: 'Touristes au Canada/an?', options: ['A) 15 millions', 'B) 18 millions', 'C) 21 millions', 'D) 25 millions'], correctAnswer: 2, explanation: '"21 millions".' }
        ]
      }
    ]
  },

  // ==================== EXAM 17: Shopping & Commerce ====================
  {
    id: 'listening-exam-17',
    examNumber: 17,
    title: 'Compréhension Orale - Examen 17',
    theme: 'Shopping & Commerce',
    level: 'A2-B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations d\'achat',
        questions: [
          { id: 1, audioDescription: '[Audio: Boutique vêtements]', audioText: 'Vendeuse: "Cette veste est à 89€. Avec la réduction de 30%, ça fait 62,30€."', question: 'Prix après réduction?', options: ['A) 52,30€', 'B) 57,30€', 'C) 62,30€', 'D) 67,30€'], correctAnswer: 2, explanation: '"62,30€".' },
          { id: 2, audioDescription: '[Audio: Électronique]', audioText: 'Vendeur: "Cet ordinateur portable a 16 Go de RAM et 512 Go de SSD. Garantie 2 ans."', question: 'Capacité SSD?', options: ['A) 256 Go', 'B) 512 Go', 'C) 1 To', 'D) 2 To'], correctAnswer: 1, explanation: '"512 Go".' },
          { id: 3, audioDescription: '[Audio: Retour produit]', audioText: 'Agent: "Vous avez 30 jours pour retourner l\'article. Remboursement sous 14 jours."', question: 'Délai de retour?', options: ['A) 14 jours', 'B) 21 jours', 'C) 30 jours', 'D) 60 jours'], correctAnswer: 2, explanation: '"30 jours".' },
          { id: 4, audioDescription: '[Audio: Livraison]', audioText: 'Agent: "La livraison standard est à 5€, sous 5-7 jours. Express: 12€, sous 24h."', question: 'Prix livraison standard?', options: ['A) 3€', 'B) 4€', 'C) 5€', 'D) 6€'], correctAnswer: 2, explanation: '"5€".' },
          { id: 5, audioDescription: '[Audio: Fidélité]', audioText: 'Caissière: "Avec votre carte fidélité, vous cumulez 5% en bon d\'achat. Vous avez 45€ de crédit."', question: 'Crédit disponible?', options: ['A) 35€', 'B) 40€', 'C) 45€', 'D) 50€'], correctAnswer: 2, explanation: '"45€".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Promotions',
        description: 'Annonces commerciales',
        questions: [
          { id: 6, audioDescription: '[Audio: Publicité]', audioText: 'Black Friday: jusqu\'à 70% de réduction sur une sélection d\'articles! Du 24 au 27 novembre.', question: 'Réduction maximale?', options: ['A) 50%', 'B) 60%', 'C) 70%', 'D) 80%'], correctAnswer: 2, explanation: '"70%".' },
          { id: 7, audioDescription: '[Audio: Supermarché]', audioText: 'Offre du week-end: 3 produits achetés, le 4ème offert sur tous les shampoings.', question: 'Combien pour 1 gratuit?', options: ['A) 2 achetés', 'B) 3 achetés', 'C) 4 achetés', 'D) 5 achetés'], correctAnswer: 1, explanation: '"3 achetés".' },
          { id: 8, audioDescription: '[Audio: Soldes]', audioText: 'Soldes d\'hiver: prix barrés dans tout le magasin. Deuxième démarque: -50% supplémentaires.', question: 'Réduction 2ème démarque?', options: ['A) 30%', 'B) 40%', 'C) 50%', 'D) 60%'], correctAnswer: 2, explanation: '"-50%".' },
          { id: 9, audioDescription: '[Audio: Vente flash]', audioText: 'Vente flash: TV 55 pouces à 399€ au lieu de 599€. Offre limitée aux 100 premiers clients.', question: 'Prix promo TV?', options: ['A) 349€', 'B) 379€', 'C) 399€', 'D) 449€'], correctAnswer: 2, explanation: '"399€".' },
          { id: 10, audioDescription: '[Audio: Carte cadeau]', audioText: 'Achetez une carte cadeau de 100€ et recevez 10€ de bonus. Offre valable jusqu\'à Noël.', question: 'Bonus sur carte 100€?', options: ['A) 5€', 'B) 8€', 'C) 10€', 'D) 15€'], correctAnswer: 2, explanation: '"10€".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Négociations',
        description: 'Discussions commerciales',
        questions: [
          { id: 11, audioDescription: '[Audio: Marché]', audioText: 'Vendeur: "Les tomates sont à 3€ le kilo. Pour 5 kilos, je vous fais 12€."', question: 'Prix pour 5 kg?', options: ['A) 10€', 'B) 11€', 'C) 12€', 'D) 13€'], correctAnswer: 2, explanation: '"12€".' },
          { id: 12, audioDescription: '[Audio: Voiture occasion]', audioText: 'Vendeur: "Le prix est de 15 000€. Je peux descendre à 14 200€ avec la reprise de votre ancien véhicule."', question: 'Prix après négociation?', options: ['A) 13 500€', 'B) 14 000€', 'C) 14 200€', 'D) 14 500€'], correctAnswer: 2, explanation: '"14 200€".' },
          { id: 13, audioDescription: '[Audio: Artisan]', audioText: 'Artisan: "Le devis est de 2500€ TTC pour la cuisine. Acompte de 30% à la commande."', question: 'Montant acompte?', options: ['A) 500€', 'B) 625€', 'C) 750€', 'D) 875€'], correctAnswer: 2, explanation: '30% de 2500€ = 750€.' },
          { id: 14, audioDescription: '[Audio: Grossiste]', audioText: 'Grossiste: "À partir de 50 unités, le prix unitaire passe de 10€ à 7,50€."', question: 'Prix unitaire pour 50+?', options: ['A) 6,50€', 'B) 7€', 'C) 7,50€', 'D) 8€'], correctAnswer: 2, explanation: '"7,50€".' },
          { id: 15, audioDescription: '[Audio: Abonnement]', audioText: 'Agent: "L\'abonnement mensuel est à 29€. En annuel, vous payez 279€, soit 2 mois offerts."', question: 'Prix abonnement annuel?', options: ['A) 249€', 'B) 259€', 'C) 279€', 'D) 299€'], correctAnswer: 2, explanation: '"279€".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Commerce',
        description: 'Tendances commerciales',
        questions: [
          { id: 16, audioDescription: '[Audio: E-commerce]', audioText: 'Le e-commerce représente 15% du commerce de détail en France. Les ventes en ligne ont atteint 150 milliards d\'euros.', question: 'Part du e-commerce?', options: ['A) 10%', 'B) 12%', 'C) 15%', 'D) 18%'], correctAnswer: 2, explanation: '"15%".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Ventes en ligne?', options: ['A) 120 milliards', 'B) 135 milliards', 'C) 150 milliards', 'D) 175 milliards'], correctAnswer: 2, explanation: '"150 milliards".' },
          { id: 18, audioDescription: '[Audio: Consommation]', audioText: 'Les Français dépensent en moyenne 400€ par mois en alimentation. 25% achètent bio régulièrement.', question: 'Budget alimentation?', options: ['A) 300€', 'B) 350€', 'C) 400€', 'D) 450€'], correctAnswer: 2, explanation: '"400€".' },
          { id: 19, audioDescription: '[Audio: Mode]', audioText: 'Le marché de la seconde main a triplé en 5 ans. 70% des 18-25 ans achètent d\'occasion.', question: '% jeunes achetant occasion?', options: ['A) 50%', 'B) 60%', 'C) 70%', 'D) 80%'], correctAnswer: 2, explanation: '"70%".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Le panier moyen en ligne est de 75€. Les achats sur mobile représentent 45% du e-commerce.', question: 'Panier moyen?', options: ['A) 60€', 'B) 65€', 'C) 75€', 'D) 85€'], correctAnswer: 2, explanation: '"75€".' }
        ]
      }
    ]
  },

  // ==================== EXAM 18: Law & Justice ====================
  {
    id: 'listening-exam-18',
    examNumber: 18,
    title: 'Compréhension Orale - Examen 18',
    theme: 'Law & Justice',
    level: 'B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations juridiques',
        questions: [
          { id: 1, audioDescription: '[Audio: Cabinet avocat]', audioText: 'Avocat: "La consultation initiale coûte 100€. Le dossier complet sera à 1500€."', question: 'Prix consultation?', options: ['A) 50€', 'B) 75€', 'C) 100€', 'D) 150€'], correctAnswer: 2, explanation: '"100€".' },
          { id: 2, audioDescription: '[Audio: Commissariat]', audioText: 'Policier: "Vous avez le droit de garder le silence. Vous pouvez demander un avocat dans les 2 heures."', question: 'Délai pour avocat?', options: ['A) 1 heure', 'B) 2 heures', 'C) 4 heures', 'D) 24 heures'], correctAnswer: 1, explanation: '"2 heures".' },
          { id: 3, audioDescription: '[Audio: Tribunal]', audioText: 'Greffier: "L\'audience aura lieu le 15 mars à 14h, salle 3. Durée estimée: 2 heures."', question: 'Heure de l\'audience?', options: ['A) 10h', 'B) 11h', 'C) 14h', 'D) 15h'], correctAnswer: 2, explanation: '"14h".' },
          { id: 4, audioDescription: '[Audio: Notaire]', audioText: 'Notaire: "Les frais de succession s\'élèvent à 8% pour cette tranche. Héritage de 200 000€."', question: 'Frais de succession?', options: ['A) 6%', 'B) 7%', 'C) 8%', 'D) 10%'], correctAnswer: 2, explanation: '"8%".' },
          { id: 5, audioDescription: '[Audio: Assurance]', audioText: 'Agent: "Le délai pour déclarer un sinistre est de 5 jours ouvrés maximum."', question: 'Délai déclaration?', options: ['A) 3 jours', 'B) 4 jours', 'C) 5 jours', 'D) 7 jours'], correctAnswer: 2, explanation: '"5 jours".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Informations Juridiques',
        description: 'Actualités juridiques',
        questions: [
          { id: 6, audioDescription: '[Audio: Journal]', audioText: 'Nouvelle loi: le délai de rétractation pour les achats en ligne passe de 14 à 21 jours.', question: 'Nouveau délai?', options: ['A) 14 jours', 'B) 17 jours', 'C) 21 jours', 'D) 30 jours'], correctAnswer: 2, explanation: '"21 jours".' },
          { id: 7, audioDescription: '[Audio: Code route]', audioText: 'Excès de vitesse de plus de 50 km/h: 1500€ d\'amende et suspension de permis de 3 ans maximum.', question: 'Amende excès 50+ km/h?', options: ['A) 1000€', 'B) 1250€', 'C) 1500€', 'D) 2000€'], correctAnswer: 2, explanation: '"1500€".' },
          { id: 8, audioDescription: '[Audio: Travail]', audioText: 'Licenciement abusif: indemnité minimale de 6 mois de salaire pour les employés ayant 10 ans d\'ancienneté.', question: 'Indemnité minimum?', options: ['A) 3 mois', 'B) 4 mois', 'C) 6 mois', 'D) 12 mois'], correctAnswer: 2, explanation: '"6 mois".' },
          { id: 9, audioDescription: '[Audio: Logement]', audioText: 'Préavis de départ du locataire: 3 mois en zone normale, 1 mois en zone tendue.', question: 'Préavis zone tendue?', options: ['A) 15 jours', 'B) 1 mois', 'C) 2 mois', 'D) 3 mois'], correctAnswer: 1, explanation: '"1 mois".' },
          { id: 10, audioDescription: '[Audio: Divorce]', audioText: 'La procédure de divorce par consentement mutuel prend en moyenne 4 mois. Coût: environ 2000€.', question: 'Durée procédure?', options: ['A) 2 mois', 'B) 3 mois', 'C) 4 mois', 'D) 6 mois'], correctAnswer: 2, explanation: '"4 mois".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Consultations',
        description: 'Conseils juridiques',
        questions: [
          { id: 11, audioDescription: '[Audio: Droit travail]', audioText: 'Avocat: "Votre employeur vous doit 3 mois de préavis et une indemnité de 15 000€."', question: 'Indemnité due?', options: ['A) 10 000€', 'B) 12 500€', 'C) 15 000€', 'D) 18 000€'], correctAnswer: 2, explanation: '"15 000€".' },
          { id: 12, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Préavis dû?', options: ['A) 1 mois', 'B) 2 mois', 'C) 3 mois', 'D) 4 mois'], correctAnswer: 2, explanation: '"3 mois".' },
          { id: 13, audioDescription: '[Audio: Droit famille]', audioText: 'Avocat: "La pension alimentaire sera de 400€ par enfant et par mois jusqu\'à 25 ans."', question: 'Pension par enfant?', options: ['A) 300€', 'B) 350€', 'C) 400€', 'D) 450€'], correctAnswer: 2, explanation: '"400€".' },
          { id: 14, audioDescription: '[Audio: Propriété]', audioText: 'Notaire: "Le bail commercial est de 9 ans. Le loyer peut être révisé tous les 3 ans."', question: 'Durée bail commercial?', options: ['A) 6 ans', 'B) 7 ans', 'C) 9 ans', 'D) 12 ans'], correctAnswer: 2, explanation: '"9 ans".' },
          { id: 15, audioDescription: '[Audio: Consommation]', audioText: 'Avocat: "La garantie légale est de 2 ans pour les biens neufs. Vous pouvez obtenir un remboursement."', question: 'Durée garantie légale?', options: ['A) 1 an', 'B) 18 mois', 'C) 2 ans', 'D) 3 ans'], correctAnswer: 2, explanation: '"2 ans".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Justice',
        description: 'Système judiciaire',
        questions: [
          { id: 16, audioDescription: '[Audio: Statistiques]', audioText: 'La France compte 8500 juges pour 67 millions d\'habitants. Le budget de la justice est de 12 milliards d\'euros.', question: 'Nombre de juges?', options: ['A) 7000', 'B) 7500', 'C) 8500', 'D) 9500'], correctAnswer: 2, explanation: '"8500".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Budget justice?', options: ['A) 9 milliards', 'B) 10 milliards', 'C) 12 milliards', 'D) 15 milliards'], correctAnswer: 2, explanation: '"12 milliards".' },
          { id: 18, audioDescription: '[Audio: Prisons]', audioText: 'La population carcérale française est de 75 000 détenus pour 60 000 places. Taux d\'occupation: 125%.', question: 'Nombre de détenus?', options: ['A) 60 000', 'B) 68 000', 'C) 75 000', 'D) 80 000'], correctAnswer: 2, explanation: '"75 000".' },
          { id: 19, audioDescription: '[Audio: Procès]', audioText: 'Le délai moyen d\'un procès aux assises est de 3 ans. Pour le tribunal correctionnel, comptez 12 mois.', question: 'Délai tribunal correctionnel?', options: ['A) 6 mois', 'B) 9 mois', 'C) 12 mois', 'D) 18 mois'], correctAnswer: 2, explanation: '"12 mois".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: '70% des litiges se règlent par la médiation sans passer au tribunal. Le taux de récidive est de 40%.', question: '% litiges réglés par médiation?', options: ['A) 50%', 'B) 60%', 'C) 70%', 'D) 80%'], correctAnswer: 2, explanation: '"70%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 19: Arts & Entertainment ====================
  {
    id: 'listening-exam-19',
    examNumber: 19,
    title: 'Compréhension Orale - Examen 19',
    theme: 'Arts & Entertainment',
    level: 'B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations artistiques',
        questions: [
          { id: 1, audioDescription: '[Audio: Théâtre]', audioText: 'Guichet: "Le spectacle dure 2h30 avec un entracte de 20 minutes. Places à partir de 25€."', question: 'Durée spectacle?', options: ['A) 2h', 'B) 2h15', 'C) 2h30', 'D) 3h'], correctAnswer: 2, explanation: '"2h30".' },
          { id: 2, audioDescription: '[Audio: Galerie]', audioText: 'Galeriste: "Cette exposition présente 40 œuvres de l\'artiste. Entrée gratuite jusqu\'à dimanche."', question: 'Nombre d\'œuvres?', options: ['A) 30', 'B) 35', 'C) 40', 'D) 50'], correctAnswer: 2, explanation: '"40 œuvres".' },
          { id: 3, audioDescription: '[Audio: Concert]', audioText: 'Organisateur: "Portes ouvertes à 19h, concert à 20h30. Capacité: 5000 places."', question: 'Heure du concert?', options: ['A) 19h', 'B) 19h30', 'C) 20h', 'D) 20h30'], correctAnswer: 3, explanation: '"20h30".' },
          { id: 4, audioDescription: '[Audio: École musique]', audioText: 'Professeur: "Le cours de piano dure 45 minutes. Tarif: 35€ la séance."', question: 'Durée du cours?', options: ['A) 30 min', 'B) 40 min', 'C) 45 min', 'D) 60 min'], correctAnswer: 2, explanation: '"45 minutes".' },
          { id: 5, audioDescription: '[Audio: Opéra]', audioText: 'Guichet: "La Traviata sera jouée 12 fois cette saison. Les places vont de 50 à 180€."', question: 'Nombre de représentations?', options: ['A) 8', 'B) 10', 'C) 12', 'D) 15'], correctAnswer: 2, explanation: '"12 fois".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Actualités Culturelles',
        description: 'Agenda culturel',
        questions: [
          { id: 6, audioDescription: '[Audio: Radio]', audioText: 'Le Festival de Cannes se tiendra du 14 au 25 mai. 21 films en compétition officielle cette année.', question: 'Durée du festival?', options: ['A) 8 jours', 'B) 10 jours', 'C) 12 jours', 'D) 15 jours'], correctAnswer: 2, explanation: 'Du 14 au 25 = 12 jours.' },
          { id: 7, audioDescription: '[Audio: Expo]', audioText: 'L\'exposition Picasso au Grand Palais a accueilli 700 000 visiteurs en 3 mois. Record de fréquentation!', question: 'Nombre de visiteurs?', options: ['A) 500 000', 'B) 600 000', 'C) 700 000', 'D) 800 000'], correctAnswer: 2, explanation: '"700 000".' },
          { id: 8, audioDescription: '[Audio: Cinéma]', audioText: 'Le dernier film français a dépassé les 4 millions d\'entrées. Il reste en tête du box-office depuis 5 semaines.', question: 'Entrées cinéma?', options: ['A) 3 millions', 'B) 3,5 millions', 'C) 4 millions', 'D) 5 millions'], correctAnswer: 2, explanation: '"4 millions".' },
          { id: 9, audioDescription: '[Audio: Musique]', audioText: 'Le nouvel album s\'est vendu à 300 000 exemplaires en une semaine. C\'est le meilleur démarrage de l\'année.', question: 'Ventes 1ère semaine?', options: ['A) 200 000', 'B) 250 000', 'C) 300 000', 'D) 400 000'], correctAnswer: 2, explanation: '"300 000".' },
          { id: 10, audioDescription: '[Audio: Danse]', audioText: 'Le ballet du Lac des Cygnes revient à l\'Opéra de Paris. 2 heures de spectacle avec 50 danseurs sur scène.', question: 'Nombre de danseurs?', options: ['A) 30', 'B) 40', 'C) 50', 'D) 60'], correctAnswer: 2, explanation: '"50".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Interviews',
        description: 'Entretiens artistiques',
        questions: [
          { id: 11, audioDescription: '[Audio: Réalisateur]', audioText: 'Réalisateur: "Le film a coûté 25 millions d\'euros. Tournage de 12 semaines dans 5 pays différents."', question: 'Budget du film?', options: ['A) 15 millions', 'B) 20 millions', 'C) 25 millions', 'D) 30 millions'], correctAnswer: 2, explanation: '"25 millions".' },
          { id: 12, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Durée tournage?', options: ['A) 8 semaines', 'B) 10 semaines', 'C) 12 semaines', 'D) 16 semaines'], correctAnswer: 2, explanation: '"12 semaines".' },
          { id: 13, audioDescription: '[Audio: Artiste peintre]', audioText: 'Artiste: "J\'ai mis 2 ans à créer cette série de 30 tableaux. Le prix moyen est de 8000€ l\'œuvre."', question: 'Nombre de tableaux?', options: ['A) 20', 'B) 25', 'C) 30', 'D) 40'], correctAnswer: 2, explanation: '"30 tableaux".' },
          { id: 14, audioDescription: '[Audio: Musicien]', audioText: 'Musicien: "La tournée comprend 60 concerts dans 15 pays. On joue devant 10 000 personnes en moyenne."', question: 'Nombre de concerts?', options: ['A) 40', 'B) 50', 'C) 60', 'D) 80'], correctAnswer: 2, explanation: '"60 concerts".' },
          { id: 15, audioDescription: '[Audio: Comédien]', audioText: 'Comédien: "J\'ai joué 200 représentations de cette pièce en 2 ans. C\'est mon plus grand succès."', question: 'Nombre de représentations?', options: ['A) 150', 'B) 180', 'C) 200', 'D) 250'], correctAnswer: 2, explanation: '"200".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Documentaires',
        description: 'Culture et société',
        questions: [
          { id: 16, audioDescription: '[Audio: Industrie cinéma]', audioText: 'La France produit 300 films par an, ce qui en fait le 2ème producteur européen après le Royaume-Uni.', question: 'Films produits/an?', options: ['A) 200', 'B) 250', 'C) 300', 'D) 350'], correctAnswer: 2, explanation: '"300 films".' },
          { id: 17, audioDescription: '[Audio: Musées]', audioText: 'Les musées français accueillent 70 millions de visiteurs par an. Le Louvre en reçoit 10 millions à lui seul.', question: 'Visiteurs musées/an?', options: ['A) 50 millions', 'B) 60 millions', 'C) 70 millions', 'D) 80 millions'], correctAnswer: 2, explanation: '"70 millions".' },
          { id: 18, audioDescription: '[Audio: Spectacle vivant]', audioText: 'Le spectacle vivant en France représente 2 milliards d\'euros de recettes. 150 000 professionnels travaillent dans ce secteur.', question: 'Recettes spectacle vivant?', options: ['A) 1,5 milliard', 'B) 1,8 milliard', 'C) 2 milliards', 'D) 2,5 milliards'], correctAnswer: 2, explanation: '"2 milliards".' },
          { id: 19, audioDescription: '[Audio: Streaming]', audioText: 'Les plateformes de streaming musical comptent 20 millions d\'abonnés en France. Le marché a doublé en 5 ans.', question: 'Abonnés streaming?', options: ['A) 15 millions', 'B) 18 millions', 'C) 20 millions', 'D) 25 millions'], correctAnswer: 2, explanation: '"20 millions".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'La France est le 3ème marché mondial du jeu vidéo avec 5 milliards d\'euros. 35 millions de Français jouent régulièrement.', question: 'Marché jeu vidéo?', options: ['A) 3 milliards', 'B) 4 milliards', 'C) 5 milliards', 'D) 6 milliards'], correctAnswer: 2, explanation: '"5 milliards".' }
        ]
      }
    ]
  },

  // ==================== EXAM 20: Science & Research ====================
  {
    id: 'listening-exam-20',
    examNumber: 20,
    title: 'Compréhension Orale - Examen 20',
    theme: 'Science & Research',
    level: 'B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations scientifiques',
        questions: [
          { id: 1, audioDescription: '[Audio: Laboratoire]', audioText: 'Chercheur: "L\'expérience dure 6 semaines. On analysera 500 échantillons."', question: 'Durée expérience?', options: ['A) 4 semaines', 'B) 5 semaines', 'C) 6 semaines', 'D) 8 semaines'], correctAnswer: 2, explanation: '"6 semaines".' },
          { id: 2, audioDescription: '[Audio: Hôpital]', audioText: 'Médecin: "L\'essai clinique inclut 200 patients. Durée du traitement: 12 mois."', question: 'Nombre de patients?', options: ['A) 150', 'B) 175', 'C) 200', 'D) 250'], correctAnswer: 2, explanation: '"200 patients".' },
          { id: 3, audioDescription: '[Audio: Observatoire]', audioText: 'Astronome: "Cette étoile est à 50 années-lumière. On l\'observe depuis 3 ans."', question: 'Distance de l\'étoile?', options: ['A) 30 années-lumière', 'B) 40 années-lumière', 'C) 50 années-lumière', 'D) 100 années-lumière'], correctAnswer: 2, explanation: '"50 années-lumière".' },
          { id: 4, audioDescription: '[Audio: Université]', audioText: 'Professeur: "Ma thèse m\'a pris 4 ans. J\'ai publié 15 articles scientifiques."', question: 'Durée de la thèse?', options: ['A) 3 ans', 'B) 4 ans', 'C) 5 ans', 'D) 6 ans'], correctAnswer: 1, explanation: '"4 ans".' },
          { id: 5, audioDescription: '[Audio: Conférence]', audioText: 'Organisateur: "Le colloque réunit 300 chercheurs de 40 pays pendant 3 jours."', question: 'Nombre de chercheurs?', options: ['A) 200', 'B) 250', 'C) 300', 'D) 400'], correctAnswer: 2, explanation: '"300".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Actualités Scientifiques',
        description: 'Découvertes récentes',
        questions: [
          { id: 6, audioDescription: '[Audio: Flash info]', audioText: 'Découverte majeure: un nouveau vaccin efficace à 95%. Essais sur 30 000 personnes réussis.', question: 'Efficacité du vaccin?', options: ['A) 85%', 'B) 90%', 'C) 95%', 'D) 98%'], correctAnswer: 2, explanation: '"95%".' },
          { id: 7, audioDescription: '[Audio: Espace]', audioText: 'La mission Mars durera 18 mois. Coût estimé: 5 milliards de dollars. Équipage de 4 astronautes.', question: 'Durée de la mission?', options: ['A) 12 mois', 'B) 15 mois', 'C) 18 mois', 'D) 24 mois'], correctAnswer: 2, explanation: '"18 mois".' },
          { id: 8, audioDescription: '[Audio: Climat]', audioText: 'La température moyenne a augmenté de 1,2°C depuis 1900. Les glaciers ont perdu 30% de leur volume.', question: 'Hausse de température?', options: ['A) 0,8°C', 'B) 1,0°C', 'C) 1,2°C', 'D) 1,5°C'], correctAnswer: 2, explanation: '"1,2°C".' },
          { id: 9, audioDescription: '[Audio: Médecine]', audioText: 'Nouvelle thérapie génique: 80% de réussite sur les maladies rares. Coût: 2 millions d\'euros par patient.', question: 'Taux de réussite?', options: ['A) 60%', 'B) 70%', 'C) 80%', 'D) 90%'], correctAnswer: 2, explanation: '"80%".' },
          { id: 10, audioDescription: '[Audio: IA]', audioText: 'L\'IA peut désormais diagnostiquer 50 maladies avec une précision de 92%. Plus rapide que les médecins.', question: 'Maladies diagnostiquées?', options: ['A) 30', 'B) 40', 'C) 50', 'D) 60'], correctAnswer: 2, explanation: '"50 maladies".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Interviews',
        description: 'Entretiens scientifiques',
        questions: [
          { id: 11, audioDescription: '[Audio: Prix Nobel]', audioText: 'Chercheur: "Mes recherches ont duré 20 ans. J\'ai dirigé une équipe de 25 personnes."', question: 'Durée des recherches?', options: ['A) 15 ans', 'B) 18 ans', 'C) 20 ans', 'D) 25 ans'], correctAnswer: 2, explanation: '"20 ans".' },
          { id: 12, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Taille de l\'équipe?', options: ['A) 15', 'B) 20', 'C) 25', 'D) 30'], correctAnswer: 2, explanation: '"25 personnes".' },
          { id: 13, audioDescription: '[Audio: Ingénieur]', audioText: 'Ingénieur: "Notre robot peut fonctionner 72 heures sans recharge. Il résiste à des températures de -40°C."', question: 'Autonomie du robot?', options: ['A) 48 heures', 'B) 60 heures', 'C) 72 heures', 'D) 96 heures'], correctAnswer: 2, explanation: '"72 heures".' },
          { id: 14, audioDescription: '[Audio: Biologiste]', audioText: 'Biologiste: "Nous avons identifié 150 nouvelles espèces cette année. 10% sont déjà menacées."', question: 'Nouvelles espèces?', options: ['A) 100', 'B) 125', 'C) 150', 'D) 200'], correctAnswer: 2, explanation: '"150".' },
          { id: 15, audioDescription: '[Audio: Startup]', audioText: 'CEO: "Notre technologie réduit les émissions de 60%. On a levé 50 millions d\'euros."', question: 'Réduction des émissions?', options: ['A) 40%', 'B) 50%', 'C) 60%', 'D) 70%'], correctAnswer: 2, explanation: '"60%".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Documentaires',
        description: 'Science et société',
        questions: [
          { id: 16, audioDescription: '[Audio: Recherche France]', audioText: 'La France investit 2,2% de son PIB dans la recherche, soit 55 milliards d\'euros. 300 000 chercheurs y travaillent.', question: '% PIB en recherche?', options: ['A) 1,8%', 'B) 2%', 'C) 2,2%', 'D) 2,5%'], correctAnswer: 2, explanation: '"2,2%".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Suite]', question: 'Nombre de chercheurs?', options: ['A) 200 000', 'B) 250 000', 'C) 300 000', 'D) 350 000'], correctAnswer: 2, explanation: '"300 000".' },
          { id: 18, audioDescription: '[Audio: Énergie]', audioText: 'La fusion nucléaire pourrait fournir une énergie illimitée d\'ici 2050. Le projet ITER coûte 20 milliards d\'euros.', question: 'Coût projet ITER?', options: ['A) 10 milliards', 'B) 15 milliards', 'C) 20 milliards', 'D) 25 milliards'], correctAnswer: 2, explanation: '"20 milliards".' },
          { id: 19, audioDescription: '[Audio: Océans]', audioText: 'Seulement 20% des océans ont été explorés. On découvre encore 2000 nouvelles espèces marines par an.', question: '% des océans explorés?', options: ['A) 10%', 'B) 15%', 'C) 20%', 'D) 25%'], correctAnswer: 2, explanation: '"20%".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'D\'ici 2030, l\'IA pourrait créer 100 millions d\'emplois mais en supprimer 85 millions. Le solde net serait de +15 millions.', question: 'Emplois créés par l\'IA?', options: ['A) 80 millions', 'B) 90 millions', 'C) 100 millions', 'D) 120 millions'], correctAnswer: 2, explanation: '"100 millions".' }
        ]
      }
    ]
  }
];

// Export function to get a specific exam
export function getListeningExamPart2(examNumber) {
  return LISTENING_EXAMS_PART2.find(e => e.examNumber === examNumber);
}
