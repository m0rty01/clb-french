// TEF Mock Exams - Central Index File
// This file aggregates all exam content from separate files

import { LISTENING_EXAMS_PART1 } from './listening-part1';
import { LISTENING_EXAMS_PART2 } from './listening-part2';
import { READING_EXAMS_PART1 } from './reading-part1';
import { READING_EXAMS_PART2 } from './reading-part2';
import { WRITING_EXAMS } from './writing-exams';
import { SPEAKING_EXAMS } from './speaking-exams';

// Combine all listening exams (20 total)
export const ALL_LISTENING_EXAMS = [
  ...LISTENING_EXAMS_PART1,
  ...LISTENING_EXAMS_PART2
];

// Combine all reading exams (20 total)
export const ALL_READING_EXAMS = [
  ...READING_EXAMS_PART1,
  ...READING_EXAMS_PART2
];

// All writing exams (20 total)
export const ALL_WRITING_EXAMS = WRITING_EXAMS;

// All speaking exams (20 total)
export const ALL_SPEAKING_EXAMS = SPEAKING_EXAMS;

// Get exam by type and number
export function getExam(type, examNumber) {
  const exams = {
    listening: ALL_LISTENING_EXAMS,
    reading: ALL_READING_EXAMS,
    writing: ALL_WRITING_EXAMS,
    speaking: ALL_SPEAKING_EXAMS
  };
  
  const examList = exams[type];
  if (!examList) return null;
  
  return examList.find(e => e.examNumber === examNumber) || examList[0];
}

// Get all exams of a type
export function getAllExams(type) {
  const exams = {
    listening: ALL_LISTENING_EXAMS,
    reading: ALL_READING_EXAMS,
    writing: ALL_WRITING_EXAMS,
    speaking: ALL_SPEAKING_EXAMS
  };
  
  return exams[type] || [];
}

// Export individual arrays for backward compatibility
export {
  LISTENING_EXAMS_PART1,
  LISTENING_EXAMS_PART2,
  READING_EXAMS_PART1,
  READING_EXAMS_PART2,
  WRITING_EXAMS,
  SPEAKING_EXAMS
};
