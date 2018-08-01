/**
 * @author Tanhim Ahmed
 * @author Luis Munoz
 */
export class Unavailability {
    // primary key Id of the unavailability object
    unavailabiltyId: number;
    // the start date of the unavailability
    startDate: any;
    // the end date of the unavailability period
    endDate: any;
    // comments explaining the reason for the unavailability period
    comments: string;
    // foreign key | Id of the batch that will be using the room
    batchId: number;
    // foreign key | Id of the room that is associated with the unavailability
    roomId: number;

    // this is a constructor //
    constructor(unavailabilityId: number, startDate: any, endDate: any, comments: string, batchId: number, roomId: number) {
        this.unavailabiltyId = unavailabilityId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.comments = comments;
        this.roomId = roomId;
        this.batchId = batchId;
        this.roomId = roomId;
    }
}
