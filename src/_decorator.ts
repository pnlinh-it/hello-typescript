function second(option: string) {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("second(): called");
    };
}

class ExampleClass {

    @second('hello')
    method() {
        console.log(1)
    }
}

// const example = new ExampleClass();
// example.method()

