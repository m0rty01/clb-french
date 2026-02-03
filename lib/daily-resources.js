// Daily Resources for CLB French Trainer
// Resources organized by skill and difficulty level (A1 → A2 → B1 → B2)
// Progressively increases complexity throughout the pathway
// Each resource includes specific daily content URLs for focused learning
// Days are structured so earlier days have simpler content, progressing in difficulty

// ============ LISTENING RESOURCES ============
export const LISTENING_RESOURCES = {
  // A1 Level - Very Basic (Slow, Clear French) - Days 1-35 (CLB5) / Days 1-56 (CLB7)
  A1: [
    {
      title: "French Alphabet & Basic Sounds",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=d8cPYMV_EQs",
      description: "Learn the French alphabet with proper pronunciation. Essential foundation.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "French Alphabet - Letters A to Z",
      dayIndex: 1
    },
    {
      title: "Basic French Greetings",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=btqRPuXj-KY",
      description: "Hello, goodbye, how are you - essential first phrases.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Greetings: Bonjour, Au revoir, Comment allez-vous",
      dayIndex: 2
    },
    {
      title: "Numbers 1-20 in French",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=lec_yxkpOP8",
      description: "Learn to count from 1 to 20 with clear pronunciation.",
      duration: "10 min",
      type: "youtube",
      todaysContent: "Numbers: Un to Vingt",
      dayIndex: 3
    },
    {
      title: "Numbers 21-100",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=7QRPjXXrj5Y",
      description: "Master French numbers including tricky 70, 80, 90.",
      duration: "18 min",
      type: "youtube",
      todaysContent: "Numbers: Vingt-et-un to Cent",
      dayIndex: 4
    },
    {
      title: "Days of the Week",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=3rx9LDSIQTU",
      description: "Learn all seven days with pronunciation practice.",
      duration: "8 min",
      type: "youtube",
      todaysContent: "Lundi to Dimanche",
      dayIndex: 5
    },
    {
      title: "Months and Seasons",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=Ynj8GK3Y0N0",
      description: "All 12 months and 4 seasons in French.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "Janvier to Décembre, Les Saisons",
      dayIndex: 6
    },
    {
      title: "Basic Self Introduction",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=UsQHsOBGsNk",
      description: "How to introduce yourself: name, age, nationality.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Je m'appelle..., J'ai...ans",
      dayIndex: 7
    },
    {
      title: "Coffee Break French - Lesson 1",
      url: "https://coffeebreaklanguages.com/coffeebreakfrench/",
      specificUrl: "https://www.youtube.com/watch?v=b4xBdPlT6b0",
      description: "Perfect beginner podcast with slow, clear explanations.",
      duration: "20 min",
      type: "podcast",
      todaysContent: "Introduction to French Language",
      dayIndex: 8
    },
    {
      title: "Common French Phrases - Part 1",
      url: "https://www.youtube.com/c/FrenchPod101",
      specificUrl: "https://www.youtube.com/watch?v=6Stz1Ck4n3c",
      description: "25 essential phrases every beginner needs.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "25 Must-Know French Phrases",
      dayIndex: 9
    },
    {
      title: "Family Members Vocabulary",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=RnWqZNJ3Pcc",
      description: "Learn words for family: mother, father, siblings, etc.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "La Famille - Mère, Père, Frère, Soeur",
      dayIndex: 10
    },
    {
      title: "Colors in French",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=oE3HNw0_gBY",
      description: "All basic colors with agreement rules.",
      duration: "10 min",
      type: "youtube",
      todaysContent: "Les Couleurs - Rouge, Bleu, Vert...",
      dayIndex: 11
    },
    {
      title: "Parts of the Body",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=n_oL-x6ocOA",
      description: "Body vocabulary with pronunciation.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "Le Corps - Tête, Bras, Jambes",
      dayIndex: 12
    },
    {
      title: "Telling Time in French",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=H0MiHJHMmwU",
      description: "How to ask and tell time in French.",
      duration: "16 min",
      type: "youtube",
      todaysContent: "Quelle heure est-il?",
      dayIndex: 13
    },
    {
      title: "Basic Verbs: Être and Avoir",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=o9zLW9Za7jk",
      description: "The two most important French verbs.",
      duration: "18 min",
      type: "youtube",
      todaysContent: "To Be & To Have - Present Tense",
      dayIndex: 14
    },
    {
      title: "At the Café - Ordering",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=OBN6GJdKmJw",
      description: "Real dialogue: ordering at a French café.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Dialogue: Au Café",
      dayIndex: 15
    },
    {
      title: "Easy French - Street Interviews 1",
      url: "https://www.youtube.com/c/EasyFrench",
      specificUrl: "https://www.youtube.com/watch?v=9sYBXjt0Rwo",
      description: "Real French with dual subtitles - beginner friendly.",
      duration: "8 min",
      type: "youtube",
      todaysContent: "What's Your Name? - Street Interviews",
      dayIndex: 16
    },
    {
      title: "French Food Vocabulary",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=WmZOkCi66O4",
      description: "Common food words: fruits, vegetables, meals.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "La Nourriture - Food Vocabulary",
      dayIndex: 17
    },
    {
      title: "Weather Expressions",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=fA_rYjLTpwE",
      description: "How to talk about weather in French.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "Quel temps fait-il?",
      dayIndex: 18
    },
    {
      title: "Rooms of the House",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=NwKBacTKLd4",
      description: "Home vocabulary: bedroom, kitchen, bathroom, etc.",
      duration: "11 min",
      type: "youtube",
      todaysContent: "La Maison - Rooms & Furniture",
      dayIndex: 19
    },
    {
      title: "Common -ER Verbs",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=pJcOFBVtykg",
      description: "Regular -ER verb conjugation patterns.",
      duration: "16 min",
      type: "youtube",
      todaysContent: "Parler, Manger, Aimer - ER Verbs",
      dayIndex: 20
    },
    {
      title: "Daily Routine Vocabulary",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=aIjAiHwvIKI",
      description: "Wake up, eat, work, sleep - daily activities.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Ma Journée - Daily Routine",
      dayIndex: 21
    },
    {
      title: "Asking Questions in French",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=RlSRv1TYA6k",
      description: "How to form basic questions.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "Qui? Quoi? Où? Quand?",
      dayIndex: 22
    },
    {
      title: "Negation in French",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=LdS-bWrTXKE",
      description: "How to say no, not, never, nothing.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "Ne...pas, Ne...jamais",
      dayIndex: 23
    },
    {
      title: "Clothing Vocabulary",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=dXwl5xLrGcA",
      description: "Clothes, shoes, accessories in French.",
      duration: "13 min",
      type: "youtube",
      todaysContent: "Les Vêtements - Clothing",
      dayIndex: 24
    },
    {
      title: "Transportation Words",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=Lp-Q0n_FsPA",
      description: "Car, bus, train, plane - how to get around.",
      duration: "10 min",
      type: "youtube",
      todaysContent: "Les Transports",
      dayIndex: 25
    },
    {
      title: "Articles: Le, La, Les",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=E4F5O9_OYJQ",
      description: "Definite and indefinite articles explained.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "French Articles & Gender",
      dayIndex: 26
    },
    {
      title: "Possessive Adjectives",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=q6Tn_XM3g_g",
      description: "My, your, his, her, our, their in French.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "Mon, Ma, Mes, Ton, Ta, Tes...",
      dayIndex: 27
    },
    {
      title: "Places in Town",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=VGXqXL94hwQ",
      description: "Bakery, pharmacy, bank - city vocabulary.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "En Ville - Places & Directions",
      dayIndex: 28
    },
    {
      title: "At the Restaurant",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=o_yzR6SxJkE",
      description: "Ordering food at a restaurant dialogue.",
      duration: "16 min",
      type: "youtube",
      todaysContent: "Au Restaurant - Ordering Food",
      dayIndex: 29
    },
    {
      title: "Common Adjectives",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=UaTLbpdPwnU",
      description: "Big, small, good, bad - essential adjectives.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "Descriptive Adjectives",
      dayIndex: 30
    },
    {
      title: "Prepositions of Place",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=eLJj5Hj8P_0",
      description: "In, on, under, next to - location words.",
      duration: "11 min",
      type: "youtube",
      todaysContent: "Dans, Sur, Sous, À côté de",
      dayIndex: 31
    },
    {
      title: "Shopping Dialogue",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=3gVLB6B-7AM",
      description: "How to shop and ask for prices.",
      duration: "13 min",
      type: "youtube",
      todaysContent: "Faire les Courses - Shopping",
      dayIndex: 32
    },
    {
      title: "Reflexive Verbs Intro",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=DfqYxUcO8js",
      description: "Introduction to se laver, se réveiller, etc.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Verbes Pronominaux - Basics",
      dayIndex: 33
    },
    {
      title: "Making Appointments",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=tAqGT_jJ_CA",
      description: "Schedule meetings, doctor visits, etc.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "Prendre Rendez-vous",
      dayIndex: 34
    },
    {
      title: "A1 Review & Practice",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=n4Ld-vM8J8Q",
      description: "Comprehensive A1 listening exercise.",
      duration: "20 min",
      type: "youtube",
      todaysContent: "A1 Comprehension Test",
      dayIndex: 35
    }
  ],
  
  // A2 Level - Elementary (Slightly faster, more natural) - Days 36-70 (CLB5) / Days 57-140 (CLB7)
  A2: [
    {
      title: "News in Slow French - Basics",
      url: "https://www.newsinslowfrench.com/",
      specificUrl: "https://www.youtube.com/watch?v=NkCMfOVYtLQ",
      description: "Current events in slow, clear French.",
      duration: "20 min",
      type: "podcast",
      todaysContent: "Weekly News Summary - Beginner Friendly",
      dayIndex: 1
    },
    {
      title: "Passé Composé Introduction",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=KOa8qr5qNLo",
      description: "Past tense with avoir - foundation.",
      duration: "18 min",
      type: "youtube",
      todaysContent: "J'ai mangé, J'ai parlé - Past Tense Basics",
      dayIndex: 2
    },
    {
      title: "Passé Composé with Être",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=NJcDRmjVUjk",
      description: "The 17 verbs that use être in past tense.",
      duration: "20 min",
      type: "youtube",
      todaysContent: "Je suis allé, Elle est partie",
      dayIndex: 3
    },
    {
      title: "InnerFrench - Episode 1",
      url: "https://innerfrench.com/podcast/",
      specificUrl: "https://www.youtube.com/watch?v=k0b6T4FmwCY",
      description: "Hugo speaks clearly about interesting topics.",
      duration: "25 min",
      type: "podcast",
      todaysContent: "Comment apprendre le français",
      dayIndex: 4
    },
    {
      title: "Imparfait Introduction",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=fE5kPgb1A8A",
      description: "The imperfect tense for descriptions and habits.",
      duration: "16 min",
      type: "youtube",
      todaysContent: "Quand j'étais petit... - Imparfait",
      dayIndex: 5
    },
    {
      title: "Duolingo French Podcast - Ep 1",
      url: "https://podcast.duolingo.com/french",
      specificUrl: "https://www.youtube.com/watch?v=F0r9O-mq_cE",
      description: "True story with bilingual narration.",
      duration: "22 min",
      type: "podcast",
      todaysContent: "True Story from France",
      dayIndex: 6
    },
    {
      title: "Direct Object Pronouns",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=SqEPc6gTlGM",
      description: "Le, la, les - replacing nouns.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Je le vois, Je la connais",
      dayIndex: 7
    },
    {
      title: "Indirect Object Pronouns",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=f_vYTlJ0uQU",
      description: "Lui, leur - giving to someone.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "Je lui parle, Je leur donne",
      dayIndex: 8
    },
    {
      title: "Future Tense - Futur Proche",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=j_Kv7PEUkxU",
      description: "Near future: aller + infinitive.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "Je vais manger - Near Future",
      dayIndex: 9
    },
    {
      title: "Comparing Things",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=1BHk3Rj_-Ys",
      description: "Plus que, moins que, aussi que.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Comparatives in French",
      dayIndex: 10
    },
    {
      title: "French Voices - Interview 1",
      url: "https://www.frenchvoices.co.uk/",
      specificUrl: "https://www.youtube.com/watch?v=VbQQj9xwHnk",
      description: "Interview with French native speaker.",
      duration: "18 min",
      type: "podcast",
      todaysContent: "Native Speaker Interview",
      dayIndex: 11
    },
    {
      title: "Relative Pronouns: Qui, Que",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=oR0OiFM2FTc",
      description: "Who, which, that in French.",
      duration: "16 min",
      type: "youtube",
      todaysContent: "La femme qui parle, Le livre que je lis",
      dayIndex: 12
    },
    {
      title: "Health & Doctor Vocabulary",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=I_Cn8Oqwx-s",
      description: "Medical vocabulary and dialogues.",
      duration: "17 min",
      type: "youtube",
      todaysContent: "Chez le Médecin - At the Doctor",
      dayIndex: 13
    },
    {
      title: "Travel Vocabulary",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=fwcRcJ3sVKA",
      description: "Airport, hotel, vacation words.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Voyager - Travel French",
      dayIndex: 14
    },
    {
      title: "Piece of French - Culture",
      url: "https://www.pieceoffrench.com/podcast/",
      specificUrl: "https://www.youtube.com/watch?v=fwcRcJ3sVKA",
      description: "French culture explained in clear French.",
      duration: "18 min",
      type: "podcast",
      todaysContent: "French Culture & Daily Life",
      dayIndex: 15
    },
    {
      title: "The Conditional - Basics",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=ZFJySK5Kt-M",
      description: "Would, could, should in French.",
      duration: "16 min",
      type: "youtube",
      todaysContent: "Je voudrais, J'aimerais - Conditional",
      dayIndex: 16
    },
    {
      title: "Work & Office Vocabulary",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=TKuJVMM8mSA",
      description: "Professional French vocabulary.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "Au Bureau - Office French",
      dayIndex: 17
    },
    {
      title: "InnerFrench - Episode 5",
      url: "https://innerfrench.com/podcast/",
      specificUrl: "https://www.youtube.com/watch?v=pz73YhC3P7Y",
      description: "More complex topics at slower speed.",
      duration: "28 min",
      type: "podcast",
      todaysContent: "La vie en France",
      dayIndex: 18
    },
    {
      title: "Y and En Pronouns",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=c0W4l-8pMYI",
      description: "Two tricky but essential pronouns.",
      duration: "18 min",
      type: "youtube",
      todaysContent: "J'y vais, J'en veux",
      dayIndex: 19
    },
    {
      title: "Superlatives",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=KqCq5GiKf4E",
      description: "The best, the worst, the most...",
      duration: "13 min",
      type: "youtube",
      todaysContent: "Le plus grand, Le meilleur",
      dayIndex: 20
    },
    {
      title: "Easy French - Street Talk 2",
      url: "https://www.youtube.com/c/EasyFrench",
      specificUrl: "https://www.youtube.com/watch?v=o_qXwKN8cIU",
      description: "Real conversations on the street.",
      duration: "10 min",
      type: "youtube",
      todaysContent: "What Do You Do For Work?",
      dayIndex: 21
    },
    {
      title: "Depuis, Pendant, Pour",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=vT_hkZJ0Qno",
      description: "Time expressions in French.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "For, Since, During - Time Words",
      dayIndex: 22
    },
    {
      title: "French Phone Conversation",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=4G_cthFZeJ8",
      description: "How to answer and make phone calls.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "Au Téléphone - Phone French",
      dayIndex: 23
    },
    {
      title: "Plus-que-parfait Introduction",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=hYlPgKmJG0M",
      description: "The pluperfect tense - had done.",
      duration: "16 min",
      type: "youtube",
      todaysContent: "J'avais déjà mangé - Pluperfect",
      dayIndex: 24
    },
    {
      title: "French Administrative Words",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=ZxJfFe4qH0Q",
      description: "Documents, forms, official vocabulary.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Administrative French",
      dayIndex: 25
    },
    {
      title: "News in Slow French - Week 2",
      url: "https://www.newsinslowfrench.com/",
      specificUrl: "https://www.youtube.com/watch?v=7XuFBqsHM8M",
      description: "More news at A2 level.",
      duration: "20 min",
      type: "podcast",
      todaysContent: "Current Events A2",
      dayIndex: 26
    },
    {
      title: "Subjunctive Introduction",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=E6Y2K3_6HGE",
      description: "First look at the subjunctive mood.",
      duration: "18 min",
      type: "youtube",
      todaysContent: "Il faut que je fasse - Subjunctive Intro",
      dayIndex: 27
    },
    {
      title: "French Banking Vocabulary",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=eBt0YmXYCrU",
      description: "Bank account, transfer, payment terms.",
      duration: "12 min",
      type: "youtube",
      todaysContent: "À la Banque - Banking French",
      dayIndex: 28
    },
    {
      title: "InnerFrench - Episode 10",
      url: "https://innerfrench.com/podcast/",
      specificUrl: "https://www.youtube.com/watch?v=3gVLB6B-7AM",
      description: "Intermediate topics clearly explained.",
      duration: "30 min",
      type: "podcast",
      todaysContent: "French Society Topics",
      dayIndex: 29
    },
    {
      title: "Expressing Emotions",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=UBPq5fTn5Oc",
      description: "Happy, sad, angry, surprised in French.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "Feelings & Emotions Vocabulary",
      dayIndex: 30
    },
    {
      title: "A2 Comprehension Practice",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=n4Ld-vM8J8Q",
      description: "Listening comprehension exercises A2.",
      duration: "20 min",
      type: "youtube",
      todaysContent: "A2 Listening Test",
      dayIndex: 31
    }
  ],
  
  // B1 Level - Intermediate (Natural speed, complex topics) - Days 71-112 (CLB5) / Days 141-252 (CLB7)
  B1: [
    {
      title: "Journal en français facile - RFI",
      url: "https://savoirs.rfi.fr/fr/apprendre-enseigner/langue-francaise/journal-en-francais-facile",
      specificUrl: "https://www.youtube.com/watch?v=7XuFBqsHM8M",
      description: "Daily 10-minute news in simplified French.",
      duration: "10 min",
      type: "podcast",
      todaysContent: "Today's News in Easy French",
      dayIndex: 1
    },
    {
      title: "Français Authentique - Natural Speech",
      url: "https://www.francaisauthentique.com/podcasts",
      specificUrl: "https://www.youtube.com/watch?v=pz73YhC3P7Y",
      description: "Natural French about various topics.",
      duration: "20 min",
      type: "podcast",
      todaysContent: "Improve Your French Naturally",
      dayIndex: 2
    },
    {
      title: "Complex Subjunctive Uses",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=oLBqz0B4cKI",
      description: "When to use subjunctive vs indicative.",
      duration: "22 min",
      type: "youtube",
      todaysContent: "Subjunctive Triggers & Uses",
      dayIndex: 3
    },
    {
      title: "One Thing in a French Day",
      url: "https://onethinginafrenchday.podbean.com/",
      specificUrl: "https://www.youtube.com/watch?v=VGXqXL94hwQ",
      description: "Daily life in France, natural speech.",
      duration: "5 min",
      type: "podcast",
      todaysContent: "A Day in French Life",
      dayIndex: 4
    },
    {
      title: "Passé Simple Overview",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=CkVGgIu6gzw",
      description: "Literary past tense - recognition.",
      duration: "18 min",
      type: "youtube",
      todaysContent: "Passé Simple - For Reading",
      dayIndex: 5
    },
    {
      title: "InnerFrench - Episode 30",
      url: "https://innerfrench.com/podcast/",
      specificUrl: "https://www.youtube.com/watch?v=3gVLB6B-7AM",
      description: "Complex topics at intermediate level.",
      duration: "35 min",
      type: "podcast",
      todaysContent: "InnerFrench Intermediate Episode",
      dayIndex: 6
    },
    {
      title: "Hypothetical Situations",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=TZZjr0QMXAI",
      description: "Si clauses - if I were, if I had...",
      duration: "20 min",
      type: "youtube",
      todaysContent: "Si + Imparfait + Conditionnel",
      dayIndex: 7
    },
    {
      title: "French Debate Show",
      url: "https://www.youtube.com/c/FranceInter",
      specificUrl: "https://www.youtube.com/watch?v=tAqGT_jJ_CA",
      description: "Listen to French people debate topics.",
      duration: "25 min",
      type: "youtube",
      todaysContent: "French Discussion Show",
      dayIndex: 8
    },
    {
      title: "Reported Speech",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=9hC0L7CmTw8",
      description: "He said that, she told me that...",
      duration: "17 min",
      type: "youtube",
      todaysContent: "Discours Indirect - Reported Speech",
      dayIndex: 9
    },
    {
      title: "Balades Podcast",
      url: "https://podcast.ausha.co/balades",
      specificUrl: "https://www.youtube.com/watch?v=tAqGT_jJ_CA",
      description: "French culture at intermediate level.",
      duration: "25 min",
      type: "podcast",
      todaysContent: "French Culture Discussion",
      dayIndex: 10
    },
    {
      title: "Passive Voice in French",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=qcLeM3Qfvss",
      description: "How to form and use passive voice.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "La Voix Passive",
      dayIndex: 11
    },
    {
      title: "French Job Interview",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=7lqyL3LB9gg",
      description: "Complete job interview simulation.",
      duration: "22 min",
      type: "youtube",
      todaysContent: "Entretien d'Embauche",
      dayIndex: 12
    },
    {
      title: "RFI News - Full Speed",
      url: "https://savoirs.rfi.fr/",
      specificUrl: "https://www.youtube.com/watch?v=s29f2ZQDnzk",
      description: "Real news at near-native speed.",
      duration: "15 min",
      type: "podcast",
      todaysContent: "French News - B1 Level",
      dayIndex: 13
    },
    {
      title: "Gerund and Present Participle",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=MqCJu7u8SBg",
      description: "En faisant, en parlant - while doing.",
      duration: "16 min",
      type: "youtube",
      todaysContent: "Gérondif - While Doing",
      dayIndex: 14
    },
    {
      title: "Compréhension Orale B1",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=7lqyL3LB9gg",
      description: "B1 listening comprehension practice.",
      duration: "20 min",
      type: "youtube",
      todaysContent: "B1 Listening Test Practice",
      dayIndex: 15
    },
    {
      title: "French Documentary Clip",
      url: "https://www.youtube.com/c/ARTE",
      specificUrl: "https://www.youtube.com/watch?v=G7Qm0RMOLC0",
      description: "Short documentary in French.",
      duration: "15 min",
      type: "youtube",
      todaysContent: "Documentary: French Society",
      dayIndex: 16
    },
    {
      title: "Advanced Negation",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=ixlCHlEi_Ac",
      description: "Ne...que, ne...guère, ne...point.",
      duration: "14 min",
      type: "youtube",
      todaysContent: "Complex Negation Patterns",
      dayIndex: 17
    },
    {
      title: "French Podcast - Current Events",
      url: "https://www.francaisauthentique.com/",
      specificUrl: "https://www.youtube.com/watch?v=wMOXqPfHqOI",
      description: "Discussion of French current events.",
      duration: "25 min",
      type: "podcast",
      todaysContent: "French Current Affairs",
      dayIndex: 18
    },
    {
      title: "Expressing Cause & Effect",
      url: "https://www.youtube.com/c/LearnFrenchWithAlexa",
      specificUrl: "https://www.youtube.com/watch?v=Z6aJfjpg0Tc",
      description: "Because, therefore, as a result...",
      duration: "16 min",
      type: "youtube",
      todaysContent: "Parce que, Donc, Par conséquent",
      dayIndex: 19
    },
    {
      title: "B1 Mock Test - Listening",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=tPuMV6N8u2g",
      description: "Full B1 listening exam practice.",
      duration: "30 min",
      type: "youtube",
      todaysContent: "B1 Exam Practice",
      dayIndex: 20
    }
  ],
  
  // B2 Level - Upper Intermediate (Native speed, complex content) - Days 253-336 (CLB7 only)
  B2: [
    {
      title: "France Inter - Morning News",
      url: "https://www.radiofrance.fr/franceinter",
      specificUrl: "https://www.youtube.com/watch?v=s29f2ZQDnzk",
      description: "Real morning news at native speed.",
      duration: "30 min",
      type: "radio",
      todaysContent: "French Morning News Analysis",
      dayIndex: 1
    },
    {
      title: "France Culture - Documentary",
      url: "https://www.radiofrance.fr/franceculture",
      specificUrl: "https://www.youtube.com/watch?v=G7Qm0RMOLC0",
      description: "Documentary-style content.",
      duration: "28 min",
      type: "podcast",
      todaysContent: "Documentary: Real Life in France",
      dayIndex: 2
    },
    {
      title: "Transfert - True Stories",
      url: "https://www.slate.fr/transfert",
      specificUrl: "https://www.youtube.com/watch?v=wMOXqPfHqOI",
      description: "True stories by ordinary French people.",
      duration: "30 min",
      type: "podcast",
      todaysContent: "True Story - Native French",
      dayIndex: 3
    },
    {
      title: "Complex Conditional Structures",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=J1vJT2rIuOY",
      description: "Advanced if-then constructions.",
      duration: "22 min",
      type: "youtube",
      todaysContent: "Si + Plus-que-parfait + Conditionnel Passé",
      dayIndex: 4
    },
    {
      title: "Arte Radio - Audio Documentary",
      url: "https://www.arteradio.com/",
      specificUrl: "https://www.youtube.com/watch?v=yjJSJK2mflk",
      description: "High-quality audio documentaries.",
      duration: "25 min",
      type: "podcast",
      todaysContent: "French Audio Documentary",
      dayIndex: 5
    },
    {
      title: "France Info - Fact Check",
      url: "https://www.francetvinfo.fr/",
      specificUrl: "https://www.youtube.com/watch?v=qF4v5x4F9sQ",
      description: "Fact-checking show at native speed.",
      duration: "10 min",
      type: "radio",
      todaysContent: "French Fact-Checking Segment",
      dayIndex: 6
    },
    {
      title: "Advanced Subjunctive",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=E6Y2K3_6HGE",
      description: "Subjunctive in complex sentences.",
      duration: "20 min",
      type: "youtube",
      todaysContent: "Subjonctif Passé & Complex Uses",
      dayIndex: 7
    },
    {
      title: "Political Debate - France",
      url: "https://www.youtube.com/c/FranceInter",
      specificUrl: "https://www.youtube.com/watch?v=K5MfQz6v8jA",
      description: "Real political discussion.",
      duration: "35 min",
      type: "youtube",
      todaysContent: "French Political Debate",
      dayIndex: 8
    },
    {
      title: "Literary French - Reading",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=CkVGgIu6gzw",
      description: "Literary French with analysis.",
      duration: "25 min",
      type: "youtube",
      todaysContent: "French Literature Listening",
      dayIndex: 9
    },
    {
      title: "Compréhension Orale B2",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=tPuMV6N8u2g",
      description: "Advanced listening comprehension.",
      duration: "25 min",
      type: "youtube",
      todaysContent: "B2 Advanced Listening Practice",
      dayIndex: 10
    },
    {
      title: "TEF Listening Practice",
      url: "https://www.youtube.com/c/FrancaisavecPierre",
      specificUrl: "https://www.youtube.com/watch?v=tPuMV6N8u2g",
      description: "TEF exam style listening.",
      duration: "30 min",
      type: "youtube",
      todaysContent: "TEF Exam Listening Section",
      dayIndex: 11
    },
    {
      title: "French Economic News",
      url: "https://www.radiofrance.fr/",
      specificUrl: "https://www.youtube.com/watch?v=qF4v5x4F9sQ",
      description: "Business and economic French.",
      duration: "20 min",
      type: "radio",
      todaysContent: "French Economy Analysis",
      dayIndex: 12
    }
  ]
};

