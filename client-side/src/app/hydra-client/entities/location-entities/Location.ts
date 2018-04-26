export class Location {
    id: number;
    street: string;
    city: string;
    state: string;
    zip: number;
    title: string;
    active: boolean;
    constructor(id: number, street: string, city: string, state: string, zip: number, title: string, active: boolean) {
        this.id = id;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.title = title;
        this.active = active;
    }
}
