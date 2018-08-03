/**
 * @author Tanhim Ahmed
 * @author Luis Munoz
 */
export class Room {
    // primary key Id of the room object //
    roomId: number;
    // the room's number //
    roomNumber: string;
    // foreign key | Id of the building this room belongs to //
    buildingId: number;
    // max capacity of the room //
    capacity: number;

    // this is a constructor //
    constructor( roomId: number, roomNumber: string, buildingId: number, capacity: number ) {
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.buildingId = buildingId;
        this.capacity = capacity;
    }

}