// ============ READING RESOURCES ============
export const READING_RESOURCES = {
  A1: [
    {
      title: "Lingua.com - Very Easy Reading",
      url: "https://lingua.com/french/reading/",
      specificUrl: "https://lingua.com/french/reading/vacances/",
      description: "Short texts with comprehension questions.",
      type: "website",
      todaysContent: "Reading: Les Vacances",
      dayIndex: 1
    },
    {
      title: "French Greetings Article",
      url: "https://www.frenchtoday.com/blog/",
      specificUrl: "https://www.frenchtoday.com/blog/french-vocabulary/french-greetings/",
      description: "Simple article about French greetings.",
      type: "blog",
      todaysContent: "French Greetings & Politeness",
      dayIndex: 2
    },
    {
      title: "TV5Monde - A1 Self Introduction",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/a1-debutant/se-presenter",
      description: "Interactive A1 exercises.",
      type: "website",
      todaysContent: "Exercise: Self Introduction",
      dayIndex: 3
    },
    {
      title: "My Family - Easy Text",
      url: "https://lingua.com/french/reading/",
      specificUrl: "https://lingua.com/french/reading/famille/",
      description: "Simple text about family.",
      type: "website",
      todaysContent: "Reading: Ma Famille",
      dayIndex: 4
    },
    {
      title: "LingQ - Mini Story 1",
      url: "https://www.lingq.com/en/learn-french-online/",
      specificUrl: "https://www.lingq.com/en/learn-french-online/courses/411402/",
      description: "Simple story with translation.",
      type: "app",
      todaysContent: "Mini Story: At the Café",
      dayIndex: 5
    },
    {
      title: "Daily Routine Text",
      url: "https://lingua.com/french/reading/",
      specificUrl: "https://lingua.com/french/reading/journee/",
      description: "Reading about a typical day.",
      type: "website",
      todaysContent: "Reading: Une Journée Typique",
      dayIndex: 6
    },
    {
      title: "TV5Monde - Numbers Exercise",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/a1-debutant/les-nombres",
      description: "Practice numbers through reading.",
      type: "website",
      todaysContent: "Numbers Reading Exercise",
      dayIndex: 7
    },
    {
      title: "Simple Weather Text",
      url: "https://lingua.com/french/reading/",
      specificUrl: "https://lingua.com/french/reading/meteo/",
      description: "Reading about weather.",
      type: "website",
      todaysContent: "Reading: Le Temps",
      dayIndex: 8
    },
    {
      title: "French Food Article",
      url: "https://www.frenchtoday.com/blog/",
      specificUrl: "https://www.frenchtoday.com/blog/french-vocabulary/french-food-vocabulary/",
      description: "Vocabulary article about food.",
      type: "blog",
      todaysContent: "French Food Vocabulary",
      dayIndex: 9
    },
    {
      title: "My House Text",
      url: "https://lingua.com/french/reading/",
      specificUrl: "https://lingua.com/french/reading/maison/",
      description: "Simple text about home.",
      type: "website",
      todaysContent: "Reading: Ma Maison",
      dayIndex: 10
    },
    {
      title: "TV5Monde - Colors Exercise",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/a1-debutant/les-couleurs",
      description: "Interactive color exercises.",
      type: "website",
      todaysContent: "Colors & Descriptions",
      dayIndex: 11
    },
    {
      title: "Hobbies Reading",
      url: "https://lingua.com/french/reading/",
      specificUrl: "https://lingua.com/french/reading/loisirs/",
      description: "Text about hobbies and activities.",
      type: "website",
      todaysContent: "Reading: Les Loisirs",
      dayIndex: 12
    },
    {
      title: "Simple Dialogue - Café",
      url: "https://www.frenchtoday.com/",
      specificUrl: "https://www.frenchtoday.com/blog/french-vocabulary/how-to-order-coffee-in-france/",
      description: "Dialogue at a French café.",
      type: "blog",
      todaysContent: "Dialogue: At the Café",
      dayIndex: 13
    },
    {
      title: "City Description",
      url: "https://lingua.com/french/reading/",
      specificUrl: "https://lingua.com/french/reading/ville/",
      description: "Reading about a city.",
      type: "website",
      todaysContent: "Reading: Ma Ville",
      dayIndex: 14
    },
    {
      title: "A1 Review Reading",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/a1-debutant",
      description: "Mixed A1 reading exercises.",
      type: "website",
      todaysContent: "A1 Comprehension Review",
      dayIndex: 15
    }
  ],
  
  A2: [
    {
      title: "Le Petit Prince - Chapter 1",
      url: "https://www.ebooksgratuits.com/",
      specificUrl: "https://www.ebooksgratuits.com/html/st_exupery_le_petit_prince.html#chapitre1",
      description: "Classic French book - first chapter.",
      type: "book",
      todaysContent: "Le Petit Prince - Chapitre 1",
      dayIndex: 1
    },
    {
      title: "Le Petit Prince - Chapter 2",
      url: "https://www.ebooksgratuits.com/",
      specificUrl: "https://www.ebooksgratuits.com/html/st_exupery_le_petit_prince.html#chapitre2",
      description: "Continue reading - chapter 2.",
      type: "book",
      todaysContent: "Le Petit Prince - Chapitre 2",
      dayIndex: 2
    },
    {
      title: "TV5Monde - Holiday Story",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/a2-elementaire/raconter-ses-vacances",
      description: "A2 story about holidays.",
      type: "website",
      todaysContent: "Exercise: Talking About Holidays",
      dayIndex: 3
    },
    {
      title: "1jour1actu - Eiffel Tower",
      url: "https://www.1jour1actu.com/",
      specificUrl: "https://www.1jour1actu.com/culture/cest-quoi-la-tour-eiffel",
      description: "News for young readers.",
      type: "website",
      todaysContent: "C'est quoi la Tour Eiffel?",
      dayIndex: 4
    },
    {
      title: "Restaurant Review Text",
      url: "https://lingua.com/french/reading/",
      specificUrl: "https://lingua.com/french/reading/restaurant/",
      description: "A2 level restaurant reading.",
      type: "website",
      todaysContent: "Reading: Au Restaurant",
      dayIndex: 5
    },
    {
      title: "Le Petit Prince - Chapter 3",
      url: "https://www.ebooksgratuits.com/",
      specificUrl: "https://www.ebooksgratuits.com/html/st_exupery_le_petit_prince.html#chapitre3",
      description: "Continue the story.",
      type: "book",
      todaysContent: "Le Petit Prince - Chapitre 3",
      dayIndex: 6
    },
    {
      title: "1jour1actu - French Celebrations",
      url: "https://www.1jour1actu.com/",
      specificUrl: "https://www.1jour1actu.com/france/cest-quoi-le-14-juillet",
      description: "Article about French holidays.",
      type: "website",
      todaysContent: "Article: French Celebrations",
      dayIndex: 7
    },
    {
      title: "TV5Monde - Past Events",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/a2-elementaire/raconter-un-evenement-passe",
      description: "Reading with past tense.",
      type: "website",
      todaysContent: "Narrating Past Events",
      dayIndex: 8
    },
    {
      title: "Travel Blog Entry",
      url: "https://www.frenchtoday.com/",
      specificUrl: "https://www.frenchtoday.com/blog/french-travel/visiting-paris-tips/",
      description: "Blog about traveling in France.",
      type: "blog",
      todaysContent: "Travel Blog: Paris",
      dayIndex: 9
    },
    {
      title: "Le Petit Prince - Chapter 4",
      url: "https://www.ebooksgratuits.com/",
      specificUrl: "https://www.ebooksgratuits.com/html/st_exupery_le_petit_prince.html#chapitre4",
      description: "Continue reading.",
      type: "book",
      todaysContent: "Le Petit Prince - Chapitre 4",
      dayIndex: 10
    },
    {
      title: "French Recipe - Simple",
      url: "https://www.marmiton.org/",
      specificUrl: "https://www.marmiton.org/recettes/recette_crepes-a-la-vanille_31710.aspx",
      description: "Easy French recipe to read.",
      type: "website",
      todaysContent: "Recipe: Crêpes",
      dayIndex: 11
    },
    {
      title: "1jour1actu - School Topic",
      url: "https://www.1jour1actu.com/",
      specificUrl: "https://www.1jour1actu.com/france/cest-quoi-le-brevet",
      description: "Article about French education.",
      type: "website",
      todaysContent: "French School System",
      dayIndex: 12
    },
    {
      title: "TV5Monde - A2 Culture",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/a2-elementaire",
      description: "Cultural reading exercises.",
      type: "website",
      todaysContent: "A2 Cultural Reading",
      dayIndex: 13
    },
    {
      title: "Le Petit Prince - Chapter 5",
      url: "https://www.ebooksgratuits.com/",
      specificUrl: "https://www.ebooksgratuits.com/html/st_exupery_le_petit_prince.html#chapitre5",
      description: "Continue the classic.",
      type: "book",
      todaysContent: "Le Petit Prince - Chapitre 5",
      dayIndex: 14
    },
    {
      title: "A2 Comprehension Test",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/a2-elementaire",
      description: "A2 reading assessment.",
      type: "website",
      todaysContent: "A2 Reading Review",
      dayIndex: 15
    }
  ],
  
  B1: [
    {
      title: "RFI Journal - Transcript",
      url: "https://savoirs.rfi.fr/",
      specificUrl: "https://savoirs.rfi.fr/fr/apprendre-enseigner/langue-francaise/journal-en-francais-facile",
      description: "Read along with the audio news.",
      type: "website",
      todaysContent: "Today's News Transcript",
      dayIndex: 1
    },
    {
      title: "20 Minutes - Society",
      url: "https://www.20minutes.fr/",
      specificUrl: "https://www.20minutes.fr/societe/",
      description: "French newspaper - society section.",
      type: "newspaper",
      todaysContent: "Society News Article",
      dayIndex: 2
    },
    {
      title: "Le Monde - Culture",
      url: "https://www.lemonde.fr/",
      specificUrl: "https://www.lemonde.fr/culture/",
      description: "Culture section of Le Monde.",
      type: "newspaper",
      todaysContent: "Culture Article from Le Monde",
      dayIndex: 3
    },
    {
      title: "TV5Monde - B1 Exercise",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/b1-intermediaire",
      description: "B1 reading comprehension.",
      type: "website",
      todaysContent: "B1 Reading Exercise",
      dayIndex: 4
    },
    {
      title: "French Short Story",
      url: "https://www.gutenberg.org/",
      specificUrl: "https://www.gutenberg.org/ebooks/17989",
      description: "Classic French short story.",
      type: "ebooks",
      todaysContent: "Classic French Short Story",
      dayIndex: 5
    },
    {
      title: "20 Minutes - Tech",
      url: "https://www.20minutes.fr/",
      specificUrl: "https://www.20minutes.fr/high-tech/",
      description: "Technology news in French.",
      type: "newspaper",
      todaysContent: "Tech News Article",
      dayIndex: 6
    },
    {
      title: "Opinion Article",
      url: "https://www.lemonde.fr/",
      specificUrl: "https://www.lemonde.fr/idees/",
      description: "Opinion and ideas section.",
      type: "newspaper",
      todaysContent: "French Opinion Piece",
      dayIndex: 7
    },
    {
      title: "TV5Monde - Environment",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/b1-intermediaire/environnement",
      description: "Environmental topics in French.",
      type: "website",
      todaysContent: "Environmental Article",
      dayIndex: 8
    },
    {
      title: "French Blog - Lifestyle",
      url: "https://www.frenchtoday.com/",
      specificUrl: "https://www.frenchtoday.com/blog/french-culture/",
      description: "Lifestyle blog content.",
      type: "blog",
      todaysContent: "French Lifestyle Article",
      dayIndex: 9
    },
    {
      title: "20 Minutes - World",
      url: "https://www.20minutes.fr/",
      specificUrl: "https://www.20minutes.fr/monde/",
      description: "World news in French.",
      type: "newspaper",
      todaysContent: "International News",
      dayIndex: 10
    },
    {
      title: "B1 Test Reading",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/b1-intermediaire",
      description: "B1 exam-style reading.",
      type: "website",
      todaysContent: "B1 Reading Test Practice",
      dayIndex: 11
    }
  ],
  
  B2: [
    {
      title: "Le Monde - International",
      url: "https://www.lemonde.fr/",
      specificUrl: "https://www.lemonde.fr/international/",
      description: "Complex international analysis.",
      type: "newspaper",
      todaysContent: "International News Analysis",
      dayIndex: 1
    },
    {
      title: "Le Figaro - France",
      url: "https://www.lefigaro.fr/",
      specificUrl: "https://www.lefigaro.fr/actualite-france/",
      description: "French current affairs.",
      type: "newspaper",
      todaysContent: "French Current Affairs",
      dayIndex: 2
    },
    {
      title: "Courrier International",
      url: "https://www.courrierinternational.com/",
      specificUrl: "https://www.courrierinternational.com/article/",
      description: "International perspectives in French.",
      type: "magazine",
      todaysContent: "International Perspective Article",
      dayIndex: 3
    },
    {
      title: "L'Obs - Society",
      url: "https://www.nouvelobs.com/",
      specificUrl: "https://www.nouvelobs.com/societe/",
      description: "In-depth society analysis.",
      type: "magazine",
      todaysContent: "Society Analysis Article",
      dayIndex: 4
    },
    {
      title: "TV5Monde - B2 Exercise",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/b2-avance",
      description: "Advanced reading exercises.",
      type: "website",
      todaysContent: "B2 Advanced Reading",
      dayIndex: 5
    },
    {
      title: "Le Monde - Économie",
      url: "https://www.lemonde.fr/",
      specificUrl: "https://www.lemonde.fr/economie/",
      description: "Economic news and analysis.",
      type: "newspaper",
      todaysContent: "Economic Analysis",
      dayIndex: 6
    },
    {
      title: "Literary Excerpt",
      url: "https://www.gutenberg.org/",
      specificUrl: "https://www.gutenberg.org/ebooks/search/?query=french",
      description: "French literature excerpt.",
      type: "ebooks",
      todaysContent: "French Literature Reading",
      dayIndex: 7
    },
    {
      title: "Le Figaro - Opinion",
      url: "https://www.lefigaro.fr/",
      specificUrl: "https://www.lefigaro.fr/vox/",
      description: "Opinion and debate.",
      type: "newspaper",
      todaysContent: "French Editorial",
      dayIndex: 8
    },
    {
      title: "Scientific Article",
      url: "https://www.lemonde.fr/",
      specificUrl: "https://www.lemonde.fr/sciences/",
      description: "Science news in French.",
      type: "newspaper",
      todaysContent: "Science Article",
      dayIndex: 9
    },
    {
      title: "B2 TEF Reading Practice",
      url: "https://apprendre.tv5monde.com/",
      specificUrl: "https://apprendre.tv5monde.com/fr/exercices/b2-avance",
      description: "TEF exam-style reading.",
      type: "website",
      todaysContent: "TEF Reading Practice",
      dayIndex: 10
    }
  ]
};

