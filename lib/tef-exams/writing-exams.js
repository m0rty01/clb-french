// TEF Mock Exams - Writing (Expression Écrite) - 20 Exams
// Original content - Copyright free

export const WRITING_EXAMS = [
  // Generate 20 writing exams
  ...Array.from({ length: 20 }, (_, i) => {
    const examNum = i + 1;
    const themes = [
      { theme: 'Correspondence', taskA: 'Email professionnel', taskB: 'Lettre formelle de réclamation' },
      { theme: 'Work', taskA: 'Demande de congé', taskB: 'Lettre de motivation' },
      { theme: 'Housing', taskA: 'Problème de voisinage', taskB: 'Résiliation de bail' },
      { theme: 'Consumer', taskA: 'Réclamation produit', taskB: 'Avis sur un service' },
      { theme: 'Travel', taskA: 'Réservation hôtel', taskB: 'Réclamation compagnie aérienne' },
      { theme: 'Education', taskA: 'Inscription formation', taskB: 'Lettre à l\'université' },
      { theme: 'Health', taskA: 'Rendez-vous médical', taskB: 'Lettre à l\'assurance' },
      { theme: 'Administration', taskA: 'Demande de documents', taskB: 'Recours administratif' },
      { theme: 'Environment', taskA: 'Signalement pollution', taskB: 'Article sur l\'écologie' },
      { theme: 'Technology', taskA: 'Support technique', taskB: 'Avis sur une application' },
      { theme: 'Family', taskA: 'Invitation événement', taskB: 'Message condoléances' },
      { theme: 'Finance', taskA: 'Contestation facture', taskB: 'Demande de prêt' },
      { theme: 'Culture', taskA: 'Réservation spectacle', taskB: 'Critique de film' },
      { theme: 'Sports', taskA: 'Inscription club', taskB: 'Article sur le sport' },
      { theme: 'Media', taskA: 'Droit de réponse', taskB: 'Opinion sur les réseaux sociaux' },
      { theme: 'Immigration', taskA: 'Demande de visa', taskB: 'Lettre de recours' },
      { theme: 'Employment', taskA: 'Démission', taskB: 'Recommandation professionnelle' },
      { theme: 'Services', taskA: 'Résiliation contrat', taskB: 'Réclamation service public' },
      { theme: 'Society', taskA: 'Pétition citoyenne', taskB: 'Article d\'opinion' },
      { theme: 'Canada', taskA: 'Intégration au Québec', taskB: 'Lettre à Immigration Canada' }
    ];
    
    const t = themes[i % themes.length];
    
    return {
      id: `writing-exam-${examNum}`,
      examNumber: examNum,
      title: `Expression Écrite - Examen ${examNum}`,
      theme: t.theme,
      level: examNum <= 10 ? 'B1' : 'B1-B2',
      duration: 60,
      totalTasks: 2,
      sections: [
        {
          id: 'A',
          name: 'Section A - Message Court',
          description: 'Rédigez un message de 60-80 mots',
          tasks: [{
            id: 1,
            type: t.taskA,
            prompt: getWritingPromptA(examNum, t.theme),
            wordLimit: { min: 60, max: 80 },
            sampleAnswer: getSampleAnswerA(examNum, t.theme),
            criteria: ['Clarté du message', 'Vocabulaire approprié', 'Formules de politesse', 'Respect du format']
          }]
        },
        {
          id: 'B',
          name: 'Section B - Texte Argumentatif',
          description: 'Rédigez un texte de 150-180 mots',
          tasks: [{
            id: 2,
            type: t.taskB,
            prompt: getWritingPromptB(examNum, t.theme),
            wordLimit: { min: 150, max: 180 },
            sampleAnswer: getSampleAnswerB(examNum, t.theme),
            criteria: ['Structure claire', 'Arguments pertinents', 'Connecteurs logiques', 'Vocabulaire varié', 'Grammaire correcte']
          }]
        }
      ]
    };
  })
];

