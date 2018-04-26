export class Building {
    buildingId: number;
    streetAddress: string;
    locationId: number;
    buildingNum: number;
    constructor( buildingId: number, streetAddress: string, locationId: number, buildingNum: number ) {
        this.buildingId = buildingId;
        this.streetAddress = streetAddress;
        this.locationId = locationId;
        this.buildingNum = buildingNum;
    }

}
