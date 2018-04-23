import { UserRole } from "./UserRole";

export class HydraUser {
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    backupPassword: string;
    role: UserRole;
    mobilePhone: string;
    homePhone: string;
    token: string;
}
