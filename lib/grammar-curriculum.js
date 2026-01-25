// Grammar Curriculum for CLB French Trainer
// Based on "Practice Makes Perfect: Complete French Grammar" chapter structure
// Each topic includes: explanation, book reference, and quiz questions

export const GRAMMAR_CURRICULUM = {
  // Topics organized by difficulty level and mapped to chapters
  topics: [
    // ============ WEEK 1-2: BASICS ============
    {
      id: 'articles-definite',
      title: 'Les articles définis',
      titleEn: 'Definite Articles (le, la, les)',
      chapter: 'Chapter 1',
      level: 'A1',
      clb5Day: 1,
      clb7Day: 1,
      explanation: `**Les articles définis** sont utilisés pour parler de choses spécifiques ou connues.

• **le** - masculin singulier (le livre = the book)
• **la** - féminin singulier (la table = the table)  
• **l'** - devant une voyelle ou h muet (l'ami, l'histoire)
• **les** - pluriel (les livres = the books)

**Contractions obligatoires:**
• à + le = au (Je vais au cinéma)
• à + les = aux (Je parle aux enfants)
• de + le = du (Je viens du bureau)
• de + les = des (Je parle des vacances)

**Utilisation:**
- Choses spécifiques: Le livre sur la table (The book on the table)
- Généralités: J'aime le chocolat (I like chocolate in general)
- Pays: La France, le Canada, les États-Unis`,
      quiz: [
        { id: 1, question: '___ chat est noir.', options: ['A) Le', 'B) La', 'C) Les', 'D) Un'], correctAnswer: 0, explanation: '"Chat" est masculin singulier → le chat' },
        { id: 2, question: '___ école est grande.', options: ['A) Le', 'B) La', 'C) L\'', 'D) Les'], correctAnswer: 2, explanation: '"École" commence par une voyelle → l\'école' },
        { id: 3, question: 'Je vais ___ supermarché.', options: ['A) à le', 'B) au', 'C) à la', 'D) aux'], correctAnswer: 1, explanation: 'à + le = au (contraction obligatoire)' },
        { id: 4, question: '___ enfants jouent dans le parc.', options: ['A) Le', 'B) La', 'C) L\'', 'D) Les'], correctAnswer: 3, explanation: '"Enfants" est pluriel → les enfants' },
        { id: 5, question: 'Je parle ___ professeur.', options: ['A) à le', 'B) au', 'C) à la', 'D) de le'], correctAnswer: 1, explanation: 'à + le = au' },
        { id: 6, question: 'Elle vient ___ France.', options: ['A) du', 'B) de la', 'C) de', 'D) des'], correctAnswer: 1, explanation: 'de + la France (pas de contraction avec la)' },
        { id: 7, question: 'J\'aime ___ musique classique.', options: ['A) le', 'B) la', 'C) l\'', 'D) les'], correctAnswer: 1, explanation: '"Musique" est féminin → la musique' },
        { id: 8, question: 'Nous parlons ___ vacances.', options: ['A) du', 'B) de la', 'C) des', 'D) de les'], correctAnswer: 2, explanation: 'de + les = des' }
      ]
    },
    {
      id: 'articles-indefinite',
      title: 'Les articles indéfinis',
      titleEn: 'Indefinite Articles (un, une, des)',
      chapter: 'Chapter 1',
      level: 'A1',
      clb5Day: 2,
      clb7Day: 2,
      explanation: `**Les articles indéfinis** sont utilisés pour parler de choses non spécifiques.

• **un** - masculin singulier (un livre = a book)
• **une** - féminin singulier (une table = a table)
• **des** - pluriel (des livres = some books)

**Utilisation:**
- Première mention: J'ai vu un chien (I saw a dog)
- Quantité indéfinie: J'ai des amis (I have some friends)

**Attention à la négation:**
- Affirmatif: J'ai un chat → Négatif: Je n'ai PAS DE chat
- Affirmatif: J'ai des amis → Négatif: Je n'ai PAS D'amis

**un/une → de/d' après négation**`,
      quiz: [
        { id: 1, question: 'J\'ai ___ voiture.', options: ['A) un', 'B) une', 'C) des', 'D) de'], correctAnswer: 1, explanation: '"Voiture" est féminin → une voiture' },
        { id: 2, question: 'Il y a ___ problèmes.', options: ['A) un', 'B) une', 'C) des', 'D) de'], correctAnswer: 2, explanation: 'Pluriel → des problèmes' },
        { id: 3, question: 'Je n\'ai pas ___ frère.', options: ['A) un', 'B) une', 'C) des', 'D) de'], correctAnswer: 3, explanation: 'Après négation: pas DE' },
        { id: 4, question: 'C\'est ___ bonne idée.', options: ['A) un', 'B) une', 'C) des', 'D) de'], correctAnswer: 1, explanation: '"Idée" est féminin → une idée' },
        { id: 5, question: 'Il n\'y a pas ___ étudiants ici.', options: ['A) des', 'B) les', 'C) d\'', 'D) de'], correctAnswer: 2, explanation: 'Négation + voyelle → pas d\'' },
        { id: 6, question: 'J\'ai acheté ___ pommes.', options: ['A) un', 'B) une', 'C) des', 'D) les'], correctAnswer: 2, explanation: 'Pluriel indéfini → des pommes' },
        { id: 7, question: 'C\'est ___ homme intelligent.', options: ['A) un', 'B) une', 'C) des', 'D) l\''], correctAnswer: 0, explanation: '"Homme" est masculin → un homme' },
        { id: 8, question: 'Elle n\'a pas ___ amis.', options: ['A) des', 'B) les', 'C) d\'', 'D) une'], correctAnswer: 2, explanation: 'Négation + voyelle → pas d\'amis' }
      ]
    },
    {
      id: 'articles-partitive',
      title: 'Les articles partitifs',
      titleEn: 'Partitive Articles (du, de la, des)',
      chapter: 'Chapter 1',
      level: 'A1',
      clb5Day: 3,
      clb7Day: 3,
      explanation: `**Les articles partitifs** expriment une quantité indéterminée (some, any).

• **du** - masculin (du pain = some bread)
• **de la** - féminin (de la confiture = some jam)
• **de l'** - devant voyelle (de l'eau = some water)
• **des** - pluriel (des légumes = some vegetables)

**Utilisation:**
- Nourriture/boisson: Je bois du café
- Matière non comptable: Il y a du soleil
- Abstrait: Elle a de la patience

**Après négation → de/d':**
- J'ai du temps → Je n'ai pas DE temps
- Il boit de l'eau → Il ne boit pas D'eau

**Après quantité → de:**
- Beaucoup DE pain (pas "du")
- Un peu DE sucre
- Trop DE travail`,
      quiz: [
        { id: 1, question: 'Je voudrais ___ café, s\'il vous plaît.', options: ['A) le', 'B) du', 'C) un', 'D) de'], correctAnswer: 1, explanation: 'Quantité indéterminée de café → du café' },
        { id: 2, question: 'Elle mange ___ salade.', options: ['A) la', 'B) une', 'C) de la', 'D) de'], correctAnswer: 2, explanation: 'Quantité indéterminée, féminin → de la salade' },
        { id: 3, question: 'Il n\'y a pas ___ lait.', options: ['A) du', 'B) le', 'C) de', 'D) un'], correctAnswer: 2, explanation: 'Après négation → pas DE lait' },
        { id: 4, question: 'J\'ai beaucoup ___ travail.', options: ['A) du', 'B) de', 'C) le', 'D) des'], correctAnswer: 1, explanation: 'Après "beaucoup" → DE travail' },
        { id: 5, question: 'Tu veux ___ eau?', options: ['A) de l\'', 'B) la', 'C) une', 'D) du'], correctAnswer: 0, explanation: 'Voyelle + quantité indéterminée → de l\'eau' },
        { id: 6, question: 'Elle a un peu ___ patience.', options: ['A) de la', 'B) de', 'C) la', 'D) une'], correctAnswer: 1, explanation: 'Après "un peu" → DE patience' },
        { id: 7, question: 'Nous mangeons ___ fruits tous les jours.', options: ['A) les', 'B) des', 'C) de', 'D) du'], correctAnswer: 1, explanation: 'Quantité indéterminée, pluriel → des fruits' },
        { id: 8, question: 'Il ne mange jamais ___ viande.', options: ['A) de la', 'B) la', 'C) de', 'D) une'], correctAnswer: 2, explanation: 'Après négation "jamais" → DE viande' }
      ]
    },
    {
      id: 'nouns-gender',
      title: 'Le genre des noms',
      titleEn: 'Noun Gender (Masculine/Feminine)',
      chapter: 'Chapter 2',
      level: 'A1',
      clb5Day: 4,
      clb7Day: 4,
      explanation: `**Le genre des noms** - En français, tous les noms sont masculins ou féminins.

**Terminaisons généralement masculines:**
• -age: le voyage, le fromage (EXCEPTION: la page, la plage, l'image)
• -ment: le moment, le gouvernement
• -eau: le bateau, le gâteau
• -isme: le tourisme, le journalisme
• -eur (objets): l'ordinateur, le moteur

**Terminaisons généralement féminines:**
• -tion/-sion: la nation, la décision
• -té: la liberté, la beauté
• -ure: la voiture, la nature
• -ence/-ance: la patience, la France
• -ie: la vie, la philosophie

**Noms qui changent de genre:**
• le directeur → la directrice
• l'acteur → l'actrice
• le chanteur → la chanteuse`,
      quiz: [
        { id: 1, question: '___ voyage était fantastique.', options: ['A) Le', 'B) La', 'C) L\'', 'D) Les'], correctAnswer: 0, explanation: '-age = généralement masculin → le voyage' },
        { id: 2, question: '___ décision est difficile.', options: ['A) Le', 'B) La', 'C) L\'', 'D) Un'], correctAnswer: 1, explanation: '-sion = féminin → la décision' },
        { id: 3, question: 'C\'est ___ belle voiture.', options: ['A) un', 'B) une', 'C) le', 'D) des'], correctAnswer: 1, explanation: '-ure = féminin → une voiture' },
        { id: 4, question: '___ gouvernement a changé.', options: ['A) Le', 'B) La', 'C) L\'', 'D) Les'], correctAnswer: 0, explanation: '-ment = masculin → le gouvernement' },
        { id: 5, question: 'J\'admire ___ patience.', options: ['A) le', 'B) la', 'C) son', 'D) les'], correctAnswer: 1, explanation: '-ence = féminin → la patience' },
        { id: 6, question: '___ plage est magnifique.', options: ['A) Le', 'B) La', 'C) L\'', 'D) Un'], correctAnswer: 1, explanation: 'Exception: plage est féminin (malgré -age)' },
        { id: 7, question: '___ liberté est importante.', options: ['A) Le', 'B) La', 'C) L\'', 'D) Une'], correctAnswer: 1, explanation: '-té = féminin → la liberté' },
        { id: 8, question: '___ ordinateur est nouveau.', options: ['A) Le', 'B) La', 'C) L\'', 'D) Les'], correctAnswer: 2, explanation: '-eur (objet) = masculin, voyelle → l\'ordinateur' }
      ]
    },
    {
      id: 'nouns-plural',
      title: 'Le pluriel des noms',
      titleEn: 'Plural of Nouns',
      chapter: 'Chapter 2',
      level: 'A1',
      clb5Day: 5,
      clb7Day: 5,
      explanation: `**Le pluriel des noms** - Formation du pluriel en français.

**Règle générale: ajouter -s**
• le livre → les livres
• la table → les tables

**Cas particuliers:**
• -s, -x, -z → pas de changement: le bus → les bus, le nez → les nez
• -eau, -au → +x: le bateau → les bateaux, le tuyau → les tuyaux
• -eu → +x: le jeu → les jeux (EXCEPTION: le pneu → les pneus)
• -al → -aux: le journal → les journaux, l'animal → les animaux
• -ail → -aux: le travail → les travaux (certains mots)

**Pluriels irréguliers:**
• l'œil → les yeux
• monsieur → messieurs
• madame → mesdames`,
      quiz: [
        { id: 1, question: 'Le pluriel de "le journal" est...', options: ['A) les journals', 'B) les journaux', 'C) les journales', 'D) les journeaux'], correctAnswer: 1, explanation: '-al → -aux: les journaux' },
        { id: 2, question: 'Le pluriel de "le bateau" est...', options: ['A) les bateaus', 'B) les bateaux', 'C) les bateau', 'D) les bateauxs'], correctAnswer: 1, explanation: '-eau → -eaux: les bateaux' },
        { id: 3, question: 'Le pluriel de "le nez" est...', options: ['A) les nezs', 'B) les nez', 'C) les nezes', 'D) les nezx'], correctAnswer: 1, explanation: '-z = pas de changement: les nez' },
        { id: 4, question: 'Le pluriel de "l\'œil" est...', options: ['A) les œils', 'B) les œilx', 'C) les yeux', 'D) les œilles'], correctAnswer: 2, explanation: 'Pluriel irrégulier: les yeux' },
        { id: 5, question: 'Le pluriel de "le travail" est...', options: ['A) les travails', 'B) les travaux', 'C) les travailes', 'D) les travailles'], correctAnswer: 1, explanation: '-ail → -aux: les travaux' },
        { id: 6, question: 'Le pluriel de "le jeu" est...', options: ['A) les jeus', 'B) les jeux', 'C) les jeues', 'D) les jeuxs'], correctAnswer: 1, explanation: '-eu → -eux: les jeux' },
        { id: 7, question: 'Le pluriel de "le bus" est...', options: ['A) les buss', 'B) les bus', 'C) les buses', 'D) les busx'], correctAnswer: 1, explanation: '-s = pas de changement: les bus' },
        { id: 8, question: 'Le pluriel de "l\'animal" est...', options: ['A) les animals', 'B) les animaux', 'C) les animales', 'D) les animalx'], correctAnswer: 1, explanation: '-al → -aux: les animaux' }
      ]
    },
    {
      id: 'adjectives-agreement',
      title: 'L\'accord des adjectifs',
      titleEn: 'Adjective Agreement',
      chapter: 'Chapter 3',
      level: 'A1',
      clb5Day: 6,
      clb7Day: 6,
      explanation: `**L'accord des adjectifs** - Les adjectifs s'accordent en genre et en nombre.

**Formation du féminin:**
• Règle générale: +e → grand → grande, petit → petite
• -e → pas de changement → jeune, rouge, jaune
• -eux → -euse → heureux → heureuse
• -er → -ère → premier → première
• -f → -ve → actif → active
• -on/-en → double consonne +e → bon → bonne

**Adjectifs irréguliers:**
• beau → belle, nouveau → nouvelle, vieux → vieille
• blanc → blanche, frais → fraîche
• long → longue, public → publique

**Formation du pluriel:**
• +s: petit → petits, petite → petites
• -eau → -eaux: beau → beaux, nouveau → nouveaux`,
      quiz: [
        { id: 1, question: 'Une femme ___ (heureux)', options: ['A) heureux', 'B) heureuse', 'C) heureuxe', 'D) heureuses'], correctAnswer: 1, explanation: '-eux → -euse au féminin: heureuse' },
        { id: 2, question: 'Une ___ (beau) maison', options: ['A) beau', 'B) belle', 'C) beaux', 'D) bel'], correctAnswer: 1, explanation: 'beau → belle au féminin' },
        { id: 3, question: 'Des fleurs ___ (blanc)', options: ['A) blanc', 'B) blanche', 'C) blancs', 'D) blanches'], correctAnswer: 3, explanation: 'Féminin pluriel: blanches' },
        { id: 4, question: 'Une idée ___ (actif)', options: ['A) actif', 'B) active', 'C) actife', 'D) actifs'], correctAnswer: 1, explanation: '-f → -ve au féminin: active' },
        { id: 5, question: 'La ___ (premier) fois', options: ['A) premier', 'B) première', 'C) premièr', 'D) premiers'], correctAnswer: 1, explanation: '-er → -ère au féminin: première' },
        { id: 6, question: 'Une ___ (vieux) église', options: ['A) vieux', 'B) vieille', 'C) vieil', 'D) vieilles'], correctAnswer: 1, explanation: 'vieux → vieille au féminin' },
        { id: 7, question: 'Des hommes ___ (sportif)', options: ['A) sportif', 'B) sportifs', 'C) sportive', 'D) sportives'], correctAnswer: 1, explanation: 'Masculin pluriel: +s → sportifs' },
        { id: 8, question: 'Une fille ___ (bon)', options: ['A) bon', 'B) bonne', 'C) bons', 'D) bonnes'], correctAnswer: 1, explanation: '-on → double consonne +e: bonne' }
      ]
    },
    {
      id: 'adjectives-position',
      title: 'La place des adjectifs',
      titleEn: 'Adjective Position',
      chapter: 'Chapter 3',
      level: 'A1',
      clb5Day: 7,
      clb7Day: 7,
      explanation: `**La place des adjectifs** - Où placer l'adjectif en français?

**APRÈS le nom (la plupart des adjectifs):**
• Couleurs: une voiture rouge, une robe bleue
• Nationalités: un film français, une chanson italienne
• Formes: une table ronde, une maison carrée
• Religions: une fête catholique

**AVANT le nom (BANGS):**
• **B**eauty: beau, joli, laid
• **A**ge: jeune, vieux, nouveau, ancien
• **N**umber: premier, deuxième, dernier
• **G**oodness: bon, mauvais, meilleur
• **S**ize: grand, petit, gros, long, court

**Exemples:**
• Une belle maison (beauty = avant)
• Un vieux livre (age = avant)
• Une voiture rouge (color = après)

**Adjectifs qui changent de sens:**
• un grand homme (great) vs un homme grand (tall)
• mon ancien professeur (former) vs une église ancienne (ancient)`,
      quiz: [
        { id: 1, question: 'Choisissez la bonne phrase:', options: ['A) Une rouge voiture', 'B) Une voiture rouge', 'C) Rouge une voiture', 'D) Une voiture de rouge'], correctAnswer: 1, explanation: 'Couleur = après le nom' },
        { id: 2, question: 'Choisissez la bonne phrase:', options: ['A) Un livre vieux', 'B) Vieux un livre', 'C) Un vieux livre', 'D) Un livre de vieux'], correctAnswer: 2, explanation: 'Âge (BANGS) = avant le nom' },
        { id: 3, question: 'Choisissez la bonne phrase:', options: ['A) Une française chanson', 'B) Une chanson française', 'C) Française une chanson', 'D) Une chanson de française'], correctAnswer: 1, explanation: 'Nationalité = après le nom' },
        { id: 4, question: 'Choisissez la bonne phrase:', options: ['A) Une maison belle', 'B) Belle une maison', 'C) Une belle maison', 'D) Une maison de belle'], correctAnswer: 2, explanation: 'Beauté (BANGS) = avant le nom' },
        { id: 5, question: '"Mon ancien professeur" signifie...', options: ['A) Mon professeur âgé', 'B) Mon ex-professeur', 'C) Mon professeur antique', 'D) Mon professeur expérimenté'], correctAnswer: 1, explanation: 'Ancien AVANT = former (ex-)' },
        { id: 6, question: 'Choisissez la bonne phrase:', options: ['A) Un petit chat noir', 'B) Un chat petit noir', 'C) Un noir petit chat', 'D) Un chat noir petit'], correctAnswer: 0, explanation: 'Petit (BANGS) avant + noir (couleur) après' },
        { id: 7, question: '"Un grand homme" signifie...', options: ['A) Un homme de grande taille', 'B) Un homme important/célèbre', 'C) Un homme gros', 'D) Un homme âgé'], correctAnswer: 1, explanation: 'Grand AVANT = great/important' },
        { id: 8, question: 'La ___ chose (premier)', options: ['A) premier chose', 'B) chose première', 'C) première chose', 'D) chose premier'], correctAnswer: 2, explanation: 'Nombre (BANGS) = avant le nom' }
      ]
    },

    // ============ WEEK 2-3: PRONOUNS ============
    {
      id: 'pronouns-subject',
      title: 'Les pronoms sujets',
      titleEn: 'Subject Pronouns',
      chapter: 'Chapter 4',
      level: 'A1',
      clb5Day: 8,
      clb7Day: 8,
      explanation: `**Les pronoms sujets** remplacent le sujet de la phrase.

**Les pronoms:**
• **je** - I (j' devant voyelle)
• **tu** - you (informal, singulier)
• **il/elle/on** - he/she/one(we)
• **nous** - we
• **vous** - you (formal or plural)
• **ils/elles** - they (masc./fem.)

**Utilisation de "on":**
• Sens général: On parle français ici (People speak French here)
• Sens "nous" (familier): On va au cinéma? (Are we going to the movies?)

**Tu vs Vous:**
• Tu = amis, famille, enfants, collègues proches
• Vous = inconnus, supérieurs, personnes âgées, contexte formel

**Ils vs Elles:**
• Ils = groupe masculin OU mixte
• Elles = groupe 100% féminin`,
      quiz: [
        { id: 1, question: '___ suis français.', options: ['A) Tu', 'B) Je', 'C) Il', 'D) Nous'], correctAnswer: 1, explanation: 'Première personne singulier = Je' },
        { id: 2, question: 'Marie et Sophie, ___ sont étudiantes.', options: ['A) ils', 'B) elles', 'C) elle', 'D) nous'], correctAnswer: 1, explanation: 'Groupe féminin = elles' },
        { id: 3, question: 'Pierre et Marie, ___ habitent à Paris.', options: ['A) ils', 'B) elles', 'C) il', 'D) elle'], correctAnswer: 0, explanation: 'Groupe mixte = ils' },
        { id: 4, question: '___aime le chocolat. (I)', options: ['A) Je', 'B) J\'', 'C) Tu', 'D) Il'], correctAnswer: 1, explanation: 'Je + voyelle = J\'' },
        { id: 5, question: 'En France, ___ mange beaucoup de fromage.', options: ['A) il', 'B) nous', 'C) on', 'D) vous'], correctAnswer: 2, explanation: 'On = sens général (les gens)' },
        { id: 6, question: 'Monsieur le Directeur, ___ êtes invité.', options: ['A) tu', 'B) vous', 'C) il', 'D) nous'], correctAnswer: 1, explanation: 'Vouvoiement pour le respect' },
        { id: 7, question: 'Salut Pierre! ___ vas bien?', options: ['A) Vous', 'B) Il', 'C) Tu', 'D) On'], correctAnswer: 2, explanation: 'Tutoiement entre amis' },
        { id: 8, question: '___ allons au restaurant ce soir.', options: ['A) Je', 'B) Tu', 'C) Nous', 'D) Vous'], correctAnswer: 2, explanation: 'Nous = première personne pluriel' }
      ]
    },
    {
      id: 'pronouns-stressed',
      title: 'Les pronoms toniques',
      titleEn: 'Stressed Pronouns (moi, toi, lui...)',
      chapter: 'Chapter 4',
      level: 'A2',
      clb5Day: 9,
      clb7Day: 9,
      explanation: `**Les pronoms toniques** s'utilisent pour insister ou après préposition.

**Les pronoms:**
• moi (je) / toi (tu)
• lui (il) / elle (elle)
• nous / vous
• eux (ils) / elles (elles)

**Utilisations:**
1. **Après préposition:** avec moi, pour toi, chez lui
2. **Pour insister:** Moi, je préfère le café. Lui, il aime le thé.
3. **Seul/réponse courte:** Qui veut venir? - Moi!
4. **Comparaison:** Il est plus grand que moi.
5. **C'est...:** C'est lui qui a fait ça.

**Exemples:**
• Je vais chez elle. (to her place)
• C'est pour nous. (it's for us)
• Lui, il ne comprend rien. (HE doesn't understand anything)`,
      quiz: [
        { id: 1, question: 'Je vais au cinéma avec ___.', options: ['A) il', 'B) lui', 'C) le', 'D) son'], correctAnswer: 1, explanation: 'Après préposition "avec" = lui' },
        { id: 2, question: '___, je préfère le thé.', options: ['A) Je', 'B) Me', 'C) Moi', 'D) Mon'], correctAnswer: 2, explanation: 'Pour insister = Moi, je...' },
        { id: 3, question: 'Elle est plus grande que ___.', options: ['A) je', 'B) moi', 'C) me', 'D) mon'], correctAnswer: 1, explanation: 'Après comparaison "que" = moi' },
        { id: 4, question: 'Ce cadeau est pour ___.', options: ['A) tu', 'B) te', 'C) toi', 'D) ton'], correctAnswer: 2, explanation: 'Après préposition "pour" = toi' },
        { id: 5, question: 'Qui a fait ça? - C\'est ___.', options: ['A) il', 'B) lui', 'C) le', 'D) l\''], correctAnswer: 1, explanation: 'C\'est + pronom tonique = lui' },
        { id: 6, question: 'Ils habitent près de chez ___.', options: ['A) nous', 'B) on', 'C) notre', 'D) nos'], correctAnswer: 0, explanation: 'Après préposition "chez" = nous' },
        { id: 7, question: '___, elles ne viennent pas.', options: ['A) Ils', 'B) Elles', 'C) Leur', 'D) Les'], correctAnswer: 1, explanation: 'Pour insister = Elles, elles...' },
        { id: 8, question: 'Je pense à ___. (them - masc.)', options: ['A) ils', 'B) leur', 'C) eux', 'D) les'], correctAnswer: 2, explanation: 'Après "à" (penser à) = eux' }
      ]
    },
    {
      id: 'pronouns-direct-object',
      title: 'Les pronoms COD',
      titleEn: 'Direct Object Pronouns (le, la, les)',
      chapter: 'Chapter 5',
      level: 'A2',
      clb5Day: 10,
      clb7Day: 10,
      explanation: `**Les pronoms COD** remplacent le complément d'objet direct.

**Les pronoms:**
• **me/m'** (me)
• **te/t'** (you informal)
• **le/l'** (him/it masc.)
• **la/l'** (her/it fem.)
• **nous** (us)
• **vous** (you formal/plural)
• **les** (them)

**Position:** AVANT le verbe conjugué
• Je vois Marie → Je LA vois.
• Tu aimes le film → Tu L'aimes.

**Avec infinitif:** avant l'infinitif
• Je veux voir Marie → Je veux LA voir.

**À l'impératif affirmatif:** après le verbe
• Regarde-LE! Mange-LA!

**Attention:** Le COD répond à la question "quoi?" ou "qui?"
• Tu manges QUOI? → La pomme → Tu LA manges.`,
      quiz: [
        { id: 1, question: 'Tu regardes la télé? - Oui, je ___ regarde.', options: ['A) le', 'B) la', 'C) les', 'D) lui'], correctAnswer: 1, explanation: 'La télé (fém.) = la' },
        { id: 2, question: 'Il aime les films? - Oui, il ___ aime.', options: ['A) le', 'B) la', 'C) les', 'D) leur'], correctAnswer: 2, explanation: 'Les films (pluriel) = les' },
        { id: 3, question: 'Tu vois Marie? - Oui, je ___ vois.', options: ['A) le', 'B) la', 'C) lui', 'D) leur'], correctAnswer: 1, explanation: 'Marie (fém.) = la' },
        { id: 4, question: 'Vous comprenez le professeur? - Non, nous ne ___ comprenons pas.', options: ['A) lui', 'B) le', 'C) la', 'D) leur'], correctAnswer: 1, explanation: 'Le professeur (masc.) = le' },
        { id: 5, question: 'Tu veux manger la pizza? - Oui, je veux ___ manger.', options: ['A) le', 'B) la', 'C) les', 'D) lui'], correctAnswer: 1, explanation: 'COD avec infinitif: je veux LA manger' },
        { id: 6, question: 'Ce livre? ___! (Read it - imperative)', options: ['A) Le lis', 'B) Lis-le', 'C) Lui lis', 'D) Lis-lui'], correctAnswer: 1, explanation: 'Impératif affirmatif: verbe + pronom' },
        { id: 7, question: 'Elle ___ invite souvent. (me)', options: ['A) me', 'B) moi', 'C) je', 'D) mon'], correctAnswer: 0, explanation: 'Me = COD, avant le verbe' },
        { id: 8, question: 'Je connais Paul. → Je ___ connais.', options: ['A) lui', 'B) le', 'C) la', 'D) leur'], correctAnswer: 1, explanation: 'Paul (masc.) = le' }
      ]
    },

    // ============ PRESENT TENSE ============
    {
      id: 'present-er-verbs',
      title: 'Le présent des verbes en -ER',
      titleEn: 'Present Tense: -ER Verbs',
      chapter: 'Chapter 6',
      level: 'A1',
      clb5Day: 11,
      clb7Day: 11,
      explanation: `**Le présent des verbes en -ER** (90% des verbes français)

**Conjugaison:** Radical + terminaisons
PARLER → PARL-
• je parle
• tu parles
• il/elle/on parle
• nous parlons
• vous parlez
• ils/elles parlent

**Verbes courants:**
aimer, manger, travailler, habiter, regarder, écouter, jouer, danser, chanter, étudier

**Attention aux verbes en -GER et -CER:**
• MANGER: nous mangeons (pas "mangons")
• COMMENCER: nous commençons (pas "commencons")

**Utilisation du présent:**
• Actions habituelles: Je travaille tous les jours
• Vérités générales: L'eau bout à 100°C
• Actions en cours: Je mange une pomme
• Futur proche: Demain, je pars en vacances`,
      quiz: [
        { id: 1, question: 'Je ___ le français. (parler)', options: ['A) parle', 'B) parles', 'C) parlons', 'D) parlent'], correctAnswer: 0, explanation: 'je parl-E' },
        { id: 2, question: 'Nous ___ à Paris. (habiter)', options: ['A) habite', 'B) habites', 'C) habitons', 'D) habitent'], correctAnswer: 2, explanation: 'nous habit-ONS' },
        { id: 3, question: 'Tu ___ la musique. (aimer)', options: ['A) aime', 'B) aimes', 'C) aimez', 'D) aiment'], correctAnswer: 1, explanation: 'tu aim-ES' },
        { id: 4, question: 'Ils ___ au football. (jouer)', options: ['A) joue', 'B) joues', 'C) jouons', 'D) jouent'], correctAnswer: 3, explanation: 'ils jou-ENT' },
        { id: 5, question: 'Vous ___ très bien. (danser)', options: ['A) danse', 'B) danses', 'C) dansez', 'D) dansent'], correctAnswer: 2, explanation: 'vous dans-EZ' },
        { id: 6, question: 'Nous ___ au restaurant. (manger)', options: ['A) mangons', 'B) mangeons', 'C) mangez', 'D) mangent'], correctAnswer: 1, explanation: '-GER: nous mange-ONS (garder le e)' },
        { id: 7, question: 'Elle ___ la télévision. (regarder)', options: ['A) regarde', 'B) regardes', 'C) regardons', 'D) regardent'], correctAnswer: 0, explanation: 'elle regard-E' },
        { id: 8, question: 'Nous ___ le travail. (commencer)', options: ['A) commencons', 'B) commençons', 'C) commencez', 'D) commencent'], correctAnswer: 1, explanation: '-CER: nous commenç-ONS (cédille)' }
      ]
    },
    {
      id: 'present-ir-verbs',
      title: 'Le présent des verbes en -IR',
      titleEn: 'Present Tense: -IR Verbs',
      chapter: 'Chapter 6',
      level: 'A2',
      clb5Day: 12,
      clb7Day: 12,
      explanation: `**Le présent des verbes en -IR** (deux groupes)

**Groupe 1: Verbes réguliers** (avec -ISS-)
FINIR → FIN-
• je finis
• tu finis
• il/elle/on finit
• nous finissons
• vous finissez
• ils/elles finissent

**Verbes courants groupe 1:**
finir, choisir, réussir, remplir, obéir, réfléchir, grandir, maigrir, grossir

**Groupe 2: Verbes irréguliers** (comme partir, sortir)
PARTIR → PAR-
• je pars
• tu pars
• il/elle/on part
• nous partons
• vous partez
• ils/elles partent

**Verbes courants groupe 2:**
partir, sortir, dormir, servir, mentir, sentir`,
      quiz: [
        { id: 1, question: 'Je ___ mes devoirs. (finir)', options: ['A) fini', 'B) finis', 'C) finit', 'D) finissons'], correctAnswer: 1, explanation: 'je fin-IS' },
        { id: 2, question: 'Nous ___ le bon restaurant. (choisir)', options: ['A) choisis', 'B) choisit', 'C) choisissons', 'D) choisissent'], correctAnswer: 2, explanation: 'nous chois-ISSONS' },
        { id: 3, question: 'Elle ___ à l\'examen. (réussir)', options: ['A) réussi', 'B) réussis', 'C) réussit', 'D) réussissent'], correctAnswer: 2, explanation: 'il/elle réuss-IT' },
        { id: 4, question: 'Ils ___ le formulaire. (remplir)', options: ['A) remplis', 'B) remplit', 'C) remplissons', 'D) remplissent'], correctAnswer: 3, explanation: 'ils rempl-ISSENT' },
        { id: 5, question: 'Je ___ demain matin. (partir)', options: ['A) parti', 'B) pars', 'C) part', 'D) partons'], correctAnswer: 1, explanation: 'je par-S (irrégulier)' },
        { id: 6, question: 'Tu ___ bien? (dormir)', options: ['A) dormis', 'B) dors', 'C) dort', 'D) dormons'], correctAnswer: 1, explanation: 'tu dor-S (irrégulier)' },
        { id: 7, question: 'Vous ___ ce soir? (sortir)', options: ['A) sortis', 'B) sort', 'C) sortez', 'D) sortent'], correctAnswer: 2, explanation: 'vous sort-EZ' },
        { id: 8, question: 'Nous ___ avant le problème. (réfléchir)', options: ['A) réfléchis', 'B) réfléchit', 'C) réfléchissons', 'D) réfléchissent'], correctAnswer: 2, explanation: 'nous réfléch-ISSONS' }
      ]
    },
    {
      id: 'present-irregular-avoir-etre',
      title: 'Avoir et Être au présent',
      titleEn: 'Avoir and Être (Present)',
      chapter: 'Chapter 6',
      level: 'A1',
      clb5Day: 13,
      clb7Day: 13,
      explanation: `**AVOIR (to have)** et **ÊTRE (to be)** - Les deux verbes les plus importants!

**AVOIR:**
• j'ai
• tu as
• il/elle/on a
• nous avons
• vous avez
• ils/elles ont

**ÊTRE:**
• je suis
• tu es
• il/elle/on est
• nous sommes
• vous êtes
• ils/elles sont

**Expressions avec AVOIR:**
• avoir faim/soif (to be hungry/thirsty)
• avoir chaud/froid (to be hot/cold)
• avoir peur (to be afraid)
• avoir raison/tort (to be right/wrong)
• avoir X ans (to be X years old)
• avoir besoin de (to need)

**Expressions avec ÊTRE:**
• être en retard/avance (to be late/early)
• être d'accord (to agree)`,
      quiz: [
        { id: 1, question: 'J\' ___ 25 ans.', options: ['A) suis', 'B) ai', 'C) es', 'D) a'], correctAnswer: 1, explanation: 'Avoir X ans: j\'AI 25 ans' },
        { id: 2, question: 'Nous ___ fatigués.', options: ['A) avons', 'B) sommes', 'C) ont', 'D) sont'], correctAnswer: 1, explanation: 'Être + adjectif: nous SOMMES' },
        { id: 3, question: 'Tu ___ faim?', options: ['A) es', 'B) as', 'C) a', 'D) ont'], correctAnswer: 1, explanation: 'Avoir faim: tu AS faim' },
        { id: 4, question: 'Ils ___ français.', options: ['A) ont', 'B) sont', 'C) avez', 'D) êtes'], correctAnswer: 1, explanation: 'Être + nationalité: ils SONT' },
        { id: 5, question: 'Elle ___ trois enfants.', options: ['A) est', 'B) a', 'C) sont', 'D) ont'], correctAnswer: 1, explanation: 'Avoir: elle A trois enfants' },
        { id: 6, question: 'Vous ___ raison.', options: ['A) êtes', 'B) avez', 'C) sont', 'D) ont'], correctAnswer: 1, explanation: 'Avoir raison: vous AVEZ raison' },
        { id: 7, question: 'Nous ___ en retard.', options: ['A) avons', 'B) sommes', 'C) ont', 'D) sont'], correctAnswer: 1, explanation: 'Être en retard: nous SOMMES en retard' },
        { id: 8, question: 'Je ___ besoin d\'aide.', options: ['A) suis', 'B) ai', 'C) es', 'D) as'], correctAnswer: 1, explanation: 'Avoir besoin de: j\'AI besoin' }
      ]
    },
    {
      id: 'present-aller-faire',
      title: 'Aller et Faire au présent',
      titleEn: 'Aller and Faire (Present)',
      chapter: 'Chapter 6',
      level: 'A1',
      clb5Day: 14,
      clb7Day: 14,
      explanation: `**ALLER (to go)** et **FAIRE (to do/make)** - Deux verbes très utilisés!

**ALLER:**
• je vais
• tu vas
• il/elle/on va
• nous allons
• vous allez
• ils/elles vont

**FAIRE:**
• je fais
• tu fais
• il/elle/on fait
• nous faisons
• vous faites
• ils/elles font

**ALLER + infinitif = Futur proche:**
• Je vais manger = I'm going to eat
• Il va partir = He's going to leave

**Expressions avec FAIRE:**
• faire du sport/du vélo/de la natation
• faire les courses (to go shopping)
• faire la cuisine (to cook)
• faire le ménage (to clean)
• faire attention (to pay attention)
• Quel temps fait-il? (What's the weather?)`,
      quiz: [
        { id: 1, question: 'Je ___ au cinéma ce soir.', options: ['A) va', 'B) vais', 'C) vas', 'D) allez'], correctAnswer: 1, explanation: 'je VAIS' },
        { id: 2, question: 'Nous ___ du tennis le weekend.', options: ['A) faisons', 'B) faites', 'C) font', 'D) fais'], correctAnswer: 0, explanation: 'nous FAISONS' },
        { id: 3, question: 'Tu ___ bien?', options: ['A) va', 'B) vais', 'C) vas', 'D) allez'], correctAnswer: 2, explanation: 'tu VAS (Comment ça va?)' },
        { id: 4, question: 'Ils ___ les courses.', options: ['A) faisons', 'B) faites', 'C) font', 'D) fais'], correctAnswer: 2, explanation: 'ils FONT' },
        { id: 5, question: 'Je ___ regarder un film. (futur proche)', options: ['A) va', 'B) vais', 'C) vas', 'D) faire'], correctAnswer: 1, explanation: 'Futur proche: je VAIS + infinitif' },
        { id: 6, question: 'Vous ___ attention!', options: ['A) faisons', 'B) faites', 'C) font', 'D) fais'], correctAnswer: 1, explanation: 'vous FAITES' },
        { id: 7, question: 'Qu\'est-ce que tu ___?', options: ['A) fais', 'B) fait', 'C) faites', 'D) font'], correctAnswer: 0, explanation: 'tu FAIS' },
        { id: 8, question: 'On ___ partir bientôt.', options: ['A) vais', 'B) va', 'C) allons', 'D) vont'], correctAnswer: 1, explanation: 'on VA (singulier)' }
      ]
    },

    // ============ PAST TENSES ============
    {
      id: 'passe-compose-avoir',
      title: 'Le passé composé avec avoir',
      titleEn: 'Passé Composé with Avoir',
      chapter: 'Chapter 7',
      level: 'A2',
      clb5Day: 15,
      clb7Day: 15,
      explanation: `**Le passé composé avec AVOIR** - Pour la plupart des verbes

**Formation:** AVOIR conjugué + participe passé

**Participes passés:**
• -ER → -É: parler → parlé, manger → mangé
• -IR → -I: finir → fini, choisir → choisi
• -RE → -U: vendre → vendu, attendre → attendu

**Exemples:**
• J'ai mangé une pizza.
• Tu as fini ton travail.
• Elle a vendu sa voiture.

**Participes passés irréguliers:**
• avoir → eu (j'ai eu)
• être → été (j'ai été malade)
• faire → fait (j'ai fait)
• prendre → pris (j'ai pris)
• voir → vu (j'ai vu)
• lire → lu (j'ai lu)
• écrire → écrit (j'ai écrit)

**Négation:** ne + avoir + pas + participe passé
• Je n'ai pas mangé.`,
      quiz: [
        { id: 1, question: 'Hier, j\' ___ un bon film. (regarder)', options: ['A) ai regardé', 'B) a regardé', 'C) avons regardé', 'D) regardé'], correctAnswer: 0, explanation: 'j\'AI + regardÉ' },
        { id: 2, question: 'Tu ___ ton travail? (finir)', options: ['A) a fini', 'B) as fini', 'C) avez fini', 'D) fini'], correctAnswer: 1, explanation: 'tu AS + finI' },
        { id: 3, question: 'Elle ___ une lettre. (écrire)', options: ['A) a écrit', 'B) a écrite', 'C) est écrit', 'D) a écrire'], correctAnswer: 0, explanation: 'avoir + écrit (participe irrégulier)' },
        { id: 4, question: 'Nous n\' ___ pas ___ le bus. (prendre)', options: ['A) avons...pris', 'B) avons...prendre', 'C) sommes...pris', 'D) ont...pris'], correctAnswer: 0, explanation: 'ne + avoir + pas + participe: n\'avons pas pris' },
        { id: 5, question: 'Ils ___ beaucoup de travail. (avoir)', options: ['A) ont avoir', 'B) ont eu', 'C) a eu', 'D) avons eu'], correctAnswer: 1, explanation: 'avoir → eu: ils ont eu' },
        { id: 6, question: 'Vous ___ ce livre? (lire)', options: ['A) avez lu', 'B) avez lire', 'C) êtes lu', 'D) avez lit'], correctAnswer: 0, explanation: 'lire → lu: vous avez lu' },
        { id: 7, question: 'J\' ___ mes clés. (perdre)', options: ['A) ai perdu', 'B) ai perdre', 'C) suis perdu', 'D) a perdu'], correctAnswer: 0, explanation: 'perdre → perdu: j\'ai perdu' },
        { id: 8, question: 'On ___ un gâteau. (faire)', options: ['A) a fait', 'B) a faire', 'C) avons fait', 'D) est fait'], correctAnswer: 0, explanation: 'faire → fait: on a fait' }
      ]
    },
    {
      id: 'passe-compose-etre',
      title: 'Le passé composé avec être',
      titleEn: 'Passé Composé with Être',
      chapter: 'Chapter 7',
      level: 'A2',
      clb5Day: 16,
      clb7Day: 16,
      explanation: `**Le passé composé avec ÊTRE** - Pour les verbes de mouvement/changement + pronominaux

**DR & MRS VANDERTRAMP:**
• **D**evenir → devenu
• **R**evenir → revenu
• **M**onter → monté
• **R**ester → resté
• **S**ortir → sorti
• **V**enir → venu
• **A**ller → allé
• **N**aître → né
• **D**escendre → descendu
• **E**ntrer → entré
• **R**entrer → rentré
• **T**omber → tombé
• **R**etourner → retourné
• **A**rriver → arrivé
• **M**ourir → mort
• **P**artir → parti

**ACCORD avec le sujet:**
• Elle est allée à Paris.
• Ils sont partis hier.
• Nous sommes arrivés en retard.

**Verbes pronominaux → toujours ÊTRE:**
• Je me suis levé(e).
• Elle s'est habillée.`,
      quiz: [
        { id: 1, question: 'Elle ___ en France. (aller)', options: ['A) a allé', 'B) est allé', 'C) est allée', 'D) as allé'], correctAnswer: 2, explanation: 'être + accord féminin: est allÉE' },
        { id: 2, question: 'Nous ___ à 8 heures. (partir)', options: ['A) avons parti', 'B) sommes parti', 'C) sommes partis', 'D) sont partis'], correctAnswer: 2, explanation: 'être + accord pluriel: sommes partIS' },
        { id: 3, question: 'Il ___ malade. (devenir)', options: ['A) a devenu', 'B) est devenu', 'C) est devenue', 'D) sont devenus'], correctAnswer: 1, explanation: 'devenir + être: est devenu' },
        { id: 4, question: 'Les filles ___ tôt. (arriver)', options: ['A) ont arrivé', 'B) sont arrivé', 'C) sont arrivées', 'D) est arrivées'], correctAnswer: 2, explanation: 'être + accord féminin pluriel: sont arrivÉES' },
        { id: 5, question: 'Je ___ à 7 heures. (se lever)', options: ['A) me suis levé', 'B) m\'ai levé', 'C) suis levé', 'D) me suis lever'], correctAnswer: 0, explanation: 'Verbe pronominal: me suis levé' },
        { id: 6, question: 'Tu ___ hier soir? (sortir)', options: ['A) as sorti', 'B) es sorti', 'C) est sorti', 'D) a sorti'], correctAnswer: 1, explanation: 'sortir + être: tu ES sorti' },
        { id: 7, question: 'Marie ___ en 1990. (naître)', options: ['A) a né', 'B) est né', 'C) est née', 'D) a née'], correctAnswer: 2, explanation: 'naître + être + féminin: est nÉE' },
        { id: 8, question: 'Ils ___ par la fenêtre. (entrer)', options: ['A) ont entré', 'B) sont entré', 'C) sont entrés', 'D) est entrés'], correctAnswer: 2, explanation: 'entrer + être + pluriel: sont entrÉS' }
      ]
    },
    {
      id: 'imparfait',
      title: 'L\'imparfait',
      titleEn: 'The Imperfect Tense',
      chapter: 'Chapter 8',
      level: 'A2',
      clb5Day: 17,
      clb7Day: 17,
      explanation: `**L'imparfait** - Pour décrire le passé (habitudes, descriptions, contexte)

**Formation:** Radical de NOUS au présent + terminaisons
• nous parlons → PARL- + terminaisons
• nous finissons → FINISS- + terminaisons

**Terminaisons:**
• je -ais
• tu -ais
• il/elle/on -ait
• nous -ions
• vous -iez
• ils/elles -aient

**EXCEPTION:** être → ét- (j'étais, tu étais...)

**Utilisations:**
• **Habitudes passées:** Quand j'étais petit, j'allais à l'école à pied.
• **Descriptions:** Il faisait beau. La maison était grande.
• **Actions en cours (interrompues):** Je dormais quand le téléphone a sonné.
• **Avec "si" (hypothèse):** Si j'avais de l'argent...

**Imparfait vs Passé composé:**
• Passé composé = action terminée, ponctuelle
• Imparfait = contexte, durée, répétition`,
      quiz: [
        { id: 1, question: 'Quand j\' ___ jeune, j\'aimais le chocolat. (être)', options: ['A) suis', 'B) étais', 'C) ai été', 'D) était'], correctAnswer: 1, explanation: 'être → ét-: j\'ÉTAIS' },
        { id: 2, question: 'Nous ___ au parc tous les dimanches. (aller)', options: ['A) allons', 'B) allions', 'C) sommes allés', 'D) allais'], correctAnswer: 1, explanation: 'all- + ions: nous ALLIONS' },
        { id: 3, question: 'Il ___ beau ce jour-là. (faire)', options: ['A) faisait', 'B) a fait', 'C) fait', 'D) faisais'], correctAnswer: 0, explanation: 'fais- + ait: il FAISAIT (description)' },
        { id: 4, question: 'Tu ___ tes devoirs quand je suis arrivé. (faire)', options: ['A) fais', 'B) faisais', 'C) as fait', 'D) ferais'], correctAnswer: 1, explanation: 'Action en cours (interrompue): tu FAISAIS' },
        { id: 5, question: 'Les enfants ___ dans le jardin. (jouer)', options: ['A) jouent', 'B) jouaient', 'C) ont joué', 'D) jouais'], correctAnswer: 1, explanation: 'jou- + aient: ils JOUAIENT' },
        { id: 6, question: 'Vous ___ souvent au restaurant? (manger)', options: ['A) mangez', 'B) mangiez', 'C) avez mangé', 'D) mangions'], correctAnswer: 1, explanation: 'mang- + iez: vous MANGIEZ' },
        { id: 7, question: 'Si j\' ___ riche, j\'achèterais une maison.', options: ['A) suis', 'B) étais', 'C) serais', 'D) ai été'], correctAnswer: 1, explanation: 'Si + imparfait (hypothèse): si j\'ÉTAIS' },
        { id: 8, question: 'Elle ___ les cheveux longs. (avoir)', options: ['A) a', 'B) avait', 'C) a eu', 'D) aura'], correctAnswer: 1, explanation: 'av- + ait: elle AVAIT (description)' }
      ]
    },
    {
      id: 'passe-compose-vs-imparfait',
      title: 'Passé composé vs Imparfait',
      titleEn: 'Passé Composé vs Imperfect',
      chapter: 'Chapter 8',
      level: 'B1',
      clb5Day: 18,
      clb7Day: 18,
      explanation: `**Passé composé vs Imparfait** - Quand utiliser chaque temps?

**PASSÉ COMPOSÉ** - Action:
• Unique et terminée: J'ai visité Paris en 2020.
• Soudaine: Le téléphone a sonné.
• Avec durée précise: J'ai attendu 2 heures.
• Séquence d'actions: Je me suis levé, j'ai mangé, je suis parti.

**IMPARFAIT** - Description/Contexte:
• Habitude passée: Je prenais le bus tous les jours.
• Description: Il faisait froid. Elle était belle.
• Action en cours: Je dormais quand...
• Âge/Heure: J'avais 10 ans. Il était midi.

**ENSEMBLE (récit):**
"Je marchais dans la rue (IMPARFAIT - contexte) quand soudain j'ai vu (PASSÉ COMPOSÉ - action) un accident. Il pleuvait (IMPARFAIT - météo). J'ai appelé (PASSÉ COMPOSÉ - action) la police."

**Marqueurs temporels:**
• PC: hier, la semaine dernière, en 2020, soudain, tout à coup
• IMP: quand j'étais jeune, tous les jours, souvent, toujours`,
      quiz: [
        { id: 1, question: 'Hier, je ___ un bon film.', options: ['A) regardais', 'B) ai regardé', 'C) regarde', 'D) regarderai'], correctAnswer: 1, explanation: 'Action terminée hier → passé composé' },
        { id: 2, question: 'Quand j\'___ petit, j\'aimais les glaces.', options: ['A) ai été', 'B) étais', 'C) suis', 'D) serai'], correctAnswer: 1, explanation: 'Habitude passée → imparfait' },
        { id: 3, question: 'Il ___ quand je suis sorti.', options: ['A) a plu', 'B) pleut', 'C) pleuvait', 'D) pleuvra'], correctAnswer: 2, explanation: 'Description du temps → imparfait' },
        { id: 4, question: 'Elle ___ 20 ans quand elle s\'est mariée.', options: ['A) a eu', 'B) avait', 'C) a', 'D) aura'], correctAnswer: 1, explanation: 'Âge (contexte) → imparfait' },
        { id: 5, question: 'Soudain, le téléphone ___.', options: ['A) sonnait', 'B) a sonné', 'C) sonne', 'D) sonnera'], correctAnswer: 1, explanation: '"Soudain" = action soudaine → passé composé' },
        { id: 6, question: 'Tous les étés, nous ___ en Espagne.', options: ['A) sommes allés', 'B) allions', 'C) allons', 'D) irons'], correctAnswer: 1, explanation: '"Tous les étés" = habitude → imparfait' },
        { id: 7, question: 'Je ___ quand tu ___.', options: ['A) dormais / as téléphoné', 'B) ai dormi / téléphonais', 'C) dormais / téléphonais', 'D) ai dormi / as téléphoné'], correctAnswer: 0, explanation: 'Action en cours (IMP) + action soudaine (PC)' },
        { id: 8, question: 'La maison ___ grande et belle.', options: ['A) a été', 'B) était', 'C) est', 'D) sera'], correctAnswer: 1, explanation: 'Description → imparfait' }
      ]
    },

    // ============ FUTURE ============
    {
      id: 'futur-proche',
      title: 'Le futur proche',
      titleEn: 'Near Future (Going to)',
      chapter: 'Chapter 9',
      level: 'A2',
      clb5Day: 19,
      clb7Day: 19,
      explanation: `**Le futur proche** - Pour parler du futur immédiat

**Formation:** ALLER au présent + infinitif

• je vais manger
• tu vas partir
• il/elle/on va dormir
• nous allons voyager
• vous allez comprendre
• ils/elles vont arriver

**Utilisations:**
• Actions immédiates: Attention! Tu vas tomber!
• Plans confirmés: Je vais déménager le mois prochain.
• Intentions: Je vais apprendre le français.

**Négation:** ne + aller + pas + infinitif
• Je ne vais pas sortir ce soir.

**Futur proche vs Futur simple:**
• Futur proche = plus immédiat, plus certain
• Futur simple = plus distant, plus formel`,
      quiz: [
        { id: 1, question: 'Ce soir, je ___ au cinéma.', options: ['A) vais aller', 'B) va aller', 'C) allons aller', 'D) irai'], correctAnswer: 0, explanation: 'je VAIS + infinitif' },
        { id: 2, question: 'Ils ___ leurs vacances en Italie.', options: ['A) va passer', 'B) vais passer', 'C) vont passer', 'D) passeront'], correctAnswer: 2, explanation: 'ils VONT + infinitif' },
        { id: 3, question: 'Tu ne ___ pas ___ demain?', options: ['A) vas...venir', 'B) va...venir', 'C) vais...venir', 'D) allez...venir'], correctAnswer: 0, explanation: 'ne + ALLER + pas + infinitif' },
        { id: 4, question: 'Attention! Le vase ___ !', options: ['A) va tomber', 'B) tombe', 'C) tombera', 'D) tombait'], correctAnswer: 0, explanation: 'Action imminente → futur proche' },
        { id: 5, question: 'Nous ___ une nouvelle voiture.', options: ['A) allons acheter', 'B) va acheter', 'C) vont acheter', 'D) achèterons'], correctAnswer: 0, explanation: 'nous ALLONS + infinitif' },
        { id: 6, question: 'Elle ___ le français l\'année prochaine.', options: ['A) va apprendre', 'B) vais apprendre', 'C) vont apprendre', 'D) apprendra'], correctAnswer: 0, explanation: 'elle VA + infinitif' },
        { id: 7, question: 'Qu\'est-ce que vous ___ faire?', options: ['A) vas', 'B) vais', 'C) allez', 'D) vont'], correctAnswer: 2, explanation: 'vous ALLEZ + infinitif' },
        { id: 8, question: 'On ___ bientôt partir.', options: ['A) vais', 'B) va', 'C) allons', 'D) vont'], correctAnswer: 1, explanation: 'on VA (singulier) + infinitif' }
      ]
    },
    {
      id: 'futur-simple',
      title: 'Le futur simple',
      titleEn: 'Simple Future',
      chapter: 'Chapter 9',
      level: 'B1',
      clb5Day: 20,
      clb7Day: 20,
      explanation: `**Le futur simple** - Pour parler du futur plus distant ou formel

**Formation:** Infinitif + terminaisons
(ou radical irrégulier + terminaisons)

**Terminaisons:**
• je -ai
• tu -as
• il/elle/on -a
• nous -ons
• vous -ez
• ils/elles -ont

**Verbes réguliers:**
• parler → je parlerai, tu parleras...
• finir → je finirai, tu finiras...
• vendre → je vendrai, tu vendras...

**Radicaux irréguliers:**
• être → ser- (je serai)
• avoir → aur- (j'aurai)
• aller → ir- (j'irai)
• faire → fer- (je ferai)
• pouvoir → pourr- (je pourrai)
• vouloir → voudr- (je voudrai)
• venir → viendr- (je viendrai)
• voir → verr- (je verrai)`,
      quiz: [
        { id: 1, question: 'L\'année prochaine, je ___ en France. (voyager)', options: ['A) voyagerai', 'B) voyage', 'C) voyageais', 'D) ai voyagé'], correctAnswer: 0, explanation: 'voyager + ai = voyagerAI' },
        { id: 2, question: 'Demain, il ___ beau. (faire)', options: ['A) fait', 'B) fera', 'C) faisait', 'D) a fait'], correctAnswer: 1, explanation: 'faire → fer- + a = ferA' },
        { id: 3, question: 'Vous ___ le résultat demain. (avoir)', options: ['A) avez', 'B) aurez', 'C) aviez', 'D) avez eu'], correctAnswer: 1, explanation: 'avoir → aur- + ez = aurEZ' },
        { id: 4, question: 'Nous ___ à la fête. (venir)', options: ['A) venons', 'B) viendrons', 'C) venions', 'D) sommes venus'], correctAnswer: 1, explanation: 'venir → viendr- + ons = viendrONS' },
        { id: 5, question: 'Tu ___ content! (être)', options: ['A) es', 'B) seras', 'C) étais', 'D) as été'], correctAnswer: 1, explanation: 'être → ser- + as = serAS' },
        { id: 6, question: 'Ils ___ la vérité un jour. (savoir)', options: ['A) savent', 'B) sauront', 'C) savaient', 'D) ont su'], correctAnswer: 1, explanation: 'savoir → saur- + ont = saurONT' },
        { id: 7, question: 'Je ___ te voir demain. (pouvoir)', options: ['A) peux', 'B) pourrai', 'C) pouvais', 'D) ai pu'], correctAnswer: 1, explanation: 'pouvoir → pourr- + ai = pourrAI' },
        { id: 8, question: 'Elle ___ chez le médecin. (aller)', options: ['A) va', 'B) ira', 'C) allait', 'D) est allée'], correctAnswer: 1, explanation: 'aller → ir- + a = irA' }
      ]
    },

    // Continue with more topics following similar structure...
    // Topics 21-50 for CLB 5 (basic-intermediate)
    // Topics 51-120+ for CLB 7 (intermediate-advanced)
  ]
};

// Get grammar topic for a specific day and pathway
export function getGrammarForDay(pathway, day) {
  const dayField = pathway === 'clb5' ? 'clb5Day' : 'clb7Day';
  return GRAMMAR_CURRICULUM.topics.find(t => t[dayField] === day);
}

// Get all grammar topics for a pathway up to current day
export function getCompletedGrammarTopics(pathway, currentDay) {
  const dayField = pathway === 'clb5' ? 'clb5Day' : 'clb7Day';
  return GRAMMAR_CURRICULUM.topics.filter(t => t[dayField] && t[dayField] < currentDay);
}

// Get upcoming grammar topics
export function getUpcomingGrammarTopics(pathway, currentDay, count = 5) {
  const dayField = pathway === 'clb5' ? 'clb5Day' : 'clb7Day';
  return GRAMMAR_CURRICULUM.topics
    .filter(t => t[dayField] && t[dayField] > currentDay)
    .slice(0, count);
}

// Get topic by ID
export function getGrammarTopicById(topicId) {
  return GRAMMAR_CURRICULUM.topics.find(t => t.id === topicId);
}

// Get all topics
export function getAllGrammarTopics() {
  return GRAMMAR_CURRICULUM.topics;
}
