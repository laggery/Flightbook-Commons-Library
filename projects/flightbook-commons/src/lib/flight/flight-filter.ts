import { Glider } from '../glider/glider';

export class FlightFilter {
    glider: Glider;
    from: Date;
    to: Date;
    gliderType: string;
    description: string;

    constructor() {
        this.glider = new Glider();
    }
}
