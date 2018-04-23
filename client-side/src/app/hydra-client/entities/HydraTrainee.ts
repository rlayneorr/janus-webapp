import { HydraBatch } from './HydraBatch';
import { User } from './User';
import { UserRole } from './UserRole';


export class Trainee extends User {
  
    private resourceId: number;
    private trainingStatus: string;
    private batch: HydraBatch;
    private skypeId: string;
    private profileUrl: string;
    private recruiterName: string;
    private college: string;
    private degree: string;
    private major: string;
    private techScreenerName: string;
    private projectCompletion: string;
    private flagStatus: string;
    private flagNotes: string;
    private marketingStatus: string;
    private client: string;
    private endClient: string;
   

    constructor( userId: number, firstName: string, middleName: string, lastName: string,
        email: string, password: string, backupPassword: string, role: UserRole,
        mobilePhone: string, homePhone: string, token: string,resourceId: number, trainingStatus: string, batch: HydraBatch, 
        phoneNumber: string, skypeId: string, profileUrl: string,recruiterName: string, 
        college: string, degree: string,major: string, techScreenerName: string,
        projectCompletion: string, flagStatus: string, flagNotes: string, marketingStatus: string,
        client: string, endClient: string) {
            super(userId, firstName, middleName, lastName, email, password,
                backupPassword, role, mobilePhone, homePhone, token)
                
            this.resourceId = resourceId; 
            this.trainingStatus = trainingStatus;
            this.batch = batch;
            this.skypeId = skypeId;
            this.profileUrl = profileUrl;
            this.recruiterName = recruiterName;
            this.college = college;
            this.degree = degree;
            this.major = major;
            this.techScreenerName = techScreenerName;
            this.projectCompletion = projectCompletion;
            this.flagStatus = flagStatus;
            this.flagNotes = flagNotes;
            this.marketingStatus = marketingStatus;
            this.client = client;
            this.endClient = endClient;

      }
}


