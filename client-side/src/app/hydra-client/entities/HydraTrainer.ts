export class HydraTrainer {
   // public static ROLE_INACTIVE = 'ROLE_INACTIVE';

    trainerId: number;
    password: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    role: any;

    constructor(trainerId: number, password: string, firstName: string, lastName: string,
        title: string, email: string, role: any) {
            this.trainerId = trainerId;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.title = title;
            this.email = email;
            this.role = role;

        }
}
