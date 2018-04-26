export class Room {
    roomId: number;
    roomNumber: number;
    buildingId: number;
    unavailabilityId: number;
    capacity: number;
    batchId: number;
    constructor( roomId: number, roomNumber: number, buildingId: number, unavailabilityId: number, capacity: number, batchId: number ) {
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.buildingId = buildingId;
        this.unavailabilityId = unavailabilityId;
        this.capacity = capacity;
        this.batchId = batchId;
    }

}
