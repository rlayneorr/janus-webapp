/**
 * @author Tanhim Ahmed
 * @author Luis Munoz
 */
export class Unavailability {
    // primary key Id of the unavailability object
    unavailabilitiesId: number;
    // the start date of the unavailability
    startDate: string;
    // the end date of the unavailability period
    endDate: string;
    // comments explaining the reason for the unavailability period
    comments: string;
    // foreign key | Id of the room
    roomId: number;

    // foreign key | batchId
    batchId: number;
    // this is a constructor //
    constructor(unavailabilitiesId: number, startDate: string, endDate: string, comments: string, roomId: number, batchId: number) {
        this.unavailabilitiesId = unavailabilitiesId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.comments = comments;
        this.roomId = roomId;
        this.batchId = batchId;
    }
}
