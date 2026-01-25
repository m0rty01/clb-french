// TEF Mock Exams - Speaking (Expression Orale) - 20 Exams
// Original content - Copyright free

export const SPEAKING_EXAMS = [
  ...Array.from({ length: 20 }, (_, i) => {
    const examNum = i + 1;
    const scenarios = [
      { theme: 'Travel', scenarioA: 'Agence de voyage', topicB: 'Voyager seul ou en groupe' },
      { theme: 'Work', scenarioA: 'Entretien d\'embauche', topicB: 'Le télétravail' },
      { theme: 'Housing', scenarioA: 'Agence immobilière', topicB: 'Vivre en ville ou à la campagne' },
      { theme: 'Health', scenarioA: 'Pharmacie', topicB: 'La médecine traditionnelle vs moderne' },
      { theme: 'Education', scenarioA: 'Secrétariat université', topicB: 'L\'importance des diplômes' },
      { theme: 'Consumer', scenarioA: 'Service après-vente', topicB: 'La consommation responsable' },
      { theme: 'Culture', scenarioA: 'Billetterie théâtre', topicB: 'La culture pour tous' },
      { theme: 'Sports', scenarioA: 'Club de sport', topicB: 'Le sport de compétition vs loisir' },
      { theme: 'Technology', scenarioA: 'Boutique téléphonie', topicB: 'La place des écrans dans notre vie' },
      { theme: 'Environment', scenarioA: 'Mairie - service environnement', topicB: 'Les gestes écologiques' },
      { theme: 'Finance', scenarioA: 'Rendez-vous bancaire', topicB: 'L\'argent fait-il le bonheur?' },
      { theme: 'Family', scenarioA: 'Mairie - service état civil', topicB: 'Les nouvelles formes de famille' },
      { theme: 'Transport', scenarioA: 'Gare SNCF', topicB: 'Les transports du futur' },
      { theme: 'Food', scenarioA: 'Restaurant', topicB: 'L\'alimentation bio' },
      { theme: 'Media', scenarioA: 'Bureau de presse', topicB: 'Les fake news' },
      { theme: 'Immigration', scenarioA: 'Préfecture', topicB: 'L\'intégration des immigrants' },
      { theme: 'Law', scenarioA: 'Cabinet d\'avocat', topicB: 'La justice est-elle égale pour tous?' },
      { theme: 'Arts', scenarioA: 'Galerie d\'art', topicB: 'L\'art moderne: pour ou contre?' },
      { theme: 'Science', scenarioA: 'Laboratoire médical', topicB: 'Les progrès de la science' },
      { theme: 'Canada', scenarioA: 'Bureau d\'immigration Canada', topicB: 'Vivre au Canada' }
    ];
    
    const s = scenarios[i % scenarios.length];
    
    return {
      id: `speaking-exam-${examNum}`,
      examNumber: examNum,
      title: `Expression Orale - Examen ${examNum}`,
      theme: s.theme,
      level: examNum <= 10 ? 'B1' : 'B1-B2',
      duration: 15,
      totalTasks: 2,
      sections: [
        {
          id: 'A',
          name: 'Section A - Obtenir des informations',
          description: 'Jeu de rôle: posez des questions pour obtenir des informations',
          prepTime: 2,
          speakTime: 5,
          tasks: [{
            id: 1,
            type: 'Information gathering',
            scenario: getSpeakingScenarioA(examNum, s.theme, s.scenarioA),
            suggestedQuestions: getSuggestedQuestionsA(examNum, s.theme),
            criteria: ['Formulation des questions', 'Interaction naturelle', 'Politesse', 'Prononciation', 'Vocabulaire approprié']
          }]
        },
        {
          id: 'B',
          name: 'Section B - Exprimer un point de vue',
          description: 'Présentez et défendez une opinion sur un sujet',
          prepTime: 5,
          speakTime: 10,
          tasks: [{
            id: 2,
            type: 'Opinion/Argumentation',
            topic: getSpeakingTopicB(examNum, s.theme, s.topicB),
            suggestedPoints: getSuggestedPointsB(examNum, s.theme),
            criteria: ['Présentation structurée', 'Arguments développés', 'Vocabulaire approprié', 'Fluidité', 'Interaction avec l\'examinateur']
          }]
        }
      ]
    };
  })
];

