import Plane from "./Plane"

export default class Player {
    constructor(name){
        this.name = name;
        this.plane;
    }

    setPlane(plane) {
        this.plane = plane;
    }
}