// ============ WRITING EXERCISES ============
export const WRITING_EXERCISES = {
  A1: [
    {
      title: "Self-Introduction",
      prompt: "Write 5-8 sentences introducing yourself: your name, age, nationality, where you live, and what you like.",
      example: "Je m'appelle... J'ai... ans. Je suis... J'habite à... J'aime...",
      wordCount: "50-80 words",
      sampleAnswer: "Je m'appelle Marie Dupont. J'ai vingt-cinq ans. Je suis canadienne. J'habite à Toronto, une grande ville en Ontario. Je travaille comme infirmière dans un hôpital. J'aime beaucoup voyager et découvrir de nouvelles cultures. Pendant le weekend, j'aime lire des livres et faire de la randonnée avec mes amis."
    },
    {
      title: "Describe Your Family",
      prompt: "Write about your family members. Include names, relationships, and one detail about each person.",
      example: "Ma mère s'appelle... Elle est... Mon père...",
      wordCount: "60-100 words",
      sampleAnswer: "Ma famille est composée de quatre personnes. Ma mère s'appelle Sophie. Elle est professeur de français et elle adore cuisiner. Mon père s'appelle Pierre. Il travaille comme ingénieur et il aime jouer au golf le weekend. Ma sœur s'appelle Julie. Elle a dix-huit ans et elle étudie la médecine à l'université. Nous habitons tous ensemble dans une maison près du centre-ville."
    },
    {
      title: "Daily Routine",
      prompt: "Describe your typical day from morning to night using present tense verbs.",
      example: "Je me réveille à 7 heures. Je prends le petit-déjeuner...",
      wordCount: "80-100 words",
      sampleAnswer: "Je me réveille à sept heures tous les matins. Je prends une douche et je m'habille. Ensuite, je prends le petit-déjeuner avec du café et des tartines. Je pars au travail à huit heures. Je travaille jusqu'à midi, puis je déjeune à la cafétéria. L'après-midi, je continue à travailler jusqu'à cinq heures. Le soir, je rentre à la maison et je prépare le dîner. Avant de dormir, je regarde un peu la télévision ou je lis un livre."
    },
    {
      title: "My Home",
      prompt: "Describe where you live. Mention rooms, furniture, and what you like about it.",
      example: "J'habite dans un appartement. Il y a trois chambres...",
      wordCount: "60-90 words",
      sampleAnswer: "J'habite dans un appartement au troisième étage d'un immeuble moderne. Il y a deux chambres, un salon, une cuisine et une salle de bains. Dans le salon, il y a un grand canapé et une télévision. Ma chambre a un lit confortable et un bureau pour travailler. J'aime beaucoup mon appartement parce qu'il est lumineux et calme. Il y a aussi un balcon où je prends mon café le matin."
    },
    {
      title: "My Hobbies",
      prompt: "Write about 3 activities you enjoy. Say when and why you like them.",
      example: "J'aime jouer au football. Je joue le weekend parce que...",
      wordCount: "70-100 words",
      sampleAnswer: "J'ai plusieurs passe-temps que j'adore. Premièrement, j'aime jouer au tennis. Je joue tous les samedis avec mon ami parce que c'est un bon exercice. Deuxièmement, j'aime cuisiner. Je prépare souvent de nouveaux plats le weekend parce que c'est relaxant et créatif. Troisièmement, j'aime regarder des films. Je vais au cinéma chaque vendredi soir parce que j'adore les histoires intéressantes. Ces activités me rendent heureux et m'aident à me détendre après le travail."
    }
  ],
  
  A2: [
    {
      title: "Informal Email to a Friend",
      prompt: "Write an email to a French friend inviting them to an event. Include date, time, place, and why they should come.",
      example: "Salut [prénom]! Comment ça va? Je t'écris pour t'inviter à...",
      wordCount: "100-150 words",
      sampleAnswer: "Salut Thomas!\n\nComment ça va? J'espère que tu vas bien. Je t'écris pour t'inviter à ma fête d'anniversaire le samedi 15 mars. La fête commence à 19 heures chez moi. Il y aura de la bonne musique, beaucoup de nourriture et tous nos amis seront là.\n\nJ'organise aussi un barbecue dans le jardin si le temps est beau. Ce sera l'occasion parfaite pour se retrouver et s'amuser ensemble. Tu peux venir avec ta copine si tu veux!\n\nDis-moi si tu peux venir. J'ai vraiment hâte de te voir!\n\nÀ bientôt,\nMarie"
    },
    {
      title: "Describe Your City/Town",
      prompt: "Write about where you live. Include location, size, attractions, and your opinion.",
      example: "J'habite à... C'est une ville de... habitants. Il y a...",
      wordCount: "120-150 words",
      sampleAnswer: "J'habite à Montréal, une grande ville située dans la province de Québec, au Canada. C'est une ville de plus de deux millions d'habitants. Montréal est connue pour sa culture francophone et son architecture magnifique.\n\nDans ma ville, il y a beaucoup de choses à faire. On peut visiter le Vieux-Montréal avec ses bâtiments historiques, se promener sur le Mont-Royal, ou explorer les nombreux musées et galeries d'art. L'été, il y a des festivals de musique et de gastronomie partout dans la ville.\n\nJ'adore vivre ici parce que c'est une ville dynamique avec une vie culturelle riche. Les gens sont accueillants et la nourriture est délicieuse!"
    },
    {
      title: "A Past Experience",
      prompt: "Describe something interesting that happened to you recently. Use passé composé.",
      example: "Le weekend dernier, je suis allé(e)... J'ai vu... C'était...",
      wordCount: "100-150 words",
      sampleAnswer: "Le weekend dernier, je suis allé à un concert de jazz avec mes amis. Nous sommes arrivés au théâtre vers sept heures du soir. Le spectacle a commencé à huit heures.\n\nJ'ai vu un groupe de musiciens incroyables. Ils ont joué pendant deux heures sans pause. La musique était magnifique et l'ambiance était parfaite. J'ai pris beaucoup de photos pour garder un souvenir de cette soirée.\n\nAprès le concert, nous sommes allés dîner dans un petit restaurant italien près du théâtre. Nous avons mangé des pâtes et bu du vin rouge. C'était une soirée vraiment mémorable que je n'oublierai jamais!"
    },
    {
      title: "Restaurant Review",
      prompt: "Write a short review of a restaurant. Describe the food, service, atmosphere, and your recommendation.",
      example: "J'ai mangé au restaurant... La nourriture était... Je recommande...",
      wordCount: "100-130 words",
      sampleAnswer: "J'ai mangé au restaurant \"Le Petit Bistro\" hier soir et je voudrais partager mon expérience. La nourriture était excellente! J'ai commandé le bœuf bourguignon qui était tendre et savoureux. Mon ami a pris le poisson du jour et il était très satisfait aussi.\n\nLe service était rapide et professionnel. Notre serveur était très aimable et a bien répondu à nos questions sur le menu. L'atmosphère du restaurant était chaleureuse et romantique, avec une décoration traditionnelle française.\n\nLe prix était raisonnable pour la qualité. Je recommande vivement ce restaurant pour un dîner spécial ou une occasion romantique. Note: 4,5 étoiles sur 5!"
    },
    {
      title: "Future Plans",
      prompt: "Write about your plans for next year. Use futur proche and futur simple.",
      example: "L'année prochaine, je vais... Je voudrais... J'espère que...",
      wordCount: "120-150 words",
      sampleAnswer: "L'année prochaine sera une année importante pour moi. D'abord, je vais terminer mes études de français et passer l'examen TEF en mars. J'espère obtenir un bon score pour mon dossier d'immigration.\n\nEn été, je voyagerai en France pour améliorer mon français. Je visiterai Paris, Lyon et Nice. Ce sera ma première fois en France et j'ai vraiment hâte!\n\nÀ l'automne, je commencerai un nouveau travail dans une entreprise internationale. Je travaillerai comme gestionnaire de projets. Ce poste me permettra d'utiliser mon français au quotidien.\n\nFinalement, je voudrais aussi acheter un appartement. J'économise de l'argent depuis deux ans et j'espère que ce sera possible l'année prochaine."
    }
  ],
  
  B1: [
    {
      title: "Opinion Paragraph",
      prompt: "Give your opinion on a topic (e.g., social media, remote work). Include arguments and examples.",
      example: "À mon avis... D'une part... D'autre part... En conclusion...",
      wordCount: "150-200 words",
      sampleAnswer: "À mon avis, le télétravail présente plus d'avantages que d'inconvénients pour les employés modernes.\n\nD'une part, travailler de chez soi permet d'économiser du temps et de l'argent. On n'a plus besoin de se déplacer chaque jour, ce qui réduit le stress et la fatigue. Par exemple, je gagne deux heures par jour depuis que je travaille à distance. De plus, on peut mieux organiser son emploi du temps et avoir un meilleur équilibre entre vie professionnelle et personnelle.\n\nD'autre part, certains argumentent que le télétravail peut créer de l'isolement social. C'est vrai que les interactions avec les collègues diminuent. Cependant, les outils de communication modernes permettent de maintenir le contact.\n\nEn conclusion, je pense que le télétravail est une excellente option pour ceux qui savent bien s'organiser. Il représente l'avenir du monde professionnel."
    },
    {
      title: "Formal Email - Request",
      prompt: "Write a formal email requesting information about a French course, job, or service.",
      example: "Madame, Monsieur, Je me permets de vous écrire afin de...",
      wordCount: "150-180 words",
      sampleAnswer: "Objet: Demande d'informations sur les cours de français intensifs\n\nMadame, Monsieur,\n\nJe me permets de vous écrire afin d'obtenir des renseignements sur vos cours de français intensifs. Je suis actuellement en train de préparer mon dossier d'immigration pour le Canada et j'ai besoin d'améliorer mon niveau de français.\n\nJe souhaiterais savoir quels sont les différents programmes que vous proposez, ainsi que leurs durées et leurs tarifs. Je suis particulièrement intéressé par les cours préparant au TEF. Pourriez-vous également m'informer sur les horaires disponibles et les dates de début des prochaines sessions?\n\nDe plus, j'aimerais savoir si vous offrez des facilités de paiement ou des réductions pour les inscriptions anticipées.\n\nJe vous remercie d'avance pour votre réponse et reste à votre disposition pour tout renseignement complémentaire.\n\nVeuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.\n\nJean Martin\nTél: 514-XXX-XXXX\nCourriel: jean.martin@email.com"
    },
    {
      title: "Complaint Letter",
      prompt: "Write a formal complaint about a product or service. State the problem and what you want.",
      example: "Je vous écris pour vous faire part de mon mécontentement concernant...",
      wordCount: "150-200 words",
      sampleAnswer: "Objet: Réclamation concernant une commande défectueuse\n\nMadame, Monsieur,\n\nJe vous écris pour vous faire part de mon mécontentement concernant ma commande numéro 45678, reçue le 15 janvier dernier.\n\nJ'avais commandé un ordinateur portable modèle XYZ au prix de 899 euros. Or, l'appareil que j'ai reçu présente plusieurs défauts: l'écran a des pixels morts, la batterie ne tient pas plus de deux heures, et le clavier ne fonctionne pas correctement.\n\nJ'ai contacté votre service client par téléphone le 17 janvier, mais je n'ai reçu aucune réponse satisfaisante. Cette situation est inacceptable pour un produit neuf de cette gamme de prix.\n\nPar conséquent, je vous demande soit le remplacement de cet appareil par un modèle fonctionnel, soit le remboursement intégral de ma commande. Je vous prie de me répondre dans un délai de 15 jours.\n\nDans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.\n\nPierre Dubois"
    },
    {
      title: "Compare Two Options",
      prompt: "Compare two things (cities, jobs, lifestyles). Give advantages and disadvantages of each.",
      example: "D'un côté... De l'autre côté... Bien que... Cependant...",
      wordCount: "180-220 words",
      sampleAnswer: "Vivre en ville ou à la campagne? C'est une question que beaucoup de gens se posent aujourd'hui. Voici une comparaison des deux modes de vie.\n\nD'un côté, la vie urbaine offre de nombreux avantages. On a accès à plus d'opportunités professionnelles, une vie culturelle riche, et des services de proximité. Les transports en commun facilitent les déplacements. Cependant, la vie en ville a aussi ses inconvénients: le bruit, la pollution, le stress et le coût de la vie élevé.\n\nDe l'autre côté, la vie à la campagne présente d'autres atouts. L'air est plus pur, le rythme de vie est plus calme, et les logements sont généralement moins chers. On peut profiter de la nature et d'un environnement plus sain pour élever des enfants. Néanmoins, les inconvénients existent aussi: moins d'emplois disponibles, isolement social, et dépendance à la voiture.\n\nEn conclusion, le choix dépend des priorités de chacun. Bien que la ville convienne mieux aux jeunes professionnels, la campagne peut être idéale pour les familles recherchant une meilleure qualité de vie."
    },
    {
      title: "Narrate an Event",
      prompt: "Tell the story of an important event in your life. Use past tenses and sequencing words.",
      example: "Tout a commencé quand... Ensuite... Finalement...",
      wordCount: "180-250 words",
      sampleAnswer: "Je voudrais raconter le jour où j'ai obtenu mon premier emploi. C'était un moment très important dans ma vie.\n\nTout a commencé quand j'ai vu une annonce pour un poste d'assistant marketing dans une grande entreprise. J'ai immédiatement envoyé mon CV et ma lettre de motivation. Deux semaines plus tard, j'ai reçu un appel pour un entretien.\n\nLe jour de l'entretien, j'étais très nerveux. Je me suis levé tôt et j'ai mis mon meilleur costume. Ensuite, je suis arrivé au bureau une demi-heure en avance. L'entretien s'est bien passé. Le directeur m'a posé des questions sur mes études et mes expériences. J'ai essayé de répondre calmement et professionnellement.\n\nPuis, j'ai dû attendre une semaine pour avoir une réponse. C'était la semaine la plus longue de ma vie! Finalement, le vendredi suivant, j'ai reçu un courriel m'annonçant que j'étais accepté. J'étais tellement heureux que j'ai sauté de joie!\n\nCe jour a marqué le début de ma carrière professionnelle. J'ai appris que la persévérance et la préparation sont essentielles pour réussir."
    }
  ],
  
  B2: [
    {
      title: "Argumentative Essay",
      prompt: "Write an essay arguing for or against a position. Include introduction, arguments, counterarguments, and conclusion.",
      example: "La question de... suscite de nombreux débats. Certains pensent que... Néanmoins...",
      wordCount: "250-300 words",
      sampleAnswer: "La question de l'impact des réseaux sociaux sur notre société suscite de nombreux débats depuis plusieurs années. Certains considèrent ces plateformes comme un danger pour la santé mentale, tandis que d'autres y voient un formidable outil de communication.\n\nD'un côté, les réseaux sociaux présentent des avantages indéniables. Ils permettent de maintenir le contact avec des proches éloignés, de partager des informations rapidement et de créer des communautés autour d'intérêts communs. De plus, ils offrent une plateforme d'expression aux voix marginalisées et facilitent la mobilisation citoyenne.\n\nNéanmoins, les critiques sont nombreuses et légitimes. L'addiction aux écrans affecte particulièrement les jeunes, entraînant des problèmes de concentration et d'estime de soi. La désinformation se propage rapidement, menaçant le débat démocratique. Par ailleurs, la protection des données personnelles reste insuffisante.\n\nEn conclusion, les réseaux sociaux ne sont ni entièrement bons ni entièrement mauvais. Leur impact dépend largement de l'usage qu'on en fait. Une éducation numérique approfondie et une réglementation plus stricte semblent nécessaires pour maximiser les bénéfices tout en minimisant les risques."
    },
    {
      title: "Formal Letter - Application",
      prompt: "Write a formal cover letter for a job or program. Highlight your qualifications and motivation.",
      example: "Madame, Monsieur, Je vous adresse ma candidature pour le poste de...",
      wordCount: "200-250 words",
      sampleAnswer: "Objet: Candidature au poste de Gestionnaire de projets\n\nMadame, Monsieur,\n\nJe vous adresse ma candidature pour le poste de Gestionnaire de projets publié sur votre site web le 10 janvier dernier.\n\nTitulaire d'un Master en Administration des affaires de l'Université de Montréal, je possède cinq années d'expérience en gestion de projets dans le secteur technologique. Au cours de mon parcours professionnel, j'ai eu l'opportunité de diriger des équipes multiculturelles et de mener à bien des projets d'envergure internationale.\n\nMes compétences en leadership, communication et résolution de problèmes m'ont permis d'obtenir des résultats significatifs. J'ai notamment réduit les délais de livraison de 20% et amélioré la satisfaction client de 35% dans mon poste actuel.\n\nVotre entreprise m'intéresse particulièrement en raison de son engagement envers l'innovation et son environnement de travail collaboratif. Je suis convaincu que mes compétences et mon expérience pourraient contribuer significativement à la réussite de vos projets futurs.\n\nJe me tiens à votre disposition pour un entretien à votre convenance et vous remercie de l'attention portée à ma candidature.\n\nVeuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.\n\nPierre Martin"
    },
    {
      title: "Article for a Magazine",
      prompt: "Write an article about a social issue. Include facts, opinions, and a call to action.",
      example: "De nos jours, la question de... est devenue cruciale...",
      wordCount: "250-300 words",
      sampleAnswer: "L'urgence environnementale: Agir maintenant pour les générations futures\n\nDe nos jours, la question environnementale est devenue cruciale pour l'avenir de notre planète. Les scientifiques sont unanimes: sans action immédiate, les conséquences du changement climatique seront catastrophiques.\n\nLes chiffres sont alarmants. Selon le GIEC, la température mondiale a déjà augmenté de 1,1°C depuis l'ère préindustrielle. Les événements météorologiques extrêmes se multiplient, les glaciers fondent à une vitesse record, et la biodiversité diminue dangereusement.\n\nFace à cette réalité, que pouvons-nous faire? À l'échelle individuelle, chaque geste compte. Réduire sa consommation de viande, privilégier les transports en commun, et limiter le gaspillage alimentaire sont des actions concrètes accessibles à tous. Collectivement, nous devons exiger de nos gouvernements des politiques ambitieuses: transition énergétique accélérée, fin des subventions aux énergies fossiles, et investissements massifs dans les technologies vertes.\n\nLes entreprises ont également un rôle crucial à jouer. Elles doivent adopter des pratiques durables et transparentes, sous peine de perdre la confiance des consommateurs de plus en plus conscients des enjeux environnementaux.\n\nIl est temps d'agir. Chacun d'entre nous a le pouvoir de contribuer au changement. N'attendons pas qu'il soit trop tard. L'avenir de nos enfants en dépend."
    },
    {
      title: "Report Summary",
      prompt: "Summarize a report or article you've read. Include main points and your analysis.",
      example: "Ce rapport met en lumière... Les auteurs soulignent que...",
      wordCount: "200-250 words",
      sampleAnswer: "Résumé du rapport: \"L'avenir du travail à l'ère numérique\"\n\nCe rapport, publié par l'OCDE en 2024, met en lumière les transformations profondes que connaît le marché du travail en raison de la numérisation et de l'intelligence artificielle.\n\nLes auteurs soulignent que 14% des emplois actuels risquent d'être automatisés dans les prochaines décennies, tandis que 32% subiront des modifications significatives. Cependant, le rapport nuance ces projections en indiquant que de nouveaux métiers émergeront également.\n\nPlusieurs recommandations sont formulées. Premièrement, les systèmes éducatifs doivent être repensés pour privilégier les compétences transversales: créativité, pensée critique, et intelligence émotionnelle. Deuxièmement, la formation continue doit devenir la norme pour permettre aux travailleurs de s'adapter aux évolutions technologiques. Enfin, les filets de sécurité sociale doivent être renforcés pour accompagner les transitions professionnelles.\n\nCe rapport est particulièrement pertinent dans le contexte actuel. Son approche équilibrée, reconnaissant à la fois les risques et les opportunités de la transformation numérique, offre une base solide pour la réflexion politique. Toutefois, on peut regretter le manque d'exemples concrets de politiques réussies dans différents pays."
    },
    {
      title: "Problem-Solution Essay",
      prompt: "Identify a problem in society and propose solutions. Be specific and realistic.",
      example: "Face au problème de..., plusieurs solutions peuvent être envisagées...",
      wordCount: "250-300 words",
      sampleAnswer: "La crise du logement: un défi urgent à relever\n\nFace au problème croissant de l'accès au logement dans les grandes métropoles, plusieurs solutions peuvent être envisagées pour améliorer la situation des citoyens les plus vulnérables.\n\nLe constat est préoccupant. Dans les grandes villes françaises et canadiennes, les prix de l'immobilier ont augmenté de plus de 40% en dix ans, tandis que les salaires n'ont progressé que de 15%. Cette situation pousse de nombreuses familles vers la précarité et aggrave les inégalités sociales.\n\nPlusieurs mesures concrètes pourraient contribuer à résoudre cette crise. En premier lieu, la construction de logements sociaux doit être accélérée. Les gouvernements devraient fixer des objectifs ambitieux et contraignants pour les municipalités. Ensuite, l'encadrement des loyers, déjà expérimenté dans certaines villes, devrait être généralisé et renforcé pour protéger les locataires.\n\nPar ailleurs, la fiscalité immobilière pourrait être réformée pour décourager la spéculation. Une taxation plus élevée des logements vacants et des résidences secondaires inciterait les propriétaires à mettre leurs biens sur le marché. Enfin, le développement de l'habitat participatif et des coopératives d'habitation offre des alternatives intéressantes au modèle traditionnel.\n\nCes solutions ne sont pas mutuellement exclusives. C'est une approche globale, combinant intervention publique et innovation sociale, qui permettra de garantir à chacun le droit fondamental à un logement décent."
    }
  ]
};

