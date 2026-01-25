// TEF Mock Exams - Listening Comprehension Part 2 (Exams 6-10)
// Continuing with different themes

export const LISTENING_EXAMS_2 = [
  // ==================== EXAM 6 ====================
  {
    id: 'co-exam-6',
    examNumber: 6,
    title: 'Compréhension Orale - Examen 6',
    theme: 'Housing & Accommodation',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        questions: [
          { id: 1, audioDescription: '[Audio: Agence immobilière]', audioText: 'Agent: "Cet appartement fait 75 m², trois pièces avec balcon." Client: "Le loyer est de combien?" Agent: "950 euros charges comprises, plus un mois de caution."', question: 'Quelle est la surface de l\'appartement?', options: ['A) 65 m²', 'B) 70 m²', 'C) 75 m²', 'D) 80 m²'], correctAnswer: 2, explanation: 'L\'appartement fait "75 m²".' },
          { id: 2, audioDescription: '[Audio: Voisinage]', audioText: 'Voisin 1: "Bonjour, je suis votre nouveau voisin du 3ème." Voisin 2: "Bienvenue! Vous êtes dans l\'appartement de droite?" Voisin 1: "Oui, j\'ai emménagé hier. Le quartier a l\'air calme." Voisin 2: "Très calme, surtout le soir."', question: 'À quel étage habite le nouveau voisin?', options: ['A) 2ème étage', 'B) 3ème étage', 'C) 4ème étage', 'D) 5ème étage'], correctAnswer: 1, explanation: 'Il est "du 3ème".' },
          { id: 3, audioDescription: '[Audio: Plombier au téléphone]', audioText: 'Client: "J\'ai une fuite d\'eau dans la salle de bain." Plombier: "C\'est urgent?" Client: "Oui, l\'eau coule sans arrêt." Plombier: "Je peux passer dans une heure. L\'intervention coûtera environ 80 euros."', question: 'Quel est le problème?', options: ['A) Une panne électrique', 'B) Une fuite d\'eau', 'C) Le chauffage', 'D) La serrure'], correctAnswer: 1, explanation: 'Il y a "une fuite d\'eau".' },
          { id: 4, audioDescription: '[Audio: Visite appartement]', audioText: 'Visiteur: "L\'exposition est plein sud, c\'est bien!" Propriétaire: "Oui, très lumineux. Et le double vitrage isole bien du bruit." Visiteur: "Le chauffage est électrique ou au gaz?" Propriétaire: "Au gaz, c\'est plus économique."', question: 'Quel type de chauffage y a-t-il?', options: ['A) Électrique', 'B) Au gaz', 'C) Au fioul', 'D) Pas de chauffage'], correctAnswer: 1, explanation: 'Le chauffage est "au gaz".' },
          { id: 5, audioDescription: '[Audio: Syndic]', audioText: 'Gardien: "La prochaine assemblée des copropriétaires aura lieu le 20 novembre." Résident: "On va voter pour les travaux de ravalement?" Gardien: "Oui, et pour le changement de l\'ascenseur. Ça coûtera environ 15 000 euros par lot."', question: 'Quel est le coût estimé par lot?', options: ['A) 10 000 euros', 'B) 12 000 euros', 'C) 15 000 euros', 'D) 18 000 euros'], correctAnswer: 2, explanation: 'Le coût sera "environ 15 000 euros par lot".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        questions: [
          { id: 6, audioDescription: '[Audio: Publicité déménagement]', audioText: 'DéménaPro, votre partenaire pour un déménagement sans stress! Devis gratuit en 24h. À partir de 500 euros pour un studio. Emballage et montage des meubles inclus. Appelez le 0800 123 456!', question: 'Quel est le prix minimum?', options: ['A) 400 euros', 'B) 450 euros', 'C) 500 euros', 'D) 550 euros'], correctAnswer: 2, explanation: '"À partir de 500 euros pour un studio".' },
          { id: 7, audioDescription: '[Audio: Info immobilier]', audioText: 'Les prix de l\'immobilier ont augmenté de 8% à Paris cette année. Le prix moyen au mètre carré atteint désormais 10 500 euros. En banlieue, les prix restent plus accessibles avec une moyenne de 4 200 euros le mètre carré.', question: 'Quel est le prix moyen au m² à Paris?', options: ['A) 9 500 euros', 'B) 10 000 euros', 'C) 10 500 euros', 'D) 11 000 euros'], correctAnswer: 2, explanation: 'Le prix moyen est "10 500 euros".' },
          { id: 8, audioDescription: '[Audio: Alerte météo]', audioText: 'Alerte orange pour vents violents. Des rafales jusqu\'à 120 km/h sont attendues cette nuit. Les habitants sont invités à rentrer les objets pouvant s\'envoler des balcons et à éviter de stationner sous les arbres.', question: 'Quelle vitesse de vent est prévue?', options: ['A) 100 km/h', 'B) 110 km/h', 'C) 120 km/h', 'D) 130 km/h'], correctAnswer: 2, explanation: 'Des rafales "jusqu\'à 120 km/h".' },
          { id: 9, audioDescription: '[Audio: Annonce mairie]', audioText: 'La mairie informe les résidents que la collecte des encombrants aura lieu samedi prochain. Déposez vos objets sur le trottoir avant 7h. Maximum 2 mètres cubes par foyer.', question: 'Avant quelle heure faut-il déposer les encombrants?', options: ['A) 6h', 'B) 7h', 'C) 8h', 'D) 9h'], correctAnswer: 1, explanation: '"Déposez avant 7h".' },
          { id: 10, audioDescription: '[Audio: Aide au logement]', audioText: 'Vous êtes locataire? La CAF peut vous aider! Les APL peuvent couvrir jusqu\'à 40% de votre loyer selon vos revenus. Faites votre simulation sur caf.fr. Réponse en 48 heures.', question: 'Quel pourcentage du loyer les APL peuvent-elles couvrir?', options: ['A) 30%', 'B) 35%', 'C) 40%', 'D) 45%'], correctAnswer: 2, explanation: '"jusqu\'à 40% de votre loyer".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        questions: [
          { id: 11, audioDescription: '[Audio: Recherche colocation]', audioText: 'Anna: "La chambre fait 14 m² avec un placard intégré." Lucas: "Et le loyer?" Anna: "400 euros tout compris. On est trois colocataires, et on partage les tâches ménagères." Lucas: "Je peux emménager quand?" Anna: "Le 1er du mois prochain."', question: 'Combien y a-t-il de colocataires au total?', options: ['A) Deux', 'B) Trois', 'C) Quatre', 'D) Cinq'], correctAnswer: 1, explanation: '"On est trois colocataires".' },
          { id: 12, audioDescription: '[Audio: Problème avec propriétaire]', audioText: 'Locataire: "Le chauffe-eau ne fonctionne plus depuis une semaine." Propriétaire: "Je vais envoyer un technicien demain." Locataire: "C\'est à vos frais, n\'est-ce pas?" Propriétaire: "Oui, les réparations du chauffe-eau sont à ma charge."', question: 'Qui paiera la réparation?', options: ['A) Le locataire', 'B) Le propriétaire', 'C) L\'assurance', 'D) Ils partagent'], correctAnswer: 1, explanation: 'Les réparations sont "à ma charge" (propriétaire).' },
          { id: 13, audioDescription: '[Audio: Achat maison]', audioText: 'Acheteur: "On nous demande un apport de 20% du prix." Banquier: "C\'est standard. Pour une maison à 300 000 euros, il vous faut 60 000 euros d\'apport." Acheteur: "Et le taux du prêt?" Banquier: "Actuellement 3,5% sur 25 ans."', question: 'Quel apport est nécessaire?', options: ['A) 50 000 euros', 'B) 55 000 euros', 'C) 60 000 euros', 'D) 65 000 euros'], correctAnswer: 2, explanation: '"60 000 euros d\'apport".' },
          { id: 14, audioDescription: '[Audio: État des lieux]', audioText: 'Agent: "Je note une rayure sur le parquet du salon." Locataire sortant: "Elle était déjà là à mon arrivée, regardez l\'état des lieux d\'entrée." Agent: "Effectivement, c\'est noté. Par contre, le mur de la chambre devra être repeint." Locataire: "D\'accord, je m\'en occupe cette semaine."', question: 'Que doit faire le locataire?', options: ['A) Réparer le parquet', 'B) Repeindre un mur', 'C) Nettoyer la cuisine', 'D) Rien'], correctAnswer: 1, explanation: '"le mur de la chambre devra être repeint".' },
          { id: 15, audioDescription: '[Audio: Assurance habitation]', audioText: 'Assureur: "Notre formule de base couvre l\'incendie, le vol et les dégâts des eaux pour 15 euros par mois." Client: "Et si je veux aussi la responsabilité civile?" Assureur: "C\'est inclus. Pour une couverture plus complète avec bris de glace, comptez 22 euros."', question: 'Combien coûte la formule complète?', options: ['A) 15 euros', 'B) 18 euros', 'C) 20 euros', 'D) 22 euros'], correctAnswer: 3, explanation: 'La couverture complète coûte "22 euros".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        questions: [
          { id: 16, audioDescription: '[Audio: Reportage logement social]', audioText: 'En France, 5 millions de personnes vivent dans un logement social, soit 17% de la population. Le délai moyen d\'attente pour obtenir un HLM est de 22 mois à l\'échelle nationale, mais peut atteindre 8 ans à Paris. La loi SRU impose aux communes de disposer d\'au moins 25% de logements sociaux.', question: 'Quel est le délai moyen d\'attente national?', options: ['A) 18 mois', 'B) 20 mois', 'C) 22 mois', 'D) 24 mois'], correctAnswer: 2, explanation: '"22 mois à l\'échelle nationale".' },
          { id: 17, audioDescription: '[Audio: Suite reportage]', audioText: '[Continuation]', question: 'Quel pourcentage de logements sociaux est imposé par la loi?', options: ['A) 20%', 'B) 23%', 'C) 25%', 'D) 30%'], correctAnswer: 2, explanation: '"au moins 25% de logements sociaux".' },
          { id: 18, audioDescription: '[Audio: Émission rénovation]', audioText: 'Les travaux de rénovation énergétique permettent d\'économiser en moyenne 30% sur sa facture de chauffage. L\'isolation des combles est la priorité car 30% de la chaleur s\'échappe par le toit. MaPrimeRénov\' peut financer jusqu\'à 90% des travaux pour les ménages modestes.', question: 'Combien peut-on économiser sur le chauffage?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30% sur sa facture de chauffage".' },
          { id: 19, audioDescription: '[Audio: Suite émission]', audioText: '[Continuation]', question: 'Quel pourcentage de chaleur s\'échappe par le toit?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30% de la chaleur s\'échappe par le toit".' },
          { id: 20, audioDescription: '[Audio: Tendances habitat]', audioText: 'La tendance est aux tiny houses, ces petites maisons de moins de 20 m². En France, leur nombre a triplé en 5 ans. Les avantages: coût réduit entre 30 000 et 80 000 euros, impact écologique minimal et mobilité. La difficulté reste de trouver un terrain où les installer légalement.', question: 'Quelle est la surface des tiny houses?', options: ['A) Moins de 15 m²', 'B) Moins de 20 m²', 'C) Moins de 25 m²', 'D) Moins de 30 m²'], correctAnswer: 1, explanation: '"moins de 20 m²".' }
        ]
      }
    ]
  },

  // ==================== EXAM 7 ====================
  {
    id: 'co-exam-7',
    examNumber: 7,
    title: 'Compréhension Orale - Examen 7',
    theme: 'Technology & Digital',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        questions: [
          { id: 1, audioDescription: '[Audio: Magasin électronique]', audioText: 'Vendeur: "Ce smartphone a 128 Go de mémoire et une batterie de 5000 mAh." Client: "Il coûte combien?" Vendeur: "699 euros, avec une coque de protection offerte." Client: "Et la garantie?" Vendeur: "Deux ans, pièces et main-d\'œuvre."', question: 'Quelle est la capacité mémoire?', options: ['A) 64 Go', 'B) 128 Go', 'C) 256 Go', 'D) 512 Go'], correctAnswer: 1, explanation: '"128 Go de mémoire".' },
          { id: 2, audioDescription: '[Audio: Support technique]', audioText: 'Client: "Mon ordinateur ne s\'allume plus depuis ce matin." Technicien: "Avez-vous vérifié que le câble d\'alimentation est bien branché?" Client: "Oui, j\'ai tout vérifié." Technicien: "Je vous envoie un technicien demain entre 9h et 12h."', question: 'Quand le technicien viendra-t-il?', options: ['A) Aujourd\'hui', 'B) Demain matin', 'C) Demain après-midi', 'D) Dans une semaine'], correctAnswer: 1, explanation: '"demain entre 9h et 12h".' },
          { id: 3, audioDescription: '[Audio: Formation informatique]', audioText: 'Formateur: "Cliquez sur l\'icône en haut à gauche pour ouvrir le menu." Participant: "Je ne trouve pas." Formateur: "C\'est les trois lignes horizontales. On appelle ça le menu hamburger." Participant: "Ah oui, je vois maintenant!"', question: 'Comment s\'appelle l\'icône des trois lignes?', options: ['A) Menu sandwich', 'B) Menu hamburger', 'C) Menu pizza', 'D) Menu hot-dog'], correctAnswer: 1, explanation: '"le menu hamburger".' },
          { id: 4, audioDescription: '[Audio: Abonnement internet]', audioText: 'Conseiller: "Notre offre fibre inclut internet, téléphone fixe illimité et TV pour 39,99 euros par mois." Client: "La vitesse de connexion est de combien?" Conseiller: "Jusqu\'à 1 Gigabit par seconde en téléchargement."', question: 'Quelle est la vitesse de la fibre?', options: ['A) 500 Mbps', 'B) 800 Mbps', 'C) 1 Gbps', 'D) 2 Gbps'], correctAnswer: 2, explanation: '"1 Gigabit par seconde".' },
          { id: 5, audioDescription: '[Audio: Réparation téléphone]', audioText: 'Réparateur: "L\'écran de votre iPhone est cassé. Le remplacement coûte 180 euros." Client: "Ça prend combien de temps?" Réparateur: "Une heure environ. Vous pouvez attendre ou revenir plus tard."', question: 'Combien coûte la réparation?', options: ['A) 150 euros', 'B) 160 euros', 'C) 170 euros', 'D) 180 euros'], correctAnswer: 3, explanation: '"180 euros".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        questions: [
          { id: 6, audioDescription: '[Audio: Pub application]', audioText: 'Découvrez l\'application BankEasy! Gérez vos comptes, faites des virements instantanés, payez avec votre téléphone. Téléchargement gratuit, disponible sur iOS et Android. Déjà 3 millions d\'utilisateurs en France!', question: 'Combien d\'utilisateurs en France?', options: ['A) 1 million', 'B) 2 millions', 'C) 3 millions', 'D) 4 millions'], correctAnswer: 2, explanation: '"3 millions d\'utilisateurs".' },
          { id: 7, audioDescription: '[Audio: Info cybersécurité]', audioText: 'Alerte arnaque: des SMS frauduleux circulent, prétendant venir de votre banque. Ne cliquez jamais sur les liens et ne communiquez pas vos codes. En 2023, 65% des Français ont été ciblés par une tentative de phishing.', question: 'Quel pourcentage de Français a été ciblé?', options: ['A) 55%', 'B) 60%', 'C) 65%', 'D) 70%'], correctAnswer: 2, explanation: '"65% des Français".' },
          { id: 8, audioDescription: '[Audio: Lancement produit]', audioText: 'Apple annonce son nouveau MacBook Pro avec la puce M3. Disponible à partir du 15 novembre. Prix de départ: 1999 euros pour la version 14 pouces. Précommandes ouvertes dès maintenant sur apple.com.', question: 'Quel est le prix de départ?', options: ['A) 1799 euros', 'B) 1899 euros', 'C) 1999 euros', 'D) 2099 euros'], correctAnswer: 2, explanation: '"1999 euros".' },
          { id: 9, audioDescription: '[Audio: Podcast tech]', audioText: 'Les voitures électriques gagnent du terrain: 15% des ventes en France cette année, contre seulement 2% il y a cinq ans. L\'autonomie moyenne atteint maintenant 400 km, éliminant l\'angoisse de la panne.', question: 'Quelle est l\'autonomie moyenne actuelle?', options: ['A) 300 km', 'B) 350 km', 'C) 400 km', 'D) 450 km'], correctAnswer: 2, explanation: '"400 km".' },
          { id: 10, audioDescription: '[Audio: Service streaming]', audioText: 'Netflix augmente ses prix: l\'abonnement standard passe de 13,49 à 15,99 euros par mois. La formule premium avec 4 écrans simultanés coûtera 20,99 euros. La formule essentielle reste à 8,99 euros.', question: 'Combien coûte l\'abonnement standard?', options: ['A) 13,99 euros', 'B) 14,99 euros', 'C) 15,99 euros', 'D) 16,99 euros'], correctAnswer: 2, explanation: '"15,99 euros par mois".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        questions: [
          { id: 11, audioDescription: '[Audio: Entre collègues]', audioText: 'Pierre: "Tu utilises quel outil pour les visioconférences?" Marie: "Principalement Teams, mais parfois Zoom pour les clients externes. Et toi?" Pierre: "Google Meet surtout. On peut faire des réunions de 60 minutes gratuitement." Marie: "Oui, mais Teams permet jusqu\'à 100 participants."', question: 'Combien de participants Teams permet-il?', options: ['A) 50', 'B) 75', 'C) 100', 'D) 150'], correctAnswer: 2, explanation: '"jusqu\'à 100 participants".' },
          { id: 12, audioDescription: '[Audio: Problème wifi]', audioText: 'Client: "Mon wifi est très lent depuis quelques jours." Technicien: "Combien d\'appareils sont connectés?" Client: "Euh... mon téléphone, ma tablette, l\'ordinateur, la TV connectée... environ 8." Technicien: "C\'est beaucoup. Essayez de déconnecter ceux que vous n\'utilisez pas."', question: 'Combien d\'appareils sont connectés?', options: ['A) 5', 'B) 6', 'C) 7', 'D) 8'], correctAnswer: 3, explanation: '"environ 8".' },
          { id: 13, audioDescription: '[Audio: Achat en ligne]', audioText: 'Ami 1: "J\'ai commandé sur ce site, c\'est fiable?" Ami 2: "Oui, j\'ai déjà acheté 3 fois. La livraison est rapide, entre 2 et 4 jours." Ami 1: "Et si je ne suis pas satisfait?" Ami 2: "Tu as 30 jours pour retourner le produit gratuitement."', question: 'Combien de temps a-t-on pour retourner un produit?', options: ['A) 14 jours', 'B) 21 jours', 'C) 30 jours', 'D) 45 jours'], correctAnswer: 2, explanation: '"30 jours".' },
          { id: 14, audioDescription: '[Audio: Cours informatique]', audioText: 'Prof: "Pour sécuriser votre mot de passe, utilisez au moins 12 caractères avec des majuscules, minuscules, chiffres et symboles." Élève: "Et on doit le changer souvent?" Prof: "Oui, tous les 3 mois idéalement. Et jamais le même mot de passe partout!"', question: 'Combien de caractères minimum pour un mot de passe?', options: ['A) 8', 'B) 10', 'C) 12', 'D) 14'], correctAnswer: 2, explanation: '"au moins 12 caractères".' },
          { id: 15, audioDescription: '[Audio: Télétravail]', audioText: 'Manager: "L\'entreprise fournit un laptop et un écran supplémentaire." Employé: "Et pour internet, on est remboursé?" Manager: "Oui, 50 euros par mois pour le forfait internet. On paie aussi une partie des frais d\'électricité."', question: 'Quel est le remboursement internet?', options: ['A) 30 euros', 'B) 40 euros', 'C) 50 euros', 'D) 60 euros'], correctAnswer: 2, explanation: '"50 euros par mois".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        questions: [
          { id: 16, audioDescription: '[Audio: Conférence IA]', audioText: 'L\'intelligence artificielle transforme notre quotidien. ChatGPT a atteint 100 millions d\'utilisateurs en seulement 2 mois après son lancement, un record historique. D\'ici 2030, l\'IA pourrait automatiser 30% des emplois actuels. Les secteurs les plus touchés seront la finance, le droit et le service client.', question: 'En combien de temps ChatGPT a-t-il atteint 100 millions d\'utilisateurs?', options: ['A) 1 mois', 'B) 2 mois', 'C) 3 mois', 'D) 6 mois'], correctAnswer: 1, explanation: '"en seulement 2 mois".' },
          { id: 17, audioDescription: '[Audio: Suite conférence]', audioText: '[Continuation]', question: 'Quel pourcentage d\'emplois pourrait être automatisé d\'ici 2030?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30% des emplois actuels".' },
          { id: 18, audioDescription: '[Audio: Documentaire réseaux sociaux]', audioText: 'Les Français passent en moyenne 1h46 par jour sur les réseaux sociaux, soit 45 minutes de plus qu\'il y a 5 ans. TikTok est devenu le réseau préféré des moins de 25 ans, devant Instagram et Snapchat. Les experts s\'inquiètent de l\'impact sur la santé mentale des jeunes.', question: 'Combien de temps les Français passent-ils sur les réseaux sociaux?', options: ['A) 1h20', 'B) 1h35', 'C) 1h46', 'D) 2h00'], correctAnswer: 2, explanation: '"1h46 par jour".' },
          { id: 19, audioDescription: '[Audio: Suite documentaire]', audioText: '[Continuation]', question: 'Quel réseau est préféré des moins de 25 ans?', options: ['A) Facebook', 'B) Instagram', 'C) TikTok', 'D) Twitter'], correctAnswer: 2, explanation: '"TikTok est devenu le réseau préféré".' },
          { id: 20, audioDescription: '[Audio: Innovation]', audioText: 'La 5G couvre maintenant 75% du territoire français. Les débits peuvent atteindre 10 fois ceux de la 4G, permettant de télécharger un film en quelques secondes. Les applications futures incluent la chirurgie à distance, les véhicules autonomes et les villes intelligentes.', question: 'Quel pourcentage du territoire est couvert par la 5G?', options: ['A) 65%', 'B) 70%', 'C) 75%', 'D) 80%'], correctAnswer: 2, explanation: '"75% du territoire".' }
        ]
      }
    ]
  },

  // ==================== EXAM 8 ====================
  {
    id: 'co-exam-8',
    examNumber: 8,
    title: 'Compréhension Orale - Examen 8',
    theme: 'Environment & Climate',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        questions: [
          { id: 1, audioDescription: '[Audio: Déchetterie]', audioText: 'Agent: "Les bouteilles en plastique vont dans le bac jaune." Usager: "Et le verre?" Agent: "Dans le conteneur vert, celui du fond. Les cartons aussi dans le jaune."', question: 'Où vont les bouteilles plastique?', options: ['A) Bac vert', 'B) Bac jaune', 'C) Bac bleu', 'D) Bac gris'], correctAnswer: 1, explanation: '"dans le bac jaune".' },
          { id: 2, audioDescription: '[Audio: Marché bio]', audioText: 'Vendeur: "Ces légumes sont 100% bio et cultivés à 30 km d\'ici." Client: "C\'est plus cher que le supermarché?" Vendeur: "Un peu, mais la qualité est incomparable et c\'est meilleur pour la planète."', question: 'À quelle distance sont cultivés les légumes?', options: ['A) 10 km', 'B) 20 km', 'C) 30 km', 'D) 40 km'], correctAnswer: 2, explanation: '"cultivés à 30 km".' },
          { id: 3, audioDescription: '[Audio: Station essence]', audioText: 'Pompiste: "Nous avons de l\'essence, du diesel et une borne de recharge électrique." Client: "La recharge rapide prend combien de temps?" Pompiste: "Environ 30 minutes pour 80% de charge."', question: 'Combien de temps pour une charge rapide?', options: ['A) 15 minutes', 'B) 20 minutes', 'C) 30 minutes', 'D) 45 minutes'], correctAnswer: 2, explanation: '"Environ 30 minutes".' },
          { id: 4, audioDescription: '[Audio: Association écolo]', audioText: 'Bénévole: "Nous organisons un ramassage de déchets sur la plage samedi." Participant: "À quelle heure?" Bénévole: "Rendez-vous à 9h, on vous fournit les gants et les sacs. Ça dure jusqu\'à midi."', question: 'À quelle heure commence le ramassage?', options: ['A) 8h', 'B) 9h', 'C) 10h', 'D) 11h'], correctAnswer: 1, explanation: '"Rendez-vous à 9h".' },
          { id: 5, audioDescription: '[Audio: Installation panneaux solaires]', audioText: 'Technicien: "Vos panneaux produiront environ 3000 kWh par an." Propriétaire: "C\'est suffisant pour ma consommation?" Technicien: "Oui, et vous pourrez même revendre le surplus à EDF."', question: 'Quelle production annuelle est prévue?', options: ['A) 2000 kWh', 'B) 2500 kWh', 'C) 3000 kWh', 'D) 3500 kWh'], correctAnswer: 2, explanation: '"environ 3000 kWh par an".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        questions: [
          { id: 6, audioDescription: '[Audio: Alerte pollution]', audioText: 'Épisode de pollution atmosphérique dans la région. La circulation différenciée est mise en place demain: seuls les véhicules avec vignette Crit\'Air 1 et 2 peuvent circuler. Les transports en commun sont gratuits.', question: 'Quelles vignettes sont autorisées?', options: ['A) 1 et 2', 'B) 1, 2 et 3', 'C) Toutes sauf 5', 'D) Uniquement 1'], correctAnswer: 0, explanation: '"vignette Crit\'Air 1 et 2".' },
          { id: 7, audioDescription: '[Audio: Campagne gouvernement]', audioText: 'Réduire sa consommation d\'eau, c\'est simple: une douche consomme 60 litres contre 200 litres pour un bain. Chaque Français utilise en moyenne 150 litres d\'eau par jour. Pensez à fermer le robinet!', question: 'Combien de litres utilise une douche?', options: ['A) 40 litres', 'B) 50 litres', 'C) 60 litres', 'D) 70 litres'], correctAnswer: 2, explanation: '"une douche consomme 60 litres".' },
          { id: 8, audioDescription: '[Audio: Info climat]', audioText: 'Les températures mondiales ont augmenté de 1,2°C depuis l\'ère préindustrielle. L\'objectif de l\'Accord de Paris est de limiter le réchauffement à 1,5°C. Pour y parvenir, il faut réduire les émissions de CO2 de 45% d\'ici 2030.', question: 'De combien les températures ont-elles augmenté?', options: ['A) 1,0°C', 'B) 1,2°C', 'C) 1,4°C', 'D) 1,6°C'], correctAnswer: 1, explanation: '"1,2°C depuis l\'ère préindustrielle".' },
          { id: 9, audioDescription: '[Audio: Publicité écologique]', audioText: 'EcoClean, le détergent 100% naturel! Sans phosphates, biodégradable en 28 jours. Efficace à 30°C pour économiser l\'énergie. Bouteille en plastique recyclé. Disponible en magasins bio.', question: 'En combien de jours le produit est-il biodégradable?', options: ['A) 21 jours', 'B) 28 jours', 'C) 35 jours', 'D) 42 jours'], correctAnswer: 1, explanation: '"biodégradable en 28 jours".' },
          { id: 10, audioDescription: '[Audio: Info énergie]', audioText: 'Le gouvernement offre une prime de 5000 euros pour l\'achat d\'une voiture électrique neuve. Cette aide est cumulable avec le bonus écologique. Conditions: revenus inférieurs à 40 000 euros par an.', question: 'Quel est le montant de la prime?', options: ['A) 3000 euros', 'B) 4000 euros', 'C) 5000 euros', 'D) 6000 euros'], correctAnswer: 2, explanation: '"5000 euros".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        questions: [
          { id: 11, audioDescription: '[Audio: Famille écolo]', audioText: 'Mère: "On a réduit nos déchets de 50% en un an." Père: "Comment?" Mère: "Le compost pour les épluchures, les courses en vrac, et on répare au lieu de jeter." Père: "Et les enfants sont contents de cette démarche?"', question: 'De combien la famille a-t-elle réduit ses déchets?', options: ['A) 30%', 'B) 40%', 'C) 50%', 'D) 60%'], correctAnswer: 2, explanation: '"50% en un an".' },
          { id: 12, audioDescription: '[Audio: Mairie]', audioText: 'Élu: "Notre ville a planté 1000 arbres cette année." Citoyen: "Et pour les pistes cyclables?" Élu: "15 km supplémentaires sont prévus l\'année prochaine. On veut doubler le réseau actuel de 30 km."', question: 'Combien d\'arbres ont été plantés?', options: ['A) 500', 'B) 800', 'C) 1000', 'D) 1200'], correctAnswer: 2, explanation: '"1000 arbres".' },
          { id: 13, audioDescription: '[Audio: Entreprise verte]', audioText: 'DRH: "Notre bilan carbone a diminué de 25% en 3 ans." Journaliste: "Grâce à quelles mesures?" DRH: "Télétravail 2 jours par semaine, flotte de véhicules électriques, et zéro papier dans les bureaux."', question: 'De combien le bilan carbone a-t-il diminué?', options: ['A) 15%', 'B) 20%', 'C) 25%', 'D) 30%'], correctAnswer: 2, explanation: '"25% en 3 ans".' },
          { id: 14, audioDescription: '[Audio: Vacances responsables]', audioText: 'Voyageur: "Je voudrais compenser le CO2 de mon vol." Agent: "Le vol Paris-New York émet environ 1 tonne de CO2 par passager. La compensation coûte 25 euros, qui financent des projets de reforestation."', question: 'Combien de CO2 émet un vol Paris-New York?', options: ['A) 500 kg', 'B) 750 kg', 'C) 1 tonne', 'D) 1,5 tonne'], correctAnswer: 2, explanation: '"environ 1 tonne".' },
          { id: 15, audioDescription: '[Audio: Cantine scolaire]', audioText: 'Directeur: "Nous proposons maintenant un menu végétarien par semaine." Parent: "C\'est obligatoire?" Directeur: "C\'est la loi depuis 2022. En plus, 50% de nos produits sont bio ou locaux."', question: 'Quel pourcentage de produits est bio ou local?', options: ['A) 30%', 'B) 40%', 'C) 50%', 'D) 60%'], correctAnswer: 2, explanation: '"50% de nos produits".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        questions: [
          { id: 16, audioDescription: '[Audio: Conférence climat]', audioText: 'Les océans absorbent 30% du CO2 émis par l\'homme et 90% de la chaleur excédentaire. Mais cette capacité diminue avec l\'acidification. Le niveau des mers a monté de 20 cm depuis 1900 et pourrait augmenter d\'un mètre d\'ici 2100 selon les scénarios pessimistes.', question: 'Quel pourcentage de CO2 les océans absorbent-ils?', options: ['A) 20%', 'B) 25%', 'C) 30%', 'D) 35%'], correctAnswer: 2, explanation: '"30% du CO2".' },
          { id: 17, audioDescription: '[Audio: Suite conférence]', audioText: '[Continuation]', question: 'De combien le niveau des mers a-t-il monté depuis 1900?', options: ['A) 10 cm', 'B) 15 cm', 'C) 20 cm', 'D) 25 cm'], correctAnswer: 2, explanation: '"20 cm depuis 1900".' },
          { id: 18, audioDescription: '[Audio: Documentaire biodiversité]', audioText: 'Un million d\'espèces sont menacées d\'extinction selon l\'ONU. La France abrite 10% de la biodiversité mondiale grâce à ses territoires d\'outre-mer. Les causes principales sont la destruction des habitats, le changement climatique et la pollution.', question: 'Combien d\'espèces sont menacées?', options: ['A) 500 000', 'B) 750 000', 'C) 1 million', 'D) 1,5 million'], correctAnswer: 2, explanation: '"Un million d\'espèces".' },
          { id: 19, audioDescription: '[Audio: Suite documentaire]', audioText: '[Continuation]', question: 'Quel pourcentage de biodiversité mondiale la France abrite-t-elle?', options: ['A) 5%', 'B) 8%', 'C) 10%', 'D) 12%'], correctAnswer: 2, explanation: '"10% de la biodiversité mondiale".' },
          { id: 20, audioDescription: '[Audio: Solution énergétique]', audioText: 'L\'énergie éolienne représente maintenant 8% de la production électrique française. Le parc éolien compte 9000 turbines réparties sur 1700 sites. L\'objectif est d\'atteindre 15% d\'ici 2030, notamment grâce à l\'éolien en mer.', question: 'Combien de turbines éoliennes y a-t-il en France?', options: ['A) 7000', 'B) 8000', 'C) 9000', 'D) 10000'], correctAnswer: 2, explanation: '"9000 turbines".' }
        ]
      }
    ]
  },

  // ==================== EXAM 9 ====================
  {
    id: 'co-exam-9',
    examNumber: 9,
    title: 'Compréhension Orale - Examen 9',
    theme: 'Culture & Entertainment',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        questions: [
          { id: 1, audioDescription: '[Audio: Cinéma]', audioText: 'Guichetier: "Le film commence à 20h15. Vous voulez des places où?" Client: "Au milieu si possible." Guichetier: "Rangée H, ça vous va? C\'est 12 euros par personne, 9 euros en tarif réduit."', question: 'À quelle heure commence le film?', options: ['A) 19h45', 'B) 20h00', 'C) 20h15', 'D) 20h30'], correctAnswer: 2, explanation: '"à 20h15".' },
          { id: 2, audioDescription: '[Audio: Librairie]', audioText: 'Libraire: "Ce roman a gagné le Prix Goncourt cette année." Client: "C\'est combien?" Libraire: "22 euros en format broché, 8,50 euros en poche mais il sort dans 6 mois."', question: 'Combien coûte le livre en broché?', options: ['A) 18 euros', 'B) 20 euros', 'C) 22 euros', 'D) 24 euros'], correctAnswer: 2, explanation: '"22 euros en format broché".' },
          { id: 3, audioDescription: '[Audio: Concert]', audioText: 'Spectateur: "C\'est la première fois que je vois ce groupe en live!" Ami: "Moi c\'est la troisième fois. Leur album vient de passer disque de platine, plus de 100 000 ventes."', question: 'Combien de ventes pour un disque de platine?', options: ['A) 50 000', 'B) 75 000', 'C) 100 000', 'D) 150 000'], correctAnswer: 2, explanation: '"plus de 100 000 ventes".' },
          { id: 4, audioDescription: '[Audio: Musée]', audioText: 'Guide: "L\'exposition temporaire se termine le 15 janvier. Il reste 3 semaines pour la voir." Visiteur: "On peut prendre des photos?" Guide: "Sans flash uniquement."', question: 'Combien de temps reste-t-il?', options: ['A) 2 semaines', 'B) 3 semaines', 'C) 4 semaines', 'D) 5 semaines'], correctAnswer: 1, explanation: '"Il reste 3 semaines".' },
          { id: 5, audioDescription: '[Audio: Festival]', audioText: 'Organisateur: "Le festival accueillera 25 000 festivaliers sur 3 jours." Journaliste: "Combien d\'artistes au programme?" Organisateur: "Une cinquantaine, dont 5 têtes d\'affiche internationales."', question: 'Combien de festivaliers sont attendus?', options: ['A) 15 000', 'B) 20 000', 'C) 25 000', 'D) 30 000'], correctAnswer: 2, explanation: '"25 000 festivaliers".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        questions: [
          { id: 6, audioDescription: '[Audio: Promo théâtre]', audioText: 'Le Théâtre du Rond-Point présente "Le Malade imaginaire" de Molière jusqu\'au 28 février. Du mardi au samedi à 20h30, matinée le dimanche à 15h. Places à partir de 25 euros. Réservations au 01 44 95 98 00.', question: 'Quel est le prix minimum des places?', options: ['A) 20 euros', 'B) 25 euros', 'C) 30 euros', 'D) 35 euros'], correctAnswer: 1, explanation: '"à partir de 25 euros".' },
          { id: 7, audioDescription: '[Audio: Critique film]', audioText: 'Le nouveau film de Xavier Dolan a reçu 4 étoiles dans notre rédaction. Une œuvre poignante sur les relations familiales, avec des performances exceptionnelles. Durée 2h15. Déconseillé aux moins de 12 ans.', question: 'Quelle est la durée du film?', options: ['A) 1h45', 'B) 2h00', 'C) 2h15', 'D) 2h30'], correctAnswer: 2, explanation: '"Durée 2h15".' },
          { id: 8, audioDescription: '[Audio: Évènement culturel]', audioText: 'Les Journées du Patrimoine reviennent les 16 et 17 septembre. Plus de 17 000 sites ouverts gratuitement dans toute la France, dont l\'Élysée et Matignon. Réservation obligatoire pour certains lieux.', question: 'Combien de sites sont ouverts?', options: ['A) 12 000', 'B) 15 000', 'C) 17 000', 'D) 20 000'], correctAnswer: 2, explanation: '"Plus de 17 000 sites".' },
          { id: 9, audioDescription: '[Audio: Sortie album]', audioText: 'La chanteuse Aya Nakamura sort son nouvel album vendredi prochain. 14 titres inédits dont 3 collaborations internationales. La tournée mondiale débutera en mars avec 50 dates sur 4 continents.', question: 'Combien de titres contient l\'album?', options: ['A) 10', 'B) 12', 'C) 14', 'D) 16'], correctAnswer: 2, explanation: '"14 titres inédits".' },
          { id: 10, audioDescription: '[Audio: Exposition]', audioText: 'Le Grand Palais accueille la rétrospective Picasso avec 200 œuvres exceptionnelles. Ouvert tous les jours sauf le mardi, de 10h à 20h. Nocturne le mercredi jusqu\'à 22h. Billets en ligne uniquement.', question: 'Combien d\'œuvres sont exposées?', options: ['A) 150', 'B) 175', 'C) 200', 'D) 225'], correctAnswer: 2, explanation: '"200 œuvres".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        questions: [
          { id: 11, audioDescription: '[Audio: Discussion série TV]', audioText: 'Marie: "Tu as fini la saison 3 de The Bear?" Paul: "Oui! 10 épisodes en un weekend. Je suis accro!" Marie: "Moi j\'en suis au 5ème. Pas de spoilers!" Paul: "Promis. La saison 4 sort en décembre."', question: 'Combien d\'épisodes a la saison 3?', options: ['A) 8', 'B) 10', 'C) 12', 'D) 14'], correctAnswer: 1, explanation: '"10 épisodes".' },
          { id: 12, audioDescription: '[Audio: Cours de danse]', audioText: 'Prof: "Le cours de salsa a lieu le mercredi à 19h." Élève: "C\'est ouvert aux débutants?" Prof: "Oui, il y a 3 niveaux: débutant, intermédiaire et avancé. L\'inscription est de 280 euros pour le trimestre."', question: 'Combien coûte le trimestre?', options: ['A) 240 euros', 'B) 260 euros', 'C) 280 euros', 'D) 300 euros'], correctAnswer: 2, explanation: '"280 euros pour le trimestre".' },
          { id: 13, audioDescription: '[Audio: Vernissage]', audioText: 'Galeriste: "L\'artiste a mis 2 ans à créer cette série de 15 tableaux." Visiteur: "Les prix sont affichés?" Galeriste: "Les petits formats sont à 3000 euros, les grands à partir de 8000 euros."', question: 'Combien de tableaux dans la série?', options: ['A) 10', 'B) 12', 'C) 15', 'D) 18'], correctAnswer: 2, explanation: '"série de 15 tableaux".' },
          { id: 14, audioDescription: '[Audio: Club de lecture]', audioText: 'Animatrice: "Ce mois-ci, on lit un roman de 350 pages." Membre: "On se retrouve quand pour en discuter?" Animatrice: "Dans 3 semaines, le premier jeudi du mois comme d\'habitude. On est 12 membres réguliers."', question: 'Combien de pages fait le roman?', options: ['A) 280', 'B) 320', 'C) 350', 'D) 400'], correctAnswer: 2, explanation: '"350 pages".' },
          { id: 15, audioDescription: '[Audio: Escape game]', audioText: 'Animateur: "Vous avez 60 minutes pour sortir. Vous êtes 5, c\'est parfait." Joueur: "On a droit à des indices?" Animateur: "Oui, 3 maximum. Chaque indice retire 5 minutes de votre score final."', question: 'Combien d\'indices peut-on demander?', options: ['A) 2', 'B) 3', 'C) 4', 'D) 5'], correctAnswer: 1, explanation: '"3 maximum".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        questions: [
          { id: 16, audioDescription: '[Audio: Industrie du cinéma]', audioText: 'Le cinéma français a attiré 150 millions de spectateurs en 2023, un chiffre en hausse de 18% par rapport à 2022. Les comédies restent le genre préféré avec 35% des entrées, devant les films d\'action et les drames. Le prix moyen d\'une place est de 7,50 euros.', question: 'Combien de spectateurs en 2023?', options: ['A) 120 millions', 'B) 135 millions', 'C) 150 millions', 'D) 165 millions'], correctAnswer: 2, explanation: '"150 millions de spectateurs".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Continuation]', question: 'Quel pourcentage représentent les comédies?', options: ['A) 25%', 'B) 30%', 'C) 35%', 'D) 40%'], correctAnswer: 2, explanation: '"35% des entrées".' },
          { id: 18, audioDescription: '[Audio: Podcast musique]', audioText: 'Le streaming musical a révolutionné l\'industrie. En France, 80% de la consommation musicale se fait désormais en streaming. Spotify compte 15 millions d\'utilisateurs français, devant Deezer et Apple Music. Un abonnement premium coûte environ 10 euros par mois.', question: 'Quel pourcentage de la musique est en streaming?', options: ['A) 70%', 'B) 75%', 'C) 80%', 'D) 85%'], correctAnswer: 2, explanation: '"80% de la consommation".' },
          { id: 19, audioDescription: '[Audio: Suite podcast]', audioText: '[Continuation]', question: 'Combien d\'utilisateurs Spotify en France?', options: ['A) 10 millions', 'B) 12 millions', 'C) 15 millions', 'D) 18 millions'], correctAnswer: 2, explanation: '"15 millions d\'utilisateurs".' },
          { id: 20, audioDescription: '[Audio: Musées français]', audioText: 'Le Louvre reste le musée le plus visité au monde avec 8,9 millions de visiteurs en 2023. Suivent le château de Versailles avec 8 millions et le musée d\'Orsay avec 3,5 millions. Le secteur culturel emploie 670 000 personnes en France.', question: 'Combien de visiteurs au Louvre en 2023?', options: ['A) 7,5 millions', 'B) 8,2 millions', 'C) 8,9 millions', 'D) 9,5 millions'], correctAnswer: 2, explanation: '"8,9 millions de visiteurs".' }
        ]
      }
    ]
  },

  // ==================== EXAM 10 ====================
  {
    id: 'co-exam-10',
    examNumber: 10,
    title: 'Compréhension Orale - Examen 10',
    theme: 'Food & Gastronomy',
    level: 'Mixed (A1-B2)',
    duration: 40,
    totalQuestions: 20,
    sections: [
      {
        id: 'A',
        name: 'Section A - Dialogues Courts',
        questions: [
          { id: 1, audioDescription: '[Audio: Restaurant]', audioText: 'Serveur: "Le plat du jour est un magret de canard à 18 euros." Client: "C\'est servi avec quoi?" Serveur: "Pommes sarladaises et haricots verts. Le dessert est à 7 euros en supplément."', question: 'Combien coûte le plat du jour?', options: ['A) 15 euros', 'B) 16 euros', 'C) 18 euros', 'D) 20 euros'], correctAnswer: 2, explanation: '"18 euros".' },
          { id: 2, audioDescription: '[Audio: Marché]', audioText: 'Client: "Ils sont à combien vos fromages de chèvre?" Fromager: "12 euros le kilo. Goûtez celui-ci, il a affiné 3 semaines." Client: "Délicieux! Je prends 300 grammes."', question: 'Quel est le prix au kilo?', options: ['A) 10 euros', 'B) 12 euros', 'C) 14 euros', 'D) 16 euros'], correctAnswer: 1, explanation: '"12 euros le kilo".' },
          { id: 3, audioDescription: '[Audio: Cours de cuisine]', audioText: 'Chef: "Aujourd\'hui on fait une tarte aux pommes. Préchauffez le four à 180 degrés." Élève: "Pendant combien de temps la cuisson?" Chef: "35 minutes environ, jusqu\'à ce que la pâte soit dorée."', question: 'À quelle température préchauffer le four?', options: ['A) 160 degrés', 'B) 170 degrés', 'C) 180 degrés', 'D) 190 degrés'], correctAnswer: 2, explanation: '"180 degrés".' },
          { id: 4, audioDescription: '[Audio: Épicerie fine]', audioText: 'Vendeuse: "Cette huile d\'olive vient de Provence, première pression à froid." Client: "Elle se conserve combien de temps?" Vendeuse: "18 mois après ouverture, si vous la gardez à l\'abri de la lumière."', question: 'Quelle est la durée de conservation?', options: ['A) 12 mois', 'B) 15 mois', 'C) 18 mois', 'D) 24 mois'], correctAnswer: 2, explanation: '"18 mois après ouverture".' },
          { id: 5, audioDescription: '[Audio: Cave à vin]', audioText: 'Caviste: "Ce Bordeaux 2019 est excellent. Il peut se garder encore 10 ans." Client: "À quel prix?" Caviste: "45 euros la bouteille, 250 euros les 6 avec 10% de remise."', question: 'Combien coûte une bouteille?', options: ['A) 35 euros', 'B) 40 euros', 'C) 45 euros', 'D) 50 euros'], correctAnswer: 2, explanation: '"45 euros la bouteille".' }
        ]
      },
      {
        id: 'B',
        name: 'Section B - Messages Radio/TV',
        questions: [
          { id: 6, audioDescription: '[Audio: Émission culinaire]', audioText: 'Ce soir dans Top Chef, les candidats doivent préparer un menu gastronomique en 2 heures. Entrée, plat et dessert pour 4 convives. Le jury sera composé de 3 chefs étoilés.', question: 'Combien de temps pour le défi?', options: ['A) 1h30', 'B) 2 heures', 'C) 2h30', 'D) 3 heures'], correctAnswer: 1, explanation: '"en 2 heures".' },
          { id: 7, audioDescription: '[Audio: Info consommation]', audioText: 'Les Français consomment en moyenne 50 kg de pain par an, contre 120 kg il y a 50 ans. La baguette tradition reste la plus vendue, suivie par le pain complet qui représente 20% des ventes.', question: 'Quelle consommation de pain par an?', options: ['A) 40 kg', 'B) 50 kg', 'C) 60 kg', 'D) 70 kg'], correctAnswer: 1, explanation: '"50 kg de pain par an".' },
          { id: 8, audioDescription: '[Audio: Salon agriculture]', audioText: 'Le Salon de l\'Agriculture ouvre ses portes du 24 février au 3 mars, porte de Versailles. Entrée 15 euros, gratuit pour les moins de 6 ans. Plus de 600 000 visiteurs attendus sur 9 jours.', question: 'Combien de visiteurs attendus?', options: ['A) 400 000', 'B) 500 000', 'C) 600 000', 'D) 700 000'], correctAnswer: 2, explanation: '"600 000 visiteurs".' },
          { id: 9, audioDescription: '[Audio: Guide restaurant]', audioText: 'Le Guide Michelin 2024 décerne 29 nouveaux étoilés. La France compte désormais 639 restaurants étoilés dont 30 trois-étoiles. Lyon reste la capitale de la gastronomie avec le plus de restaurants par habitant.', question: 'Combien de restaurants trois-étoiles en France?', options: ['A) 25', 'B) 28', 'C) 30', 'D) 33'], correctAnswer: 2, explanation: '"30 trois-étoiles".' },
          { id: 10, audioDescription: '[Audio: Bio et local]', audioText: 'Les ventes de produits bio ont augmenté de 12% cette année. Le panier moyen bio est de 75 euros par mois par foyer. Les fruits et légumes représentent 40% des achats bio.', question: 'Quel est le panier moyen bio mensuel?', options: ['A) 60 euros', 'B) 65 euros', 'C) 70 euros', 'D) 75 euros'], correctAnswer: 3, explanation: '"75 euros par mois".' }
        ]
      },
      {
        id: 'C',
        name: 'Section C - Conversations',
        questions: [
          { id: 11, audioDescription: '[Audio: Dîner entre amis]', audioText: 'Hôte: "J\'ai préparé un coq au vin qui a mijoté 3 heures." Invité: "Ça sent délicieux! C\'est une recette de famille?" Hôte: "Oui, de ma grand-mère. Le secret c\'est le vin de Bourgogne et les champignons frais."', question: 'Combien de temps le plat a-t-il mijoté?', options: ['A) 2 heures', 'B) 2h30', 'C) 3 heures', 'D) 3h30'], correctAnswer: 2, explanation: '"3 heures".' },
          { id: 12, audioDescription: '[Audio: Diététicien]', audioText: 'Diététicien: "Vous devriez consommer 5 portions de fruits et légumes par jour." Patient: "C\'est difficile avec mon emploi du temps!" Diététicien: "Les smoothies et les soupes comptent aussi. Essayez d\'atteindre au moins 400 grammes par jour."', question: 'Quelle quantité de fruits/légumes par jour?', options: ['A) 300 grammes', 'B) 350 grammes', 'C) 400 grammes', 'D) 450 grammes'], correctAnswer: 2, explanation: '"400 grammes par jour".' },
          { id: 13, audioDescription: '[Audio: Boulangerie]', audioText: 'Client: "Vous faites du pain sans gluten?" Boulanger: "Oui, on le prépare le mardi et vendredi. Il fait 400 grammes et coûte 4,50 euros." Client: "Je peux en commander pour samedi?" Boulanger: "Bien sûr, passez commande avant jeudi."', question: 'Quel est le prix du pain sans gluten?', options: ['A) 3,50 euros', 'B) 4,00 euros', 'C) 4,50 euros', 'D) 5,00 euros'], correctAnswer: 2, explanation: '"4,50 euros".' },
          { id: 14, audioDescription: '[Audio: Dégustation vin]', audioText: 'Sommelier: "Ce vin a des arômes de fruits rouges avec une finale épicée." Client: "Il accompagne quoi?" Sommelier: "Viandes rouges ou fromages affinés. Servez-le à 16-18 degrés."', question: 'À quelle température servir ce vin?', options: ['A) 12-14 degrés', 'B) 14-16 degrés', 'C) 16-18 degrés', 'D) 18-20 degrés'], correctAnswer: 2, explanation: '"16-18 degrés".' },
          { id: 15, audioDescription: '[Audio: Traiteur]', audioText: 'Traiteur: "Pour votre mariage de 80 personnes, je propose un menu à 85 euros par tête." Client: "Ça comprend le vin?" Traiteur: "Non, comptez 20 euros de plus pour les boissons. Le gâteau est inclus."', question: 'Quel est le prix par personne sans boissons?', options: ['A) 75 euros', 'B) 80 euros', 'C) 85 euros', 'D) 90 euros'], correctAnswer: 2, explanation: '"85 euros par tête".' }
        ]
      },
      {
        id: 'D',
        name: 'Section D - Exposés',
        questions: [
          { id: 16, audioDescription: '[Audio: Patrimoine culinaire]', audioText: 'La gastronomie française est inscrite au patrimoine mondial de l\'UNESCO depuis 2010. Elle repose sur 4 piliers: le choix des produits, leur association, l\'esthétique de la table et le rituel du repas. Ce patrimoine génère 300 milliards d\'euros de chiffre d\'affaires annuel.', question: 'Depuis quand la gastronomie française est-elle à l\'UNESCO?', options: ['A) 2005', 'B) 2008', 'C) 2010', 'D) 2012'], correctAnswer: 2, explanation: '"depuis 2010".' },
          { id: 17, audioDescription: '[Audio: Suite]', audioText: '[Continuation]', question: 'Quel chiffre d\'affaires génère ce secteur?', options: ['A) 200 milliards', 'B) 250 milliards', 'C) 300 milliards', 'D) 350 milliards'], correctAnswer: 2, explanation: '"300 milliards d\'euros".' },
          { id: 18, audioDescription: '[Audio: Alimentation durable]', audioText: 'Le gaspillage alimentaire représente 10 millions de tonnes par an en France, soit 150 kg par habitant. Les pertes ont lieu à tous les niveaux: 32% chez les consommateurs, 21% en restauration, et le reste dans la production et distribution.', question: 'Quel gaspillage par habitant?', options: ['A) 120 kg', 'B) 135 kg', 'C) 150 kg', 'D) 165 kg'], correctAnswer: 2, explanation: '"150 kg par habitant".' },
          { id: 19, audioDescription: '[Audio: Suite]', audioText: '[Continuation]', question: 'Quel pourcentage du gaspillage vient des consommateurs?', options: ['A) 25%', 'B) 28%', 'C) 32%', 'D) 35%'], correctAnswer: 2, explanation: '"32% chez les consommateurs".' },
          { id: 20, audioDescription: '[Audio: Tendances food]', audioText: 'Les alternatives végétales explosent avec une croissance de 25% par an. Le marché français représente 500 millions d\'euros. 34% des Français se déclarent flexitariens, c\'est-à-dire qu\'ils réduisent leur consommation de viande sans l\'éliminer totalement.', question: 'Quel pourcentage de Français sont flexitariens?', options: ['A) 28%', 'B) 31%', 'C) 34%', 'D) 37%'], correctAnswer: 2, explanation: '"34% des Français".' }
        ]
      }
    ]
  }
];

export function getListeningExam2(examNumber) {
  return LISTENING_EXAMS_2.find(e => e.examNumber === examNumber);
}