function getSpeakingScenarioA(num, theme, scenarioType) {
  const scenarios = {
    'Travel': `Vous êtes à l'agence de voyage. Vous voulez organiser un voyage au Canada.\n\nObtenez des informations sur:\n- Les destinations recommandées\n- Les périodes idéales pour voyager\n- Les formalités (visa, assurance)\n- Le budget à prévoir\n- Les types d'hébergement\n\nL'examinateur joue le rôle de l'agent de voyage.`,
    'Work': `Vous passez un entretien d'embauche pour un poste de commercial.\n\nPosez des questions sur:\n- Les missions du poste\n- Les conditions de travail (horaires, télétravail)\n- Le salaire et les avantages\n- Les possibilités d'évolution\n- L'équipe et l'ambiance\n\nL'examinateur joue le rôle du recruteur.`,
    'Housing': `Vous cherchez un appartement à louer. Vous êtes à l'agence immobilière.\n\nDemandez des informations sur:\n- Les appartements disponibles dans votre budget\n- La superficie et le nombre de pièces\n- Le quartier et les transports\n- Le montant du loyer et des charges\n- Les conditions du bail\n\nL'examinateur joue le rôle de l'agent immobilier.`,
    'Health': `Vous êtes à la pharmacie pour acheter des médicaments.\n\nDemandez des informations sur:\n- Les médicaments sans ordonnance pour votre problème\n- La posologie et les effets secondaires\n- Les interactions possibles\n- Le prix et le remboursement\n- Des conseils de santé\n\nL'examinateur joue le rôle du pharmacien.`,
    'Education': `Vous voulez vous inscrire à un cours de français. Vous êtes au secrétariat.\n\nDemandez des informations sur:\n- Les niveaux disponibles et le test de placement\n- Les horaires et la durée des cours\n- Le prix et les modalités de paiement\n- Les professeurs et la méthode\n- Le diplôme ou certificat délivré\n\nL'examinateur joue le rôle du secrétaire.`,
    'Consumer': `Vous avez acheté un appareil qui ne fonctionne pas. Vous êtes au service après-vente.\n\nExpliquez votre problème et demandez:\n- Les options de réparation ou d'échange\n- Les délais de traitement\n- La garantie applicable\n- Un dédommagement possible\n- Comment éviter ce problème à l'avenir\n\nL'examinateur joue le rôle du technicien SAV.`,
    'Culture': `Vous voulez réserver des places pour un spectacle. Vous êtes à la billetterie.\n\nDemandez des informations sur:\n- Les spectacles disponibles\n- Les dates et horaires\n- Les places et les tarifs\n- Les réductions possibles\n- Les modalités d'achat et d'annulation\n\nL'examinateur joue le rôle du guichetier.`,
    'Sports': `Vous voulez vous inscrire dans une salle de sport.\n\nDemandez des informations sur:\n- Les équipements et cours disponibles\n- Les tarifs et formules d'abonnement\n- Les horaires d'ouverture\n- Le certificat médical nécessaire\n- La période d'essai\n\nL'examinateur joue le rôle du responsable.`,
    'Technology': `Vous voulez acheter un nouveau téléphone. Vous êtes en boutique.\n\nDemandez des informations sur:\n- Les modèles recommandés pour votre usage\n- Les caractéristiques techniques\n- Les prix et promotions\n- Les garanties et services\n- Les forfaits associés\n\nL'examinateur joue le rôle du vendeur.`,
    'Environment': `Vous voulez participer à une action écologique. Vous êtes à la mairie.\n\nDemandez des informations sur:\n- Les actions organisées dans la commune\n- Comment devenir bénévole\n- Le tri des déchets et le recyclage\n- Les aides pour les économies d'énergie\n- Les projets futurs\n\nL'examinateur joue le rôle de l'agent municipal.`,
    'Finance': `Vous avez rendez-vous avec votre conseiller bancaire pour un projet.\n\nDemandez des informations sur:\n- Les solutions d'épargne ou de crédit\n- Les taux et conditions\n- Les avantages et inconvénients\n- Les documents nécessaires\n- Les délais de traitement\n\nL'examinateur joue le rôle du conseiller.`,
    'Family': `Vous devez faire des démarches administratives à la mairie (naissance, mariage...).\n\nDemandez des informations sur:\n- Les documents à fournir\n- Les délais de traitement\n- Le coût des démarches\n- Les horaires de la mairie\n- Les services disponibles en ligne\n\nL'examinateur joue le rôle de l'agent d'état civil.`,
    'Transport': `Vous êtes à la gare et voulez acheter un billet de train.\n\nDemandez des informations sur:\n- Les horaires des trains\n- Les tarifs et réductions\n- Les correspondances\n- Les services à bord\n- Les conditions d'échange ou remboursement\n\nL'examinateur joue le rôle de l'agent SNCF.`,
    'Food': `Vous êtes au restaurant pour une occasion spéciale.\n\nDemandez des informations sur:\n- Les spécialités du restaurant\n- Les menus et prix\n- Les allergènes et régimes spéciaux\n- Les vins recommandés\n- La réservation pour un groupe\n\nL'examinateur joue le rôle du serveur.`,
    'Media': `Vous voulez vous abonner à un journal ou magazine.\n\nDemandez des informations sur:\n- Les formules d'abonnement\n- Les tarifs et offres spéciales\n- Le contenu et la périodicité\n- Les versions papier et numérique\n- Les conditions de résiliation\n\nL'examinateur joue le rôle du commercial.`,
    'Immigration': `Vous êtes à la préfecture pour une demande de titre de séjour.\n\nDemandez des informations sur:\n- Les documents nécessaires\n- Les délais de traitement\n- Le coût et les taxes\n- Les droits liés au titre\n- Le renouvellement\n\nL'examinateur joue le rôle de l'agent de préfecture.`,
    'Law': `Vous avez besoin de conseils juridiques. Vous rencontrez un avocat.\n\nDemandez des informations sur:\n- Vos droits dans votre situation\n- Les procédures possibles\n- Les délais et les coûts\n- Les chances de succès\n- L'aide juridictionnelle\n\nL'examinateur joue le rôle de l'avocat.`,
    'Arts': `Vous visitez une galerie d'art et vous intéressez à une œuvre.\n\nDemandez des informations sur:\n- L'artiste et son parcours\n- La technique utilisée\n- Le prix et les modalités d'achat\n- La certification d'authenticité\n- Les autres œuvres de l'artiste\n\nL'examinateur joue le rôle du galeriste.`,
    'Science': `Vous devez faire des analyses médicales. Vous êtes au laboratoire.\n\nDemandez des informations sur:\n- Les analyses à faire selon l'ordonnance\n- La préparation nécessaire (jeûne...)\n- Les délais pour les résultats\n- Le remboursement\n- La récupération des résultats\n\nL'examinateur joue le rôle du technicien.`,
    'Canada': `Vous êtes au bureau d'immigration Canada pour votre projet d'immigration.\n\nDemandez des informations sur:\n- Les programmes d'immigration disponibles\n- Les critères d'éligibilité\n- Les étapes de la procédure\n- Les délais et les frais\n- La vie au Canada\n\nL'examinateur joue le rôle de l'agent d'immigration.`
  };
  return scenarios[theme] || scenarios['Travel'];
}