// ============ SPEAKING EXERCISES ============
export const SPEAKING_EXERCISES = {
  A1: [
    {
      title: "Basic Self-Introduction",
      prompt: "Record yourself introducing yourself in French. Include: name, age, nationality, profession, and one hobby.",
      duration: "30-60 seconds",
      tips: "Speak slowly and clearly. Don't worry about mistakes."
    },
    {
      title: "Numbers Practice",
      prompt: "Count from 1-20, then say 5 phone numbers and 3 dates out loud.",
      duration: "2 minutes",
      tips: "Practice the tricky numbers: 70, 80, 90."
    },
    {
      title: "Describe a Photo",
      prompt: "Look at a simple photo (person, place, or object) and describe what you see using basic vocabulary.",
      duration: "1-2 minutes",
      tips: "Use 'il y a', 'c'est', 'je vois'..."
    },
    {
      title: "Daily Routine Narration",
      prompt: "Describe your typical morning routine from waking up to leaving home.",
      duration: "1-2 minutes",
      tips: "Use time expressions: d'abord, ensuite, puis, enfin."
    },
    {
      title: "Order at a Café",
      prompt: "Role-play ordering coffee and a croissant at a French café. Practice polite phrases.",
      duration: "1 minute",
      tips: "Use: 'Je voudrais...', 'S'il vous plaît', 'Merci'."
    }
  ],
  
  A2: [
    {
      title: "Describe Your Weekend",
      prompt: "Talk about what you did last weekend. Use passé composé with variety of verbs.",
      duration: "2-3 minutes",
      tips: "Mix activities: je suis allé, j'ai mangé, j'ai vu, j'ai fait..."
    },
    {
      title: "Give Directions",
      prompt: "Explain how to get from your home to a nearby landmark. Use direction vocabulary.",
      duration: "2 minutes",
      tips: "Use: tournez à gauche/droite, continuez tout droit, prenez la première rue..."
    },
    {
      title: "Describe a Person",
      prompt: "Describe a family member or friend: appearance, personality, and your relationship.",
      duration: "2-3 minutes",
      tips: "Use adjectives and être/avoir: il est grand, elle a les yeux bleus..."
    },
    {
      title: "Express Preferences",
      prompt: "Compare two things you know (foods, cities, movies) and explain your preference.",
      duration: "2-3 minutes",
      tips: "Use comparatives: plus...que, moins...que, aussi...que."
    },
    {
      title: "Make Plans",
      prompt: "Call a friend (imaginary) and make plans for the weekend. Suggest, accept, or refuse activities.",
      duration: "2-3 minutes",
      tips: "Use: On pourrait..., Tu veux...?, Je préférerais..."
    }
  ],
  
  B1: [
    {
      title: "Express an Opinion",
      prompt: "Give your opinion on a current topic (technology, environment, education) with 2-3 arguments.",
      duration: "3-4 minutes",
      tips: "Use: À mon avis, Je pense que, Il me semble que, D'une part...d'autre part..."
    },
    {
      title: "Explain a Problem",
      prompt: "Describe a problem you've experienced (with a service, product, or situation) and how you resolved it.",
      duration: "3-4 minutes",
      tips: "Structure: problem → cause → solution → result."
    },
    {
      title: "Narrate a Story",
      prompt: "Tell a story from your life using past tenses. Include setting, events, and conclusion.",
      duration: "4-5 minutes",
      tips: "Mix passé composé (actions) and imparfait (descriptions, context)."
    },
    {
      title: "Job Interview Simulation",
      prompt: "Answer common interview questions: Why do you want this job? What are your strengths? Where do you see yourself in 5 years?",
      duration: "5 minutes",
      tips: "Be formal. Use conditional: Je voudrais, Je pourrais..."
    },
    {
      title: "Describe Pros and Cons",
      prompt: "Discuss the advantages and disadvantages of living in a big city vs. small town.",
      duration: "4-5 minutes",
      tips: "Use: L'avantage c'est que..., L'inconvénient c'est que..., Par contre..."
    }
  ],
  
  B2: [
    {
      title: "Defend a Position",
      prompt: "Take a stance on a controversial topic and defend it with structured arguments. Address counterarguments.",
      duration: "5-6 minutes",
      tips: "Use: Certes...mais, Bien que, Malgré, En revanche, Force est de constater..."
    },
    {
      title: "Summarize and React",
      prompt: "Summarize a news article or podcast you consumed, then give your analysis and opinion.",
      duration: "5-6 minutes",
      tips: "Distinguish fact from opinion. Use reporting verbs: affirme, souligne, prétend..."
    },
    {
      title: "Hypothetical Situations",
      prompt: "Answer: 'What would you do if you won the lottery?' or 'If you could change one thing about your country, what would it be?'",
      duration: "4-5 minutes",
      tips: "Use conditional: Si j'avais..., je ferais..., Si c'était possible..."
    },
    {
      title: "Formal Presentation",
      prompt: "Give a 5-minute presentation on a topic you know well. Include introduction, main points, and conclusion.",
      duration: "5-7 minutes",
      tips: "Structure clearly. Use transitions: Premièrement, Deuxièmement, En conclusion..."
    },
    {
      title: "Debate Practice",
      prompt: "Argue both sides of an issue. First argue FOR, then argue AGAINST the same topic.",
      duration: "6-8 minutes",
      tips: "Practice nuance: Certes, mais..., Il est vrai que...cependant..."
    }
  ]
};

