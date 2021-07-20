class Circle {
    name: string;

    constructor(name: string) {
        this.name = name
    }
}

class Rectangle {
    constructor(private name: string) {
    }
}

export default {Circle, Rectangle}