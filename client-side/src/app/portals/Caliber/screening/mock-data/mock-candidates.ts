import { Candidate } from '../entities/Candidate';

const tempDate: Date = new Date();
export const CANDIDATES: Candidate[] = [
    {
        candidateId: 1,
        resourceId: 42,
        name: "Jimmy John",
        email: "jjohn@jimmyjohns.com",
        phoneNumber: "1 (866) 276-6302",
        skypeId: "jimmyjohns",
        profileUrl: "www.jimmyjohns.com",
        recruiterName: "Tom",
        college: "Sandwhich U",
        degree: "Associates Degree",
        major: "Culinary Arts",
        techScreenerName: "Sanja"
    },
    {
        candidateId: 2,
        resourceId: 43,
        name: "First Last",
        email: "email@domain.com",
        phoneNumber: "1 (800) 555-1234",
        skypeId: "skype",
        profileUrl: "www.domain.com",
        recruiterName: "Recruiter",
        college: "College University",
        degree: "BS",
        major: "CS",
        techScreenerName: "Screener"
    },
    {
        candidateId: 3,
        resourceId: 44,
        name: "John Doe",
        email: "jdoe@gamil.com",
        phoneNumber: "555-1244",
        skypeId: "JohnnyDoe12",
        profileUrl: "www.urlservices.com",
        recruiterName: "Jerry",
        college: "Colorado Institute",
        degree: "BS",
        major: "Computer Engineering",
        techScreenerName: "Soren"
    },
    {
        candidateId: 4,
        resourceId: 45,
        name: "Jennifer Brown",
        email: "jbrown@yahoo.com",
        phoneNumber: "555-7777",
        skypeId: "jennybrown",
        profileUrl: "www.jennyprofile.com",
        recruiterName: "Alan",
        college: "NYU",
        degree: "AS",
        major: "Integrative Studies",
        techScreenerName: "Rohit"
    },
    {
        candidateId: 5,
        resourceId: 46,
        name: "Andrew Venman",
        email: "avenman@hotmail.com",
        phoneNumber: "555-9987",
        skypeId: "ajvenman",
        profileUrl: "www.andrewprofile.com",
        recruiterName: "Tom",
        college: "OCC",
        degree: "BS",
        major: "Mathematics",
        techScreenerName: "Rohit"
    },
    {
        candidateId: 6,
        resourceId: 47,
        name: "Micheal Johnson",
        email: "johnson@gmail.com",
        phoneNumber: "555-8852",
        skypeId: "mjohnson",
        profileUrl: "www.michealprofile",
        recruiterName: "Jerry",
        college: "Stanford",
        degree: "AS",
        major: "Chemistry",
        techScreenerName: "Sanja"
    },
    {
        candidateId: 7,
        resourceId: 48,
        name: "Bob Temmy",
        email: "tem@temshop.com",
        phoneNumber: "555-TEMM",
        skypeId: "temmy",
        profileUrl: "www.temshop.com",
        recruiterName: "Alan",
        college: "Colleg",
        degree: "Degree",
        major: "Sell New Item",
        techScreenerName: "Soren"
    },
    {
        candidateId: 8,
        resourceId: 49,
        name: "April Jewell",
        email: "ajewell@yahoo.com",
        phoneNumber: "555-4215",
        skypeId: "jewell",
        profileUrl: "www.aprilprofile.com",
        recruiterName: "Alan",
        college: "Lawrence Tech",
        degree: "BS",
        major: "CS",
        techScreenerName: "Rohit"
    },
    {
        candidateId: 9,
        resourceId: 50,
        name: "Abcde Brown",
        email: "abcde@gmail.com",
        phoneNumber: "555-3456",
        skypeId: "abcde",
        profileUrl: "www.abcdeprofile.com",
        recruiterName: "John",
        college: "WVU",
        degree: "BS",
        major: "Engineering",
        techScreenerName: "Sanja"
    },
    {
        candidateId: 10,
        resourceId: 51,
        name: "Henry Henshaw",
        email: "henshaw@outlook.com",
        phoneNumber: "555-8741",
        skypeId: "hankh",
        profileUrl: "www.henryprofile.com",
        recruiterName: "Jerry",
        college: "NYU",
        degree: "BS",
        major: "CS",
        techScreenerName: "Rohit"
    },
    {
        candidateId: 11,
        resourceId: 52,
        name: "Alex Mann",
        email: "amann@yahoo.com",
        phoneNumber: "555-9863",
        skypeId: "amann",
        profileUrl: "www.alexprofile.com",
        recruiterName: "Alan",
        college: "WVU",
        degree: "BS",
        major: "IT",
        techScreenerName: "Soren"
    },
    {
        candidateId: 12,
        resourceId: 53,
        name: "Amanda Wallace",
        email: "wallace@gmail.com",
        phoneNumber: "555-9514",
        skypeId: "amanadawallace",
        profileUrl: "www.amandaprofile.com",
        recruiterName: "Tom",
        college: "Oakland University",
        degree: "BS",
        major: "CS",
        techScreenerName: "Sanja"
    },

];

function randomDate(): Date {
    const temp: Date = new Date();
    const numberOfDaysToAdd: number = Math.random();
    temp.setDate(temp.getDate() + numberOfDaysToAdd);
    return temp;
}