// ============ HELPER FUNCTIONS ============

/**
 * Get the difficulty level based on day number and pathway
 * CLB 5: A1 (days 1-35) → A2 (36-70) → B1 (71-112)
 * CLB 7: A1 (1-56) → A2 (57-140) → B1 (141-252) → B2 (253-336)
 */
export function getDifficultyLevel(dayNumber, pathway) {
  if (pathway === 'clb5') {
    if (dayNumber <= 35) return 'A1';
    if (dayNumber <= 70) return 'A2';
    return 'B1';
  } else { // clb7
    if (dayNumber <= 56) return 'A1';
    if (dayNumber <= 140) return 'A2';
    if (dayNumber <= 252) return 'B1';
    return 'B2';
  }
}

/**
 * Get the day offset within the current level
 * This ensures resources rotate through all available content for that level
 */
function getDayOffsetInLevel(dayNumber, pathway) {
  if (pathway === 'clb5') {
    if (dayNumber <= 35) return dayNumber; // A1: days 1-35
    if (dayNumber <= 70) return dayNumber - 35; // A2: days 36-70 → 1-35
    return dayNumber - 70; // B1: days 71-112 → 1-42
  } else { // clb7
    if (dayNumber <= 56) return dayNumber; // A1: days 1-56
    if (dayNumber <= 140) return dayNumber - 56; // A2: days 57-140 → 1-84
    if (dayNumber <= 252) return dayNumber - 140; // B1: days 141-252 → 1-112
    return dayNumber - 252; // B2: days 253-336 → 1-84
  }
}

