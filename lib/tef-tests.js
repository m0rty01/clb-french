// TEF-Style Mock Tests Database
// Original practice exercises following TEF format
// Structure allows adding more content later

export const TEF_TEST_STRUCTURE = {
  comprehensionOrale: {
    name: 'Compréhension Orale',
    nameEn: 'Listening Comprehension',
    icon: 'Headphones',
    duration: 40, // minutes
    totalQuestions: 40,
    sections: ['A', 'B', 'C'],
    description: 'Listen to audio recordings and answer questions',
    instructions: [
      'You will hear each recording twice',
      'Read the questions before listening',
      'Select the best answer for each question',
      'You cannot pause the audio during the test'
    ]
  },
  comprehensionEcrite: {
    name: 'Compréhension Écrite',
    nameEn: 'Reading Comprehension',
    icon: 'FileText',
    duration: 60, // minutes
    totalQuestions: 50,
    sections: ['A', 'B', 'C'],
    description: 'Read texts and answer comprehension questions',
    instructions: [
      'Read each text carefully',
      'Answer all questions based on the text',
      'Select the best answer for each question',
      'You can go back to previous questions'
    ]
  },
  expressionEcrite: {
    name: 'Expression Écrite',
    nameEn: 'Written Expression',
    icon: 'PenTool',
    duration: 60, // minutes
    totalQuestions: 2,
    sections: ['A', 'B'],
    description: 'Complete writing tasks',
    instructions: [
      'Section A: Write a short message (80-100 words)',
      'Section B: Write a formal text (200-250 words)',
      'Pay attention to grammar, vocabulary, and structure',
      'Manage your time between both sections'
    ]
  },
  expressionOrale: {
    name: 'Expression Orale',
    nameEn: 'Oral Expression',
    icon: 'Mic',
    duration: 15, // minutes
    totalQuestions: 2,
    sections: ['A', 'B'],
    description: 'Record your spoken responses',
    instructions: [
      'Section A: Role-play to obtain information (5 min)',
      'Section B: Present and argue a point of view (10 min)',
      'Speak clearly and at a natural pace',
      'You will have preparation time before recording'
    ]
  }
};

// CLB Score Mapping
export const CLB_SCORE_MAP = {
  // Score ranges out of 100
  '0-19': { clb: 1, cefr: 'A1-' },
  '20-39': { clb: 2, cefr: 'A1' },
  '40-49': { clb: 3, cefr: 'A1+' },
  '50-59': { clb: 4, cefr: 'A2' },
  '60-69': { clb: 5, cefr: 'A2+' },
  '70-79': { clb: 6, cefr: 'B1' },
  '80-89': { clb: 7, cefr: 'B1+' },
  '90-94': { clb: 8, cefr: 'B2' },
  '95-100': { clb: 9, cefr: 'B2+' }
};

export function calculateCLBScore(percentScore) {
  if (percentScore < 20) return { clb: 1, cefr: 'A1-' };
  if (percentScore < 40) return { clb: 2, cefr: 'A1' };
  if (percentScore < 50) return { clb: 3, cefr: 'A1+' };
  if (percentScore < 60) return { clb: 4, cefr: 'A2' };
  if (percentScore < 70) return { clb: 5, cefr: 'A2+' };
  if (percentScore < 80) return { clb: 6, cefr: 'B1' };
  if (percentScore < 90) return { clb: 7, cefr: 'B1+' };
  if (percentScore < 95) return { clb: 8, cefr: 'B2' };
  return { clb: 9, cefr: 'B2+' };
}

