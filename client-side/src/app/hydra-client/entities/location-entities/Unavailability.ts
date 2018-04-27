/**
 * @author Tanhim Ahmed
 * @author Luis Munoz
 */
export class Unavailability {
    // primary key Id of the unavailability object
    unavailabiltyId: number;
    // the start date of the unavailability
    startDate: string;
    // the end date of the unavailability period
    endDate: string;
    // comments explaining the reason for the unavailability period
    comments: string;
    // foreign key | Id of the batch that will be using the room
    batchId: number;

    // this is a constructor //
    constructor(unavailabilityId: number, startDate: string, endDate: string, comments: string, batchId: number) {
        this.unavailabiltyId = unavailabilityId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.comments = comments;
        this.batchId = batchId;
    }
}
