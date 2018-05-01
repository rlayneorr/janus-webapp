import { Associate } from './associate.model';


// export class Placement {
//     id: number;
//     associate: Associate;
//     start: Date;
//     end: Date;
// }

export class Placement {
    placementId: number;
    clientId: string;
    endClientId: string;
    startDate: Date;
    endDate: Date;
    associateId: string;
}