// ============ LISTENING COMPREHENSION TESTS ============
export const LISTENING_TESTS = [
  {
    id: 'co-test-1',
    title: 'Mock Test 1 - Listening',
    level: 'B1',
    sections: [
      {
        id: 'A',
        name: 'Section A - Short Dialogues',
        description: 'Listen to short dialogues and identify the situation',
        questions: [
          {
            id: 1,
            audioDescription: '[Audio: Two people greeting each other at a café]',
            audioText: 'Person A: "Bonjour Marie! Ça fait longtemps! Comment vas-tu?" Person B: "Très bien, merci! Et toi? Tu travailles toujours à la banque?"',
            question: 'Où se passe cette conversation?',
            options: [
              'A) Dans un bureau',
              'B) Dans un café',
              'C) Dans un hôpital',
              'D) Dans une école'
            ],
            correctAnswer: 1,
            explanation: 'The greeting "Bonjour" and casual tone suggest a café meeting between friends.'
          },
          {
            id: 2,
            audioDescription: '[Audio: Phone conversation about an appointment]',
            audioText: 'Receptionist: "Cabinet médical du Dr. Martin, bonjour." Patient: "Bonjour, je voudrais prendre rendez-vous pour la semaine prochaine." Receptionist: "Bien sûr, mardi à 14h, ça vous convient?"',
            question: 'Quel est le but de cet appel?',
            options: [
              'A) Annuler un rendez-vous',
              'B) Prendre un rendez-vous médical',
              'C) Commander un produit',
              'D) Se plaindre d\'un service'
            ],
            correctAnswer: 1,
            explanation: 'The caller asks "je voudrais prendre rendez-vous" (I would like to make an appointment).'
          },
          {
            id: 3,
            audioDescription: '[Audio: Train station announcement]',
            audioText: 'Attention, le train à destination de Lyon Part-Dieu, départ prévu à 15h30, partira voie 7. Je répète, voie 7.',
            question: 'Quelle information est donnée?',
            options: [
              'A) Le prix du billet',
              'B) Le numéro de la voie',
              'C) Le retard du train',
              'D) La fermeture de la gare'
            ],
            correctAnswer: 1,
            explanation: 'The announcement specifies "voie 7" (platform 7) for the train to Lyon.'
          },
          {
            id: 4,
            audioDescription: '[Audio: Weather forecast on radio]',
            audioText: 'Pour demain, attendez-vous à un ciel nuageux le matin avec des éclaircies l\'après-midi. Les températures seront comprises entre 12 et 18 degrés.',
            question: 'Quel temps fera-t-il demain après-midi?',
            options: [
              'A) Il pleuvra',
              'B) Il y aura du soleil',
              'C) Il neigera',
              'D) Il fera très froid'
            ],
            correctAnswer: 1,
            explanation: '"Éclaircies l\'après-midi" means sunny spells in the afternoon.'
          },
          {
            id: 5,
            audioDescription: '[Audio: Restaurant conversation]',
            audioText: 'Serveur: "Vous avez choisi?" Client: "Oui, je vais prendre le menu du jour avec le poisson." Serveur: "Excellent choix. Et comme boisson?" Client: "Une carafe d\'eau, s\'il vous plaît."',
            question: 'Que commande le client?',
            options: [
              'A) De la viande',
              'B) Du poisson',
              'C) Une salade',
              'D) Une pizza'
            ],
            correctAnswer: 1,
            explanation: 'The customer orders "le poisson" (fish) from the daily menu.'
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Radio Messages',
        description: 'Listen to radio announcements and news',
        questions: [
          {
            id: 6,
            audioDescription: '[Audio: Radio advertisement for a supermarket]',
            audioText: 'Supermarché Carrefour vous propose cette semaine une promotion exceptionnelle! Tous les produits laitiers à moins 30%. Offre valable jusqu\'à dimanche.',
            question: 'Quelle est la réduction proposée?',
            options: [
              'A) 20%',
              'B) 30%',
              'C) 40%',
              'D) 50%'
            ],
            correctAnswer: 1,
            explanation: 'The advertisement mentions "moins 30%" (30% off) on dairy products.'
          },
          {
            id: 7,
            audioDescription: '[Audio: News report about traffic]',
            audioText: 'Info trafic: un accident sur l\'autoroute A6 direction Paris provoque des ralentissements importants. Comptez une heure de plus pour rejoindre la capitale.',
            question: 'Quel est le problème signalé?',
            options: [
              'A) Des travaux sur la route',
              'B) Un accident de la circulation',
              'C) Une manifestation',
              'D) La fermeture de l\'autoroute'
            ],
            correctAnswer: 1,
            explanation: 'The report mentions "un accident" causing traffic delays.'
          },
          {
            id: 8,
            audioDescription: '[Audio: Cultural event announcement]',
            audioText: 'Le Festival de Jazz de Montréal aura lieu du 28 juin au 7 juillet. Plus de 200 concerts gratuits sont prévus dans différents lieux de la ville.',
            question: 'Combien de concerts gratuits sont prévus?',
            options: [
              'A) 100',
              'B) 150',
              'C) Plus de 200',
              'D) 300'
            ],
            correctAnswer: 2,
            explanation: 'The announcement states "Plus de 200 concerts gratuits" (more than 200 free concerts).'
          }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Long Conversations',
        description: 'Listen to longer dialogues and discussions',
        questions: [
          {
            id: 9,
            audioDescription: '[Audio: Job interview conversation]',
            audioText: 'Interviewer: "Parlez-moi de votre expérience." Candidate: "J\'ai travaillé pendant 5 ans comme comptable dans une PME. J\'ai géré la comptabilité et les déclarations fiscales." Interviewer: "Pourquoi voulez-vous changer de poste?" Candidate: "Je cherche plus de responsabilités et de nouveaux défis."',
            question: 'Quelle est la profession actuelle du candidat?',
            options: [
              'A) Secrétaire',
              'B) Comptable',
              'C) Directeur',
              'D) Commercial'
            ],
            correctAnswer: 1,
            explanation: 'The candidate says "J\'ai travaillé comme comptable" (I worked as an accountant).'
          },
          {
            id: 10,
            audioDescription: '[Audio: Continuation of job interview]',
            audioText: '[Previous context continues]',
            question: 'Pourquoi le candidat veut-il changer de travail?',
            options: [
              'A) Pour un meilleur salaire',
              'B) Pour plus de responsabilités',
              'C) Pour travailler moins',
              'D) Pour déménager'
            ],
            correctAnswer: 1,
            explanation: 'The candidate wants "plus de responsabilités et de nouveaux défis" (more responsibilities and new challenges).'
          }
        ]
      }
    ]
  }
];

// ============ READING COMPREHENSION TESTS ============
export const READING_TESTS = [
  {
    id: 'ce-test-1',
    title: 'Mock Test 1 - Reading',
    level: 'B1',
    sections: [
      {
        id: 'A',
        name: 'Section A - Short Texts',
        description: 'Read short texts like signs, notices, and advertisements',
        questions: [
          {
            id: 1,
            text: `PHARMACIE DE GARDE
Ouverte ce dimanche
9h - 12h et 14h - 19h
Pharmacie Centrale
15, rue de la République
Tél: 04 72 00 00 00`,
            question: 'À quelle heure ferme la pharmacie le dimanche après-midi?',
            options: [
              'A) 12h',
              'B) 14h',
              'C) 17h',
              'D) 19h'
            ],
            correctAnswer: 3,
            explanation: 'The pharmacy closes at 19h (7 PM) on Sunday afternoon.'
          },
          {
            id: 2,
            text: `SOLDES D'HIVER
Du 10 janvier au 20 février
Jusqu'à -50% sur une sélection d'articles
Magasin MODE & STYLE
Centre commercial Les Halles`,
            question: 'Quelle est la réduction maximale proposée?',
            options: [
              'A) 20%',
              'B) 30%',
              'C) 40%',
              'D) 50%'
            ],
            correctAnswer: 3,
            explanation: 'The maximum discount is "jusqu\'à -50%" (up to 50% off).'
          },
          {
            id: 3,
            text: `AVIS AUX LOCATAIRES
En raison de travaux de maintenance,
l'eau sera coupée le mardi 15 mars
de 9h à 17h.
Nous vous prions de nous excuser pour la gêne occasionnée.
La Direction`,
            question: 'Pourquoi l\'eau sera-t-elle coupée?',
            options: [
              'A) À cause d\'une fuite',
              'B) Pour des travaux de maintenance',
              'C) Pour une inspection',
              'D) À cause d\'une grève'
            ],
            correctAnswer: 1,
            explanation: 'The notice states "En raison de travaux de maintenance" (due to maintenance work).'
          },
          {
            id: 4,
            text: `MENU DU JOUR - 15€
Entrée: Soupe de légumes de saison
Plat: Poulet rôti aux herbes
     ou Filet de saumon grillé
Dessert: Tarte aux pommes maison
Boisson non comprise`,
            question: 'Qu\'est-ce qui n\'est pas inclus dans le prix?',
            options: [
              'A) L\'entrée',
              'B) Le dessert',
              'C) La boisson',
              'D) Le plat principal'
            ],
            correctAnswer: 2,
            explanation: '"Boisson non comprise" means the drink is not included.'
          },
          {
            id: 5,
            text: `COURS DE FRANÇAIS
Tous niveaux - Débutant à avancé
Cours du soir: Lundi et Mercredi 18h-20h
Tarif: 250€ le trimestre
Inscription: www.frenchschool.fr
Contact: 01 42 00 00 00`,
            question: 'Quand ont lieu les cours?',
            options: [
              'A) Le matin',
              'B) L\'après-midi',
              'C) Le soir',
              'D) Le weekend'
            ],
            correctAnswer: 2,
            explanation: '"Cours du soir" means evening classes (18h-20h).'
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Medium Texts',
        description: 'Read articles and letters of medium length',
        questions: [
          {
            id: 6,
            text: `Le télétravail en France

Depuis la pandémie de 2020, le télétravail s'est considérablement développé en France. Selon une étude récente, 30% des salariés français travaillent désormais régulièrement depuis leur domicile, au moins un jour par semaine.

Les avantages sont nombreux: gain de temps dans les transports, meilleur équilibre vie professionnelle-vie personnelle, et réduction de la fatigue. Cependant, certains inconvénients existent aussi: isolement social, difficulté à séparer travail et vie privée, et problèmes de communication avec les collègues.

Les entreprises doivent s'adapter en proposant des outils numériques efficaces et en maintenant le lien social entre les employés.`,
            question: 'Quel pourcentage de Français télétravaille régulièrement?',
            options: [
              'A) 20%',
              'B) 30%',
              'C) 40%',
              'D) 50%'
            ],
            correctAnswer: 1,
            explanation: 'The text states "30% des salariés français travaillent désormais régulièrement depuis leur domicile".'
          },
          {
            id: 7,
            text: '[Same text as above]',
            question: 'Quel est un inconvénient du télétravail mentionné?',
            options: [
              'A) Le coût élevé',
              'B) L\'isolement social',
              'C) La perte de productivité',
              'D) Les problèmes techniques'
            ],
            correctAnswer: 1,
            explanation: 'The text mentions "isolement social" (social isolation) as a disadvantage.'
          },
          {
            id: 8,
            text: `Madame, Monsieur,

Je me permets de vous écrire au sujet de ma commande n°45678 passée le 5 janvier sur votre site internet.

J'ai commandé une table de salon en chêne au prix de 450€. La livraison était prévue pour le 15 janvier, mais je n'ai toujours rien reçu à ce jour, le 25 janvier.

J'ai tenté de contacter votre service client par téléphone à plusieurs reprises, mais sans succès.

Je vous demande donc de bien vouloir me communiquer l'état de ma commande et la nouvelle date de livraison prévue. Sans réponse de votre part sous 8 jours, je me verrai dans l'obligation d'annuler ma commande et de demander un remboursement.

Dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées.

Marie Dupont`,
            question: 'Quel est le problème de Mme Dupont?',
            options: [
              'A) Le produit est endommagé',
              'B) La livraison est en retard',
              'C) Le prix est trop élevé',
              'D) Elle a reçu le mauvais produit'
            ],
            correctAnswer: 1,
            explanation: 'Mrs. Dupont\'s delivery was expected on January 15th but hasn\'t arrived by January 25th.'
          },
          {
            id: 9,
            text: '[Same letter as above]',
            question: 'Que demande Mme Dupont?',
            options: [
              'A) Un remboursement immédiat',
              'B) Un produit de remplacement',
              'C) Des informations sur sa commande',
              'D) Une réduction de prix'
            ],
            correctAnswer: 2,
            explanation: 'She asks to "me communiquer l\'état de ma commande et la nouvelle date de livraison".'
          }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Long Texts',
        description: 'Read detailed articles and complex texts',
        questions: [
          {
            id: 10,
            text: `L'alimentation durable: un défi pour l'avenir

L'alimentation durable est devenue un enjeu majeur de notre société. Face au changement climatique et à l'épuisement des ressources naturelles, il est urgent de repenser notre façon de produire et de consommer.

En France, l'agriculture représente environ 20% des émissions de gaz à effet de serre. La production de viande, notamment bovine, est particulièrement polluante. Pour réduire notre impact environnemental, les experts recommandent de diminuer notre consommation de viande et d'augmenter la part de végétaux dans notre alimentation.

Le gaspillage alimentaire est un autre problème majeur. Chaque année, un Français jette en moyenne 30 kg de nourriture. Pour lutter contre ce gaspillage, de nombreuses initiatives ont vu le jour: applications anti-gaspi, vente de produits "moches", dons aux associations.

Enfin, privilégier les produits locaux et de saison permet de réduire l'empreinte carbone liée au transport et de soutenir l'économie locale. Les AMAP (Associations pour le Maintien d'une Agriculture Paysanne) et les marchés de producteurs connaissent un succès grandissant.

Adopter une alimentation durable n'est pas seulement bon pour la planète, c'est aussi bénéfique pour notre santé et notre portefeuille.`,
            question: 'Quel pourcentage des émissions de gaz à effet de serre est dû à l\'agriculture en France?',
            options: [
              'A) 10%',
              'B) 15%',
              'C) 20%',
              'D) 25%'
            ],
            correctAnswer: 2,
            explanation: 'The text states "l\'agriculture représente environ 20% des émissions de gaz à effet de serre".'
          },
          {
            id: 11,
            text: '[Same text as above]',
            question: 'Combien de kilos de nourriture un Français jette-t-il en moyenne par an?',
            options: [
              'A) 20 kg',
              'B) 30 kg',
              'C) 40 kg',
              'D) 50 kg'
            ],
            correctAnswer: 1,
            explanation: 'The text mentions "un Français jette en moyenne 30 kg de nourriture".'
          },
          {
            id: 12,
            text: '[Same text as above]',
            question: 'Selon le texte, pourquoi faut-il privilégier les produits locaux?',
            options: [
              'A) Ils sont moins chers',
              'B) Ils ont meilleur goût',
              'C) Pour réduire l\'empreinte carbone',
              'D) Pour avoir plus de choix'
            ],
            correctAnswer: 2,
            explanation: 'The text says local products help "réduire l\'empreinte carbone liée au transport".'
          }
        ]
      }
    ]
  }
];

// ============ WRITING TESTS ============
export const WRITING_TESTS = [
  {
    id: 'ee-test-1',
    title: 'Mock Test 1 - Writing',
    level: 'B1',
    sections: [
      {
        id: 'A',
        name: 'Section A - Short Message',
        description: 'Write a short message or email (80-100 words)',
        tasks: [
          {
            id: 1,
            prompt: `Vous avez réservé une chambre d'hôtel pour le weekend prochain, mais vous devez annuler votre réservation.

Écrivez un email à l'hôtel pour:
- Expliquer la raison de l'annulation
- Demander un remboursement
- Proposer de reporter votre séjour

Écrivez entre 80 et 100 mots.`,
            wordLimit: { min: 80, max: 100 },
            sampleAnswer: `Objet: Annulation de réservation - Chambre 15-16 mars

Madame, Monsieur,

Je vous écris pour annuler ma réservation du 15 au 16 mars prochain (référence: RES2024-456).

Malheureusement, en raison d'un imprévu professionnel, je ne pourrai pas me rendre à votre établissement ce weekend.

Je souhaiterais savoir s'il est possible d'obtenir un remboursement ou, à défaut, de reporter mon séjour à une date ultérieure, par exemple le weekend du 22 mars.

Je vous remercie de votre compréhension et reste dans l'attente de votre réponse.

Cordialement,
[Votre nom]`,
            criteria: ['Clarté du message', 'Vocabulaire approprié', 'Formules de politesse', 'Respect du format']
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Formal Text',
        description: 'Write a formal letter, article, or essay (200-250 words)',
        tasks: [
          {
            id: 2,
            prompt: `Le magazine de votre quartier recherche des témoignages sur le thème:
"Les avantages et les inconvénients de la vie en ville"

Rédigez un article dans lequel vous:
- Présentez les avantages de la vie urbaine
- Exposez les inconvénients
- Donnez votre opinion personnelle

Écrivez entre 200 et 250 mots.`,
            wordLimit: { min: 200, max: 250 },
            sampleAnswer: `La vie en ville: entre opportunités et défis

La vie urbaine offre de nombreux avantages qui attirent chaque année des millions de personnes vers les grandes métropoles.

Premièrement, les villes proposent davantage d'opportunités professionnelles. Les entreprises, les universités et les centres de recherche y sont concentrés, facilitant ainsi l'accès à l'emploi et à la formation. De plus, les transports en commun permettent de se déplacer facilement sans voiture, ce qui est à la fois économique et écologique.

La vie culturelle est également plus riche en ville. Musées, théâtres, concerts et restaurants offrent une multitude de possibilités pour se divertir et s'enrichir intellectuellement.

Cependant, la vie urbaine présente aussi des inconvénients majeurs. Le coût de la vie, et particulièrement celui du logement, est souvent très élevé. La pollution atmosphérique et sonore affecte la santé des habitants. Enfin, le stress et le rythme de vie effréné peuvent nuire au bien-être mental.

Personnellement, je pense que la vie en ville convient aux jeunes actifs qui cherchent des opportunités de carrière et une vie sociale animée. Toutefois, pour élever des enfants ou profiter de sa retraite, la campagne offre un cadre de vie plus serein et plus sain.

En conclusion, le choix entre ville et campagne dépend des priorités et du moment de vie de chacun.`,
            criteria: ['Structure claire (introduction, développement, conclusion)', 'Arguments pertinents', 'Connecteurs logiques', 'Vocabulaire varié', 'Grammaire correcte']
          }
        ]
      }
    ]
  }
];

// ============ SPEAKING TESTS ============
export const SPEAKING_TESTS = [
  {
    id: 'eo-test-1',
    title: 'Mock Test 1 - Speaking',
    level: 'B1',
    sections: [
      {
        id: 'A',
        name: 'Section A - Information Gathering',
        description: 'Role-play: Ask questions to get information',
        prepTime: 2, // minutes
        speakTime: 5, // minutes
        tasks: [
          {
            id: 1,
            scenario: `Vous êtes à Paris et vous voulez visiter le musée du Louvre.
            
Vous téléphonez au musée pour obtenir des informations sur:
- Les horaires d'ouverture
- Le prix des billets
- Les expositions actuelles
- Comment s'y rendre en transports en commun

L'examinateur joue le rôle de l'employé du musée.`,
            suggestedQuestions: [
              'Quels sont vos horaires d\'ouverture?',
              'Quel est le tarif pour un adulte?',
              'Y a-t-il des réductions pour les étudiants?',
              'Quelles expositions sont actuellement présentées?',
              'Comment puis-je venir en métro?'
            ],
            criteria: ['Formulation des questions', 'Interaction naturelle', 'Politesse', 'Prononciation']
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Argumentation',
        description: 'Present and defend a point of view',
        prepTime: 5, // minutes
        speakTime: 10, // minutes
        tasks: [
          {
            id: 2,
            topic: `Document: Article de journal

"De plus en plus de Français choisissent de travailler à temps partiel pour avoir plus de temps libre et profiter de leur famille."

Présentez ce document puis donnez votre opinion sur le sujet.
- Que pensez-vous du travail à temps partiel?
- Quels sont les avantages et les inconvénients?
- Seriez-vous prêt(e) à travailler à temps partiel? Pourquoi?`,
            suggestedPoints: [
              'Résumer le document',
              'Avantages: équilibre vie pro/perso, moins de stress, temps pour les loisirs',
              'Inconvénients: salaire réduit, moins d\'opportunités de carrière',
              'Opinion personnelle avec arguments',
              'Conclusion'
            ],
            criteria: ['Présentation structurée', 'Arguments développés', 'Vocabulaire approprié', 'Fluidité', 'Interaction avec l\'examinateur']
          }
        ]
      }
    ]
  }
];

// Export all tests
export const ALL_TESTS = {
  listening: LISTENING_TESTS,
  reading: READING_TESTS,
  writing: WRITING_TESTS,
  speaking: SPEAKING_TESTS
};

// Helper to get a specific test
export function getTest(type, testId) {
  const tests = ALL_TESTS[type];
  return tests?.find(t => t.id === testId) || tests?.[0];
}

// Helper to get all tests of a type
export function getTestsByType(type) {
  return ALL_TESTS[type] || [];
}
