/**
 * @author Luis Munoz
 * @author Tanhim Ahmed
 */
export class Building {
    // primary key Id of the building object //
    buildingId: number;
    // the street address of the building //
    streetAddress: string;
    // foreign key | Id of the location this building is in //
    locationId: number;
    // the number of the building //
    buildingNumber: string;

    // this is a constructor //
    constructor( buildingId: number, streetAddress: string, locationId: number, buildingNumber: string ) {
        this.buildingId = buildingId;
        this.streetAddress = streetAddress;
        this.locationId = locationId;
        this.buildingNumber = buildingNumber;
    }

}
