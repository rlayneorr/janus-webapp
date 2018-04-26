export class Location {
    locationId: number;
    street: string;
    city: string;
    state: string;
    zip: number;
    title: string;
    active: boolean;
    constructor(locationId: number, street: string, city: string, state: string, zip: number, title: string, active: boolean) {
        this.locationId = locationId;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.title = title;
        this.active = active;
    }
}
