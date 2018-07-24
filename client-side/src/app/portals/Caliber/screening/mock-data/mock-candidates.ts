import { Candidate } from '../entities/Candidate';

const tempDate: Date = new Date();
export const CANDIDATES: Candidate[] = [
    {
        candidateId: 1,
        firstName: 'Jimmy',
        lastName: 'John',
        skillTypeID: 52,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 21, 9)
    },
    {
        candidateId: 2,
        firstName: 'Isabella',
        lastName: 'Dougherty',
        skillTypeID: 52,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 21, 11)
    },
    {
        candidateId: 3,
        firstName: 'Clarissa',
        lastName: 'Gonzales',
        skillTypeID: 53,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 21, 13)
    },
    {
        candidateId: 5,
        firstName: 'Catherine',
        lastName: 'Mahzareh',
        skillTypeID: 52,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 21, 14)
    },
    {
        candidateId: 6,
        firstName: 'Pietro',
        lastName: 'Vietre',
        skillTypeID: 56,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 21, 16)
    },
    {
        candidateId: 7,
        firstName: 'John',
        lastName: 'Doe',
        skillTypeID: 55,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 22, 7)
    },
    {
        candidateId: 8,
        firstName: 'Lana',
        lastName: 'Yea',
        skillTypeID: 55,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 22, 8)
    },
    {
        candidateId: 9,
        firstName: 'Kevin',
        lastName: 'Brainer',
        skillTypeID: 54,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 22, 9)
    },
    {
        candidateId: 10,
        firstName: 'Lucy',
        lastName: 'Sgod',
        skillTypeID: 56,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 22, 11)
    },
    {
        candidateId: 11,
        firstName: 'Luis',
        lastName: 'Lana',
        skillTypeID: 54,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 22, 13)
    },
    {
        candidateId: 12,
        firstName: 'Michael',
        lastName: 'Nevermore',
        skillTypeID: 56,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0, 22, 15)
    },
    {
        candidateId: 13,
        firstName: 'Chad',
        lastName: 'Aldritch',
        skillTypeID: 51,
        skillTypeName: 'Java',
        schedule: new Date(2018, 0 , 22, 16)
    },

];

function randomDate(): Date {
    const temp: Date = new Date();
    const numberOfDaysToAdd: number = Math.random();
    temp.setDate(temp.getDate() + numberOfDaysToAdd);
    return temp;
}
