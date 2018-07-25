import { ViolationType } from '../entities/violationType';

export const VIOLATION_TYPES: ViolationType[] = [
  { violationTypeId: 11, violationTypeText: 'Profanity', description: 'Use of profanity' },
  { violationTypeId: 12, violationTypeText: 'Dress', description: 'Improper/Non-professional dress' },
  { violationTypeId: 13, violationTypeText: 'Attitude', description: 'Poor attitude (nervousness, arrogance, etc.)' },
  { violationTypeId: 14, violationTypeText: 'Conduct', description: 'Poor conduct (Unprofessional behavior, poor etiquette, etc.)' },
];