// Helper functions for prompts
function getWritingPromptA(num, theme) {
  const prompts = {
    'Correspondence': `Vous devez annuler un rendez-vous professionnel prévu la semaine prochaine. Écrivez un email à votre contact pour:\n- Vous excuser de l'annulation\n- Expliquer brièvement la raison\n- Proposer une nouvelle date`,
    'Work': `Vous souhaitez prendre des congés du 15 au 25 du mois prochain. Écrivez un email à votre responsable pour:\n- Demander officiellement ces congés\n- Expliquer la raison (vacances en famille)\n- Mentionner l'organisation du travail pendant votre absence`,
    'Housing': `Votre voisin fait du bruit tard le soir. Écrivez-lui un message pour:\n- Décrire le problème poliment\n- Expliquer les conséquences pour vous\n- Demander de faire moins de bruit`,
    'Consumer': `Vous avez acheté un produit défectueux. Écrivez au service client pour:\n- Décrire le problème\n- Joindre le numéro de commande (fictif)\n- Demander un remboursement ou un échange`,
    'Travel': `Vous voulez réserver une chambre d'hôtel. Écrivez à l'hôtel pour:\n- Demander la disponibilité pour vos dates\n- Préciser vos besoins (type de chambre, équipements)\n- Demander le tarif`,
    'Education': `Vous voulez vous inscrire à une formation en ligne. Écrivez pour:\n- Exprimer votre intérêt\n- Demander des informations sur le programme\n- Poser des questions sur les modalités`,
    'Health': `Vous devez reporter un rendez-vous médical. Écrivez au cabinet pour:\n- Annuler le rendez-vous actuel\n- Expliquer la raison\n- Demander un nouveau rendez-vous`,
    'Administration': `Vous avez besoin d'un certificat de résidence. Écrivez à la mairie pour:\n- Expliquer votre demande\n- Préciser pourquoi vous en avez besoin\n- Demander la procédure à suivre`,
    'Environment': `Vous avez constaté une pollution dans votre quartier. Écrivez aux services municipaux pour:\n- Décrire le problème observé\n- Localiser précisément l'endroit\n- Demander une intervention`,
    'Technology': `Vous avez un problème avec votre connexion internet. Écrivez au support technique pour:\n- Décrire le problème\n- Mentionner ce que vous avez déjà essayé\n- Demander une solution`,
    'Family': `Vous organisez une fête d'anniversaire surprise. Écrivez aux invités pour:\n- Annoncer l'événement (date, heure, lieu)\n- Rappeler que c'est une surprise\n- Demander une confirmation`,
    'Finance': `Vous contestez un prélèvement sur votre compte. Écrivez à votre banque pour:\n- Identifier le prélèvement contesté\n- Expliquer pourquoi vous le contestez\n- Demander le remboursement`,
    'Culture': `Vous voulez réserver des places pour un spectacle. Écrivez au théâtre pour:\n- Indiquer le spectacle souhaité\n- Préciser le nombre de places et la date\n- Demander les tarifs disponibles`,
    'Sports': `Vous voulez vous inscrire dans un club de sport. Écrivez pour:\n- Exprimer votre intérêt\n- Demander les conditions d'inscription\n- Poser des questions sur les horaires`,
    'Media': `Vous avez lu un article inexact vous concernant. Écrivez au journal pour:\n- Identifier l'article en question\n- Expliquer l'erreur\n- Demander une rectification`,
    'Immigration': `Vous avez besoin d'informations sur un visa. Écrivez au consulat pour:\n- Préciser le type de visa recherché\n- Demander la liste des documents\n- Poser des questions sur les délais`,
    'Employment': `Vous démissionnez de votre poste. Écrivez à votre employeur pour:\n- Annoncer votre démission\n- Préciser la date de départ\n- Remercier pour l'expérience`,
    'Services': `Vous voulez résilier votre abonnement téléphonique. Écrivez à l'opérateur pour:\n- Demander la résiliation\n- Indiquer votre numéro de client\n- Demander la confirmation`,
    'Society': `Vous voulez signaler un problème dans votre rue. Écrivez à la mairie pour:\n- Décrire le problème (éclairage, trottoir...)\n- Localiser précisément\n- Demander une réparation`,
    'Canada': `Vous venez d'arriver au Québec et cherchez un logement. Écrivez à un propriétaire pour:\n- Vous présenter brièvement\n- Exprimer votre intérêt pour le logement\n- Demander une visite`
  };
  return prompts[theme] || prompts['Correspondence'];
}

