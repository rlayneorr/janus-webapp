export class Bucket {
    id: number;
    name: string;
    description: string;
    isActive?: boolean = true;
    mappedToTrack?: boolean = false;
    weight?: number;
    constructor(id, name, description){
        this.id = id;
        this.name = name;
        this.description = description;
        this.weight = 0;
    }
}
