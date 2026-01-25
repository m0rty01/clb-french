// TEF Mock Exams - Listening Comprehension (Compréhension Orale)
// 20 Original Exams with 4 sections each
// Section A: Short dialogues (identifying situations)
// Section B: Radio/TV messages and announcements  
// Section C: Conversations and discussions
// Section D: Long monologues and presentations

export const LISTENING_EXAMS = [
  // ==================== EXAM 1 ====================
  {
    id: 'co-exam-1',
    examNumber: 1,
    title: 'Compréhension Orale - Examen 1',
    theme: 'Daily Life & Shopping',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Identifiez la situation, le lieu ou les personnes',
        questions: [
          {
            id: 1,
            audioDescription: '[Audio: Bruit de caisse enregistreuse, conversation rapide]',
            audioText: 'Client: "Bonjour, je voudrais deux baguettes et quatre croissants, s\'il vous plaît." Vendeur: "Bien sûr. Ce sera tout?" Client: "Oui, merci. Ça fait combien?" Vendeur: "Ça fait 6 euros 50."',
            question: 'Où se déroule cette conversation?',
            options: ['A) Dans une banque', 'B) Dans une boulangerie', 'C) Dans un restaurant', 'D) Dans un supermarché'],
            correctAnswer: 1,
            explanation: 'Les mots "baguettes" et "croissants" indiquent une boulangerie.'
          },
          {
            id: 2,
            audioDescription: '[Audio: Sonnerie de téléphone, voix professionnelle]',
            audioText: 'Réceptionniste: "Hôtel du Parc, bonjour." Client: "Bonjour, je voudrais réserver une chambre pour deux nuits, du 15 au 17 mars." Réceptionniste: "Chambre simple ou double?" Client: "Double, s\'il vous plaît, avec vue sur le jardin si possible."',
            question: 'Que veut faire le client?',
            options: ['A) Annuler une réservation', 'B) Modifier une réservation', 'C) Faire une réservation', 'D) Se plaindre du service'],
            correctAnswer: 2,
            explanation: 'Le client dit "je voudrais réserver une chambre".'
          },
          {
            id: 3,
            audioDescription: '[Audio: Bruit de circulation, klaxons]',
            audioText: 'Passager: "Excusez-moi, vous allez bien à la gare centrale?" Chauffeur: "Oui, terminus dans quinze minutes environ." Passager: "Parfait, merci. Je descends au dernier arrêt alors."',
            question: 'Dans quel moyen de transport sont ces personnes?',
            options: ['A) Dans un taxi', 'B) Dans un bus', 'C) Dans un train', 'D) Dans un avion'],
            correctAnswer: 1,
            explanation: 'Le mot "terminus" et "arrêt" suggèrent un bus public.'
          },
          {
            id: 4,
            audioDescription: '[Audio: Musique d\'ambiance douce, couverts]',
            audioText: 'Serveur: "Bonsoir, vous avez réservé?" Client: "Oui, au nom de Martin, pour quatre personnes." Serveur: "Ah oui, je vois. Suivez-moi, votre table est prête près de la fenêtre."',
            question: 'Combien de personnes vont dîner?',
            options: ['A) Deux personnes', 'B) Trois personnes', 'C) Quatre personnes', 'D) Cinq personnes'],
            correctAnswer: 2,
            explanation: 'Le client dit "pour quatre personnes".'
          },
          {
            id: 5,
            audioDescription: '[Audio: Sonnerie de porte, ambiance de magasin]',
            audioText: 'Vendeuse: "Bonjour, je peux vous aider?" Client: "Oui, je cherche une robe pour un mariage. Quelque chose d\'élégant mais pas trop formel." Vendeuse: "J\'ai plusieurs modèles qui pourraient vous plaire. Quelle est votre taille?"',
            question: 'Pourquoi la cliente cherche-t-elle une robe?',
            options: ['A) Pour un entretien d\'emploi', 'B) Pour un mariage', 'C) Pour une fête d\'anniversaire', 'D) Pour le travail quotidien'],
            correctAnswer: 1,
            explanation: 'La cliente dit "une robe pour un mariage".'
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        description: 'Écoutez les annonces et répondez aux questions',
        questions: [
          {
            id: 6,
            audioDescription: '[Audio: Jingle radio, voix de présentateur]',
            audioText: 'Et maintenant la météo pour demain. Attendez-vous à une journée nuageuse sur l\'ensemble du pays avec des températures fraîches, entre 8 et 12 degrés. Des averses sont prévues en fin d\'après-midi, surtout dans le nord. Pensez à prendre votre parapluie!',
            question: 'Quel temps est prévu pour demain?',
            options: ['A) Ensoleillé et chaud', 'B) Nuageux avec pluie possible', 'C) Neige abondante', 'D) Brouillard épais'],
            correctAnswer: 1,
            explanation: 'Le bulletin annonce "journée nuageuse" et "averses en fin d\'après-midi".'
          },
          {
            id: 7,
            audioDescription: '[Audio: Musique publicitaire entraînante]',
            audioText: 'Grande ouverture de votre nouveau supermarché FreshMart ce samedi! Pour fêter l\'événement, profitez de moins 20% sur tous les produits frais pendant trois jours. Et pour les cent premiers clients, un cadeau surprise! FreshMart, la fraîcheur à prix mini. Ouvert de 8h à 21h.',
            question: 'Quelle est la réduction proposée?',
            options: ['A) 10%', 'B) 15%', 'C) 20%', 'D) 25%'],
            correctAnswer: 2,
            explanation: 'La publicité annonce "moins 20% sur tous les produits frais".'
          },
          {
            id: 8,
            audioDescription: '[Audio: Voix officielle, fond sonore de gare]',
            audioText: 'Attention, le TGV numéro 8742 à destination de Marseille, départ initialement prévu à 14h30, est retardé de 25 minutes en raison d\'un incident technique. Nouveau départ prévu à 14h55, voie 12. La SNCF vous prie d\'excuser ce désagrément.',
            question: 'De combien de minutes le train est-il retardé?',
            options: ['A) 15 minutes', 'B) 20 minutes', 'C) 25 minutes', 'D) 30 minutes'],
            correctAnswer: 2,
            explanation: 'L\'annonce indique un retard de "25 minutes".'
          },
          {
            id: 9,
            audioDescription: '[Audio: Jingle d\'information culturelle]',
            audioText: 'Le musée d\'art moderne vous invite à découvrir l\'exposition "Lumières contemporaines" du 1er avril au 30 juin. Plus de 150 œuvres d\'artistes internationaux à découvrir. Tarif réduit pour les étudiants et les seniors. Fermé le mardi. Réservation conseillée sur notre site internet.',
            question: 'Quel jour le musée est-il fermé?',
            options: ['A) Lundi', 'B) Mardi', 'C) Mercredi', 'D) Dimanche'],
            correctAnswer: 1,
            explanation: 'L\'annonce précise "Fermé le mardi".'
          },
          {
            id: 10,
            audioDescription: '[Audio: Voix d\'urgence, fond sonore d\'hôpital]',
            audioText: 'Centre de don du sang de Lyon: nous avons un besoin urgent de donneurs de groupe O négatif. Si vous êtes en bonne santé et disponible, venez nous voir au 25 rue Pasteur, du lundi au vendredi de 9h à 17h. Votre don peut sauver des vies.',
            question: 'Quel groupe sanguin est recherché en urgence?',
            options: ['A) A positif', 'B) B négatif', 'C) O négatif', 'D) AB positif'],
            correctAnswer: 2,
            explanation: 'Le message demande des donneurs de "groupe O négatif".'
          }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        description: 'Écoutez les dialogues et répondez aux questions',
        questions: [
          {
            id: 11,
            audioDescription: '[Audio: Bureau, bruits de clavier]',
            audioText: 'Sophie: "Tu as vu le mail du directeur? Il veut qu\'on finisse le rapport pour vendredi au lieu de lundi." Marc: "Sérieusement? On a déjà tellement de travail cette semaine. Je ne sais pas si c\'est réaliste." Sophie: "Je sais, mais il dit que c\'est pour une réunion importante avec les investisseurs." Marc: "Bon, on va devoir faire des heures supplémentaires alors."',
            question: 'Pourquoi le délai a-t-il été avancé?',
            options: ['A) À cause de vacances', 'B) Pour une réunion avec des investisseurs', 'C) Parce que le directeur part en voyage', 'D) Pour un audit'],
            correctAnswer: 1,
            explanation: 'Sophie explique que c\'est "pour une réunion importante avec les investisseurs".'
          },
          {
            id: 12,
            audioDescription: '[Audio: Conversation téléphonique]',
            audioText: 'Médecin: "Cabinet du docteur Lemaire, bonjour." Patient: "Bonjour, je voudrais prendre rendez-vous, c\'est assez urgent. J\'ai très mal à la gorge depuis trois jours et j\'ai de la fièvre." Médecin: "Je comprends. Le docteur peut vous voir cet après-midi à 16h30, ça vous convient?" Patient: "Oui, parfait, merci beaucoup."',
            question: 'Quels sont les symptômes du patient?',
            options: ['A) Mal de tête et fatigue', 'B) Mal à la gorge et fièvre', 'C) Toux et nez bouché', 'D) Douleur au dos'],
            correctAnswer: 1,
            explanation: 'Le patient dit avoir "mal à la gorge" et "de la fièvre".'
          },
          {
            id: 13,
            audioDescription: '[Audio: Appartement, conversation animée]',
            audioText: 'Propriétaire: "L\'appartement fait 65 mètres carrés, avec deux chambres, un salon et une cuisine équipée." Visiteur: "Le loyer est de combien?" Propriétaire: "850 euros par mois, charges comprises. Il y a aussi une cave et une place de parking." Visiteur: "C\'est disponible à partir de quand?" Propriétaire: "Le 1er du mois prochain."',
            question: 'Que comprend le loyer de 850 euros?',
            options: ['A) Seulement le loyer', 'B) Le loyer et le parking', 'C) Le loyer et les charges', 'D) Tout est en supplément'],
            correctAnswer: 2,
            explanation: 'Le propriétaire précise "850 euros par mois, charges comprises".'
          },
          {
            id: 14,
            audioDescription: '[Audio: Magasin d\'électronique]',
            audioText: 'Vendeur: "Celui-ci est notre modèle le plus populaire. Il a une excellente autonomie de batterie, environ 48 heures." Client: "Et la qualité du son?" Vendeur: "Vraiment exceptionnelle, avec réduction de bruit active. Il est à 199 euros, mais nous avons une promotion: moins 15% cette semaine." Client: "D\'accord, je le prends!"',
            question: 'Quel est le prix avec la promotion?',
            options: ['A) Environ 169 euros', 'B) Environ 179 euros', 'C) Environ 189 euros', 'D) Environ 199 euros'],
            correctAnswer: 0,
            explanation: '199 euros moins 15% = environ 169 euros.'
          },
          {
            id: 15,
            audioDescription: '[Audio: Café, ambiance détendue]',
            audioText: 'Julie: "Alors, comment s\'est passé ton entretien d\'embauche?" Thomas: "Plutôt bien, je pense. Les questions étaient difficiles mais j\'ai pu montrer mon expérience. Ils m\'ont dit qu\'ils me recontacteraient dans deux semaines." Julie: "C\'est encourageant! Tu as de bonnes chances."',
            question: 'Quand Thomas aura-t-il une réponse?',
            options: ['A) Dans une semaine', 'B) Dans deux semaines', 'C) Dans un mois', 'D) Immédiatement'],
            correctAnswer: 1,
            explanation: 'Thomas dit qu\'ils le "recontacteraient dans deux semaines".'
          }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        description: 'Écoutez les présentations longues et répondez',
        questions: [
          {
            id: 16,
            audioDescription: '[Audio: Conférence, micro professionnel]',
            audioText: 'Aujourd\'hui, je vais vous parler des bienfaits du télétravail. Depuis 2020, cette pratique s\'est généralisée. Les études montrent que 70% des télétravailleurs se disent plus productifs à domicile. Les avantages principaux sont la flexibilité des horaires, l\'absence de temps de transport, et un meilleur équilibre entre vie professionnelle et personnelle. Cependant, l\'isolement social reste un défi majeur à surmonter.',
            question: 'Quel pourcentage de télétravailleurs se sentent plus productifs?',
            options: ['A) 50%', 'B) 60%', 'C) 70%', 'D) 80%'],
            correctAnswer: 2,
            explanation: 'L\'orateur cite "70% des télétravailleurs".'
          },
          {
            id: 17,
            audioDescription: '[Audio: Suite de la conférence]',
            audioText: '[Continuation du discours précédent]',
            question: 'Quel est le principal défi du télétravail mentionné?',
            options: ['A) La connexion internet', 'B) L\'isolement social', 'C) Le manque d\'équipement', 'D) Les horaires de travail'],
            correctAnswer: 1,
            explanation: 'L\'orateur mentionne "l\'isolement social reste un défi majeur".'
          },
          {
            id: 18,
            audioDescription: '[Audio: Documentaire radio]',
            audioText: 'La ville de Bordeaux a mis en place un ambitieux programme de végétalisation urbaine. D\'ici 2030, la municipalité prévoit de planter 50 000 nouveaux arbres et de créer 30 hectares d\'espaces verts supplémentaires. L\'objectif est de réduire la température urbaine de 2 degrés en été et d\'améliorer la qualité de l\'air pour les 260 000 habitants.',
            question: 'Combien d\'arbres seront plantés d\'ici 2030?',
            options: ['A) 30 000', 'B) 40 000', 'C) 50 000', 'D) 60 000'],
            correctAnswer: 2,
            explanation: 'Le programme prévoit de "planter 50 000 nouveaux arbres".'
          },
          {
            id: 19,
            audioDescription: '[Audio: Suite du documentaire]',
            audioText: '[Continuation du documentaire]',
            question: 'De combien de degrés veut-on réduire la température?',
            options: ['A) 1 degré', 'B) 2 degrés', 'C) 3 degrés', 'D) 4 degrés'],
            correctAnswer: 1,
            explanation: 'L\'objectif est de "réduire la température urbaine de 2 degrés".'
          },
          {
            id: 20,
            audioDescription: '[Audio: Présentation académique]',
            audioText: 'En conclusion, l\'apprentissage d\'une langue étrangère offre de nombreux avantages cognitifs. Les recherches démontrent que les personnes bilingues ont une meilleure mémoire, une plus grande capacité de concentration et retardent l\'apparition de maladies comme Alzheimer de 4 à 5 ans en moyenne. Je vous encourage donc à continuer votre apprentissage du français!',
            question: 'De combien d\'années le bilinguisme peut-il retarder Alzheimer?',
            options: ['A) 2 à 3 ans', 'B) 3 à 4 ans', 'C) 4 à 5 ans', 'D) 5 à 6 ans'],
            correctAnswer: 2,
            explanation: 'L\'orateur mentionne un retard de "4 à 5 ans en moyenne".'
          }
        ]
      }
    ]
  },

  // ==================== EXAM 2 ====================
  {
    id: 'co-exam-2',
    examNumber: 2,
    title: 'Compréhension Orale - Examen 2',
    theme: 'Work & Career',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Identifiez la situation, le lieu ou les personnes',
        questions: [
          {
            id: 1,
            audioDescription: '[Audio: Bureau, téléphone qui sonne]',
            audioText: 'Secrétaire: "Bureau du directeur, bonjour." Appelant: "Bonjour, je voudrais parler à Monsieur Dupont concernant ma candidature." Secrétaire: "Je suis désolée, il est en réunion jusqu\'à 15h. Puis-je prendre un message?" Appelant: "Oui, pourriez-vous lui dire que Pierre Martin a appelé?"',
            question: 'Pourquoi l\'appelant téléphone-t-il?',
            options: ['A) Pour prendre rendez-vous', 'B) Pour sa candidature', 'C) Pour se plaindre', 'D) Pour commander un produit'],
            correctAnswer: 1,
            explanation: 'L\'appelant veut parler "concernant ma candidature".'
          },
          {
            id: 2,
            audioDescription: '[Audio: Salle de réunion]',
            audioText: 'Chef: "L\'équipe marketing a fait du bon travail ce trimestre. Les ventes ont augmenté de 15%." Employé: "Merci. C\'est grâce à la nouvelle campagne sur les réseaux sociaux." Chef: "Continuez comme ça. Je propose une prime pour toute l\'équipe."',
            question: 'De combien les ventes ont-elles augmenté?',
            options: ['A) 10%', 'B) 15%', 'C) 20%', 'D) 25%'],
            correctAnswer: 1,
            explanation: 'Le chef dit "les ventes ont augmenté de 15%".'
          },
          {
            id: 3,
            audioDescription: '[Audio: Hall d\'entreprise]',
            audioText: 'Réceptionniste: "Bonjour, vous avez rendez-vous?" Visiteur: "Oui, avec Madame Laurent, des ressources humaines, à 10h." Réceptionniste: "Parfait, prenez l\'ascenseur jusqu\'au troisième étage. Son bureau est le 305."',
            question: 'À quel étage se trouve le bureau?',
            options: ['A) Premier étage', 'B) Deuxième étage', 'C) Troisième étage', 'D) Quatrième étage'],
            correctAnswer: 2,
            explanation: 'La réceptionniste dit "troisième étage".'
          },
          {
            id: 4,
            audioDescription: '[Audio: Cantine d\'entreprise]',
            audioText: 'Collègue 1: "Tu as entendu? Le patron cherche quelqu\'un pour le poste de directeur adjoint." Collègue 2: "Oui, je pensais postuler. J\'ai l\'expérience nécessaire après 8 ans dans l\'entreprise." Collègue 1: "Tu devrais! La date limite est vendredi prochain."',
            question: 'Depuis combien de temps le collègue 2 travaille-t-il dans l\'entreprise?',
            options: ['A) 5 ans', 'B) 6 ans', 'C) 7 ans', 'D) 8 ans'],
            correctAnswer: 3,
            explanation: 'Le collègue mentionne "8 ans dans l\'entreprise".'
          },
          {
            id: 5,
            audioDescription: '[Audio: Bureau, conversation entre collègues]',
            audioText: 'Employé: "Je suis vraiment stressé par ce projet. La deadline est dans trois jours et j\'ai encore beaucoup de travail." Manager: "Ne t\'inquiète pas, je vais demander à Clara de t\'aider. À deux, vous y arriverez."',
            question: 'Quelle solution propose le manager?',
            options: ['A) Repousser la deadline', 'B) Annuler le projet', 'C) Demander de l\'aide à Clara', 'D) Faire des heures supplémentaires'],
            correctAnswer: 2,
            explanation: 'Le manager dit "je vais demander à Clara de t\'aider".'
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        description: 'Écoutez les annonces et répondez aux questions',
        questions: [
          {
            id: 6,
            audioDescription: '[Audio: Publicité radio professionnelle]',
            audioText: 'Vous cherchez un emploi? Le Salon de l\'Emploi de Paris vous attend les 15 et 16 novembre au Parc des Expositions. Plus de 200 entreprises recrutent dans tous les secteurs. Entrée gratuite sur inscription. Apportez plusieurs copies de votre CV!',
            question: 'Combien d\'entreprises participent au salon?',
            options: ['A) 100', 'B) 150', 'C) Plus de 200', 'D) 300'],
            correctAnswer: 2,
            explanation: 'L\'annonce dit "Plus de 200 entreprises recrutent".'
          },
          {
            id: 7,
            audioDescription: '[Audio: Journal télévisé]',
            audioText: 'Le taux de chômage en France a baissé de 0,3 point ce trimestre, atteignant 7,1%. Cette amélioration est notamment due à la création de 85 000 emplois dans le secteur des services. Le gouvernement se félicite de ces résultats mais reconnaît que des efforts restent à faire.',
            question: 'Quel est le nouveau taux de chômage?',
            options: ['A) 6,8%', 'B) 7,1%', 'C) 7,4%', 'D) 7,7%'],
            correctAnswer: 1,
            explanation: 'Le taux atteint "7,1%".'
          },
          {
            id: 8,
            audioDescription: '[Audio: Annonce d\'entreprise]',
            audioText: 'TechCorp annonce l\'ouverture d\'un nouveau centre de recherche à Lyon. Ce projet créera 500 emplois d\'ici deux ans, principalement pour des ingénieurs et des développeurs. Les candidatures sont ouvertes dès maintenant sur notre site carrières.',
            question: 'Combien d\'emplois seront créés?',
            options: ['A) 300', 'B) 400', 'C) 500', 'D) 600'],
            correctAnswer: 2,
            explanation: 'L\'annonce mentionne "500 emplois d\'ici deux ans".'
          },
          {
            id: 9,
            audioDescription: '[Audio: Podcast carrière]',
            audioText: 'Dans notre série sur la reconversion professionnelle, nous recevons Marie, 42 ans, ancienne comptable devenue pâtissière. Elle nous raconte comment elle a suivi une formation de 6 mois avant d\'ouvrir sa propre boutique l\'an dernier.',
            question: 'Quelle était l\'ancienne profession de Marie?',
            options: ['A) Avocate', 'B) Comptable', 'C) Enseignante', 'D) Infirmière'],
            correctAnswer: 1,
            explanation: 'Marie était "ancienne comptable".'
          },
          {
            id: 10,
            audioDescription: '[Audio: Information syndicale]',
            audioText: 'Suite aux négociations, la direction a accepté une augmentation de salaire de 3% pour tous les employés à partir du 1er janvier. De plus, deux jours de télétravail par semaine seront désormais possibles pour les postes compatibles.',
            question: 'Quelle augmentation a été négociée?',
            options: ['A) 2%', 'B) 3%', 'C) 4%', 'D) 5%'],
            correctAnswer: 1,
            explanation: 'L\'augmentation est de "3%".'
          }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        description: 'Écoutez les dialogues et répondez aux questions',
        questions: [
          {
            id: 11,
            audioDescription: '[Audio: Entretien d\'embauche]',
            audioText: 'Recruteur: "Pourquoi voulez-vous quitter votre emploi actuel?" Candidat: "J\'ai beaucoup appris pendant ces cinq années, mais je cherche de nouveaux défis. Votre entreprise est leader dans l\'innovation et c\'est ce qui m\'attire." Recruteur: "Et quelles sont vos prétentions salariales?" Candidat: "Je vise un salaire entre 45 000 et 50 000 euros annuels."',
            question: 'Depuis combien de temps le candidat occupe-t-il son poste actuel?',
            options: ['A) 3 ans', 'B) 4 ans', 'C) 5 ans', 'D) 6 ans'],
            correctAnswer: 2,
            explanation: 'Le candidat parle de "cinq années".'
          },
          {
            id: 12,
            audioDescription: '[Audio: Conversation entre collègues]',
            audioText: 'Anne: "J\'ai postulé pour la promotion au poste de chef d\'équipe." Bernard: "Ah bon? Moi aussi! Que le meilleur gagne!" Anne: "Bien sûr! De toute façon, les résultats seront annoncés la semaine prochaine." Bernard: "Oui, le directeur m\'a dit qu\'il y avait quatre candidats au total."',
            question: 'Combien de personnes ont postulé pour la promotion?',
            options: ['A) Deux', 'B) Trois', 'C) Quatre', 'D) Cinq'],
            correctAnswer: 2,
            explanation: 'Bernard dit "quatre candidats au total".'
          },
          {
            id: 13,
            audioDescription: '[Audio: Réunion d\'équipe]',
            audioText: 'Manager: "Pour le projet avec le client japonais, je propose d\'envoyer Sophie et Marc à Tokyo." Sophie: "Quand est-ce prévu?" Manager: "Dans trois semaines, du 5 au 12 mars. Vous aurez des réunions tous les jours." Marc: "On aura besoin d\'un interprète?" Manager: "Non, le client parle couramment anglais."',
            question: 'Combien de temps durera le voyage?',
            options: ['A) 5 jours', 'B) Une semaine', 'C) 10 jours', 'D) Deux semaines'],
            correctAnswer: 1,
            explanation: 'Du 5 au 12 mars représente une semaine (7 jours).'
          },
          {
            id: 14,
            audioDescription: '[Audio: Bureau des ressources humaines]',
            audioText: 'RH: "Votre période d\'essai de trois mois se termine vendredi. Je suis heureux de vous confirmer que nous souhaitons vous garder en CDI." Employé: "C\'est une excellente nouvelle! Merci beaucoup." RH: "Vous recevrez votre nouveau contrat par email demain."',
            question: 'Quel type de contrat est proposé?',
            options: ['A) CDD', 'B) CDI', 'C) Stage', 'D) Intérim'],
            correctAnswer: 1,
            explanation: 'Le RH propose "un CDI".'
          },
          {
            id: 15,
            audioDescription: '[Audio: Pause café]',
            audioText: 'Collègue 1: "Tu as vu les nouveaux bureaux au cinquième étage? Ils sont magnifiques!" Collègue 2: "Oui! Avec la vue sur la ville et les espaces de détente. On déménage quand?" Collègue 1: "Le mois prochain. Toute l\'équipe commerciale y sera installée."',
            question: 'Quelle équipe va déménager au cinquième étage?',
            options: ['A) L\'équipe technique', 'B) L\'équipe marketing', 'C) L\'équipe commerciale', 'D) L\'équipe RH'],
            correctAnswer: 2,
            explanation: '"Toute l\'équipe commerciale y sera installée".'
          }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        description: 'Écoutez les présentations longues et répondez',
        questions: [
          {
            id: 16,
            audioDescription: '[Audio: Conférence sur le management]',
            audioText: 'Les études récentes montrent que 65% des employés qui démissionnent ne quittent pas leur entreprise, mais leur manager. Un bon leadership est essentiel pour retenir les talents. Les managers doivent développer leur intelligence émotionnelle, communiquer clairement et reconnaître le travail de leurs équipes.',
            question: 'Quel pourcentage d\'employés quitte à cause de leur manager?',
            options: ['A) 55%', 'B) 60%', 'C) 65%', 'D) 70%'],
            correctAnswer: 2,
            explanation: '"65% des employés qui démissionnent" quittent à cause du manager.'
          },
          {
            id: 17,
            audioDescription: '[Audio: Webinaire formation]',
            audioText: 'Pour réussir un entretien d\'embauche, préparez-vous à trois types de questions: les questions sur votre parcours, les questions comportementales avec des exemples concrets, et les questions sur vos motivations. N\'oubliez pas de préparer aussi des questions à poser au recruteur.',
            question: 'Combien de types de questions faut-il préparer?',
            options: ['A) Deux', 'B) Trois', 'C) Quatre', 'D) Cinq'],
            correctAnswer: 1,
            explanation: 'L\'orateur mentionne "trois types de questions".'
          },
          {
            id: 18,
            audioDescription: '[Audio: Podcast économique]',
            audioText: 'Le marché de l\'emploi dans le numérique continue sa croissance. D\'ici 2025, on estime qu\'il manquera 80 000 développeurs en France. Les métiers les plus recherchés sont développeur full-stack, data scientist et expert en cybersécurité. Les salaires dans ce secteur sont en moyenne 30% supérieurs à la moyenne nationale.',
            question: 'Combien de développeurs manqueront d\'ici 2025?',
            options: ['A) 50 000', 'B) 60 000', 'C) 70 000', 'D) 80 000'],
            correctAnswer: 3,
            explanation: 'On estime qu\'il "manquera 80 000 développeurs".'
          },
          {
            id: 19,
            audioDescription: '[Audio: Suite du podcast]',
            audioText: '[Continuation du podcast précédent]',
            question: 'De combien les salaires du numérique dépassent-ils la moyenne?',
            options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'],
            correctAnswer: 2,
            explanation: 'Les salaires sont "30% supérieurs à la moyenne nationale".'
          },
          {
            id: 20,
            audioDescription: '[Audio: Discours de motivation]',
            audioText: 'Pour conclure, rappelez-vous que chaque échec est une opportunité d\'apprentissage. Les personnes les plus réussies ont souvent échoué de nombreuses fois avant de réussir. Steve Jobs a été licencié de sa propre entreprise avant de revenir la transformer. Persévérez, adaptez-vous, et le succès viendra.',
            question: 'Que dit l\'orateur sur l\'échec?',
            options: ['A) Il faut l\'éviter à tout prix', 'B) C\'est une opportunité d\'apprentissage', 'C) C\'est la fin de tout', 'D) Il n\'en parle pas'],
            correctAnswer: 1,
            explanation: '"Chaque échec est une opportunité d\'apprentissage".'
          }
        ]
      }
    ]
  },

  // ==================== EXAM 3 ====================
  {
    id: 'co-exam-3',
    examNumber: 3,
    title: 'Compréhension Orale - Examen 3',
    theme: 'Health & Medical',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Identifiez la situation, le lieu ou les personnes',
        questions: [
          {
            id: 1,
            audioDescription: '[Audio: Cabinet médical]',
            audioText: 'Médecin: "Qu\'est-ce qui vous amène aujourd\'hui?" Patient: "J\'ai des maux de tête depuis une semaine et je dors très mal." Médecin: "Vous travaillez beaucoup en ce moment?" Patient: "Oui, énormément. Je suis très stressé au bureau."',
            question: 'Depuis combien de temps le patient a-t-il mal à la tête?',
            options: ['A) Trois jours', 'B) Cinq jours', 'C) Une semaine', 'D) Deux semaines'],
            correctAnswer: 2,
            explanation: 'Le patient dit "depuis une semaine".'
          },
          {
            id: 2,
            audioDescription: '[Audio: Pharmacie]',
            audioText: 'Pharmacien: "Bonjour, vous avez une ordonnance?" Client: "Non, je voudrais quelque chose contre les allergies. J\'ai le nez qui coule et les yeux qui piquent." Pharmacien: "Je vous conseille cet antihistaminique. C\'est 8,50 euros, et prenez-en un par jour le matin."',
            question: 'Quel est le problème du client?',
            options: ['A) Un rhume', 'B) Des allergies', 'C) Une grippe', 'D) Une infection'],
            correctAnswer: 1,
            explanation: 'Le client demande "quelque chose contre les allergies".'
          },
          {
            id: 3,
            audioDescription: '[Audio: Salle d\'attente d\'hôpital]',
            audioText: 'Infirmière: "Madame Dubois? Le médecin va vous recevoir maintenant." Patiente: "Merci. C\'est pour les résultats de mes analyses, n\'est-ce pas?" Infirmière: "Oui, exactement. Suivez-moi, c\'est au bout du couloir, bureau 12."',
            question: 'Pourquoi la patiente est-elle là?',
            options: ['A) Pour une urgence', 'B) Pour des résultats d\'analyses', 'C) Pour un vaccin', 'D) Pour un certificat médical'],
            correctAnswer: 1,
            explanation: 'C\'est "pour les résultats de mes analyses".'
          },
          {
            id: 4,
            audioDescription: '[Audio: Appel d\'urgence]',
            audioText: 'Opérateur: "Urgences, je vous écoute." Appelant: "Vite! Mon père est tombé dans l\'escalier. Il a 75 ans et il ne peut plus bouger sa jambe." Opérateur: "Restez calme. Quelle est votre adresse? L\'ambulance arrive dans 10 minutes."',
            question: 'Que s\'est-il passé?',
            options: ['A) Un accident de voiture', 'B) Une chute dans l\'escalier', 'C) Un malaise cardiaque', 'D) Une brûlure'],
            correctAnswer: 1,
            explanation: 'Le père "est tombé dans l\'escalier".'
          },
          {
            id: 5,
            audioDescription: '[Audio: Centre de radiologie]',
            audioText: 'Technicien: "Veuillez retirer tous vos bijoux et objets métalliques." Patient: "D\'accord. L\'examen dure combien de temps?" Technicien: "Environ 20 minutes. Vous devez rester immobile pendant toute la durée de l\'IRM."',
            question: 'Quel examen le patient va-t-il passer?',
            options: ['A) Une radiographie', 'B) Une échographie', 'C) Une IRM', 'D) Un scanner'],
            correctAnswer: 2,
            explanation: 'Le technicien mentionne "l\'IRM".'
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        description: 'Écoutez les annonces et répondez aux questions',
        questions: [
          {
            id: 6,
            audioDescription: '[Audio: Campagne de santé publique]',
            audioText: 'La vaccination contre la grippe saisonnière est recommandée pour les personnes de plus de 65 ans, les femmes enceintes et les personnes souffrant de maladies chroniques. Le vaccin est gratuit pour ces populations. Parlez-en à votre médecin ou pharmacien.',
            question: 'À partir de quel âge la vaccination est-elle recommandée?',
            options: ['A) 55 ans', 'B) 60 ans', 'C) 65 ans', 'D) 70 ans'],
            correctAnswer: 2,
            explanation: 'La vaccination est recommandée "pour les personnes de plus de 65 ans".'
          },
          {
            id: 7,
            audioDescription: '[Audio: Bulletin de santé]',
            audioText: 'Le ministère de la Santé alerte sur une épidémie de gastro-entérite. Le nombre de cas a augmenté de 40% cette semaine. Les recommandations sont de se laver les mains régulièrement et d\'éviter les contacts rapprochés avec les personnes malades.',
            question: 'De combien le nombre de cas a-t-il augmenté?',
            options: ['A) 20%', 'B) 30%', 'C) 40%', 'D) 50%'],
            correctAnswer: 2,
            explanation: 'Le nombre de cas "a augmenté de 40%".'
          },
          {
            id: 8,
            audioDescription: '[Audio: Publicité santé]',
            audioText: 'Fatigué? Stressé? Découvrez notre cure de vitamines NaturBoost. Une formule complète avec 12 vitamines et 8 minéraux essentiels. Seulement 15 euros la boîte de 30 comprimés. Disponible en pharmacie sans ordonnance.',
            question: 'Combien de vitamines contient le produit?',
            options: ['A) 8', 'B) 10', 'C) 12', 'D) 15'],
            correctAnswer: 2,
            explanation: 'La formule contient "12 vitamines".'
          },
          {
            id: 9,
            audioDescription: '[Audio: Information hôpital]',
            audioText: 'L\'hôpital Saint-Antoine informe que le service des urgences sera exceptionnellement fermé ce weekend pour travaux. Les patients sont invités à se rendre à l\'hôpital Pitié-Salpêtrière situé à 3 kilomètres. Nous nous excusons pour la gêne occasionnée.',
            question: 'Pourquoi les urgences sont-elles fermées?',
            options: ['A) Pour une grève', 'B) Pour des travaux', 'C) Pour un manque de personnel', 'D) Pour une formation'],
            correctAnswer: 1,
            explanation: 'La fermeture est "pour travaux".'
          },
          {
            id: 10,
            audioDescription: '[Audio: Conseil bien-être]',
            audioText: 'Pour maintenir une bonne santé, l\'OMS recommande au moins 150 minutes d\'activité physique modérée par semaine, soit 30 minutes par jour, cinq jours par semaine. La marche rapide, le vélo ou la natation sont d\'excellentes options.',
            question: 'Combien de minutes d\'exercice par semaine sont recommandées?',
            options: ['A) 100 minutes', 'B) 120 minutes', 'C) 150 minutes', 'D) 180 minutes'],
            correctAnswer: 2,
            explanation: 'L\'OMS recommande "au moins 150 minutes".'
          }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        description: 'Écoutez les dialogues et répondez aux questions',
        questions: [
          {
            id: 11,
            audioDescription: '[Audio: Consultation médicale]',
            audioText: 'Médecin: "Vos analyses sanguines sont bonnes. Votre cholestérol a baissé depuis la dernière fois." Patient: "C\'est grâce au régime que vous m\'avez conseillé?" Médecin: "Oui, mais continuez. Je veux vous revoir dans trois mois pour un contrôle."',
            question: 'Quand le prochain rendez-vous est-il prévu?',
            options: ['A) Dans un mois', 'B) Dans deux mois', 'C) Dans trois mois', 'D) Dans six mois'],
            correctAnswer: 2,
            explanation: 'Le médecin veut revoir le patient "dans trois mois".'
          },
          {
            id: 12,
            audioDescription: '[Audio: Discussion entre amis]',
            audioText: 'Ami 1: "J\'ai commencé le yoga il y a deux mois. Ça m\'aide vraiment à gérer mon stress." Ami 2: "Ah oui? Tu le fais où?" Ami 1: "Dans un studio près de chez moi. Les cours sont à 20 euros la séance ou 80 euros par mois en illimité."',
            question: 'Quel est le tarif de l\'abonnement mensuel?',
            options: ['A) 60 euros', 'B) 70 euros', 'C) 80 euros', 'D) 90 euros'],
            correctAnswer: 2,
            explanation: 'L\'abonnement est "80 euros par mois en illimité".'
          },
          {
            id: 13,
            audioDescription: '[Audio: Dentiste]',
            audioText: 'Dentiste: "Vous avez une petite carie sur cette molaire. Il faut la soigner maintenant avant qu\'elle ne s\'aggrave." Patient: "C\'est douloureux?" Dentiste: "Non, avec l\'anesthésie locale vous ne sentirez rien. L\'intervention dure environ 30 minutes."',
            question: 'Combien de temps dure l\'intervention?',
            options: ['A) 15 minutes', 'B) 20 minutes', 'C) 30 minutes', 'D) 45 minutes'],
            correctAnswer: 2,
            explanation: 'L\'intervention "dure environ 30 minutes".'
          },
          {
            id: 14,
            audioDescription: '[Audio: Kinésithérapeute]',
            audioText: 'Kiné: "Après votre opération du genou, vous aurez besoin de 12 séances de rééducation." Patient: "À quelle fréquence?" Kiné: "Trois fois par semaine pendant les quatre premières semaines, puis on espacera."',
            question: 'Combien de séances de rééducation sont prescrites?',
            options: ['A) 8', 'B) 10', 'C) 12', 'D) 15'],
            correctAnswer: 2,
            explanation: 'Le patient aura "12 séances de rééducation".'
          },
          {
            id: 15,
            audioDescription: '[Audio: Assurance maladie]',
            audioText: 'Agent: "Votre mutuelle rembourse 80% des frais dentaires." Client: "Et pour les lunettes?" Agent: "Pour l\'optique, c\'est 60% avec un plafond de 200 euros par an. Votre forfait est de 45 euros par mois."',
            question: 'Quel est le plafond annuel pour l\'optique?',
            options: ['A) 150 euros', 'B) 200 euros', 'C) 250 euros', 'D) 300 euros'],
            correctAnswer: 1,
            explanation: 'Le plafond est "200 euros par an".'
          }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        description: 'Écoutez les présentations longues et répondez',
        questions: [
          {
            id: 16,
            audioDescription: '[Audio: Conférence médicale]',
            audioText: 'Le sommeil est essentiel pour la santé. Les adultes ont besoin de 7 à 9 heures de sommeil par nuit. Le manque de sommeil augmente les risques de maladies cardiovasculaires de 48%, d\'obésité et de dépression. Pour bien dormir, évitez les écrans une heure avant le coucher et maintenez une température de chambre autour de 18 degrés.',
            question: 'De combien le manque de sommeil augmente-t-il le risque cardiovasculaire?',
            options: ['A) 28%', 'B) 38%', 'C) 48%', 'D) 58%'],
            correctAnswer: 2,
            explanation: 'Le risque augmente "de 48%".'
          },
          {
            id: 17,
            audioDescription: '[Audio: Suite de la conférence]',
            audioText: '[Continuation du discours précédent]',
            question: 'Quelle température de chambre est recommandée?',
            options: ['A) 16 degrés', 'B) 17 degrés', 'C) 18 degrés', 'D) 20 degrés'],
            correctAnswer: 2,
            explanation: 'La température recommandée est "autour de 18 degrés".'
          },
          {
            id: 18,
            audioDescription: '[Audio: Documentaire santé]',
            audioText: 'La méditation de pleine conscience gagne en popularité. Des études scientifiques ont prouvé ses bienfaits: réduction du stress de 35%, amélioration de la concentration et diminution de la tension artérielle. Seulement 10 minutes par jour suffisent pour observer des résultats après 8 semaines de pratique régulière.',
            question: 'De combien la méditation réduit-elle le stress?',
            options: ['A) 25%', 'B) 30%', 'C) 35%', 'D) 40%'],
            correctAnswer: 2,
            explanation: 'La méditation permet une "réduction du stress de 35%".'
          },
          {
            id: 19,
            audioDescription: '[Audio: Suite du documentaire]',
            audioText: '[Continuation du documentaire]',
            question: 'Après combien de semaines peut-on observer des résultats?',
            options: ['A) 4 semaines', 'B) 6 semaines', 'C) 8 semaines', 'D) 10 semaines'],
            correctAnswer: 2,
            explanation: 'Les résultats apparaissent "après 8 semaines de pratique".'
          },
          {
            id: 20,
            audioDescription: '[Audio: Émission nutrition]',
            audioText: 'Pour une alimentation équilibrée, les experts recommandent de consommer 5 portions de fruits et légumes par jour, de limiter la viande rouge à 2 fois par semaine et de privilégier les protéines végétales. Boire 1,5 litre d\'eau par jour est également essentiel pour rester hydraté.',
            question: 'Combien de fois par semaine peut-on manger de la viande rouge?',
            options: ['A) 1 fois', 'B) 2 fois', 'C) 3 fois', 'D) 4 fois'],
            correctAnswer: 1,
            explanation: 'Il faut "limiter la viande rouge à 2 fois par semaine".'
          }
        ]
      }
    ]
  },

  // ==================== EXAM 4 ====================
  {
    id: 'co-exam-4',
    examNumber: 4,
    title: 'Compréhension Orale - Examen 4',
    theme: 'Travel & Tourism',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Identifiez la situation, le lieu ou les personnes',
        questions: [
          {
            id: 1,
            audioDescription: '[Audio: Aéroport, annonces en fond]',
            audioText: 'Agent: "Votre passeport et votre carte d\'embarquement, s\'il vous plaît." Passager: "Les voici." Agent: "Avez-vous des bagages à enregistrer?" Passager: "Juste cette valise de 18 kilos." Agent: "Parfait, c\'est dans la limite. Porte 24, l\'embarquement commence à 14h30."',
            question: 'Combien pèse la valise du passager?',
            options: ['A) 15 kilos', 'B) 18 kilos', 'C) 20 kilos', 'D) 23 kilos'],
            correctAnswer: 1,
            explanation: 'Le passager a "une valise de 18 kilos".'
          },
          {
            id: 2,
            audioDescription: '[Audio: Réception d\'hôtel]',
            audioText: 'Réceptionniste: "Bienvenue à l\'Hôtel Bellevue. Vous avez une réservation?" Client: "Oui, au nom de Garcia, pour trois nuits." Réceptionniste: "Parfait, chambre 405 avec vue sur la mer. Le petit-déjeuner est servi de 7h à 10h au restaurant."',
            question: 'Combien de nuits le client va-t-il rester?',
            options: ['A) Une nuit', 'B) Deux nuits', 'C) Trois nuits', 'D) Quatre nuits'],
            correctAnswer: 2,
            explanation: 'La réservation est "pour trois nuits".'
          },
          {
            id: 3,
            audioDescription: '[Audio: Office de tourisme]',
            audioText: 'Touriste: "Bonjour, quels sont les monuments à visiter dans la ville?" Agent: "Je vous recommande la cathédrale, le musée d\'art moderne et le château. Voici un plan gratuit avec tous les sites." Touriste: "Et il y a des visites guidées?" Agent: "Oui, tous les jours à 10h et 15h, pour 12 euros par personne."',
            question: 'Combien coûte la visite guidée?',
            options: ['A) 8 euros', 'B) 10 euros', 'C) 12 euros', 'D) 15 euros'],
            correctAnswer: 2,
            explanation: 'La visite coûte "12 euros par personne".'
          },
          {
            id: 4,
            audioDescription: '[Audio: Gare routière]',
            audioText: 'Guichetier: "Le prochain bus pour Nice part à 16h45." Voyageur: "C\'est combien le billet?" Guichetier: "25 euros l\'aller simple, 40 euros l\'aller-retour." Voyageur: "Je prends un aller-retour. Le trajet dure combien de temps?" Guichetier: "Environ 3 heures."',
            question: 'Combien de temps dure le trajet?',
            options: ['A) 2 heures', 'B) 2h30', 'C) 3 heures', 'D) 3h30'],
            correctAnswer: 2,
            explanation: 'Le trajet dure "environ 3 heures".'
          },
          {
            id: 5,
            audioDescription: '[Audio: Location de voiture]',
            audioText: 'Agent: "Pour une semaine, le tarif est de 280 euros assurance comprise." Client: "Le kilométrage est illimité?" Agent: "Oui, et le plein d\'essence est inclus. Vous devez juste rendre la voiture avec le plein."',
            question: 'Quel est le tarif pour une semaine?',
            options: ['A) 200 euros', 'B) 250 euros', 'C) 280 euros', 'D) 300 euros'],
            correctAnswer: 2,
            explanation: 'Le tarif est "280 euros assurance comprise".'
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        description: 'Écoutez les annonces et répondez aux questions',
        questions: [
          {
            id: 6,
            audioDescription: '[Audio: Annonce aéroport]',
            audioText: 'Mesdames et messieurs, le vol AF 7342 à destination de Madrid est retardé de 45 minutes en raison des conditions météorologiques. Nouveau départ prévu à 18h15. Les passagers sont priés de rester dans la zone d\'embarquement. Des rafraîchissements seront offerts.',
            question: 'De combien de temps le vol est-il retardé?',
            options: ['A) 30 minutes', 'B) 45 minutes', 'C) 1 heure', 'D) 1h30'],
            correctAnswer: 1,
            explanation: 'Le vol est "retardé de 45 minutes".'
          },
          {
            id: 7,
            audioDescription: '[Audio: Publicité agence de voyage]',
            audioText: 'Partez au soleil cet hiver! Séjour tout compris à Marrakech: vol direct, hôtel 4 étoiles et demi-pension pour seulement 599 euros par personne. Offre valable pour les départs en janvier et février. Réservez maintenant sur voyagesdiscount.fr!',
            question: 'Quel type de pension est inclus?',
            options: ['A) Pension complète', 'B) Demi-pension', 'C) Petit-déjeuner uniquement', 'D) Aucune pension'],
            correctAnswer: 1,
            explanation: 'L\'offre inclut "demi-pension".'
          },
          {
            id: 8,
            audioDescription: '[Audio: Information croisière]',
            audioText: 'Bienvenue à bord du Costa Magnifica! Le dîner est servi au restaurant principal de 19h à 21h30. Le spectacle de ce soir commence à 22h dans la grande salle. Demain, escale à Barcelone à partir de 8h. Retour à bord avant 18h obligatoire.',
            question: 'À quelle heure faut-il être de retour sur le bateau?',
            options: ['A) 16h', 'B) 17h', 'C) 18h', 'D) 19h'],
            correctAnswer: 2,
            explanation: '"Retour à bord avant 18h obligatoire".'
          },
          {
            id: 9,
            audioDescription: '[Audio: Info trafic vacances]',
            audioText: 'Journée rouge sur les routes ce samedi! Bouchons prévus sur l\'autoroute A7 en direction du sud. Les temps de parcours pourraient être doublés. Bison Futé recommande de partir avant 7h ou après 17h pour éviter les embouteillages.',
            question: 'Quel conseil donne Bison Futé?',
            options: ['A) Prendre le train', 'B) Reporter le voyage', 'C) Partir avant 7h ou après 17h', 'D) Éviter l\'autoroute'],
            correctAnswer: 2,
            explanation: 'Bison Futé recommande de "partir avant 7h ou après 17h".'
          },
          {
            id: 10,
            audioDescription: '[Audio: Excursion touristique]',
            audioText: 'Découvrez les châteaux de la Loire en une journée! Départ de Paris à 7h30, visite de Chambord et Chenonceau, déjeuner dans un restaurant typique. Retour vers 20h. Tarif: 89 euros adulte, 45 euros enfant de moins de 12 ans.',
            question: 'Quel est le tarif pour un enfant?',
            options: ['A) 35 euros', 'B) 45 euros', 'C) 55 euros', 'D) 65 euros'],
            correctAnswer: 1,
            explanation: 'Le tarif enfant est "45 euros".'
          }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        description: 'Écoutez les dialogues et répondez aux questions',
        questions: [
          {
            id: 11,
            audioDescription: '[Audio: Planification voyage]',
            audioText: 'Marie: "J\'hésite entre l\'Italie et le Portugal pour nos vacances." Paul: "L\'Italie est plus chère en été. Le Portugal est magnifique et plus abordable." Marie: "Tu as raison. On pourrait louer une voiture et visiter Lisbonne, Porto et l\'Algarve." Paul: "Parfait! Pour 10 jours, ça devrait suffire."',
            question: 'Combien de jours prévoient-ils pour leur voyage?',
            options: ['A) Une semaine', 'B) 10 jours', 'C) Deux semaines', 'D) Trois semaines'],
            correctAnswer: 1,
            explanation: 'Ils prévoient "10 jours".'
          },
          {
            id: 12,
            audioDescription: '[Audio: Réclamation hôtel]',
            audioText: 'Client: "J\'ai réservé une chambre avec vue sur mer mais j\'ai vue sur le parking!" Réceptionniste: "Je suis vraiment désolé. Je n\'ai plus de chambre vue mer disponible. Je peux vous offrir un surclassement en suite junior en compensation." Client: "D\'accord, ça me convient."',
            question: 'Quelle compensation est proposée?',
            options: ['A) Un remboursement', 'B) Une réduction', 'C) Un surclassement', 'D) Un repas gratuit'],
            correctAnswer: 2,
            explanation: 'On propose "un surclassement en suite junior".'
          },
          {
            id: 13,
            audioDescription: '[Audio: Guide touristique]',
            audioText: 'Guide: "Ce monument a été construit en 1889 pour l\'Exposition universelle. Il mesure 324 mètres de haut. À l\'époque, beaucoup de Parisiens l\'ont critiqué, mais aujourd\'hui c\'est le symbole de Paris." Touriste: "On peut monter au sommet?" Guide: "Oui, par les escaliers ou l\'ascenseur. Comptez 1665 marches!"',
            question: 'Combien de marches y a-t-il?',
            options: ['A) 1465 marches', 'B) 1565 marches', 'C) 1665 marches', 'D) 1765 marches'],
            correctAnswer: 2,
            explanation: 'Il y a "1665 marches".'
          },
          {
            id: 14,
            audioDescription: '[Audio: Camping]',
            audioText: 'Gérant: "L\'emplacement pour une tente est à 18 euros par nuit. Nous avons aussi des mobile-homes à 65 euros." Campeur: "Les sanitaires sont propres?" Gérant: "Bien sûr, ils sont nettoyés trois fois par jour. Il y a aussi une piscine et un restaurant."',
            question: 'Combien coûte un emplacement tente?',
            options: ['A) 15 euros', 'B) 18 euros', 'C) 20 euros', 'D) 25 euros'],
            correctAnswer: 1,
            explanation: 'L\'emplacement coûte "18 euros par nuit".'
          },
          {
            id: 15,
            audioDescription: '[Audio: Douane]',
            audioText: 'Douanier: "Vous avez quelque chose à déclarer?" Voyageur: "J\'ai acheté des souvenirs, deux bouteilles de vin et du parfum." Douanier: "Combien de parfum?" Voyageur: "150 millilitres au total." Douanier: "C\'est dans la limite autorisée. Vous pouvez passer."',
            question: 'Combien de parfum le voyageur a-t-il?',
            options: ['A) 100 ml', 'B) 150 ml', 'C) 200 ml', 'D) 250 ml'],
            correctAnswer: 1,
            explanation: 'Le voyageur a "150 millilitres".'
          }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        description: 'Écoutez les présentations longues et répondez',
        questions: [
          {
            id: 16,
            audioDescription: '[Audio: Documentaire tourisme]',
            audioText: 'Le tourisme durable est devenu une priorité. En France, 78% des voyageurs disent vouloir réduire leur impact environnemental. Les options se multiplient: écolodges, trains de nuit, vélo-tourisme. Le secteur du tourisme représente 8% des émissions mondiales de CO2, dont 40% liées aux transports aériens.',
            question: 'Quel pourcentage des émissions du tourisme vient de l\'avion?',
            options: ['A) 30%', 'B) 40%', 'C) 50%', 'D) 60%'],
            correctAnswer: 1,
            explanation: '"40% liées aux transports aériens".'
          },
          {
            id: 17,
            audioDescription: '[Audio: Suite du documentaire]',
            audioText: '[Continuation]',
            question: 'Quel pourcentage de Français veut voyager de façon responsable?',
            options: ['A) 68%', 'B) 73%', 'C) 78%', 'D) 83%'],
            correctAnswer: 2,
            explanation: '"78% des voyageurs" veulent réduire leur impact.'
          },
          {
            id: 18,
            audioDescription: '[Audio: Guide audio château]',
            audioText: 'Le château de Versailles a été la résidence des rois de France pendant plus d\'un siècle, de Louis XIV à Louis XVI. Le domaine s\'étend sur 800 hectares avec ses jardins à la française dessinés par Le Nôtre. Aujourd\'hui, il accueille près de 8 millions de visiteurs par an, ce qui en fait le château le plus visité de France.',
            question: 'Combien de visiteurs viennent chaque année?',
            options: ['A) 5 millions', 'B) 6 millions', 'C) 7 millions', 'D) 8 millions'],
            correctAnswer: 3,
            explanation: '"près de 8 millions de visiteurs par an".'
          },
          {
            id: 19,
            audioDescription: '[Audio: Suite du guide]',
            audioText: '[Continuation]',
            question: 'Quelle est la superficie du domaine?',
            options: ['A) 500 hectares', 'B) 600 hectares', 'C) 700 hectares', 'D) 800 hectares'],
            correctAnswer: 3,
            explanation: '"Le domaine s\'étend sur 800 hectares".'
          },
          {
            id: 20,
            audioDescription: '[Audio: Reportage plage]',
            audioText: 'La Côte d\'Azur attire chaque été des millions de touristes du monde entier. Avec 300 jours de soleil par an et 115 kilomètres de côte, c\'est une destination de rêve. Mais le tourisme de masse pose des défis: pollution, sur-fréquentation et hausse des prix de l\'immobilier pour les locaux.',
            question: 'Combien de jours de soleil y a-t-il par an?',
            options: ['A) 250 jours', 'B) 280 jours', 'C) 300 jours', 'D) 320 jours'],
            correctAnswer: 2,
            explanation: 'Il y a "300 jours de soleil par an".'
          }
        ]
      }
    ]
  },

  // ==================== EXAM 5 ====================
  {
    id: 'co-exam-5',
    examNumber: 5,
    title: 'Compréhension Orale - Examen 5',
    theme: 'Education & Learning',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        description: 'Identifiez la situation, le lieu ou les personnes',
        questions: [
          {
            id: 1,
            audioDescription: '[Audio: Secrétariat université]',
            audioText: 'Secrétaire: "Bonjour, je peux vous aider?" Étudiant: "Oui, je voudrais m\'inscrire en licence de droit." Secrétaire: "Avez-vous votre baccalauréat?" Étudiant: "Oui, je l\'ai eu cette année avec mention bien." Secrétaire: "Parfait, les frais d\'inscription sont de 170 euros."',
            question: 'Quelle mention a obtenu l\'étudiant?',
            options: ['A) Passable', 'B) Assez bien', 'C) Bien', 'D) Très bien'],
            correctAnswer: 2,
            explanation: 'L\'étudiant a eu son bac "avec mention bien".'
          },
          {
            id: 2,
            audioDescription: '[Audio: Salle de classe]',
            audioText: 'Professeur: "L\'examen final aura lieu le 15 juin à 9h. Il durera trois heures et portera sur les chapitres 5 à 10." Étudiant: "On peut utiliser nos notes?" Professeur: "Non, c\'est un examen sans documents. N\'oubliez pas votre carte d\'étudiant."',
            question: 'Combien de temps dure l\'examen?',
            options: ['A) Une heure', 'B) Deux heures', 'C) Trois heures', 'D) Quatre heures'],
            correctAnswer: 2,
            explanation: 'L\'examen "durera trois heures".'
          },
          {
            id: 3,
            audioDescription: '[Audio: Bibliothèque]',
            audioText: 'Bibliothécaire: "Cette carte vous permet d\'emprunter jusqu\'à 6 livres pour une durée de 21 jours." Étudiant: "Et si je les rends en retard?" Bibliothécaire: "Il y a une pénalité de 50 centimes par jour et par livre."',
            question: 'Combien de livres peut-on emprunter?',
            options: ['A) 4 livres', 'B) 5 livres', 'C) 6 livres', 'D) 7 livres'],
            correctAnswer: 2,
            explanation: 'On peut emprunter "jusqu\'à 6 livres".'
          },
          {
            id: 4,
            audioDescription: '[Audio: Cours de langue]',
            audioText: 'Prof: "Pour le prochain cours, lisez les pages 45 à 60 et préparez les exercices." Élève: "On doit aussi faire la rédaction?" Prof: "Non, la rédaction c\'est pour la semaine d\'après. Concentrez-vous sur les exercices de grammaire."',
            question: 'Quelles pages faut-il lire?',
            options: ['A) 35 à 50', 'B) 40 à 55', 'C) 45 à 60', 'D) 50 à 65'],
            correctAnswer: 2,
            explanation: 'Il faut lire "les pages 45 à 60".'
          },
          {
            id: 5,
            audioDescription: '[Audio: Conseiller d\'orientation]',
            audioText: 'Conseiller: "Avec votre profil scientifique, je vous recommande les classes préparatoires ou une école d\'ingénieurs." Élève: "Et si je veux faire médecine?" Conseiller: "C\'est possible, mais la première année est très sélective. Seulement 20% des étudiants passent en deuxième année."',
            question: 'Quel pourcentage réussit la première année de médecine?',
            options: ['A) 15%', 'B) 20%', 'C) 25%', 'D) 30%'],
            correctAnswer: 1,
            explanation: '"Seulement 20% des étudiants passent".'
          }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        description: 'Écoutez les annonces et répondez aux questions',
        questions: [
          {
            id: 6,
            audioDescription: '[Audio: Publicité école de langues]',
            audioText: 'Apprenez l\'anglais, l\'espagnol ou l\'allemand avec Langue Plus! Cours du soir et du weekend, petits groupes de 8 élèves maximum. Premier cours d\'essai gratuit! Tarifs à partir de 150 euros par mois. Appelez le 01 42 00 00 00 ou visitez notre site langueplus.fr.',
            question: 'Combien d\'élèves maximum par groupe?',
            options: ['A) 6', 'B) 8', 'C) 10', 'D) 12'],
            correctAnswer: 1,
            explanation: 'Les groupes sont de "8 élèves maximum".'
          },
          {
            id: 7,
            audioDescription: '[Audio: Info éducation nationale]',
            audioText: 'Le ministère de l\'Éducation annonce la création de 5000 nouveaux postes d\'enseignants pour la rentrée prochaine. Ces recrutements concerneront principalement les mathématiques, le français et les langues vivantes. Les concours auront lieu en mars.',
            question: 'Combien de postes seront créés?',
            options: ['A) 3000', 'B) 4000', 'C) 5000', 'D) 6000'],
            correctAnswer: 2,
            explanation: 'Il y aura "5000 nouveaux postes".'
          },
          {
            id: 8,
            audioDescription: '[Audio: Annonce université]',
            audioText: 'La bibliothèque universitaire sera fermée exceptionnellement ce jeudi pour inventaire. Elle rouvrira vendredi avec des horaires élargis: de 8h à 22h au lieu de 20h. La salle informatique reste accessible.',
            question: 'Jusqu\'à quelle heure la bibliothèque sera-t-elle ouverte vendredi?',
            options: ['A) 20h', 'B) 21h', 'C) 22h', 'D) 23h'],
            correctAnswer: 2,
            explanation: 'La bibliothèque sera ouverte "de 8h à 22h".'
          },
          {
            id: 9,
            audioDescription: '[Audio: Bourse d\'études]',
            audioText: 'Attention étudiants! Les dossiers de bourse sur critères sociaux doivent être déposés avant le 15 mai. Le montant de la bourse peut atteindre 5500 euros par an selon votre situation. Ne manquez pas cette date limite!',
            question: 'Quel est le montant maximum de la bourse?',
            options: ['A) 4500 euros', 'B) 5000 euros', 'C) 5500 euros', 'D) 6000 euros'],
            correctAnswer: 2,
            explanation: 'La bourse peut atteindre "5500 euros par an".'
          },
          {
            id: 10,
            audioDescription: '[Audio: Formation en ligne]',
            audioText: 'Découvrez nos cours en ligne certifiants! Plus de 200 formations disponibles dans les domaines du marketing, de l\'informatique et du management. Étudiez à votre rythme, de chez vous. Certification reconnue par l\'État. Financement CPF possible.',
            question: 'Combien de formations sont disponibles?',
            options: ['A) 100', 'B) 150', 'C) Plus de 200', 'D) 300'],
            correctAnswer: 2,
            explanation: 'Il y a "Plus de 200 formations disponibles".'
          }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        description: 'Écoutez les dialogues et répondez aux questions',
        questions: [
          {
            id: 11,
            audioDescription: '[Audio: Entre étudiants]',
            audioText: 'Léa: "Tu as réussi ton partiel de statistiques?" Marco: "Oui, j\'ai eu 14 sur 20. Et toi?" Léa: "Seulement 9... Je dois repasser en rattrapage en juin." Marco: "Ne t\'inquiète pas, je peux t\'aider à réviser."',
            question: 'Quelle note a obtenu Marco?',
            options: ['A) 12/20', 'B) 13/20', 'C) 14/20', 'D) 15/20'],
            correctAnswer: 2,
            explanation: 'Marco "a eu 14 sur 20".'
          },
          {
            id: 12,
            audioDescription: '[Audio: Entretien parents-professeur]',
            audioText: 'Prof: "Votre fils a fait de gros progrès ce trimestre. Sa moyenne est passée de 10 à 13." Parent: "C\'est encourageant! Et son comportement?" Prof: "Il est plus attentif en classe, mais il bavarde encore un peu trop avec ses camarades."',
            question: 'Quelle était la moyenne précédente de l\'élève?',
            options: ['A) 9', 'B) 10', 'C) 11', 'D) 12'],
            correctAnswer: 1,
            explanation: 'Sa moyenne "est passée de 10 à 13".'
          },
          {
            id: 13,
            audioDescription: '[Audio: Choix d\'études]',
            audioText: 'Mère: "Tu as décidé ce que tu veux faire après le bac?" Fille: "Je voudrais faire une école de commerce." Mère: "C\'est trois ou cinq ans d\'études?" Fille: "Cinq ans pour avoir le diplôme de master, mais on peut commencer à travailler après trois ans avec la licence."',
            question: 'Combien d\'années faut-il pour le master?',
            options: ['A) Trois ans', 'B) Quatre ans', 'C) Cinq ans', 'D) Six ans'],
            correctAnswer: 2,
            explanation: '"Cinq ans pour avoir le diplôme de master".'
          },
          {
            id: 14,
            audioDescription: '[Audio: Stage]',
            audioText: 'Tuteur: "Ton stage dure combien de temps?" Stagiaire: "Six mois, de janvier à juin." Tuteur: "Parfait. Tu seras dans notre département marketing. Ta gratification sera de 600 euros par mois." Stagiaire: "Merci, c\'est au-dessus du minimum légal."',
            question: 'Combien le stagiaire sera-t-il payé?',
            options: ['A) 500 euros', 'B) 550 euros', 'C) 600 euros', 'D) 650 euros'],
            correctAnswer: 2,
            explanation: 'La gratification sera "de 600 euros par mois".'
          },
          {
            id: 15,
            audioDescription: '[Audio: Inscription formation]',
            audioText: 'Responsable: "Cette formation dure 400 heures sur 4 mois." Candidat: "C\'est à temps plein?" Responsable: "Oui, du lundi au vendredi, de 9h à 17h. Il y a un examen final et un projet à rendre pour valider le certificat."',
            question: 'Combien d\'heures dure la formation?',
            options: ['A) 300 heures', 'B) 350 heures', 'C) 400 heures', 'D) 450 heures'],
            correctAnswer: 2,
            explanation: 'La formation "dure 400 heures".'
          }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        description: 'Écoutez les présentations longues et répondez',
        questions: [
          {
            id: 16,
            audioDescription: '[Audio: Conférence éducation]',
            audioText: 'L\'éducation numérique transforme l\'apprentissage. Une étude montre que 85% des élèves préfèrent les supports numériques aux manuels papier. Cependant, les experts alertent sur le temps d\'écran: plus de 4 heures par jour affecte la concentration et le sommeil des jeunes.',
            question: 'Quel pourcentage d\'élèves préfère le numérique?',
            options: ['A) 75%', 'B) 80%', 'C) 85%', 'D) 90%'],
            correctAnswer: 2,
            explanation: '"85% des élèves préfèrent les supports numériques".'
          },
          {
            id: 17,
            audioDescription: '[Audio: Suite conférence]',
            audioText: '[Continuation]',
            question: 'Au-delà de combien d\'heures d\'écran y a-t-il un impact négatif?',
            options: ['A) 2 heures', 'B) 3 heures', 'C) 4 heures', 'D) 5 heures'],
            correctAnswer: 2,
            explanation: '"plus de 4 heures par jour affecte la concentration".'
          },
          {
            id: 18,
            audioDescription: '[Audio: Podcast éducatif]',
            audioText: 'L\'apprentissage des langues étrangères est de plus en plus précoce en France. Depuis 2016, l\'anglais est obligatoire dès le CP. Les recherches prouvent que les enfants qui commencent une langue avant 7 ans développent une meilleure prononciation et une oreille plus fine pour les sons.',
            question: 'Depuis quand l\'anglais est-il obligatoire au CP?',
            options: ['A) 2014', 'B) 2015', 'C) 2016', 'D) 2017'],
            correctAnswer: 2,
            explanation: '"Depuis 2016, l\'anglais est obligatoire dès le CP".'
          },
          {
            id: 19,
            audioDescription: '[Audio: Suite podcast]',
            audioText: '[Continuation]',
            question: 'Avant quel âge est-il idéal de commencer une langue?',
            options: ['A) 5 ans', 'B) 6 ans', 'C) 7 ans', 'D) 8 ans'],
            correctAnswer: 2,
            explanation: '"avant 7 ans" pour une meilleure prononciation.'
          },
          {
            id: 20,
            audioDescription: '[Audio: Reportage orientation]',
            audioText: 'En France, 62% des étudiants choisissent l\'université, 20% les écoles spécialisées et 18% les filières courtes comme les BTS et DUT. Le taux de réussite en licence est de 45% en trois ans. Ce chiffre monte à 60% si l\'on compte les étudiants qui réussissent en quatre ans.',
            question: 'Quel est le taux de réussite en licence en trois ans?',
            options: ['A) 40%', 'B) 45%', 'C) 50%', 'D) 55%'],
            correctAnswer: 1,
            explanation: '"Le taux de réussite en licence est de 45% en trois ans".'
          }
        ]
      }
    ]
  }
];

// Export function to get exam by number
export function getListeningExam(examNumber) {
  return LISTENING_EXAMS.find(e => e.examNumber === examNumber);
}

export function getAllListeningExams() {
  return LISTENING_EXAMS;
}
