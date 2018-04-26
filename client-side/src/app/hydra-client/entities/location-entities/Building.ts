export class Building {
    buildingId: number;
    streetAddress: string;
    locationId: number;
    buildingNumber: number;
    constructor( buildingId: number, streetAddress: string, locationId: number, buildingNumber: number ) {
        this.buildingId = buildingId;
        this.streetAddress = streetAddress;
        this.locationId = locationId;
        this.buildingNumber = buildingNumber;
    }

}