/**
 * Get a specific resource for the day using rotation within the level
 * Resources are selected based on the day offset within the current difficulty level
 */
function getResourceForDay(resources, dayNumber, pathway) {
  const level = getDifficultyLevel(dayNumber, pathway);
  const levelResources = resources[level] || resources['A1'];
  const dayOffset = getDayOffsetInLevel(dayNumber, pathway);
  const index = (dayOffset - 1) % levelResources.length;
  
  const resource = levelResources[index];
  
  return {
    ...resource,
    level,
    dayNumber,
    // Use the specificUrl as the primary link for the day's content
    primaryUrl: resource.specificUrl || resource.url
  };
}

/**
 * Get all daily resources for a specific day
 * Returns listening, reading, writing, and speaking resources appropriate for the day's difficulty level
 */
export function getDailyResources(dayNumber, pathway) {
  const level = getDifficultyLevel(dayNumber, pathway);
  
  return {
    level,
    dayNumber,
    listening: getResourceForDay(LISTENING_RESOURCES, dayNumber, pathway),
    reading: getResourceForDay(READING_RESOURCES, dayNumber, pathway),
    writing: getResourceForDay(WRITING_EXERCISES, dayNumber, pathway),
    speaking: getResourceForDay(SPEAKING_EXERCISES, dayNumber, pathway)
  };
}

