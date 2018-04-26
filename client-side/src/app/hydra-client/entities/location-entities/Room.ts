export class Room {
    id: number;
    roomNum: number;
    buildingId: number;
    unavailId: number;
    capacity: number;
    batchId: number;
    constructor( id: number, roomNum: number, buildingId: number, unavailId: number, capacity: number, batchId: number ) {
        this.id = id;
        this.roomNum = roomNum;
        this.buildingId = buildingId;
        this.unavailId = unavailId;
        this.capacity = capacity;
        this.batchId = batchId;
    }

}
