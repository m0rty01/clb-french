// CLB 5 Pathway - 4 months (16 weeks, ~112 days)
export const CLB5_PATHWAY = {
  id: 'clb5',
  name: 'CLB 5',
  duration: '4 months',
  totalDays: 112,
  totalWeeks: 16,
  description: 'Foundation to functional French for CLB 5 certification',
  months: [
    {
      month: 1,
      name: 'Foundation and Pain Tolerance',
      goal: 'Stop French from feeling alien. Build foundational understanding.',
      weeks: [1, 2, 3, 4],
      activities: {
        grammar: {
          duration: 70, // 60-75 min average
          topics: ['Present tense (regular verbs)', 'Present tense (irregular verbs)', 'Articles (gender, plural)', 'Basic prepositions', 'Question formation', 'Negation', 'Simple sentence structure'],
          bookChapters: ['Ch 1-3: Nouns & Articles', 'Ch 4-6: Present Tense', 'Ch 7: Negation', 'Ch 8: Questions'],
          instructions: 'Complete exercises, do not just read. Writing answers is crucial for accuracy.'
        },
        listening: {
          duration: 45,
          focus: 'Training brain to map sounds to meaning',
          material: 'Slow, learner-level French audio with transcripts',
          method: '1) Listen without transcript, 2) Listen with transcript, 3) Listen without transcript again',
          instructions: 'This process will feel boring. That is normal.'
        },
        speaking: {
          duration: 30,
          focus: 'Producing complete sentences, not elegance',
          activities: ['Read simple texts aloud', 'Answer basic questions about day/studies/plans/work'],
          instructions: 'Record yourself occasionally and listen back.'
        },
        reading: {
          duration: 15,
          material: 'Short texts, emails, notices, simple articles'
        },
        writing: {
          duration: 15,
          focus: 'Summarizing and describing mundane things',
          activities: ['Write 5-8 sentences summarizing what you read'],
          instructions: 'Mundane is good. Mundane passes TEF.'
        }
      }
    },
    {
      month: 2,
      name: 'Comprehension and Control',
      goal: 'Build comprehension skills and control over basic structures.',
      weeks: [5, 6, 7, 8],
      activities: {
        grammar: {
          duration: 45,
          topics: ['Passé composé', 'Futur proche', 'Essential conditionals', 'Connectors (parce que, donc, mais, cependant)'],
          bookChapters: ['Ch 9-11: Past Tenses', 'Ch 12: Future', 'Ch 13: Conditional Basics'],
          instructions: 'You are becoming functional, not a linguist.'
        },
        listening: {
          duration: 60,
          focus: 'Active listening for comprehension',
          material: 'Mix of slow learner audio and slightly faster real-world French with transcripts',
          method: 'Pause, rewind, repeat',
          instructions: 'Passive listening is useless. Active listening builds CLB points.'
        },
        speaking: {
          duration: 45,
          focus: 'Structured answers to TEF prompts',
          activities: ['Introducing yourself', 'Describing studies', 'Explaining a problem', 'Giving simple opinions'],
          instructions: 'Practice templates until boring. Boring is reliable.'
        },
        reading: {
          duration: 15,
          material: 'Short emails, notices, simple articles'
        },
        writing: {
          duration: 30,
          focus: 'Clarity and grammatical acceptability',
          activities: ['Timed short emails', 'Short opinions', 'Short descriptions'],
          instructions: 'CLB 5 writing is about being understandable and grammatically acceptable.'
        }
      }
    },
    {
      month: 3,
      name: 'Exam Shaping',
      goal: 'Prepare for TEF-style tasks with exam strategies.',
      weeks: [9, 10, 11, 12],
      activities: {
        grammar: {
          duration: 25,
          topics: ['Review all previous topics', 'Focus on weak areas'],
          bookChapters: ['Review all chapters'],
          instructions: 'Maintenance mode to prevent rust.'
        },
        listening: {
          duration: 80,
          focus: 'Exam-format practice',
          material: 'TEF-style listening exercises',
          method: 'Practice with timers, learn question types, move on when missing words',
          instructions: 'Stop panicking when you miss a word.'
        },
        speaking: {
          duration: 60,
          focus: 'Structured simulation under time pressure',
          activities: ['Full speaking tasks', 'Timed responses'],
          instructions: 'Stop self-correcting mid-sentence. Silence kills scores faster than mistakes.'
        },
        reading: {
          duration: 20,
          material: 'TEF-style reading passages'
        },
        writing: {
          duration: 45,
          focus: 'Exam-style responses',
          activities: ['Write responses', 'Check against models', 'Fix recurring errors'],
          instructions: 'Originality is irrelevant. Accuracy wins.'
        }
      }
    },
    {
      month: 4,
      name: 'Stabilization and Confidence',
      goal: 'Solidify skills, build confidence, protect minimum score.',
      weeks: [13, 14, 15, 16],
      activities: {
        grammar: {
          duration: 15,
          topics: ['Light review only'],
          bookChapters: ['Quick review of weak areas'],
          instructions: 'Minimal review to maintain knowledge.'
        },
        listening: {
          duration: 60,
          focus: 'Full mock components',
          material: 'Complete TEF listening mocks',
          method: 'One full mock component per day (rotating)',
          instructions: 'Train under exam conditions.'
        },
        speaking: {
          duration: 60,
          focus: 'Template repetition until automatic',
          activities: ['Repeat templates', 'Practice when tired'],
          instructions: 'Test day will not care about your mood. Train to recover from mistakes.'
        },
        reading: {
          duration: 30,
          material: 'TEF reading mocks'
        },
        writing: {
          duration: 45,
          focus: 'Full mock writing tasks',
          activities: ['Complete timed writing mocks'],
          instructions: 'This will feel heavy and repetitive. That is why it works.'
        }
      }
    }
  ]
};

