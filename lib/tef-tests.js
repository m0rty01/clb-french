// TEF-Style Mock Tests Database
// Aggregates all exam content from the tef-exams directory
// 20 complete exams for each skill type

import { 
  ALL_LISTENING_EXAMS, 
  ALL_READING_EXAMS, 
  ALL_WRITING_EXAMS, 
  ALL_SPEAKING_EXAMS 
} from './tef-exams/index';

export const TEF_TEST_STRUCTURE = {
  comprehensionOrale: {
    name: 'Compréhension Orale',
    nameEn: 'Listening Comprehension',
    icon: 'Headphones',
    duration: 40,
    totalQuestions: 20,
    sections: ['A', 'B', 'C', 'D'],
    description: 'Listen to audio recordings and answer questions. Tests understanding of daily conversations, announcements, and longer presentations.',
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
    duration: 60,
    totalQuestions: 20,
    sections: ['A', 'B', 'C', 'D'],
    description: 'Read texts and answer comprehension questions. Tests understanding of notices, messages, articles, and longer documents.',
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
    duration: 60,
    totalQuestions: 2,
    sections: ['A', 'B'],
    description: 'Complete writing tasks. Section A: short message (60-80 words). Section B: argumentative text (150-180 words).',
    instructions: [
      'Section A: Write a short message (60-80 words)',
      'Section B: Write an argumentative text (150-180 words)',
      'Pay attention to grammar, vocabulary, and structure',
      'Manage your time between both sections'
    ]
  },
  expressionOrale: {
    name: 'Expression Orale',
    nameEn: 'Oral Expression',
    icon: 'Mic',
    duration: 15,
    totalQuestions: 2,
    sections: ['A', 'B'],
    description: 'Record your spoken responses. Section A: obtain information (5 min). Section B: present and argue (10 min).',
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

// Transform new exam format to old format for compatibility
function transformListeningExam(exam) {
  return {
    id: exam.id,
    title: `${exam.title} - ${exam.theme}`,
    level: exam.level,
    duration: exam.duration,
    sections: exam.sections.map(section => ({
      id: section.id,
      name: section.name,
      description: section.description,
      questions: section.questions.map(q => ({
        id: q.id,
        audioDescription: q.audioDescription,
        audioText: q.audioText,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    }))
  };
}

function transformReadingExam(exam) {
  return {
    id: exam.id,
    title: `${exam.title} - ${exam.theme}`,
    level: exam.level,
    duration: exam.duration,
    sections: exam.sections.map(section => ({
      id: section.id,
      name: section.name,
      description: section.description,
      questions: section.questions.map(q => ({
        id: q.id,
        text: q.text,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    }))
  };
}

function transformWritingExam(exam) {
  return {
    id: exam.id,
    title: `${exam.title} - ${exam.theme}`,
    level: exam.level,
    duration: exam.duration,
    sections: exam.sections.map(section => ({
      id: section.id,
      name: section.name,
      description: section.description,
      tasks: section.tasks
    }))
  };
}

function transformSpeakingExam(exam) {
  return {
    id: exam.id,
    title: `${exam.title} - ${exam.theme}`,
    level: exam.level,
    duration: exam.duration,
    sections: exam.sections.map(section => ({
      id: section.id,
      name: section.name,
      description: section.description,
      prepTime: section.prepTime,
      speakTime: section.speakTime,
      tasks: section.tasks
    }))
  };
}

// Export transformed tests for backward compatibility
export const LISTENING_TESTS = ALL_LISTENING_EXAMS.map(transformListeningExam);
export const READING_TESTS = ALL_READING_EXAMS.map(transformReadingExam);
export const WRITING_TESTS = ALL_WRITING_EXAMS.map(transformWritingExam);
export const SPEAKING_TESTS = ALL_SPEAKING_EXAMS.map(transformSpeakingExam);

// Export all tests by type
export const ALL_TESTS = {
  listening: LISTENING_TESTS,
  reading: READING_TESTS,
  writing: WRITING_TESTS,
  speaking: SPEAKING_TESTS
};

// Utility functions
export function getTestsByType(type) {
  return ALL_TESTS[type] || [];
}

export function getTestById(type, id) {
  const tests = getTestsByType(type);
  return tests.find(t => t.id === id);
}

export function getTestByNumber(type, examNumber) {
  const tests = getTestsByType(type);
  return tests.find(t => t.id.includes(`exam-${examNumber}`) || t.id.includes(`test-${examNumber}`));
}
