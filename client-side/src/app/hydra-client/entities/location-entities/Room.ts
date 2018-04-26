export class Room {
    id: number;
    roomNumber: number;
    buildingId: number;
    unavailabilityId: number;
    capacity: number;
    batchId: number;
    constructor( id: number, roomNumber: number, buildingId: number, unavailabilityId: number, capacity: number, batchId: number ) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.buildingId = buildingId;
        this.unavailabilityId = unavailabilityId;
        this.capacity = capacity;
        this.batchId = batchId;
    }

}
