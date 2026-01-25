// TEF Mock Exams - Listening Comprehension Part 1 (Exams 1-10)
// Original content - Copyright free
// Each exam has 4 sections (A, B, C, D) with 20 questions total

export const LISTENING_EXAMS_PART1 = [
  // ==================== EXAM 1: Daily Life & Shopping ====================
  {
    id: 'listening-exam-1',
    examNumber: 1,
    title: 'Compréhension Orale - Examen 1',
    theme: 'Daily Life & Shopping',
    level: 'A2-B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Identifiez la situation, le lieu ou les personnes',
        questions: [
          { id: 1, audioDescription: '[Audio: Bruit de caisse, boulangerie]', audioText: 'Client: "Bonjour, deux baguettes et quatre croissants." Vendeur: "6,50€ s\'il vous plaît."', question: 'Où se déroule cette scène?', options: ['A) Dans une banque', 'B) Dans une boulangerie', 'C) Dans un restaurant', 'D) Dans une pharmacie'], correctAnswer: 1, explanation: 'Les mots "baguettes" et "croissants" indiquent une boulangerie.' },
          { id: 2, audioDescription: '[Audio: Sonnerie téléphone]', audioText: 'Réceptionniste: "Hôtel du Parc, bonjour." Client: "Je voudrais réserver une chambre pour le 15 mars."', question: 'Que veut faire le client?', options: ['A) Annuler une réservation', 'B) Se plaindre', 'C) Faire une réservation', 'D) Demander une facture'], correctAnswer: 2, explanation: '"Je voudrais réserver" indique une réservation.' },
          { id: 3, audioDescription: '[Audio: Bruit de bus]', audioText: 'Passager: "Ce bus va bien à la gare?" Chauffeur: "Oui, terminus dans 15 minutes."', question: 'Où va le passager?', options: ['A) À l\'aéroport', 'B) À la gare', 'C) À l\'hôpital', 'D) Au centre commercial'], correctAnswer: 1, explanation: 'Le passager demande si le bus va "à la gare".' },
          { id: 4, audioDescription: '[Audio: Restaurant]', audioText: 'Serveur: "Vous avez choisi?" Client: "Le menu du jour avec le poisson, s\'il vous plaît."', question: 'Que commande le client?', options: ['A) De la viande', 'B) Du poisson', 'C) Une salade', 'D) Une pizza'], correctAnswer: 1, explanation: 'Le client commande "le poisson".' },
          { id: 5, audioDescription: '[Audio: Magasin de vêtements]', audioText: 'Vendeuse: "Je peux vous aider?" Cliente: "Je cherche une robe pour un mariage."', question: 'Pourquoi la cliente cherche une robe?', options: ['A) Pour le travail', 'B) Pour un mariage', 'C) Pour le sport', 'D) Pour un entretien'], correctAnswer: 1, explanation: '"Une robe pour un mariage".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Annonces et Messages',
        description: 'Écoutez les annonces publiques',
        questions: [
          { id: 6, audioDescription: '[Audio: Radio météo]', audioText: 'Météo de demain: temps nuageux, températures entre 8 et 12 degrés, pluie en fin de journée.', question: 'Quel temps demain?', options: ['A) Ensoleillé', 'B) Nuageux avec pluie', 'C) Neige', 'D) Orage violent'], correctAnswer: 1, explanation: '"Nuageux" et "pluie en fin de journée".' },
          { id: 7, audioDescription: '[Audio: Publicité supermarché]', audioText: 'Grande ouverture samedi! Moins 20% sur les produits frais pendant 3 jours!', question: 'Quelle réduction?', options: ['A) 10%', 'B) 15%', 'C) 20%', 'D) 25%'], correctAnswer: 2, explanation: '"Moins 20%".' },
          { id: 8, audioDescription: '[Audio: Annonce gare]', audioText: 'TGV pour Marseille, départ 14h30, retardé de 25 minutes. Nouveau départ 14h55, voie 12.', question: 'Combien de retard?', options: ['A) 15 minutes', 'B) 20 minutes', 'C) 25 minutes', 'D) 30 minutes'], correctAnswer: 2, explanation: '"Retardé de 25 minutes".' },
          { id: 9, audioDescription: '[Audio: Message téléphonique]', audioText: 'Cabinet dentaire Martin, fermé du 1er au 15 août. En urgence, contactez le Dr Dubois au 01 42 00 00 00.', question: 'Combien de jours de fermeture?', options: ['A) 10 jours', 'B) 12 jours', 'C) 15 jours', 'D) 20 jours'], correctAnswer: 2, explanation: 'Du 1er au 15 août = 15 jours.' },
          { id: 10, audioDescription: '[Audio: Annonce musée]', audioText: 'Fermeture du musée dans 30 minutes. La boutique reste ouverte jusqu\'à 18h30.', question: 'Jusqu\'à quelle heure la boutique?', options: ['A) 17h30', 'B) 18h00', 'C) 18h30', 'D) 19h00'], correctAnswer: 2, explanation: '"Jusqu\'à 18h30".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        description: 'Écoutez des conversations plus longues',
        questions: [
          { id: 11, audioDescription: '[Audio: Entretien d\'embauche]', audioText: 'Recruteur: "Parlez-moi de votre expérience." Candidat: "J\'ai 5 ans d\'expérience comme comptable dans une PME."', question: 'Quelle profession du candidat?', options: ['A) Secrétaire', 'B) Comptable', 'C) Directeur', 'D) Commercial'], correctAnswer: 1, explanation: '"Comptable dans une PME".' },
          { id: 12, audioDescription: '[Audio: Suite entretien]', audioText: 'Recruteur: "Pourquoi changer?" Candidat: "Je cherche plus de responsabilités et de nouveaux défis."', question: 'Pourquoi veut-il changer?', options: ['A) Meilleur salaire', 'B) Plus de responsabilités', 'C) Horaires flexibles', 'D) Télétravail'], correctAnswer: 1, explanation: '"Plus de responsabilités".' },
          { id: 13, audioDescription: '[Audio: Discussion vacances]', audioText: 'Marie: "On part où cet été?" Pierre: "Je propose la Bretagne, 10 jours en août." Marie: "Parfait, je réserve le gîte."', question: 'Quelle destination?', options: ['A) Provence', 'B) Bretagne', 'C) Côte d\'Azur', 'D) Normandie'], correctAnswer: 1, explanation: '"La Bretagne".' },
          { id: 14, audioDescription: '[Audio: Médecin]', audioText: 'Médecin: "Vous avez de la fièvre depuis combien de temps?" Patient: "3 jours, avec mal de gorge." Médecin: "C\'est une angine, prenez ces antibiotiques pendant 7 jours."', question: 'Combien de jours de traitement?', options: ['A) 3 jours', 'B) 5 jours', 'C) 7 jours', 'D) 10 jours'], correctAnswer: 2, explanation: '"Pendant 7 jours".' },
          { id: 15, audioDescription: '[Audio: Immobilier]', audioText: 'Agent: "Cet appartement fait 75m² avec 3 chambres." Client: "Le loyer?" Agent: "950 euros charges comprises."', question: 'Quelle surface?', options: ['A) 65m²', 'B) 70m²', 'C) 75m²', 'D) 80m²'], correctAnswer: 2, explanation: '"75m²".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        description: 'Écoutez des présentations plus longues',
        questions: [
          { id: 16, audioDescription: '[Audio: Reportage tourisme]', audioText: 'La France accueille 90 millions de touristes par an, ce qui en fait la première destination mondiale. Paris reste la ville la plus visitée avec 40 millions de visiteurs.', question: 'Combien de touristes en France?', options: ['A) 70 millions', 'B) 80 millions', 'C) 90 millions', 'D) 100 millions'], correctAnswer: 2, explanation: '"90 millions de touristes".' },
          { id: 17, audioDescription: '[Audio: Suite reportage]', audioText: '[Suite du reportage précédent]', question: 'Combien de visiteurs à Paris?', options: ['A) 30 millions', 'B) 35 millions', 'C) 40 millions', 'D) 45 millions'], correctAnswer: 2, explanation: '"40 millions de visiteurs".' },
          { id: 18, audioDescription: '[Audio: Conférence santé]', audioText: 'Pour rester en bonne santé, les experts recommandent 30 minutes d\'activité physique par jour et 5 portions de fruits et légumes.', question: 'Combien de minutes d\'exercice recommandées?', options: ['A) 15 minutes', 'B) 20 minutes', 'C) 30 minutes', 'D) 45 minutes'], correctAnswer: 2, explanation: '"30 minutes d\'activité physique".' },
          { id: 19, audioDescription: '[Audio: Suite conférence]', audioText: '[Suite de la conférence]', question: 'Combien de portions de fruits/légumes?', options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'], correctAnswer: 2, explanation: '"5 portions".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Le sommeil est aussi essentiel: 7 à 8 heures par nuit pour les adultes. Le manque de sommeil augmente le risque de maladies cardiovasculaires de 48%.', question: 'Combien d\'heures de sommeil recommandées?', options: ['A) 5-6 heures', 'B) 6-7 heures', 'C) 7-8 heures', 'D) 9-10 heures'], correctAnswer: 2, explanation: '"7 à 8 heures".' }
        ]
      }
    ]
  },

  // ==================== EXAM 2: Work & Career ====================
  {
    id: 'listening-exam-2',
    examNumber: 2,
    title: 'Compréhension Orale - Examen 2',
    theme: 'Work & Career',
    level: 'B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations professionnelles courtes',
        questions: [
          { id: 1, audioDescription: '[Audio: Bureau]', audioText: 'Collègue A: "Tu as fini le rapport?" Collègue B: "Presque, il me faut encore 2 heures."', question: 'Combien de temps pour finir?', options: ['A) 1 heure', 'B) 2 heures', 'C) 3 heures', 'D) 4 heures'], correctAnswer: 1, explanation: '"2 heures".' },
          { id: 2, audioDescription: '[Audio: Réunion]', audioText: 'Chef: "La réunion est décalée à 15h au lieu de 14h." Employé: "D\'accord, salle de conférence B?"', question: 'Nouvelle heure de réunion?', options: ['A) 13h', 'B) 14h', 'C) 15h', 'D) 16h'], correctAnswer: 2, explanation: '"15h".' },
          { id: 3, audioDescription: '[Audio: Accueil]', audioText: 'Réceptionniste: "M. Martin est en réunion. Il sera disponible dans 30 minutes."', question: 'Quand sera M. Martin disponible?', options: ['A) 15 minutes', 'B) 20 minutes', 'C) 30 minutes', 'D) 45 minutes'], correctAnswer: 2, explanation: '"Dans 30 minutes".' },
          { id: 4, audioDescription: '[Audio: Cafétéria]', audioText: 'Employé: "Tu prends combien de jours de congés en juillet?" Collègue: "3 semaines, du 1er au 21."', question: 'Combien de semaines de congés?', options: ['A) 1 semaine', 'B) 2 semaines', 'C) 3 semaines', 'D) 4 semaines'], correctAnswer: 2, explanation: '"3 semaines".' },
          { id: 5, audioDescription: '[Audio: Téléphone]', audioText: 'Secrétaire: "Votre rendez-vous avec le directeur est confirmé pour demain à 9h30."', question: 'Heure du rendez-vous?', options: ['A) 9h00', 'B) 9h30', 'C) 10h00', 'D) 10h30'], correctAnswer: 1, explanation: '"9h30".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Annonces Professionnelles',
        description: 'Messages et annonces au travail',
        questions: [
          { id: 6, audioDescription: '[Audio: Haut-parleur entreprise]', audioText: 'Attention, la formation sécurité incendie aura lieu jeudi de 10h à 12h. Participation obligatoire.', question: 'Durée de la formation?', options: ['A) 1 heure', 'B) 2 heures', 'C) 3 heures', 'D) 4 heures'], correctAnswer: 1, explanation: 'De 10h à 12h = 2 heures.' },
          { id: 7, audioDescription: '[Audio: Message vocal]', audioText: 'Bonjour, c\'est Marc de la comptabilité. Pouvez-vous me rappeler au poste 234 avant 17h?', question: 'Quel numéro de poste?', options: ['A) 214', 'B) 224', 'C) 234', 'D) 244'], correctAnswer: 2, explanation: '"Poste 234".' },
          { id: 8, audioDescription: '[Audio: E-mail audio]', audioText: 'Suite au séminaire, merci d\'envoyer vos rapports avant vendredi 18h. Format PDF uniquement.', question: 'Date limite d\'envoi?', options: ['A) Jeudi', 'B) Vendredi', 'C) Samedi', 'D) Lundi'], correctAnswer: 1, explanation: '"Avant vendredi".' },
          { id: 9, audioDescription: '[Audio: Annonce DRH]', audioText: 'Les nouveaux horaires d\'été sont: 8h-16h du lundi au jeudi, 8h-12h le vendredi.', question: 'Horaires du vendredi?', options: ['A) 8h-14h', 'B) 8h-12h', 'C) 9h-13h', 'D) 9h-15h'], correctAnswer: 1, explanation: '"8h-12h le vendredi".' },
          { id: 10, audioDescription: '[Audio: Parking]', audioText: 'Le parking sera fermé pour travaux du 15 au 20. Utilisez le parking visiteurs.', question: 'Combien de jours de fermeture?', options: ['A) 3 jours', 'B) 4 jours', 'C) 5 jours', 'D) 6 jours'], correctAnswer: 3, explanation: 'Du 15 au 20 = 6 jours.' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Entretiens',
        description: 'Entretiens professionnels',
        questions: [
          { id: 11, audioDescription: '[Audio: Entretien annuel]', audioText: 'Manager: "Votre objectif était 100 000€ de ventes. Vous avez atteint 120 000€. Félicitations!"', question: 'Résultat atteint?', options: ['A) 100 000€', 'B) 110 000€', 'C) 120 000€', 'D) 130 000€'], correctAnswer: 2, explanation: '"120 000€".' },
          { id: 12, audioDescription: '[Audio: Suite entretien]', audioText: 'Manager: "Pour l\'année prochaine, on vise 150 000€. Une augmentation de 5% est prévue."', question: 'Nouvel objectif?', options: ['A) 130 000€', 'B) 140 000€', 'C) 150 000€', 'D) 160 000€'], correctAnswer: 2, explanation: '"150 000€".' },
          { id: 13, audioDescription: '[Audio: Formation]', audioText: 'RH: "La formation management dure 3 jours. Elle a lieu à Lyon en septembre."', question: 'Durée de la formation?', options: ['A) 2 jours', 'B) 3 jours', 'C) 4 jours', 'D) 5 jours'], correctAnswer: 1, explanation: '"3 jours".' },
          { id: 14, audioDescription: '[Audio: Projet]', audioText: 'Chef de projet: "L\'équipe compte 8 personnes. Délai: 6 mois. Budget: 200 000€."', question: 'Taille de l\'équipe?', options: ['A) 6 personnes', 'B) 7 personnes', 'C) 8 personnes', 'D) 9 personnes'], correctAnswer: 2, explanation: '"8 personnes".' },
          { id: 15, audioDescription: '[Audio: Négociation]', audioText: 'Client: "Pouvez-vous faire une remise?" Commercial: "Je peux vous proposer 15% sur une commande de 50 unités."', question: 'Quelle remise proposée?', options: ['A) 10%', 'B) 12%', 'C) 15%', 'D) 20%'], correctAnswer: 2, explanation: '"15%".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Présentations',
        description: 'Présentations d\'entreprise',
        questions: [
          { id: 16, audioDescription: '[Audio: Présentation résultats]', audioText: 'Notre chiffre d\'affaires a augmenté de 12% cette année pour atteindre 50 millions d\'euros. Le bénéfice net est de 5 millions.', question: 'Augmentation du CA?', options: ['A) 8%', 'B) 10%', 'C) 12%', 'D) 15%'], correctAnswer: 2, explanation: '"12%".' },
          { id: 17, audioDescription: '[Audio: Suite présentation]', audioText: '[Suite]', question: 'Bénéfice net?', options: ['A) 3 millions', 'B) 4 millions', 'C) 5 millions', 'D) 6 millions'], correctAnswer: 2, explanation: '"5 millions".' },
          { id: 18, audioDescription: '[Audio: Plan stratégique]', audioText: 'D\'ici 2027, nous prévoyons d\'ouvrir 20 nouvelles agences et de créer 500 emplois.', question: 'Combien de nouvelles agences?', options: ['A) 15', 'B) 18', 'C) 20', 'D) 25'], correctAnswer: 2, explanation: '"20 nouvelles agences".' },
          { id: 19, audioDescription: '[Audio: Suite plan]', audioText: '[Suite]', question: 'Combien d\'emplois créés?', options: ['A) 300', 'B) 400', 'C) 500', 'D) 600'], correctAnswer: 2, explanation: '"500 emplois".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Notre taux de satisfaction client est passé de 85% à 92% grâce à notre nouvelle politique qualité.', question: 'Nouveau taux de satisfaction?', options: ['A) 88%', 'B) 90%', 'C) 92%', 'D) 95%'], correctAnswer: 2, explanation: '"92%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 3: Health & Services ====================
  {
    id: 'listening-exam-3',
    examNumber: 3,
    title: 'Compréhension Orale - Examen 3',
    theme: 'Health & Services',
    level: 'B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations médicales et services',
        questions: [
          { id: 1, audioDescription: '[Audio: Pharmacie]', audioText: 'Pharmacien: "Ce médicament se prend 3 fois par jour, après les repas." Client: "Pendant combien de temps?" Pharmacien: "5 jours."', question: 'Combien de prises par jour?', options: ['A) 1 fois', 'B) 2 fois', 'C) 3 fois', 'D) 4 fois'], correctAnswer: 2, explanation: '"3 fois par jour".' },
          { id: 2, audioDescription: '[Audio: Cabinet médecin]', audioText: 'Secrétaire: "Le docteur peut vous recevoir jeudi à 11h30 ou vendredi à 9h." Patient: "Jeudi, s\'il vous plaît."', question: 'Jour du rendez-vous?', options: ['A) Mercredi', 'B) Jeudi', 'C) Vendredi', 'D) Samedi'], correctAnswer: 1, explanation: '"Jeudi".' },
          { id: 3, audioDescription: '[Audio: Urgences]', audioText: 'Infirmière: "Sur une échelle de 1 à 10, évaluez votre douleur." Patient: "7, c\'est très douloureux."', question: 'Niveau de douleur?', options: ['A) 5', 'B) 6', 'C) 7', 'D) 8'], correctAnswer: 2, explanation: '"7".' },
          { id: 4, audioDescription: '[Audio: Dentiste]', audioText: 'Dentiste: "Vous devrez revenir dans 6 mois pour un détartrage." Patient: "C\'est noté."', question: 'Prochain rendez-vous dans?', options: ['A) 3 mois', 'B) 4 mois', 'C) 6 mois', 'D) 12 mois'], correctAnswer: 2, explanation: '"6 mois".' },
          { id: 5, audioDescription: '[Audio: Assurance]', audioText: 'Agent: "Votre franchise est de 150 euros." Client: "Et la cotisation mensuelle?" Agent: "45 euros."', question: 'Montant de la franchise?', options: ['A) 100€', 'B) 125€', 'C) 150€', 'D) 175€'], correctAnswer: 2, explanation: '"150 euros".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Annonces Santé',
        description: 'Messages et campagnes de santé',
        questions: [
          { id: 6, audioDescription: '[Audio: Radio santé]', audioText: 'Campagne de vaccination gratuite contre la grippe du 15 octobre au 15 janvier pour les plus de 65 ans.', question: 'Durée de la campagne?', options: ['A) 2 mois', 'B) 3 mois', 'C) 4 mois', 'D) 5 mois'], correctAnswer: 1, explanation: 'Du 15 octobre au 15 janvier = 3 mois.' },
          { id: 7, audioDescription: '[Audio: Message hopital]', audioText: 'Les visites sont autorisées de 14h à 19h. Maximum 2 visiteurs par patient.', question: 'Nombre max de visiteurs?', options: ['A) 1', 'B) 2', 'C) 3', 'D) 4'], correctAnswer: 1, explanation: '"Maximum 2 visiteurs".' },
          { id: 8, audioDescription: '[Audio: Publicité santé]', audioText: 'Centre de bien-être: forfait spa 5 séances à 199€ au lieu de 250€. Offre valable jusqu\'au 31 décembre.', question: 'Prix du forfait?', options: ['A) 149€', 'B) 179€', 'C) 199€', 'D) 229€'], correctAnswer: 2, explanation: '"199€".' },
          { id: 9, audioDescription: '[Audio: Conseils]', audioText: 'Pour votre dos, évitez de porter des charges de plus de 15 kilos. Pliez les genoux pour ramasser un objet.', question: 'Poids maximum recommandé?', options: ['A) 10 kg', 'B) 12 kg', 'C) 15 kg', 'D) 20 kg'], correctAnswer: 2, explanation: '"Plus de 15 kilos".' },
          { id: 10, audioDescription: '[Audio: Prévention]', audioText: 'Lavez-vous les mains au moins 20 secondes avec du savon pour éliminer les virus.', question: 'Durée recommandée de lavage?', options: ['A) 10 secondes', 'B) 15 secondes', 'C) 20 secondes', 'D) 30 secondes'], correctAnswer: 2, explanation: '"Au moins 20 secondes".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Consultations',
        description: 'Consultations médicales',
        questions: [
          { id: 11, audioDescription: '[Audio: Consultation généraliste]', audioText: 'Médecin: "Votre tension est de 14/9, c\'est un peu élevé. Je vous prescris un traitement pour 3 mois."', question: 'Tension artérielle?', options: ['A) 12/8', 'B) 13/8', 'C) 14/9', 'D) 15/9'], correctAnswer: 2, explanation: '"14/9".' },
          { id: 12, audioDescription: '[Audio: Suite consultation]', audioText: 'Médecin: "Revenez me voir dans 3 mois. On fera une prise de sang pour vérifier le cholestérol."', question: 'Durée du traitement?', options: ['A) 1 mois', 'B) 2 mois', 'C) 3 mois', 'D) 6 mois'], correctAnswer: 2, explanation: '"3 mois".' },
          { id: 13, audioDescription: '[Audio: Kinésithérapie]', audioText: 'Kiné: "Je vous prescris 15 séances, 2 fois par semaine." Patient: "Ça fait combien de temps?" Kiné: "Environ 2 mois."', question: 'Nombre de séances?', options: ['A) 10', 'B) 12', 'C) 15', 'D) 20'], correctAnswer: 2, explanation: '"15 séances".' },
          { id: 14, audioDescription: '[Audio: Ophtalmologue]', audioText: 'Ophtalmologue: "Votre vue a baissé de 0,5 dioptrie. Je vous fais une nouvelle ordonnance pour vos lunettes."', question: 'Baisse de la vue?', options: ['A) 0,25 dioptrie', 'B) 0,5 dioptrie', 'C) 0,75 dioptrie', 'D) 1 dioptrie'], correctAnswer: 1, explanation: '"0,5 dioptrie".' },
          { id: 15, audioDescription: '[Audio: Résultats analyses]', audioText: 'Médecin: "Votre glycémie est à 1,2 g/L. C\'est légèrement au-dessus de la normale qui est 1,1 g/L."', question: 'Taux de glycémie?', options: ['A) 1,0 g/L', 'B) 1,1 g/L', 'C) 1,2 g/L', 'D) 1,3 g/L'], correctAnswer: 2, explanation: '"1,2 g/L".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Conférences Santé',
        description: 'Présentations sur la santé',
        questions: [
          { id: 16, audioDescription: '[Audio: Conférence sommeil]', audioText: 'Les études montrent que 30% des Français souffrent d\'insomnie. Le temps de sommeil moyen est passé de 8h en 1970 à 6h45 aujourd\'hui.', question: 'Pourcentage d\'insomniaques?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30%".' },
          { id: 17, audioDescription: '[Audio: Suite conférence]', audioText: '[Suite]', question: 'Temps de sommeil actuel moyen?', options: ['A) 6h15', 'B) 6h30', 'C) 6h45', 'D) 7h00'], correctAnswer: 2, explanation: '"6h45".' },
          { id: 18, audioDescription: '[Audio: Nutrition]', audioText: 'Un adulte devrait consommer entre 1,5 et 2 litres d\'eau par jour. En cas de chaleur ou d\'effort, jusqu\'à 3 litres.', question: 'Consommation normale d\'eau?', options: ['A) 1-1,5 L', 'B) 1,5-2 L', 'C) 2-2,5 L', 'D) 2,5-3 L'], correctAnswer: 1, explanation: '"1,5 et 2 litres".' },
          { id: 19, audioDescription: '[Audio: Suite nutrition]', audioText: '[Suite]', question: 'En cas de chaleur, jusqu\'à?', options: ['A) 2 litres', 'B) 2,5 litres', 'C) 3 litres', 'D) 3,5 litres'], correctAnswer: 2, explanation: '"3 litres".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'La sédentarité tue 5 millions de personnes par an dans le monde. 10 000 pas par jour suffisent à réduire les risques de 40%.', question: 'Combien de pas recommandés?', options: ['A) 5 000', 'B) 7 000', 'C) 10 000', 'D) 12 000'], correctAnswer: 2, explanation: '"10 000 pas".' }
        ]
      }
    ]
  },

  // ==================== EXAM 4: Travel & Tourism ====================
  {
    id: 'listening-exam-4',
    examNumber: 4,
    title: 'Compréhension Orale - Examen 4',
    theme: 'Travel & Tourism',
    level: 'B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations de voyage',
        questions: [
          { id: 1, audioDescription: '[Audio: Aéroport]', audioText: 'Agent: "Votre vol est à 14h35, porte 24. Embarquement dans 45 minutes."', question: 'Numéro de porte?', options: ['A) 22', 'B) 23', 'C) 24', 'D) 25'], correctAnswer: 2, explanation: '"Porte 24".' },
          { id: 2, audioDescription: '[Audio: Agence voyage]', audioText: 'Agent: "Le séjour tout compris coûte 1200€ par personne pour 8 jours."', question: 'Prix par personne?', options: ['A) 1000€', 'B) 1100€', 'C) 1200€', 'D) 1300€'], correctAnswer: 2, explanation: '"1200€".' },
          { id: 3, audioDescription: '[Audio: Train]', audioText: 'Contrôleur: "Votre place est en voiture 12, siège 45."', question: 'Numéro de voiture?', options: ['A) 10', 'B) 11', 'C) 12', 'D) 13'], correctAnswer: 2, explanation: '"Voiture 12".' },
          { id: 4, audioDescription: '[Audio: Location voiture]', audioText: 'Employé: "Le tarif journalier est de 55€, assurance comprise. Pour 5 jours, ça fait 275€."', question: 'Tarif par jour?', options: ['A) 45€', 'B) 50€', 'C) 55€', 'D) 60€'], correctAnswer: 2, explanation: '"55€".' },
          { id: 5, audioDescription: '[Audio: Hôtel]', audioText: 'Réception: "Petit-déjeuner de 7h à 10h. Check-out à 11h."', question: 'Heure de check-out?', options: ['A) 10h', 'B) 11h', 'C) 12h', 'D) 13h'], correctAnswer: 1, explanation: '"11h".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Annonces Voyage',
        description: 'Annonces dans les transports',
        questions: [
          { id: 6, audioDescription: '[Audio: Avion]', audioText: 'Commandant: "Nous volons à 11 000 mètres d\'altitude. Température extérieure: -52 degrés. Arrivée prévue dans 2h15."', question: 'Altitude de vol?', options: ['A) 9 000 m', 'B) 10 000 m', 'C) 11 000 m', 'D) 12 000 m'], correctAnswer: 2, explanation: '"11 000 mètres".' },
          { id: 7, audioDescription: '[Audio: Gare maritime]', audioText: 'Le ferry pour la Corse partira à 22h. Durée de traversée: 12 heures. Arrivée à Bastia à 10h.'  , question: 'Durée de la traversée?', options: ['A) 10 heures', 'B) 11 heures', 'C) 12 heures', 'D) 13 heures'], correctAnswer: 2, explanation: '"12 heures".' },
          { id: 8, audioDescription: '[Audio: Bus touristique]', audioText: 'Notre tour fait 15 arrêts dans la ville. Durée totale: 2 heures. Départs toutes les 20 minutes.', question: 'Nombre d\'arrêts?', options: ['A) 12', 'B) 13', 'C) 15', 'D) 18'], correctAnswer: 2, explanation: '"15 arrêts".' },
          { id: 9, audioDescription: '[Audio: Métro]', audioText: 'Prochaine station: Châtelet. Correspondance lignes 1, 4, 7, 11 et 14. Attention à la marche en descendant.', question: 'Combien de correspondances?', options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'], correctAnswer: 2, explanation: 'Lignes 1, 4, 7, 11, 14 = 5 correspondances.' },
          { id: 10, audioDescription: '[Audio: Office tourisme]', audioText: 'Le musée est ouvert de 9h à 18h. Entrée: 15€ plein tarif, 10€ tarif réduit. Gratuit pour les moins de 18 ans.', question: 'Tarif réduit?', options: ['A) 8€', 'B) 10€', 'C) 12€', 'D) 14€'], correctAnswer: 1, explanation: '"10€ tarif réduit".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Planification',
        description: 'Discussion de voyage',
        questions: [
          { id: 11, audioDescription: '[Audio: Couple planifie]', audioText: 'Marie: "Le vol coûte 350€ par personne. L\'hôtel, 120€ la nuit pour 5 nuits." Pierre: "Ça fait 1300€ pour nous deux sans l\'hôtel."', question: 'Prix du vol par personne?', options: ['A) 300€', 'B) 325€', 'C) 350€', 'D) 375€'], correctAnswer: 2, explanation: '"350€".' },
          { id: 12, audioDescription: '[Audio: Suite planification]', audioText: '[Suite]', question: 'Prix de l\'hôtel par nuit?', options: ['A) 100€', 'B) 110€', 'C) 120€', 'D) 130€'], correctAnswer: 2, explanation: '"120€ la nuit".' },
          { id: 13, audioDescription: '[Audio: Guide touristique]', audioText: 'Guide: "La visite guidée dure 3 heures. Nous verrons les 5 principaux monuments. Rendez-vous à 14h devant la cathédrale."', question: 'Durée de la visite?', options: ['A) 2 heures', 'B) 2h30', 'C) 3 heures', 'D) 3h30'], correctAnswer: 2, explanation: '"3 heures".' },
          { id: 14, audioDescription: '[Audio: Randonnée]', audioText: 'Guide: "Le sentier fait 12 km avec un dénivelé de 800 mètres. Comptez 5 heures de marche."', question: 'Longueur du sentier?', options: ['A) 10 km', 'B) 11 km', 'C) 12 km', 'D) 14 km'], correctAnswer: 2, explanation: '"12 km".' },
          { id: 15, audioDescription: '[Audio: Croisière]', audioText: 'Agent: "La croisière dure 7 jours avec escales dans 4 pays: Italie, Grèce, Turquie et Croatie."', question: 'Combien de pays?', options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'], correctAnswer: 1, explanation: '"4 pays".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Reportages',
        description: 'Reportages touristiques',
        questions: [
          { id: 16, audioDescription: '[Audio: Documentaire Paris]', audioText: 'La Tour Eiffel mesure 330 mètres de haut. Elle reçoit 7 millions de visiteurs par an, ce qui en fait le monument payant le plus visité au monde.', question: 'Hauteur de la Tour Eiffel?', options: ['A) 300 m', 'B) 310 m', 'C) 330 m', 'D) 350 m'], correctAnswer: 2, explanation: '"330 mètres".' },
          { id: 17, audioDescription: '[Audio: Suite documentaire]', audioText: '[Suite]', question: 'Visiteurs par an?', options: ['A) 5 millions', 'B) 6 millions', 'C) 7 millions', 'D) 8 millions'], correctAnswer: 2, explanation: '"7 millions".' },
          { id: 18, audioDescription: '[Audio: Reportage Canada]', audioText: 'Le Canada est le deuxième plus grand pays du monde avec une superficie de 10 millions de km². La population est de 38 millions d\'habitants, dont 80% vivent près de la frontière américaine.', question: 'Superficie du Canada?', options: ['A) 8 millions km²', 'B) 9 millions km²', 'C) 10 millions km²', 'D) 11 millions km²'], correctAnswer: 2, explanation: '"10 millions de km²".' },
          { id: 19, audioDescription: '[Audio: Suite Canada]', audioText: '[Suite]', question: 'Population du Canada?', options: ['A) 35 millions', 'B) 36 millions', 'C) 38 millions', 'D) 40 millions'], correctAnswer: 2, explanation: '"38 millions".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Le tourisme représente 10% du PIB mondial et emploie 320 millions de personnes. C\'est l\'un des secteurs économiques les plus dynamiques.', question: 'Part du tourisme dans le PIB mondial?', options: ['A) 8%', 'B) 9%', 'C) 10%', 'D) 12%'], correctAnswer: 2, explanation: '"10% du PIB".' }
        ]
      }
    ]
  },

  // ==================== EXAM 5: Education & Studies ====================
  {
    id: 'listening-exam-5',
    examNumber: 5,
    title: 'Compréhension Orale - Examen 5',
    theme: 'Education & Studies',
    level: 'B1-B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations scolaires et universitaires',
        questions: [
          { id: 1, audioDescription: '[Audio: Secrétariat université]', audioText: 'Secrétaire: "Les inscriptions sont ouvertes du 1er au 30 septembre. Frais: 450€ pour le semestre."', question: 'Frais d\'inscription?', options: ['A) 350€', 'B) 400€', 'C) 450€', 'D) 500€'], correctAnswer: 2, explanation: '"450€".' },
          { id: 2, audioDescription: '[Audio: Bibliothèque]', audioText: 'Bibliothécaire: "Le prêt est de 3 semaines maximum. Vous pouvez emprunter jusqu\'à 10 livres."', question: 'Durée maximale du prêt?', options: ['A) 2 semaines', 'B) 3 semaines', 'C) 4 semaines', 'D) 1 mois'], correctAnswer: 1, explanation: '"3 semaines".' },
          { id: 3, audioDescription: '[Audio: Professeur]', audioText: 'Professeur: "L\'examen aura lieu le 15 décembre à 9h. Durée: 3 heures."', question: 'Durée de l\'examen?', options: ['A) 2 heures', 'B) 2h30', 'C) 3 heures', 'D) 3h30'], correctAnswer: 2, explanation: '"3 heures".' },
          { id: 4, audioDescription: '[Audio: Étudiants]', audioText: 'Étudiant A: "Tu as eu combien à l\'examen?" Étudiant B: "16 sur 20, et toi?" A: "Moi 14, la moyenne de la classe est 12."', question: 'Note de l\'étudiant B?', options: ['A) 14', 'B) 15', 'C) 16', 'D) 17'], correctAnswer: 2, explanation: '"16 sur 20".' },
          { id: 5, audioDescription: '[Audio: Conseiller]', audioText: 'Conseiller: "Le master dure 2 ans. Il y a 25 places disponibles pour 150 candidats."', question: 'Durée du master?', options: ['A) 1 an', 'B) 18 mois', 'C) 2 ans', 'D) 3 ans'], correctAnswer: 2, explanation: '"2 ans".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Annonces Scolaires',
        description: 'Annonces dans les établissements',
        questions: [
          { id: 6, audioDescription: '[Audio: Haut-parleur école]', audioText: 'Rappel: la réunion parents-professeurs aura lieu jeudi de 17h à 20h. Merci de confirmer votre présence.', question: 'Durée de la réunion?', options: ['A) 2 heures', 'B) 3 heures', 'C) 4 heures', 'D) 5 heures'], correctAnswer: 1, explanation: 'De 17h à 20h = 3 heures.' },
          { id: 7, audioDescription: '[Audio: Radio campus]', audioText: 'Le restaurant universitaire propose un menu à 3,30€ pour les boursiers. Menu complet à 5,50€ pour les autres.', question: 'Prix pour les boursiers?', options: ['A) 2,80€', 'B) 3,30€', 'C) 4,50€', 'D) 5,50€'], correctAnswer: 1, explanation: '"3,30€".' },
          { id: 8, audioDescription: '[Audio: Annonce stage]', audioText: 'Offre de stage: 6 mois à partir de janvier. Indemnité: 600€ par mois. Candidatures avant le 15 novembre.', question: 'Durée du stage?', options: ['A) 3 mois', 'B) 4 mois', 'C) 6 mois', 'D) 12 mois'], correctAnswer: 2, explanation: '"6 mois".' },
          { id: 9, audioDescription: '[Audio: Conférence]', audioText: 'Conférence sur l\'intelligence artificielle, mardi à 18h, amphithéâtre A. Entrée libre, 200 places disponibles.', question: 'Nombre de places?', options: ['A) 150', 'B) 175', 'C) 200', 'D) 250'], correctAnswer: 2, explanation: '"200 places".' },
          { id: 10, audioDescription: '[Audio: Résultats]', audioText: 'Les résultats du premier semestre seront affichés le 20 janvier. Taux de réussite attendu: 75%.', question: 'Taux de réussite attendu?', options: ['A) 65%', 'B) 70%', 'C) 75%', 'D) 80%'], correctAnswer: 2, explanation: '"75%".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Discussions',
        description: 'Discussions académiques',
        questions: [
          { id: 11, audioDescription: '[Audio: Conseiller orientation]', audioText: 'Conseiller: "Ce diplôme offre un taux d\'insertion de 85% à 6 mois. Le salaire moyen de départ est de 35 000€ brut annuel."', question: 'Taux d\'insertion?', options: ['A) 75%', 'B) 80%', 'C) 85%', 'D) 90%'], correctAnswer: 2, explanation: '"85%".' },
          { id: 12, audioDescription: '[Audio: Suite conseil]', audioText: '[Suite]', question: 'Salaire moyen de départ?', options: ['A) 30 000€', 'B) 32 000€', 'C) 35 000€', 'D) 38 000€'], correctAnswer: 2, explanation: '"35 000€".' },
          { id: 13, audioDescription: '[Audio: Groupe travail]', audioText: 'Chef de groupe: "Notre exposé dure 30 minutes. On a chacun 10 minutes de présentation."', question: 'Durée totale de l\'exposé?', options: ['A) 20 minutes', 'B) 25 minutes', 'C) 30 minutes', 'D) 35 minutes'], correctAnswer: 2, explanation: '"30 minutes".' },
          { id: 14, audioDescription: '[Audio: Cours en ligne]', audioText: 'Professeur: "Le cours en ligne comprend 12 modules. Comptez 3 heures par module."', question: 'Nombre de modules?', options: ['A) 8', 'B) 10', 'C) 12', 'D) 15'], correctAnswer: 2, explanation: '"12 modules".' },
          { id: 15, audioDescription: '[Audio: Échange]', audioText: 'Responsable: "Le programme d\'échange dure 1 semestre. Bourse de mobilité: 400€ par mois."', question: 'Montant de la bourse?', options: ['A) 300€', 'B) 350€', 'C) 400€', 'D) 450€'], correctAnswer: 2, explanation: '"400€ par mois".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Conférences',
        description: 'Présentations académiques',
        questions: [
          { id: 16, audioDescription: '[Audio: Conférence éducation]', audioText: 'En France, 2,8 millions d\'étudiants sont inscrits dans l\'enseignement supérieur. 40% obtiennent un diplôme de niveau master ou plus.', question: 'Nombre d\'étudiants?', options: ['A) 2,5 millions', 'B) 2,6 millions', 'C) 2,8 millions', 'D) 3 millions'], correctAnswer: 2, explanation: '"2,8 millions".' },
          { id: 17, audioDescription: '[Audio: Suite conférence]', audioText: '[Suite]', question: '% avec master ou plus?', options: ['A) 30%', 'B) 35%', 'C) 40%', 'D) 45%'], correctAnswer: 2, explanation: '"40%".' },
          { id: 18, audioDescription: '[Audio: Innovation pédagogique]', audioText: 'Les MOOCs touchent désormais 100 millions de personnes dans le monde. Le taux de complétion moyen reste faible, autour de 5%.', question: 'Personnes touchées par les MOOCs?', options: ['A) 50 millions', 'B) 75 millions', 'C) 100 millions', 'D) 150 millions'], correctAnswer: 2, explanation: '"100 millions".' },
          { id: 19, audioDescription: '[Audio: Suite innovation]', audioText: '[Suite]', question: 'Taux de complétion des MOOCs?', options: ['A) 3%', 'B) 5%', 'C) 8%', 'D) 10%'], correctAnswer: 1, explanation: '"5%".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'L\'apprentissage tout au long de la vie est devenu essentiel. 25% des adultes européens participent à une formation chaque année.', question: '% d\'adultes européens en formation?', options: ['A) 15%', 'B) 20%', 'C) 25%', 'D) 30%'], correctAnswer: 2, explanation: '"25%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 6: Environment & Nature ====================
  {
    id: 'listening-exam-6',
    examNumber: 6,
    title: 'Compréhension Orale - Examen 6',
    theme: 'Environment & Nature',
    level: 'B1-B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations liées à l\'environnement',
        questions: [
          { id: 1, audioDescription: '[Audio: Déchetterie]', audioText: 'Agent: "Le verre va dans le bac vert, le plastique dans le jaune, et le carton dans le bleu."', question: 'Couleur du bac pour le verre?', options: ['A) Jaune', 'B) Bleu', 'C) Vert', 'D) Rouge'], correctAnswer: 2, explanation: '"Le verre dans le bac vert".' },
          { id: 2, audioDescription: '[Audio: Magasin bio]', audioText: 'Vendeur: "Ces légumes sont bio et locaux. Ils viennent d\'une ferme à 20 km d\'ici."', question: 'Distance de la ferme?', options: ['A) 10 km', 'B) 15 km', 'C) 20 km', 'D) 30 km'], correctAnswer: 2, explanation: '"20 km".' },
          { id: 3, audioDescription: '[Audio: Mairie]', audioText: 'Agent: "La prime vélo électrique est de 300€ maximum. Le dossier doit être déposé avant le 31 décembre."', question: 'Montant de la prime?', options: ['A) 200€', 'B) 250€', 'C) 300€', 'D) 400€'], correctAnswer: 2, explanation: '"300€ maximum".' },
          { id: 4, audioDescription: '[Audio: Jardin]', audioText: 'Jardinier: "On plante les tomates en mai après les dernières gelées. Récolte en août-septembre."', question: 'Mois de plantation?', options: ['A) Mars', 'B) Avril', 'C) Mai', 'D) Juin'], correctAnswer: 2, explanation: '"En mai".' },
          { id: 5, audioDescription: '[Audio: Énergie]', audioText: 'Technicien: "Vos panneaux solaires produisent 3000 kWh par an. Ça couvre 70% de vos besoins."', question: 'Production annuelle?', options: ['A) 2000 kWh', 'B) 2500 kWh', 'C) 3000 kWh', 'D) 3500 kWh'], correctAnswer: 2, explanation: '"3000 kWh".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Actualités Environnement',
        description: 'Informations sur l\'environnement',
        questions: [
          { id: 6, audioDescription: '[Audio: Journal radio]', audioText: 'La température moyenne a augmenté de 1,5 degré depuis l\'ère préindustrielle. L\'objectif de l\'Accord de Paris est de rester sous les 2 degrés.', question: 'Hausse de température?', options: ['A) 1 degré', 'B) 1,2 degré', 'C) 1,5 degré', 'D) 2 degrés'], correctAnswer: 2, explanation: '"1,5 degré".' },
          { id: 7, audioDescription: '[Audio: Campagne recyclage]', audioText: 'En France, 68% des emballages sont recyclés. L\'objectif pour 2030 est d\'atteindre 100%.', question: 'Taux de recyclage actuel?', options: ['A) 58%', 'B) 63%', 'C) 68%', 'D) 75%'], correctAnswer: 2, explanation: '"68%".' },
          { id: 8, audioDescription: '[Audio: Alerte pollution]', audioText: 'Pic de pollution prévu demain. Vitesse limitée à 70 km/h sur le périphérique. Transports en commun gratuits.', question: 'Limite de vitesse?', options: ['A) 50 km/h', 'B) 60 km/h', 'C) 70 km/h', 'D) 80 km/h'], correctAnswer: 2, explanation: '"70 km/h".' },
          { id: 9, audioDescription: '[Audio: Biodiversité]', audioText: 'Création d\'un nouveau parc naturel de 15 000 hectares. 200 espèces animales et 500 espèces végétales y seront protégées.', question: 'Surface du parc?', options: ['A) 10 000 ha', 'B) 12 000 ha', 'C) 15 000 ha', 'D) 20 000 ha'], correctAnswer: 2, explanation: '"15 000 hectares".' },
          { id: 10, audioDescription: '[Audio: Eau]', audioText: 'Restriction d\'eau: arrosage interdit entre 10h et 18h. Amende de 150€ en cas de non-respect.', question: 'Montant de l\'amende?', options: ['A) 100€', 'B) 125€', 'C) 150€', 'D) 200€'], correctAnswer: 2, explanation: '"150€".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Discussions',
        description: 'Débats sur l\'environnement',
        questions: [
          { id: 11, audioDescription: '[Audio: Débat énergie]', audioText: 'Expert: "Le nucléaire représente 70% de l\'électricité en France. Les énergies renouvelables sont passées de 15% à 25% en 10 ans."', question: 'Part du nucléaire?', options: ['A) 60%', 'B) 65%', 'C) 70%', 'D) 75%'], correctAnswer: 2, explanation: '"70%".' },
          { id: 12, audioDescription: '[Audio: Suite débat]', audioText: '[Suite]', question: 'Part actuelle des renouvelables?', options: ['A) 20%', 'B) 22%', 'C) 25%', 'D) 28%'], correctAnswer: 2, explanation: '"25%".' },
          { id: 13, audioDescription: '[Audio: Association]', audioText: 'Responsable: "Notre association a planté 5000 arbres cette année. Objectif: 20 000 en 5 ans."', question: 'Arbres plantés cette année?', options: ['A) 3000', 'B) 4000', 'C) 5000', 'D) 6000'], correctAnswer: 2, explanation: '"5000 arbres".' },
          { id: 14, audioDescription: '[Audio: Mobilité]', audioText: 'Urbaniste: "Les pistes cyclables sont passées de 500 à 800 km en 3 ans. L\'usage du vélo a doublé."', question: 'Km de pistes actuellement?', options: ['A) 600 km', 'B) 700 km', 'C) 800 km', 'D) 900 km'], correctAnswer: 2, explanation: '"800 km".' },
          { id: 15, audioDescription: '[Audio: Agriculture]', audioText: 'Agriculteur: "Le bio représente 12% des surfaces agricoles. On vise 25% d\'ici 2030."', question: 'Part actuelle du bio?', options: ['A) 8%', 'B) 10%', 'C) 12%', 'D) 15%'], correctAnswer: 2, explanation: '"12%".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Documentaires',
        description: 'Documentaires environnementaux',
        questions: [
          { id: 16, audioDescription: '[Audio: Océans]', audioText: 'Les océans absorbent 30% du CO2 émis par l\'humanité. Ils couvrent 71% de la surface terrestre et contiennent 97% de l\'eau de la planète.', question: 'CO2 absorbé par les océans?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30%".' },
          { id: 17, audioDescription: '[Audio: Suite océans]', audioText: '[Suite]', question: 'Surface terrestre couverte?', options: ['A) 65%', 'B) 68%', 'C) 71%', 'D) 75%'], correctAnswer: 2, explanation: '"71%".' },
          { id: 18, audioDescription: '[Audio: Forêts]', audioText: 'L\'Amazonie produit 20% de l\'oxygène mondial. Sa déforestation a diminué de 80% depuis 2004 grâce aux politiques de protection.', question: 'Oxygène produit par l\'Amazonie?', options: ['A) 15%', 'B) 18%', 'C) 20%', 'D) 25%'], correctAnswer: 2, explanation: '"20%".' },
          { id: 19, audioDescription: '[Audio: Suite forêts]', audioText: '[Suite]', question: 'Réduction de la déforestation?', options: ['A) 60%', 'B) 70%', 'C) 80%', 'D) 90%'], correctAnswer: 2, explanation: '"80%".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Pour limiter le réchauffement à 1,5°C, les émissions de CO2 doivent diminuer de 45% d\'ici 2030 et atteindre zéro en 2050.', question: 'Réduction nécessaire d\'ici 2030?', options: ['A) 35%', 'B) 40%', 'C) 45%', 'D) 50%'], correctAnswer: 2, explanation: '"45%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 7: Technology & Media ====================
  {
    id: 'listening-exam-7',
    examNumber: 7,
    title: 'Compréhension Orale - Examen 7',
    theme: 'Technology & Media',
    level: 'B1-B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations technologiques',
        questions: [
          { id: 1, audioDescription: '[Audio: Magasin téléphonie]', audioText: 'Vendeur: "Ce smartphone a 256 Go de stockage et 12 Go de RAM. Prix: 899€."', question: 'Capacité de stockage?', options: ['A) 128 Go', 'B) 192 Go', 'C) 256 Go', 'D) 512 Go'], correctAnswer: 2, explanation: '"256 Go".' },
          { id: 2, audioDescription: '[Audio: Support technique]', audioText: 'Technicien: "Votre problème vient du routeur. Redémarrez-le et attendez 30 secondes."', question: 'Temps d\'attente après redémarrage?', options: ['A) 10 secondes', 'B) 20 secondes', 'C) 30 secondes', 'D) 60 secondes'], correctAnswer: 2, explanation: '"30 secondes".' },
          { id: 3, audioDescription: '[Audio: Bureau informatique]', audioText: 'Collègue: "Le fichier fait 500 Mo. Avec notre connexion, ça prendra 5 minutes à télécharger."', question: 'Taille du fichier?', options: ['A) 300 Mo', 'B) 400 Mo', 'C) 500 Mo', 'D) 600 Mo'], correctAnswer: 2, explanation: '"500 Mo".' },
          { id: 4, audioDescription: '[Audio: Formation]', audioText: 'Formateur: "Le logiciel propose 3 formules: gratuite, 9€/mois ou 19€/mois avec toutes les fonctions."', question: 'Prix de la formule complète?', options: ['A) 9€', 'B) 15€', 'C) 19€', 'D) 25€'], correctAnswer: 2, explanation: '"19€/mois".' },
          { id: 5, audioDescription: '[Audio: Hotline]', audioText: 'Agent: "Votre abonnement internet est à 35€ par mois. Le débit est de 300 Mbit/s."', question: 'Prix de l\'abonnement?', options: ['A) 25€', 'B) 30€', 'C) 35€', 'D) 40€'], correctAnswer: 2, explanation: '"35€".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Actualités Tech',
        description: 'Nouvelles technologiques',
        questions: [
          { id: 6, audioDescription: '[Audio: Flash info]', audioText: 'La 5G couvre désormais 75% du territoire français. D\'ici fin d\'année, l\'objectif est 90%.', question: 'Couverture 5G actuelle?', options: ['A) 65%', 'B) 70%', 'C) 75%', 'D) 80%'], correctAnswer: 2, explanation: '"75%".' },
          { id: 7, audioDescription: '[Audio: Reportage]', audioText: '85% des Français possèdent un smartphone. Le temps d\'écran moyen est de 3h30 par jour.', question: 'Taux d\'équipement smartphone?', options: ['A) 75%', 'B) 80%', 'C) 85%', 'D) 90%'], correctAnswer: 2, explanation: '"85%".' },
          { id: 8, audioDescription: '[Audio: Sécurité]', audioText: 'Alerte: 40% des mots de passe sont trop simples. Recommandation: minimum 12 caractères avec chiffres et symboles.', question: 'Longueur minimale recommandée?', options: ['A) 8 caractères', 'B) 10 caractères', 'C) 12 caractères', 'D) 14 caractères'], correctAnswer: 2, explanation: '"12 caractères".' },
          { id: 9, audioDescription: '[Audio: E-commerce]', audioText: 'Les achats en ligne ont augmenté de 15% cette année. Le panier moyen est de 65€.', question: 'Augmentation des achats?', options: ['A) 10%', 'B) 12%', 'C) 15%', 'D) 18%'], correctAnswer: 2, explanation: '"15%".' },
          { id: 10, audioDescription: '[Audio: Intelligence artificielle]', audioText: 'Les entreprises utilisant l\'IA ont vu leur productivité augmenter de 25%. 60% prévoient d\'investir davantage.', question: 'Gain de productivité?', options: ['A) 15%', 'B) 20%', 'C) 25%', 'D) 30%'], correctAnswer: 2, explanation: '"25%".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Discussions',
        description: 'Débats sur la technologie',
        questions: [
          { id: 11, audioDescription: '[Audio: Débat réseaux sociaux]', audioText: 'Expert: "Les jeunes passent en moyenne 4 heures par jour sur les réseaux sociaux. Instagram et TikTok sont les plus populaires."', question: 'Temps sur les réseaux sociaux?', options: ['A) 2 heures', 'B) 3 heures', 'C) 4 heures', 'D) 5 heures'], correctAnswer: 2, explanation: '"4 heures".' },
          { id: 12, audioDescription: '[Audio: Télétravail]', audioText: 'DRH: "Nous proposons 3 jours de télétravail par semaine. 80% des employés sont satisfaits."', question: 'Jours de télétravail proposés?', options: ['A) 2 jours', 'B) 3 jours', 'C) 4 jours', 'D) 5 jours'], correctAnswer: 1, explanation: '"3 jours".' },
          { id: 13, audioDescription: '[Audio: Streaming]', audioText: 'Analyste: "Netflix compte 230 millions d\'abonnés dans le monde. Le prix moyen est de 13€ par mois."', question: 'Nombre d\'abonnés Netflix?', options: ['A) 200 millions', 'B) 210 millions', 'C) 230 millions', 'D) 250 millions'], correctAnswer: 2, explanation: '"230 millions".' },
          { id: 14, audioDescription: '[Audio: Voitures électriques]', audioText: 'Ingénieur: "Les batteries actuelles offrent 400 km d\'autonomie. Le temps de charge rapide est de 30 minutes pour 80%."', question: 'Autonomie moyenne?', options: ['A) 300 km', 'B) 350 km', 'C) 400 km', 'D) 450 km'], correctAnswer: 2, explanation: '"400 km".' },
          { id: 15, audioDescription: '[Audio: Cybersécurité]', audioText: 'Expert: "Le coût moyen d\'une cyberattaque pour une entreprise est de 50 000€. 70% des victimes sont des PME."', question: 'Coût moyen d\'une cyberattaque?', options: ['A) 30 000€', 'B) 40 000€', 'C) 50 000€', 'D) 60 000€'], correctAnswer: 2, explanation: '"50 000€".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Présentations',
        description: 'Présentations technologiques',
        questions: [
          { id: 16, audioDescription: '[Audio: Conférence IA]', audioText: 'L\'intelligence artificielle générative comme ChatGPT compte 200 millions d\'utilisateurs. Le marché de l\'IA devrait atteindre 500 milliards de dollars en 2025.', question: 'Utilisateurs de ChatGPT?', options: ['A) 100 millions', 'B) 150 millions', 'C) 200 millions', 'D) 250 millions'], correctAnswer: 2, explanation: '"200 millions".' },
          { id: 17, audioDescription: '[Audio: Suite IA]', audioText: '[Suite]', question: 'Marché IA prévu en 2025?', options: ['A) 300 milliards', 'B) 400 milliards', 'C) 500 milliards', 'D) 600 milliards'], correctAnswer: 2, explanation: '"500 milliards".' },
          { id: 18, audioDescription: '[Audio: Métavers]', audioText: 'Le métavers pourrait générer 5000 milliards de dollars d\'ici 2030. 25% des gens passeront au moins 1 heure par jour dans le métavers.', question: 'Valeur potentielle du métavers?', options: ['A) 3000 milliards', 'B) 4000 milliards', 'C) 5000 milliards', 'D) 6000 milliards'], correctAnswer: 2, explanation: '"5000 milliards".' },
          { id: 19, audioDescription: '[Audio: Suite métavers]', audioText: '[Suite]', question: '% utilisant le métavers quotidiennement?', options: ['A) 15%', 'B) 20%', 'C) 25%', 'D) 30%'], correctAnswer: 2, explanation: '"25%".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'D\'ici 2030, 50 milliards d\'appareils seront connectés à Internet. L\'Internet des objets transformera notre quotidien.', question: 'Appareils connectés en 2030?', options: ['A) 30 milliards', 'B) 40 milliards', 'C) 50 milliards', 'D) 60 milliards'], correctAnswer: 2, explanation: '"50 milliards".' }
        ]
      }
    ]
  },

  // ==================== EXAM 8: Culture & Society ====================
  {
    id: 'listening-exam-8',
    examNumber: 8,
    title: 'Compréhension Orale - Examen 8',
    theme: 'Culture & Society',
    level: 'B1-B2',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations culturelles',
        questions: [
          { id: 1, audioDescription: '[Audio: Billetterie]', audioText: 'Guichetier: "Le concert commence à 20h30. Les places sont à 45€ en catégorie 1, 30€ en catégorie 2."', question: 'Prix catégorie 1?', options: ['A) 35€', 'B) 40€', 'C) 45€', 'D) 50€'], correctAnswer: 2, explanation: '"45€".' },
          { id: 2, audioDescription: '[Audio: Musée]', audioText: 'Guide: "L\'exposition Monet comprend 80 tableaux. Elle dure jusqu\'au 15 mars."', question: 'Nombre de tableaux?', options: ['A) 60', 'B) 70', 'C) 80', 'D) 90'], correctAnswer: 2, explanation: '"80 tableaux".' },
          { id: 3, audioDescription: '[Audio: Cinéma]', audioText: 'Caissier: "Le film dure 2h15. Prochaine séance à 21h."', question: 'Durée du film?', options: ['A) 1h45', 'B) 2h00', 'C) 2h15', 'D) 2h30'], correctAnswer: 2, explanation: '"2h15".' },
          { id: 4, audioDescription: '[Audio: Librairie]', audioText: 'Libraire: "Ce livre est sorti hier. C\'est le 8ème tome de la série. Prix: 22€."', question: 'Numéro du tome?', options: ['A) 6', 'B) 7', 'C) 8', 'D) 9'], correctAnswer: 2, explanation: '"8ème tome".' },
          { id: 5, audioDescription: '[Audio: Festival]', audioText: 'Organisateur: "Le festival dure 4 jours avec 50 spectacles. Pass complet: 85€."', question: 'Nombre de spectacles?', options: ['A) 40', 'B) 45', 'C) 50', 'D) 60'], correctAnswer: 2, explanation: '"50 spectacles".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Actualités Culturelles',
        description: 'Informations culturelles',
        questions: [
          { id: 6, audioDescription: '[Audio: Radio culture]', audioText: 'Record de fréquentation pour le Louvre: 10 millions de visiteurs cette année, +8% par rapport à l\'an dernier.', question: 'Visiteurs au Louvre?', options: ['A) 8 millions', 'B) 9 millions', 'C) 10 millions', 'D) 11 millions'], correctAnswer: 2, explanation: '"10 millions".' },
          { id: 7, audioDescription: '[Audio: Box-office]', audioText: 'Le film français en tête du box-office avec 5 millions d\'entrées en 3 semaines. Budget: 20 millions d\'euros.', question: 'Nombre d\'entrées?', options: ['A) 3 millions', 'B) 4 millions', 'C) 5 millions', 'D) 6 millions'], correctAnswer: 2, explanation: '"5 millions".' },
          { id: 8, audioDescription: '[Audio: Littérature]', audioText: 'Le prix Goncourt 2024 s\'est vendu à 400 000 exemplaires. L\'auteur en est à son 5ème roman.', question: 'Ventes du Goncourt?', options: ['A) 300 000', 'B) 350 000', 'C) 400 000', 'D) 450 000'], correctAnswer: 2, explanation: '"400 000 exemplaires".' },
          { id: 9, audioDescription: '[Audio: Musique]', audioText: 'Le streaming représente 80% des écoutes musicales. Les artistes francophones ont réalisé 45% des ventes.', question: 'Part du streaming?', options: ['A) 70%', 'B) 75%', 'C) 80%', 'D) 85%'], correctAnswer: 2, explanation: '"80%".' },
          { id: 10, audioDescription: '[Audio: Patrimoine]', audioText: 'La France compte 45 sites classés au patrimoine mondial de l\'UNESCO, ce qui la place au 4ème rang mondial.', question: 'Sites UNESCO en France?', options: ['A) 40', 'B) 42', 'C) 45', 'D) 48'], correctAnswer: 2, explanation: '"45 sites".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Interviews',
        description: 'Entretiens culturels',
        questions: [
          { id: 11, audioDescription: '[Audio: Interview artiste]', audioText: 'Artiste: "J\'ai mis 3 ans à écrire cet album. Il y a 12 chansons dont 3 en featuring."', question: 'Nombre de chansons?', options: ['A) 10', 'B) 11', 'C) 12', 'D) 14'], correctAnswer: 2, explanation: '"12 chansons".' },
          { id: 12, audioDescription: '[Audio: Suite interview]', audioText: '[Suite]', question: 'Temps de création?', options: ['A) 2 ans', 'B) 2,5 ans', 'C) 3 ans', 'D) 4 ans'], correctAnswer: 2, explanation: '"3 ans".' },
          { id: 13, audioDescription: '[Audio: Réalisateur]', audioText: 'Réalisateur: "Le tournage a duré 8 semaines avec une équipe de 150 personnes. Budget total: 15 millions."', question: 'Durée du tournage?', options: ['A) 6 semaines', 'B) 7 semaines', 'C) 8 semaines', 'D) 10 semaines'], correctAnswer: 2, explanation: '"8 semaines".' },
          { id: 14, audioDescription: '[Audio: Écrivain]', audioText: 'Auteur: "Ce roman compte 350 pages. J\'écris 3 heures par jour, principalement le matin."', question: 'Nombre de pages?', options: ['A) 300', 'B) 320', 'C) 350', 'D) 400'], correctAnswer: 2, explanation: '"350 pages".' },
          { id: 15, audioDescription: '[Audio: Chorégraphe]', audioText: 'Chorégraphe: "La compagnie compte 20 danseurs. Nous donnons 80 représentations par an."', question: 'Nombre de danseurs?', options: ['A) 15', 'B) 18', 'C) 20', 'D) 25'], correctAnswer: 2, explanation: '"20 danseurs".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Documentaires',
        description: 'Documentaires culturels',
        questions: [
          { id: 16, audioDescription: '[Audio: Histoire de France]', audioText: 'La Révolution française a duré 10 ans, de 1789 à 1799. Elle a inspiré les droits de l\'homme dans le monde entier.', question: 'Durée de la Révolution?', options: ['A) 8 ans', 'B) 9 ans', 'C) 10 ans', 'D) 12 ans'], correctAnswer: 2, explanation: '"10 ans".' },
          { id: 17, audioDescription: '[Audio: Gastronomie]', audioText: 'La France compte 650 restaurants étoilés, dont 30 trois étoiles. Paris en concentre 120 à elle seule.', question: 'Restaurants étoilés en France?', options: ['A) 550', 'B) 600', 'C) 650', 'D) 700'], correctAnswer: 2, explanation: '"650".' },
          { id: 18, audioDescription: '[Audio: Suite gastronomie]', audioText: '[Suite]', question: 'Restaurants étoilés à Paris?', options: ['A) 100', 'B) 110', 'C) 120', 'D) 130'], correctAnswer: 2, explanation: '"120".' },
          { id: 19, audioDescription: '[Audio: Mode]', audioText: 'L\'industrie de la mode française représente 150 milliards d\'euros et emploie 600 000 personnes. Paris reste la capitale mondiale de la haute couture.', question: 'Valeur de l\'industrie mode?', options: ['A) 100 milliards', 'B) 120 milliards', 'C) 150 milliards', 'D) 180 milliards'], correctAnswer: 2, explanation: '"150 milliards".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'La francophonie compte 300 millions de locuteurs. Le français est la 5ème langue la plus parlée au monde.', question: 'Nombre de francophones?', options: ['A) 250 millions', 'B) 275 millions', 'C) 300 millions', 'D) 350 millions'], correctAnswer: 2, explanation: '"300 millions".' }
        ]
      }
    ]
  },

  // ==================== EXAM 9: Housing & Real Estate ====================
  {
    id: 'listening-exam-9',
    examNumber: 9,
    title: 'Compréhension Orale - Examen 9',
    theme: 'Housing & Real Estate',
    level: 'B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations immobilières',
        questions: [
          { id: 1, audioDescription: '[Audio: Agence immobilière]', audioText: 'Agent: "Cet appartement fait 65m² avec 2 chambres. Loyer: 850€ charges comprises."', question: 'Surface de l\'appartement?', options: ['A) 55m²', 'B) 60m²', 'C) 65m²', 'D) 70m²'], correctAnswer: 2, explanation: '"65m²".' },
          { id: 2, audioDescription: '[Audio: Propriétaire]', audioText: 'Propriétaire: "Le bail est de 3 ans. Dépôt de garantie: 2 mois de loyer."', question: 'Durée du bail?', options: ['A) 1 an', 'B) 2 ans', 'C) 3 ans', 'D) 5 ans'], correctAnswer: 2, explanation: '"3 ans".' },
          { id: 3, audioDescription: '[Audio: Notaire]', audioText: 'Notaire: "Les frais de notaire représentent 8% du prix d\'achat, soit 24 000€ pour ce bien."', question: 'Frais de notaire en pourcentage?', options: ['A) 6%', 'B) 7%', 'C) 8%', 'D) 10%'], correctAnswer: 2, explanation: '"8%".' },
          { id: 4, audioDescription: '[Audio: Banque]', audioText: 'Conseiller: "Votre capacité d\'emprunt est de 250 000€ sur 25 ans avec un taux de 3,5%."', question: 'Durée du prêt?', options: ['A) 15 ans', 'B) 20 ans', 'C) 25 ans', 'D) 30 ans'], correctAnswer: 2, explanation: '"25 ans".' },
          { id: 5, audioDescription: '[Audio: Syndic]', audioText: 'Gestionnaire: "Les charges de copropriété sont de 200€ par mois. L\'assemblée générale a lieu en mars."', question: 'Montant des charges?', options: ['A) 150€', 'B) 175€', 'C) 200€', 'D) 225€'], correctAnswer: 2, explanation: '"200€".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Annonces',
        description: 'Annonces immobilières',
        questions: [
          { id: 6, audioDescription: '[Audio: Publicité agence]', audioText: 'Nouveau programme immobilier: appartements neufs de 2 à 5 pièces. Livraison 2025. Prix à partir de 180 000€.', question: 'Prix de départ?', options: ['A) 150 000€', 'B) 165 000€', 'C) 180 000€', 'D) 200 000€'], correctAnswer: 2, explanation: '"180 000€".' },
          { id: 7, audioDescription: '[Audio: Radio]', audioText: 'Les prix immobiliers ont baissé de 5% cette année. Le prix moyen au m² à Paris est de 10 500€.', question: 'Baisse des prix?', options: ['A) 3%', 'B) 4%', 'C) 5%', 'D) 7%'], correctAnswer: 2, explanation: '"5%".' },
          { id: 8, audioDescription: '[Audio: Aide logement]', audioText: 'L\'APL peut atteindre 300€ par mois pour un locataire. Conditions de ressources applicables.', question: 'APL maximale?', options: ['A) 200€', 'B) 250€', 'C) 300€', 'D) 350€'], correctAnswer: 2, explanation: '"300€".' },
          { id: 9, audioDescription: '[Audio: Déménagement]', audioText: 'Déménagement complet à partir de 600€. Formule avec emballage: 900€. Devis gratuit.', question: 'Prix formule de base?', options: ['A) 500€', 'B) 550€', 'C) 600€', 'D) 700€'], correctAnswer: 2, explanation: '"600€".' },
          { id: 10, audioDescription: '[Audio: Assurance]', audioText: 'Assurance habitation à partir de 15€ par mois. Couverture vol, incendie et dégâts des eaux.', question: 'Prix minimum assurance?', options: ['A) 10€', 'B) 12€', 'C) 15€', 'D) 20€'], correctAnswer: 2, explanation: '"15€".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Visites',
        description: 'Visites de logements',
        questions: [
          { id: 11, audioDescription: '[Audio: Visite appartement]', audioText: 'Agent: "L\'appartement est au 5ème étage avec ascenseur. Exposition sud, très lumineux. Balcon de 8m²."', question: 'Étage de l\'appartement?', options: ['A) 3ème', 'B) 4ème', 'C) 5ème', 'D) 6ème'], correctAnswer: 2, explanation: '"5ème étage".' },
          { id: 12, audioDescription: '[Audio: Suite visite]', audioText: '[Suite]', question: 'Surface du balcon?', options: ['A) 5m²', 'B) 6m²', 'C) 8m²', 'D) 10m²'], correctAnswer: 2, explanation: '"8m²".' },
          { id: 13, audioDescription: '[Audio: Maison]', audioText: 'Propriétaire: "Le terrain fait 500m² avec la maison de 120m². Le garage peut accueillir 2 voitures."', question: 'Surface du terrain?', options: ['A) 400m²', 'B) 450m²', 'C) 500m²', 'D) 600m²'], correctAnswer: 2, explanation: '"500m²".' },
          { id: 14, audioDescription: '[Audio: Diagnostic]', audioText: 'Expert: "Le DPE indique classe C. Consommation énergétique estimée à 150 kWh/m²/an."', question: 'Classe énergétique?', options: ['A) B', 'B) C', 'C) D', 'D) E'], correctAnswer: 1, explanation: '"Classe C".' },
          { id: 15, audioDescription: '[Audio: Rénovation]', audioText: 'Artisan: "Les travaux de rénovation coûteront environ 30 000€. Durée: 3 mois."', question: 'Coût des travaux?', options: ['A) 20 000€', 'B) 25 000€', 'C) 30 000€', 'D) 35 000€'], correctAnswer: 2, explanation: '"30 000€".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Analyses',
        description: 'Analyses du marché',
        questions: [
          { id: 16, audioDescription: '[Audio: Marché immobilier]', audioText: 'En France, 58% des ménages sont propriétaires de leur logement. Ce taux atteint 70% chez les plus de 65 ans.', question: 'Taux de propriétaires?', options: ['A) 52%', 'B) 55%', 'C) 58%', 'D) 62%'], correctAnswer: 2, explanation: '"58%".' },
          { id: 17, audioDescription: '[Audio: Suite analyse]', audioText: '[Suite]', question: 'Taux chez les +65 ans?', options: ['A) 60%', 'B) 65%', 'C) 70%', 'D) 75%'], correctAnswer: 2, explanation: '"70%".' },
          { id: 18, audioDescription: '[Audio: Logement social]', audioText: 'La France compte 5 millions de logements sociaux. 2 millions de ménages sont en attente d\'attribution.', question: 'Nombre de logements sociaux?', options: ['A) 4 millions', 'B) 4,5 millions', 'C) 5 millions', 'D) 5,5 millions'], correctAnswer: 2, explanation: '"5 millions".' },
          { id: 19, audioDescription: '[Audio: Construction]', audioText: '400 000 logements sont construits chaque année en France. L\'objectif gouvernemental est de 500 000.', question: 'Logements construits par an?', options: ['A) 300 000', 'B) 350 000', 'C) 400 000', 'D) 450 000'], correctAnswer: 2, explanation: '"400 000".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'Le budget logement représente en moyenne 28% du budget des ménages français. À Paris, ce chiffre monte à 35%.', question: 'Budget logement moyen?', options: ['A) 22%', 'B) 25%', 'C) 28%', 'D) 32%'], correctAnswer: 2, explanation: '"28%".' }
        ]
      }
    ]
  },

  // ==================== EXAM 10: Food & Gastronomy ====================
  {
    id: 'listening-exam-10',
    examNumber: 10,
    title: 'Compréhension Orale - Examen 10',
    theme: 'Food & Gastronomy',
    level: 'B1',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Situations culinaires',
        questions: [
          { id: 1, audioDescription: '[Audio: Restaurant]', audioText: 'Serveur: "Le plat du jour est à 14€. Il comprend entrée, plat et dessert."', question: 'Prix du plat du jour?', options: ['A) 12€', 'B) 13€', 'C) 14€', 'D) 15€'], correctAnswer: 2, explanation: '"14€".' },
          { id: 2, audioDescription: '[Audio: Boucherie]', audioText: 'Boucher: "Le bœuf est à 22€ le kilo. Pour 4 personnes, comptez 800g."', question: 'Prix au kilo?', options: ['A) 18€', 'B) 20€', 'C) 22€', 'D) 25€'], correctAnswer: 2, explanation: '"22€".' },
          { id: 3, audioDescription: '[Audio: Cours cuisine]', audioText: 'Chef: "Le cours dure 3 heures. On préparera un menu complet pour 6 personnes."', question: 'Durée du cours?', options: ['A) 2 heures', 'B) 2h30', 'C) 3 heures', 'D) 4 heures'], correctAnswer: 2, explanation: '"3 heures".' },
          { id: 4, audioDescription: '[Audio: Fromager]', audioText: 'Fromager: "Ce camembert a été affiné pendant 4 semaines. Il sera parfait dans 3 jours."', question: 'Durée d\'affinage?', options: ['A) 2 semaines', 'B) 3 semaines', 'C) 4 semaines', 'D) 6 semaines'], correctAnswer: 2, explanation: '"4 semaines".' },
          { id: 5, audioDescription: '[Audio: Cave à vin]', audioText: 'Caviste: "Ce bordeaux 2018 est à 25€. Il peut se garder encore 10 ans."', question: 'Prix de la bouteille?', options: ['A) 20€', 'B) 22€', 'C) 25€', 'D) 30€'], correctAnswer: 2, explanation: '"25€".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Émissions Culinaires',
        description: 'Programmes gastronomiques',
        questions: [
          { id: 6, audioDescription: '[Audio: Émission TV]', audioText: 'Présentateur: "Pour cette recette, vous aurez besoin de 500g de farine, 3 œufs et 250ml de lait."', question: 'Quantité de farine?', options: ['A) 400g', 'B) 450g', 'C) 500g', 'D) 600g'], correctAnswer: 2, explanation: '"500g".' },
          { id: 7, audioDescription: '[Audio: Concours]', audioText: 'Jury: "Vous avez 90 minutes pour réaliser ce dessert. Pas une minute de plus!"', question: 'Temps imparti?', options: ['A) 60 minutes', 'B) 75 minutes', 'C) 90 minutes', 'D) 120 minutes'], correctAnswer: 2, explanation: '"90 minutes".' },
          { id: 8, audioDescription: '[Audio: Conseil chef]', audioText: 'Chef: "Le secret est la cuisson: 180 degrés pendant 45 minutes pour un moelleux parfait."', question: 'Température de cuisson?', options: ['A) 160°C', 'B) 170°C', 'C) 180°C', 'D) 200°C'], correctAnswer: 2, explanation: '"180 degrés".' },
          { id: 9, audioDescription: '[Audio: Marché]', audioText: 'Reporter: "Les fraises arrivent sur les étals. Cette année, le prix moyen est de 6€ la barquette de 500g."', question: 'Prix des fraises?', options: ['A) 4€', 'B) 5€', 'C) 6€', 'D) 7€'], correctAnswer: 2, explanation: '"6€".' },
          { id: 10, audioDescription: '[Audio: Bio]', audioText: 'Expert: "Les produits bio coûtent en moyenne 30% plus cher, mais les ventes ont doublé en 5 ans."', question: 'Surcoût du bio?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 40%'], correctAnswer: 2, explanation: '"30%".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Discussions',
        description: 'Conversations gastronomiques',
        questions: [
          { id: 11, audioDescription: '[Audio: Dîner amis]', audioText: 'Marie: "J\'ai réservé pour 8 personnes à 20h. Le menu dégustation est à 65€."', question: 'Nombre de convives?', options: ['A) 6', 'B) 7', 'C) 8', 'D) 10'], correctAnswer: 2, explanation: '"8 personnes".' },
          { id: 12, audioDescription: '[Audio: Suite dîner]', audioText: '[Suite]', question: 'Prix du menu dégustation?', options: ['A) 55€', 'B) 60€', 'C) 65€', 'D) 70€'], correctAnswer: 2, explanation: '"65€".' },
          { id: 13, audioDescription: '[Audio: Régime]', audioText: 'Nutritionniste: "Limitez-vous à 2000 calories par jour. Répartissez en 5 repas: 3 principaux et 2 collations."', question: 'Calories recommandées?', options: ['A) 1500', 'B) 1800', 'C) 2000', 'D) 2500'], correctAnswer: 2, explanation: '"2000 calories".' },
          { id: 14, audioDescription: '[Audio: Tradition]', audioText: 'Grand-mère: "Ma confiture, c\'est 1 kilo de fruits pour 800g de sucre. Cuisson: 20 minutes."', question: 'Quantité de sucre?', options: ['A) 600g', 'B) 700g', 'C) 800g', 'D) 1kg'], correctAnswer: 2, explanation: '"800g".' },
          { id: 15, audioDescription: '[Audio: Allergie]', audioText: 'Client: "Je suis allergique aux noix. Ce plat en contient-il?" Serveur: "Non, mais il y a des amandes."', question: 'À quoi le client est-il allergique?', options: ['A) Gluten', 'B) Lactose', 'C) Noix', 'D) Œufs'], correctAnswer: 2, explanation: '"Allergique aux noix".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Documentaires',
        description: 'Documentaires culinaires',
        questions: [
          { id: 16, audioDescription: '[Audio: Patrimoine culinaire]', audioText: 'La baguette française mesure traditionnellement 65cm et pèse 250g. 12 millions de baguettes sont vendues chaque jour en France.', question: 'Longueur traditionnelle?', options: ['A) 55cm', 'B) 60cm', 'C) 65cm', 'D) 70cm'], correctAnswer: 2, explanation: '"65cm".' },
          { id: 17, audioDescription: '[Audio: Suite baguette]', audioText: '[Suite]', question: 'Baguettes vendues par jour?', options: ['A) 8 millions', 'B) 10 millions', 'C) 12 millions', 'D) 15 millions'], correctAnswer: 2, explanation: '"12 millions".' },
          { id: 18, audioDescription: '[Audio: Fromages]', audioText: 'La France produit plus de 400 variétés de fromages. Un Français consomme en moyenne 27 kilos de fromage par an.', question: 'Variétés de fromages?', options: ['A) 300', 'B) 350', 'C) 400', 'D) 500'], correctAnswer: 2, explanation: '"400 variétés".' },
          { id: 19, audioDescription: '[Audio: Consommation]', audioText: '[Suite]', question: 'Consommation annuelle/personne?', options: ['A) 22 kg', 'B) 25 kg', 'C) 27 kg', 'D) 30 kg'], correctAnswer: 2, explanation: '"27 kilos".' },
          { id: 20, audioDescription: '[Audio: Conclusion]', audioText: 'La gastronomie française génère 200 milliards d\'euros et emploie 1 million de personnes. Elle est inscrite au patrimoine de l\'UNESCO.', question: 'Chiffre d\'affaires gastronomie?', options: ['A) 150 milliards', 'B) 175 milliards', 'C) 200 milliards', 'D) 250 milliards'], correctAnswer: 2, explanation: '"200 milliards".' }
        ]
      }
    ]
  }
];

// Export function to get a specific exam
export function getListeningExamPart1(examNumber) {
  return LISTENING_EXAMS_PART1.find(e => e.examNumber === examNumber);
}
