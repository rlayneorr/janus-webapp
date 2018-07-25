import { SoftSkillViolation } from '../entities/softSkillViolation';
import { Screening } from '../entities/screening';

export const MOCK_VIOLATIONS: SoftSkillViolation[] = [
  { violationId: 11,
    screeningId: 1,
    violationTypeId: 1,
    Time: new Date(),
    Comment: 'Cursed.'
  },
  { violationId: 12,
    screeningId: 1,
    violationTypeId: 2,
    Time: new Date(),
    Comment: 'Wearing white after labor day. Ghastly.'
  },
  { violationId: 13,
    screeningId: 1,
    violationTypeId: 3,
    Time: new Date(),
    Comment: 'Mumbled incoherently'
  },
  { violationId: 14,
    screeningId: 1,
    violationTypeId: 4,
    Time: new Date(),
    Comment: 'Children constantly interrupted the screening.'
  }
];
