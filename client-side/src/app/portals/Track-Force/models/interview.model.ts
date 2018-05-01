import { Associate } from './associate.model';
import { EndClient } from './end-client.model';

// old versions.
// export class Interview {
//    id: number;
//    associate: Associate;
//    endClient: EndClient;
//    typeId: number;
//    typeName: string;
//    interviewDate: Date;
//    interviewFeedback: string;
// }

export class Interview {
   id: number;
   associateid: number;
   interviewTypeId: number;
   clientId: number;
   endClientId: number;
   associate?: Associate;
   endClient?: EndClient;
   typeId?: number;
   typeName?: string;
   interviewDate: Date;
   interviewFeedback: string;

}
