import {Question} from '../entities/question';

export const QUESTIONS: Question[] = [
  { questionId: 11,
    questionText: 'What is Inheritance?',
    sampleAnswer1: 'A process of binding data members (variables, properties) and member functions (methods) together.',
    sampleAnswer2: 'The process of showing only essential/necessary features of an entity/object to the outside world' +
     'and hide the other irrelevant information.',
    sampleAnswer3: 'The process of creating a new class by extending an existing class',
    sampleAnswer4: 'The process by which an object or function take different forms.',
    sampleAnswer5: 'None of the above',
    isActive: true,
    bucketId: 1
  },
  { questionId: 12,
    questionText: 'What is Polymorphism?',
    sampleAnswer1: 'A process of binding data members (variables, properties) and member functions (methods) together.',
    sampleAnswer2: 'The process of showing only essential/necessary features of an entity/object to the outside world' +
     'and hide the other irrelevant information.',
    sampleAnswer3: 'The process of creating a new class by extending an existing class',
    sampleAnswer4: 'The process by which an object or function take different forms.',
    sampleAnswer5: 'None of the above',
    isActive: true,
    bucketId: 1
  },
  { questionId: 13,
    questionText: 'What is Abstraction?',
    sampleAnswer1: 'A process of binding data members (variables, properties) and member functions (methods) together.',
    sampleAnswer2: 'The process of showing only essential/necessary features of an entity/object to the outside world' +
     'and hide the other irrelevant information.',
    sampleAnswer3: 'The process of creating a new class by extending an existing class',
    sampleAnswer4: 'The process by which an object or function take different forms.',
    sampleAnswer5: 'None of the above',
    isActive: true,
    bucketId: 1
  },
  { questionId: 14,
    questionText: 'What is Encapsulation?',
    sampleAnswer1: 'A process of binding data members (variables, properties) and member functions (methods) together.',
    sampleAnswer2: 'The process of showing only essential/necessary features of an entity/object to the outside world' +
     'and hide the other irrelevant information.',
    sampleAnswer3: 'The process of creating a new class by extending an existing class',
    sampleAnswer4: 'The process by which an object or function take different forms.',
    sampleAnswer5: 'None of the above',
    isActive: true,
    bucketId: 2
  },
  { questionId: 15,
    questionText: 'If TableA has 100 rows and TableB has 10 rows, how many rows would be retrieved from'
    + 'the following query? \nSELECT * FROM TableA, TableB',
    sampleAnswer1: '10000',
    sampleAnswer2: '1000',
    sampleAnswer3: '100',
    sampleAnswer4: '10',
    sampleAnswer5: '0',
    isActive: true,
    bucketId: 2
  }
];
