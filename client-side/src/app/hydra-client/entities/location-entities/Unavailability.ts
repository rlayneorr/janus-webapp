/**
 * @author Tanhim Ahmed
 * @author Luis Munoz
 */
export class Unavailability {
    unavailabiltyId: number;
    startDate: string;
    endDate: string;
    comments: string;
    batchId: number;
    constructor(unavailabilityId: number, startDate: string, endDate: string, comments: string, batchId: number) {
        this.unavailabiltyId = unavailabilityId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.comments = comments;
        this.batchId = batchId;
    }
}