/**
 * Get progress description for user feedback
 * Shows current level, description, and progress percentage
 */
export function getProgressDescription(dayNumber, pathway) {
  const level = getDifficultyLevel(dayNumber, pathway);
  const totalDays = pathway === 'clb5' ? 112 : 336;
  const percent = Math.round((dayNumber / totalDays) * 100);
  
  const levelDescriptions = {
    'A1': 'Foundation Level - Building basic comprehension and simple expressions',
    'A2': 'Elementary Level - Understanding everyday expressions and basic communication',
    'B1': 'Intermediate Level - Handling most situations and expressing opinions',
    'B2': 'Upper Intermediate Level - Complex texts and spontaneous interaction'
  };
  
  // Calculate days remaining in current level
  let daysInCurrentLevel, totalDaysInLevel;
  if (pathway === 'clb5') {
    if (level === 'A1') {
      daysInCurrentLevel = dayNumber;
      totalDaysInLevel = 35;
    } else if (level === 'A2') {
      daysInCurrentLevel = dayNumber - 35;
      totalDaysInLevel = 35;
    } else {
      daysInCurrentLevel = dayNumber - 70;
      totalDaysInLevel = 42;
    }
  } else {
    if (level === 'A1') {
      daysInCurrentLevel = dayNumber;
      totalDaysInLevel = 56;
    } else if (level === 'A2') {
      daysInCurrentLevel = dayNumber - 56;
      totalDaysInLevel = 84;
    } else if (level === 'B1') {
      daysInCurrentLevel = dayNumber - 140;
      totalDaysInLevel = 112;
    } else {
      daysInCurrentLevel = dayNumber - 252;
      totalDaysInLevel = 84;
    }
  }
  
  const levelPercent = Math.round((daysInCurrentLevel / totalDaysInLevel) * 100);
  
  return {
    currentLevel: level,
    description: levelDescriptions[level],
    percentComplete: percent,
    levelPercentComplete: levelPercent,
    daysInCurrentLevel,
    totalDaysInLevel,
    targetLevel: pathway === 'clb5' ? 'B1 (CLB 5)' : 'B2 (CLB 7)'
  };
}

/**
 * Get the next level preview
 * Shows what's coming up when the user advances to the next level
 */
export function getNextLevelPreview(dayNumber, pathway) {
  const currentLevel = getDifficultyLevel(dayNumber, pathway);
  const nextLevelMap = {
    'A1': 'A2',
    'A2': 'B1',
    'B1': 'B2',
    'B2': null
  };
  
  const nextLevel = nextLevelMap[currentLevel];
  if (!nextLevel) return null;
  
  const nextLevelDescriptions = {
    'A2': 'More natural speech speed, past tense, conversations about daily life',
    'B1': 'Complex topics, news comprehension, formal/informal registers',
    'B2': 'Native speed content, debates, literary texts, nuanced expression'
  };
  
  return {
    level: nextLevel,
    description: nextLevelDescriptions[nextLevel]
  };
}
