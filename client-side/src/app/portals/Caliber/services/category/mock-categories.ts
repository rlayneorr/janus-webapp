import { Category } from '../../entities/Category';

export const CATEGORIES: Category[] = [
    {
        categoryId: 0,
        skillCategory: 'skill0',
        active: true,
    },
    {
        categoryId: 1,
        skillCategory: 'skill1',
        active: false,
    },
    {
        categoryId: 2,
        skillCategory: 'skill2',
        active: false,
    },
    {
        categoryId: 3,
        skillCategory: 'skill3',
        active: true,
    },
    {
        categoryId: 4,
        skillCategory: 'skill4',
        active: false,
    },
    {
        categoryId: 5,
        skillCategory: 'skill5',
        active: false,
    },
];

export const replacementCategory: Category = {
    categoryId: 6,
    skillCategory: 'skill6',
    active: false,
};
