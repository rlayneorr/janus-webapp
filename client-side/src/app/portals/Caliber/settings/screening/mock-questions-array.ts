import {Question} from './entities/Question';

    export const Questions: Question[] = [
        {id: 1, text: "What is OOP?", answers:["answer1","answer2","answer3","answer4","answer5"],tagIds:[1,2], isActive: true},
        {id: 2, text: "What is an Array?",answers:["answer1","answer2","answer3","answer4","answer5"],tagIds:[1,2], isActive: true},
        {id: 3, text: "What does the fox say?", answers:["answer1","answer2","answer3","answer4","answer5"],tagIds:[1,2], isActive: false},
        {id: 4, text: "What does Java stand for?", answers:["answer1","answer2","answer3","answer4","answer5"],tagIds:[1,2], isActive: false}
    ]