function getWritingPromptB(num, theme) {
  const prompts = {
    'Correspondence': `Un magazine organise un débat sur le thème: "L'email a-t-il remplacé la lettre manuscrite?"\n\nRédigez votre contribution:\n- Présentez les avantages de chaque mode de communication\n- Donnez votre opinion personnelle\n- Illustrez avec des exemples`,
    'Work': `Vous répondez à une offre d'emploi de commercial(e). Rédigez une lettre de motivation:\n- Présentez vos compétences pertinentes\n- Expliquez votre intérêt pour le poste\n- Montrez ce que vous pouvez apporter à l'entreprise`,
    'Housing': `Vous résiliez votre bail car vous déménagez. Rédigez une lettre à votre propriétaire:\n- Annoncez votre départ\n- Respectez le préavis légal\n- Demandez l'état des lieux et le remboursement de la caution`,
    'Consumer': `Le magazine "Conso Info" demande des témoignages sur "Vos expériences de service client". Rédigez votre témoignage:\n- Racontez une expérience (positive ou négative)\n- Expliquez comment le problème a été résolu\n- Donnez des conseils aux lecteurs`,
    'Travel': `Votre vol a été annulé et vous avez subi des préjudices. Rédigez une lettre de réclamation:\n- Décrivez les faits (dates, numéro de vol)\n- Listez les préjudices subis\n- Demandez une compensation`,
    'Education': `Un forum discute de "L'apprentissage en ligne vs en présentiel". Donnez votre avis:\n- Comparez les deux modes d'apprentissage\n- Présentez avantages et inconvénients\n- Indiquez votre préférence et pourquoi`,
    'Health': `Votre mutuelle a refusé un remboursement. Rédigez un courrier de contestation:\n- Rappelez votre demande initiale\n- Expliquez pourquoi vous contestez la décision\n- Demandez un réexamen du dossier`,
    'Administration': `Vous faites un recours contre un refus de titre de séjour. Rédigez une lettre:\n- Rappelez la décision contestée\n- Présentez vos arguments\n- Fournissez des pièces justificatives`,
    'Environment': `Le journal local demande des articles sur "Les gestes écologiques au quotidien". Rédigez votre article:\n- Présentez 3-4 gestes simples\n- Expliquez leur impact positif\n- Encouragez les lecteurs à agir`,
    'Technology': `Un site internet demande votre avis sur "Les smartphones: addiction ou outil indispensable?". Donnez votre opinion:\n- Présentez les aspects positifs et négatifs\n- Partagez votre expérience personnelle\n- Proposez des solutions pour un usage équilibré`,
    'Family': `Vous annoncez une mauvaise nouvelle à un ami éloigné (décès d'un proche commun). Rédigez un message:\n- Annoncez la nouvelle avec délicatesse\n- Partagez quelques souvenirs\n- Proposez votre soutien`,
    'Finance': `Vous demandez un prêt personnel à votre banque. Rédigez une lettre:\n- Précisez le montant et l'objet du prêt\n- Présentez votre situation financière\n- Proposez un plan de remboursement`,
    'Culture': `Un magazine culturel demande: "Quel livre/film vous a marqué et pourquoi?". Rédigez votre critique:\n- Présentez l'œuvre (auteur, genre, résumé)\n- Expliquez ce qui vous a touché\n- Recommanderiez-vous cette œuvre?`,
    'Sports': `Le journal du club sportif cherche des articles sur "Les bienfaits du sport". Rédigez votre contribution:\n- Présentez les bénéfices physiques\n- Mentionnez les avantages psychologiques\n- Encouragez la pratique sportive`,
    'Media': `Un débat en ligne porte sur "Les réseaux sociaux: progrès ou danger?". Donnez votre avis:\n- Analysez les aspects positifs\n- Présentez les risques\n- Proposez des règles pour un bon usage`,
    'Immigration': `Vous faites un recours après un refus de visa. Rédigez une lettre:\n- Contestez les motifs du refus\n- Apportez des preuves complémentaires\n- Demandez un réexamen favorable`,
    'Employment': `Un collègue part à la retraite et vous demande une lettre de recommandation. Rédigez-la:\n- Présentez la personne et son parcours\n- Décrivez ses qualités professionnelles\n- Recommandez-la chaleureusement`,
    'Services': `Vous avez eu un problème avec un service public. Rédigez une lettre au médiateur:\n- Décrivez le problème rencontré\n- Expliquez vos démarches précédentes\n- Demandez une médiation`,
    'Society': `Le journal local demande des opinions sur "Faut-il interdire les voitures en centre-ville?". Rédigez votre avis:\n- Présentez les arguments pour et contre\n- Donnez votre position\n- Proposez des alternatives`,
    'Canada': `Vous écrivez à Immigration Canada pour expliquer votre projet d'immigration. Rédigez une lettre:\n- Présentez-vous et votre situation\n- Expliquez vos motivations\n- Décrivez votre projet professionnel au Canada`
  };
  return prompts[theme] || prompts['Correspondence'];
}

function getSampleAnswerA(num, theme) {
  return `[Exemple de réponse pour le thème ${theme}]\n\nMadame, Monsieur,\n\nJe me permets de vous contacter concernant [sujet]. [Explication du contexte en 1-2 phrases].\n\n[Corps du message avec les informations demandées, environ 3-4 phrases].\n\nJe vous remercie par avance pour votre réponse et reste à votre disposition pour tout complément d'information.\n\nCordialement,\n[Signature]`;
}

function getSampleAnswerB(num, theme) {
  return `[Exemple de réponse argumentée pour le thème ${theme}]\n\n[Introduction - présentation du sujet et annonce du plan]\n\nD'une part, [premier argument avec exemple]. Cela montre que [développement].\n\nD'autre part, [deuxième argument avec exemple]. En effet, [développement].\n\nCependant, [nuance ou contre-argument]. Il convient donc de [transition].\n\nEn conclusion, [synthèse et opinion personnelle]. Je pense que [position finale avec justification].\n\nBien cordialement,\n[Signature si nécessaire]`;
}

export function getWritingExam(examNumber) {
  return WRITING_EXAMS.find(e => e.examNumber === examNumber);
}