// CLB 7 Pathway - 8-12 months
export const CLB7_PATHWAY = {
  id: 'clb7',
  name: 'CLB 7',
  duration: '8-12 months',
  totalDays: 336, // 12 months
  totalWeeks: 48,
  description: 'Comprehensive training for solid B2- level and CLB 7 certification',
  months: [
    {
      month: 1,
      name: 'Foundation Rebuilding (Part 1)',
      goal: 'Eliminate basic errors. Make present, passé composé, imparfait automatic.',
      weeks: [1, 2, 3, 4],
      activities: {
        grammar: {
          duration: 90,
          topics: ['Present tense mastery', 'Passé composé', 'Imparfait', 'Pronouns', 'Sentence structure'],
          bookChapters: ['Ch 1-6: Foundation', 'Ch 7-11: Tenses'],
          instructions: 'Use Practice Makes Perfect. Written exercises AND spoken sentence production.'
        },
        listening: {
          duration: 60,
          focus: 'Active listening with replay and shadowing',
          material: 'Start with Slow French, progress to medium speed',
          method: 'Always active listening with replay and shadowing',
          instructions: 'Never passive listening.'
        },
        speaking: {
          duration: 30,
          focus: 'Controlled output',
          activities: ['Describing your day', 'Your studies', 'Your plans', 'Retelling short texts'],
          instructions: 'Focus on correct output, not speed.'
        },
        reading: {
          duration: 20,
          material: 'Short articles, simple texts'
        },
        writing: {
          duration: 20,
          focus: 'Short writing tasks',
          activities: ['Short paragraphs', 'Simple descriptions'],
          instructions: 'Quality over quantity.'
        }
      }
    },
    {
      month: 2,
      name: 'Foundation Rebuilding (Part 2)',
      goal: 'Continue eliminating basic errors and building automaticity.',
      weeks: [5, 6, 7, 8],
      activities: {
        grammar: {
          duration: 90,
          topics: ['Passé composé vs Imparfait', 'Object pronouns', 'Reflexive verbs', 'Basic subjunctive awareness'],
          bookChapters: ['Ch 12-16: Advanced Tenses', 'Ch 17-19: Pronouns'],
          instructions: 'Drill until automatic. No shortcuts.'
        },
        listening: {
          duration: 60,
          focus: 'Building speed tolerance',
          material: 'Medium speed French with transcripts',
          method: 'Listen, read, listen again',
          instructions: 'Increase speed gradually.'
        },
        speaking: {
          duration: 30,
          focus: 'Controlled output expansion',
          activities: ['Longer descriptions', 'Simple narratives', 'Basic opinions'],
          instructions: 'Expand vocabulary while maintaining accuracy.'
        },
        reading: {
          duration: 20,
          material: 'News articles, longer texts'
        },
        writing: {
          duration: 25,
          focus: 'Structured short writing',
          activities: ['Emails', 'Short summaries', 'Simple arguments'],
          instructions: 'Focus on structure.'
        }
      }
    },
    {
      month: 3,
      name: 'Transition Month (Part 1)',
      goal: 'Refine grammar and transition to normal-speed French.',
      weeks: [9, 10, 11, 12],
      activities: {
        grammar: {
          duration: 60,
          topics: ['Conditionals', 'Relative pronouns', 'Connectors', 'Complex negation'],
          bookChapters: ['Ch 20-22: Conditionals', 'Ch 23-25: Relative Pronouns'],
          instructions: 'Refinement phase. Quality over quantity.'
        },
        listening: {
          duration: 80,
          focus: 'Normal-speed French tolerance',
          material: 'Canadian or European French at normal speed',
          method: 'Discomfort is the training stimulus',
          instructions: 'Push through discomfort.'
        },
        speaking: {
          duration: 50,
          focus: 'Structured responses',
          activities: ['Giving opinions', 'Comparing options', 'Explaining problems', 'Narrating past events'],
          instructions: 'Start performing in French.'
        },
        reading: {
          duration: 20,
          material: 'Longer articles, varied topics'
        },
        writing: {
          duration: 30,
          focus: 'Deliberate writing',
          activities: ['Short arguments', 'Complaint letters', 'Opinion paragraphs'],
          instructions: 'All writing timed.'
        }
      }
    },
    {
      month: 4,
      name: 'Transition Month (Part 2)',
      goal: 'Continue transition to performing in French.',
      weeks: [13, 14, 15, 16],
      activities: {
        grammar: {
          duration: 60,
          topics: ['Tense contrast', 'Subjunctive introduction', 'Advanced connectors'],
          bookChapters: ['Ch 26-28: Subjunctive', 'Ch 29-30: Advanced Topics'],
          instructions: 'Understanding, not perfection.'
        },
        listening: {
          duration: 85,
          focus: 'Normal speed with varied accents',
          material: 'Mix of Canadian and European French',
          method: 'First pass for gist, second for details',
          instructions: 'Build endurance.'
        },
        speaking: {
          duration: 55,
          focus: 'Extended responses',
          activities: ['2-3 minute responses', 'Complex opinions', 'Problem-solution'],
          instructions: 'Structure is key.'
        },
        reading: {
          duration: 20,
          material: 'Complex articles, formal texts'
        },
        writing: {
          duration: 35,
          focus: 'Longer structured texts',
          activities: ['Formal letters', 'Essays', 'Complex arguments'],
          instructions: 'Logical connectors essential.'
        }
      }
    },
    {
      month: 5,
      name: 'Consolidation (Part 1)',
      goal: 'Build toward B2 level. Others understand you without effort.',
      weeks: [17, 18, 19, 20],
      activities: {
        grammar: {
          duration: 40,
          topics: ['Maintenance', 'Review mistakes', 'Edge cases'],
          bookChapters: ['Review weak areas'],
          instructions: 'Maintenance mode.'
        },
        listening: {
          duration: 75,
          focus: 'Three-pass listening',
          material: 'Normal speed, various sources',
          method: '1) Gist, 2) Details, 3) Inference. Sometimes no transcript first pass.',
          instructions: 'Build inference skills.'
        },
        speaking: {
          duration: 60,
          focus: 'TEF-style tasks',
          activities: ['Full speaking tasks', 'Structured responses'],
          instructions: 'Stop trying to sound interesting. Sound organized.'
        },
        reading: {
          duration: 25,
          material: 'TEF-style passages'
        },
        writing: {
          duration: 40,
          focus: 'Longer, clearer texts',
          activities: ['Essays with connectors', 'Clean paragraphing'],
          instructions: 'Clarity over creativity.'
        }
      }
    },
    {
      month: 6,
      name: 'Consolidation (Part 2)',
      goal: 'Solidify B2 foundations.',
      weeks: [21, 22, 23, 24],
      activities: {
        grammar: {
          duration: 35,
          topics: ['Error pattern correction', 'Weak area drilling'],
          bookChapters: ['Targeted review'],
          instructions: 'Only fix what breaks.'
        },
        listening: {
          duration: 75,
          focus: 'Exam-like conditions',
          material: 'TEF-style listening',
          method: 'Timed, no pausing',
          instructions: 'Build exam stamina.'
        },
        speaking: {
          duration: 60,
          focus: 'Instinctive structure',
          activities: ['Rapid response practice', 'Template automation'],
          instructions: 'Structure should be automatic.'
        },
        reading: {
          duration: 25,
          material: 'Complex TEF passages'
        },
        writing: {
          duration: 45,
          focus: 'Exam-style writing',
          activities: ['Timed essays', 'Formal letters'],
          instructions: 'Speed with accuracy.'
        }
      }
    },
    {
      month: 7,
      name: 'Exam Shaping (Part 1)',
      goal: 'Exam preparation and pressure conditioning.',
      weeks: [25, 26, 27, 28],
      activities: {
        grammar: {
          duration: 20,
          topics: ['Only when error patterns show'],
          bookChapters: ['As needed'],
          instructions: 'Grammar only for errors.'
        },
        listening: {
          duration: 80,
          focus: 'Endurance with background noise',
          material: 'Longer recordings, realistic conditions',
          method: 'Full mock sections daily (rotating)',
          instructions: 'Build endurance.'
        },
        speaking: {
          duration: 70,
          focus: 'Timer pressure',
          activities: ['Timed full tasks', 'Recovery practice'],
          instructions: 'Practice recovering from mistakes, not restarting.'
        },
        reading: {
          duration: 30,
          material: 'Timed TEF passages'
        },
        writing: {
          duration: 50,
          focus: 'Timed, checked, rewritten',
          activities: ['Write, check, rewrite cleaner'],
          instructions: 'Mentally tiring means its working.'
        }
      }
    },
    {
      month: 8,
      name: 'Exam Shaping (Part 2)',
      goal: 'Final exam preparation push.',
      weeks: [29, 30, 31, 32],
      activities: {
        grammar: {
          duration: 15,
          topics: ['Critical error correction only'],
          bookChapters: ['Emergency review'],
          instructions: 'Only fix critical issues.'
        },
        listening: {
          duration: 85,
          focus: 'Full mock exams',
          material: 'Complete TEF listening sections',
          method: 'Exam conditions exactly',
          instructions: 'Simulate test day.'
        },
        speaking: {
          duration: 75,
          focus: 'Full exam simulations',
          activities: ['Complete speaking tests', 'Under pressure'],
          instructions: 'No restarts. Keep going.'
        },
        reading: {
          duration: 30,
          material: 'Full TEF reading sections'
        },
        writing: {
          duration: 55,
          focus: 'Full exam writing',
          activities: ['Complete writing sections timed'],
          instructions: 'Exam conditions.'
        }
      }
    },
    {
      month: 9,
      name: 'Stabilization Buffer (Part 1)',
      goal: 'Ensure consistent CLB 7 even on bad days.',
      weeks: [33, 34, 35, 36],
      activities: {
        grammar: {
          duration: 15,
          topics: ['Maintenance only'],
          bookChapters: ['Quick reviews'],
          instructions: 'Maintain, dont cram.'
        },
        listening: {
          duration: 60,
          focus: 'Real French exposure',
          material: 'French without subtitles',
          method: 'Tolerate ambiguity',
          instructions: 'Accept not understanding everything.'
        },
        speaking: {
          duration: 60,
          focus: 'Real human practice',
          activities: ['Conversation practice', 'Tutors or partners'],
          instructions: 'Real interactions.'
        },
        reading: {
          duration: 30,
          material: 'Authentic French texts'
        },
        writing: {
          duration: 45,
          focus: 'Maintain quality',
          activities: ['Weekly full essays'],
          instructions: 'Quality maintenance.'
        }
      }
    },
    {
      month: 10,
      name: 'Stabilization Buffer (Part 2)',
      goal: 'Build buffer against score fluctuation.',
      weeks: [37, 38, 39, 40],
      activities: {
        grammar: {
          duration: 15,
          topics: ['Light review'],
          bookChapters: ['As needed'],
          instructions: 'Stay sharp.'
        },
        listening: {
          duration: 60,
          focus: 'Varied French media',
          material: 'Podcasts, news, videos without subtitles',
          method: 'Passive and active mix',
          instructions: 'Real-world exposure.'
        },
        speaking: {
          duration: 60,
          focus: 'Natural conversation',
          activities: ['Extended conversations', 'Debates'],
          instructions: 'Push comfort zone.'
        },
        reading: {
          duration: 30,
          material: 'Books, long articles'
        },
        writing: {
          duration: 45,
          focus: 'Extended writing',
          activities: ['Longer essays', 'Complex arguments'],
          instructions: 'Build stamina.'
        }
      }
    },
    {
      month: 11,
      name: 'Pre-Exam Phase',
      goal: 'Final preparation before exam.',
      weeks: [41, 42, 43, 44],
      activities: {
        grammar: {
          duration: 10,
          topics: ['Emergency fixes only'],
          bookChapters: ['Critical review'],
          instructions: 'Dont learn new things.'
        },
        listening: {
          duration: 70,
          focus: 'Mock exams',
          material: 'Full TEF listening',
          method: 'Weekly full mocks',
          instructions: 'Test conditions.'
        },
        speaking: {
          duration: 70,
          focus: 'Full simulations',
          activities: ['Complete speaking tests'],
          instructions: 'Exam simulation.'
        },
        reading: {
          duration: 25,
          material: 'TEF reading'
        },
        writing: {
          duration: 50,
          focus: 'Full writing tests',
          activities: ['Complete timed sections'],
          instructions: 'Exam conditions.'
        }
      }
    },
    {
      month: 12,
      name: 'Final Stabilization',
      goal: 'Lock in CLB 7 level. No dropping below on test day.',
      weeks: [45, 46, 47, 48],
      activities: {
        grammar: {
          duration: 10,
          topics: ['None new'],
          bookChapters: ['Quick glance only'],
          instructions: 'Dont cram.'
        },
        listening: {
          duration: 60,
          focus: 'Maintain sharpness',
          material: 'Mix of mocks and real French',
          method: 'Stay engaged',
          instructions: 'Stay sharp, dont burn out.'
        },
        speaking: {
          duration: 60,
          focus: 'Confidence building',
          activities: ['Light practice', 'Template review'],
          instructions: 'Trust your training.'
        },
        reading: {
          duration: 25,
          material: 'Light reading'
        },
        writing: {
          duration: 40,
          focus: 'Light practice',
          activities: ['Shorter tasks'],
          instructions: 'Maintain, dont exhaust.'
        }
      }
    }
  ]
};

export function getPathway(pathwayId) {
  return pathwayId === 'clb5' ? CLB5_PATHWAY : CLB7_PATHWAY;
}

export function getCurrentMonthData(pathway, dayNumber) {
  const p = getPathway(pathway);
  const weekNumber = Math.ceil(dayNumber / 7);
  
  for (const month of p.months) {
    if (month.weeks.includes(weekNumber)) {
      return month;
    }
  }
  
  // Return last month if beyond duration
  return p.months[p.months.length - 1];
}

export function getDailyActivities(pathway, dayNumber) {
  const monthData = getCurrentMonthData(pathway, dayNumber);
  return monthData.activities;
}

export function calculateProgress(pathway, dayNumber) {
  const p = getPathway(pathway);
  return Math.min(100, Math.round((dayNumber / p.totalDays) * 100));
}

export function getWeekNumber(dayNumber) {
  return Math.ceil(dayNumber / 7);
}

export function getDayOfWeek(dayNumber) {
  return ((dayNumber - 1) % 7) + 1;
}