function getSuggestedQuestionsA(num, theme) {
  return [
    `Pourriez-vous me donner des informations sur...?`,
    `Quels sont les tarifs / les conditions?`,
    `Est-ce que vous proposez des...?`,
    `Combien de temps faut-il pour...?`,
    `Y a-t-il des réductions / des alternatives?`,
    `Que me conseillez-vous?`,
    `Quelles sont les démarches à suivre?`
  ];
}

function getSpeakingTopicB(num, theme, topicName) {
  const topics = {
    'Travel': `Document: Article de magazine\n\n"De plus en plus de personnes choisissent de voyager seules pour découvrir le monde à leur rythme."\n\nPrésentez ce document puis donnez votre opinion:\n- Quels sont les avantages de voyager seul?\n- Quels sont les inconvénients?\n- Comment préférez-vous voyager et pourquoi?`,
    'Work': `Document: Statistiques\n\n"40% des salariés français souhaitent télétravailler au moins 3 jours par semaine."\n\nPrésentez ces données puis donnez votre opinion:\n- Quels sont les avantages du télétravail?\n- Quels sont les risques?\n- Quelle est votre position sur ce sujet?`,
    'Housing': `Document: Enquête\n\n"65% des jeunes préfèrent vivre en ville malgré le coût élevé des loyers."\n\nPrésentez cette enquête puis donnez votre opinion:\n- Quels sont les avantages de la vie urbaine?\n- Quels sont les attraits de la campagne?\n- Où préféreriez-vous vivre et pourquoi?`,
    'Health': `Document: Tendance\n\n"Les médecines alternatives (acupuncture, homéopathie...) attirent de plus en plus de patients."\n\nPrésentez cette tendance puis donnez votre opinion:\n- Que pensez-vous des médecines alternatives?\n- Peuvent-elles remplacer la médecine traditionnelle?\n- Avez-vous déjà utilisé ces méthodes?`,
    'Education': `Document: Débat\n\n"Le diplôme est-il toujours un gage de réussite professionnelle?"\n\nPrésentez ce débat puis donnez votre opinion:\n- Quel est le rôle du diplôme aujourd'hui?\n- L'expérience peut-elle remplacer le diplôme?\n- Quelle est votre position?`,
    'Consumer': `Document: Article\n\n"La consommation responsable: un mode de vie qui séduit les Français."\n\nPrésentez cet article puis donnez votre opinion:\n- Que signifie consommer de façon responsable?\n- Est-ce possible pour tout le monde?\n- Quels gestes faites-vous au quotidien?`,
    'Culture': `Document: Politique culturelle\n\n"Faut-il rendre gratuits les musées et les théâtres pour démocratiser la culture?"\n\nPrésentez ce débat puis donnez votre opinion:\n- Quels seraient les avantages de la gratuité?\n- Quels seraient les inconvénients?\n- Quelle solution proposez-vous?`,
    'Sports': `Document: Analyse\n\n"Le sport de haut niveau: passion ou sacrifice?"\n\nPrésentez cette analyse puis donnez votre opinion:\n- Quels sont les avantages du sport de compétition?\n- Quels en sont les risques?\n- Sport loisir ou compétition: votre préférence?`,
    'Technology': `Document: Étude\n\n"Les Français passent en moyenne 4 heures par jour devant les écrans."\n\nPrésentez cette étude puis donnez votre opinion:\n- Quels sont les effets des écrans sur notre vie?\n- Faut-il limiter le temps d'écran?\n- Comment gérez-vous votre propre usage?`,
    'Environment': `Document: Guide\n\n"10 gestes simples pour réduire son impact environnemental au quotidien."\n\nPrésentez ce document puis donnez votre opinion:\n- Quels gestes écologiques sont les plus importants?\n- Est-ce suffisant pour sauver la planète?\n- Que faites-vous personnellement?`,
    'Finance': `Document: Sondage\n\n"L'argent ne fait pas le bonheur, mais y contribue, selon 70% des Français."\n\nPrésentez ce sondage puis donnez votre opinion:\n- Quel rôle joue l'argent dans le bonheur?\n- Peut-on être heureux sans argent?\n- Quelle est votre vision personnelle?`,
    'Family': `Document: Évolution sociétale\n\n"La famille traditionnelle évolue: familles recomposées, monoparentales, homoparentales..."\n\nPrésentez cette évolution puis donnez votre opinion:\n- Comment la famille a-t-elle changé?\n- Ces évolutions sont-elles positives?\n- Quelle est votre définition de la famille?`,
    'Transport': `Document: Projet\n\n"En 2030, les voitures autonomes et les taxis volants seront une réalité."\n\nPrésentez ce projet puis donnez votre opinion:\n- Quels seraient les avantages de ces innovations?\n- Quels risques ou problèmes voyez-vous?\n- Êtes-vous optimiste pour l'avenir des transports?`,
    'Food': `Document: Tendance\n\n"Le bio: phénomène de mode ou véritable engagement pour la santé?"\n\nPrésentez cette tendance puis donnez votre opinion:\n- Quels sont les avantages des produits bio?\n- Sont-ils accessibles à tous?\n- Achetez-vous bio et pourquoi?`,
    'Media': `Document: Problématique\n\n"Les fake news: un danger pour la démocratie?"\n\nPrésentez cette problématique puis donnez votre opinion:\n- Pourquoi les fake news se répandent-elles?\n- Comment peut-on lutter contre?\n- Comment vérifiez-vous vos informations?`,
    'Immigration': `Document: Débat\n\n"L'intégration des immigrants: entre enrichissement culturel et défis sociaux."\n\nPrésentez ce débat puis donnez votre opinion:\n- Quels sont les apports de l'immigration?\n- Quels sont les défis à relever?\n- Comment favoriser l'intégration?`,
    'Law': `Document: Question de société\n\n"La justice est-elle vraiment égale pour tous?"\n\nPrésentez cette question puis donnez votre opinion:\n- Quels facteurs créent des inégalités?\n- Comment améliorer le système?\n- Avez-vous confiance en la justice?`,
    'Arts': `Document: Controverse\n\n"L'art contemporain: génie ou imposture?"\n\nPrésentez cette controverse puis donnez votre opinion:\n- Qu'est-ce qui définit l'art selon vous?\n- L'art contemporain est-il accessible?\n- Aimez-vous ce type d'art et pourquoi?`,
    'Science': `Document: Prospective\n\n"Les progrès de la science: espoirs et inquiétudes pour l'humanité."\n\nPrésentez ce document puis donnez votre opinion:\n- Quelles avancées scientifiques vous semblent prometteuses?\n- Y a-t-il des limites à ne pas franchir?\n- La science peut-elle tout résoudre?`,
    'Canada': `Document: Témoignages\n\n"Ils ont choisi de vivre au Canada: leurs conseils aux futurs immigrants."\n\nPrésentez ces témoignages puis donnez votre opinion:\n- Qu'est-ce qui attire les immigrants au Canada?\n- Quels sont les défis de l'immigration?\n- Pourquoi voulez-vous vivre au Canada?`
  };
  return topics[theme] || topics['Travel'];
}

function getSuggestedPointsB(num, theme) {
  return [
    'Résumez le document en 2-3 phrases',
    'Présentez le premier argument avec un exemple',
    'Développez un contre-argument ou une nuance',
    'Donnez votre opinion personnelle clairement',
    'Illustrez avec votre expérience si possible',
    'Concluez en synthétisant votre position'
  ];
}

export function getSpeakingExam(examNumber) {
  return SPEAKING_EXAMS.find(e => e.examNumber === examNumber);
}
