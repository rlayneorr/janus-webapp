/**
 * @author Tanhim Ahmed
 * @author Luis Munoz
 */
export class Room {
    // primary key Id of the room object //
    roomId: number;
    // the room's number //
    roomNumber: number;
    // foreign key | Id of the building this room belongs to //
    buildingId: number;
    // foreign keys | Id's of the unavailability objects //
    unavailabilityId: number[];
    // max capacity of the room //
    capacity: number;

    // this is a constructor //
    constructor( roomId: number, roomNumber: number, buildingId: number, unavailabilityId: number[], capacity: number ) {
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.buildingId = buildingId;
        this.unavailabilityId = unavailabilityId;
        this.capacity = capacity;
    }

}
