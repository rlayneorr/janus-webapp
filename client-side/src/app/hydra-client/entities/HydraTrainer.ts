import { UserRole } from "./UserRole";

export class HydraTrainer {
   // public static ROLE_INACTIVE = 'ROLE_INACTIVE';
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
   title: string;
}
