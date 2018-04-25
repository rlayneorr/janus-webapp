import { User } from './User';
import { UserRole } from './UserRole';

export class Trainer extends User {
   // public static ROLE_INACTIVE = 'ROLE_INACTIVE';
   title: string;

   constructor(userId?: number, firstName?: string, middleName?: string, lastName?: string,
    email?: string, password?: string, backupPassword?: string, role?: UserRole,
    mobilePhone?: string, homePhone?: string, token?: string, title?: string) {
        super(userId, firstName, middleName, lastName, email, password,
            backupPassword, role, mobilePhone, homePhone, token);
        this.title = title;
    }
}
