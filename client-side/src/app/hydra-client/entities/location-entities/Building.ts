export class Building {
    id: number;
    streetAddress: string;
    locId: number;
    buildingNum: number;
    constructor( id: number, streetAddress: string, locId: number, buildingNum: number ) {
        this.id = id;
        this.streetAddress = streetAddress;
        this.locId = locId;
        this.buildingNum = buildingNum;
    }

}
