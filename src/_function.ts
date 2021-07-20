function test() {
    // After colon is type, after equal is instance
    // Function type and how to present it (create new instance)
    // How to create instance of interface
    // Two interface have same properties and properties type can be assign together
    // https://www.logicbig.com/tutorials/misc/typescript/interface-describing-function.html
    // Callable interface and callable type alias. Also call as Describe function using interface to type alias
    // Function Type Expression
    // Describe function by using Function type expression: (content: string) => void
    // https://stackoverflow.com/a/58229542/14284081
    // Type inference https://basarat.gitbook.io/typescript/type-system/type-inference#function-return-types

    // Describe function type
    function printText(text: string, printer: (content: string) => void) {
        printer(text);
    }

    interface States {
        [state: string]: boolean;//indexer
    }


    // Define function
    function functionPrinter(content: string): void {
    }

    const aliasPrinter = functionPrinter


    const arrowFunctionPrinter: (content: string) => void = (content) => {
    }

    const variableFunctionPrinter = function (content: string): void {
    }

    // Using function
    printText('Hello', functionPrinter)
    printText('Hello', aliasPrinter)
    printText('Hello', arrowFunctionPrinter)
    printText('Hello', variableFunctionPrinter)
    printText('Hello', function (text: string) {
        console.log(text);
    })


    // Type alias function
    type Printer = (text: string) => void;

    function printTextUseAlias(text: string, printer: Printer) {
        printer(text)
    }

    const typeAliasPrinter: Printer = function (text: string): void {
    }

    printTextUseAlias('Hello', functionPrinter)
    printTextUseAlias('Hello', aliasPrinter)
    printTextUseAlias('Hello', arrowFunctionPrinter)
    printTextUseAlias('Hello', variableFunctionPrinter)
    printTextUseAlias('hello', typeAliasPrinter)


    // Call signature
    // Properties inside Function Type Expression
    type DescribableFunction = {
        description: string;
        (number: number): boolean;
    }
    const helloFunction1: DescribableFunction = function (number: number): boolean {
        return Boolean(number)
    }
    helloFunction1.description = 'This is function description.'

    function doSomething(input: number, fn: DescribableFunction) {
        console.log(`Function description: ${fn.description} Result ${fn(input)}`)
    }

    doSomething(12, helloFunction1)


    // Construct signature
    // Such as reflect constructor class

    interface ArrayConstructor {
        new(arrayLength?: number): any[];

        new<T>(arrayLength: number): T[];

        new<T>(...items: T[]): T[];

        (arrayLength?: number): any[];

        <T>(arrayLength: number): T[];

        <T>(...items: T[]): T[];

        isArray(arg: any): arg is any[];

        readonly prototype: any[];
    }

    interface Factory {
        new(name: string): Student;
    }

    interface Student {
        name: string
    }

    class BeginnerStudent implements Student {
        constructor(public name: string) {
            console.log(`${name} is beginner Student`)
        }
    }

    class MasterStudent implements Student {
        constructor(public name: string) {
            console.log(`${name} is a master student`)
        }
    }

    function makeStudent(factory: Factory) {
        return new factory("Linh Pham");
    }

    const beginner = makeStudent(BeginnerStudent)
    const master = makeStudent(MasterStudent)


    // Generic function
    function printAll<Type>(items: Type[]): Type {
        return items[0]
    }

    const numberResult = printAll([1, 2, 3])
    const stringResult = printAll(['Linh', 'Pham'])

    function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
        return arr.map(func);
    }

    // 'parsed' is automatically 'number[]' because result of parseInt is number
    const parsed = map(["1", "2", "3"], function (item) {
        // Parameter 'item' is automatically 'string'
        parseInt(item)
    });


    // Type constrain
    const countable: { length: number } = [1, 2]
    const countable1: { length: number } = Array

    function longest<Type extends { length: number }>(a: Type, b: Type): Type {
        if (a.length >= b.length) {
            return a
        }
        return b
    }

    const longestArray = longest([1, 2, 3], [3, 4, 5])

// function minimumLength<Type extends { length: number }>(
//     obj: Type,
//     minimum: number
// ): Type {
//     if (obj.length >= minimum) {
//         return obj;
//     } else {
//         // Error because the Type can be {length: number, name: string}
//         return {length: minimum};
//     }
// }

    function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
        return arr1.concat(arr2);
    }

// const arr = combine([1, 2, 3], ["hello"]);
// Type 'string' is not assignable to type 'number'.
    const arr = combine<string | number>([1, 2, 3], ["hello"]);


// Guidelines for Writing Good Generic Functions
// https://www.typescriptlang.org/docs/handbook/2/functions.html#guidelines-for-writing-good-generic-functions


// Optional, default parameter
    function optionalParamater(x?: number) {
    }

// x can be undefined
    function defaultParameter(x: string = 'Hello') {
        console.log(x.toUpperCase())
    }

    defaultParameter(undefined)

// Optional parameter in function
    function sayHello(name: string, printer: (name?: string) => void) {
    }


// Function overload
// d,y must be optional
    function makeDate(timestamp: number): Date;
    function makeDate(timestamp: number, d?: number, y?: number): Date {
        if (d !== undefined && y !== undefined) {
            return new Date(y, timestamp, d);
        } else {
            return new Date(timestamp);
        }
    }


// void, object, unknown, never, Function


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// Rest parameter, Spread syntax
// ... use as parameter
// ... user as argument. like addAll. Iterate array then add each item
    function sum(x: number, y: number, z: number) {
        return x + y + z;
    }

    function sum2(...numbers: number[]) {
        return numbers.length;
    }

    const numbers = [1, 2, 3];
// console.log(sum(...numbers));
    console.log(sum2(...numbers));
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    arr1.push(...arr2);

// const args = [8, 5] ;
// const angle = Math.atan2(...args);
// A spread argument must either have a tuple type or be passed to a rest parameter
// A tuple type is another sort of Array type that knows exactly how many elements it contains
// So that why "as const" is working

    const args = [8, 5] as const;
    const angle = Math.atan2(...args);


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
//Parameter Destructuring
    let a: number, b: number;
    [a, b] = [10, 20]

    const [c, d] = [12, 13]

    function sum111({a, b, c}: { a: number; b: number; c: number }) {
        console.log(a + b + c);
    }

    type Adder = (numbers: { a: number, b: number }) => number;
    function iTakeAnAdder(adder: Adder) {
        return adder({ a: 1, b: 2 });
    }
    iTakeAnAdder(({a, b}) => { // Types of `a` and `b` are inferred
        // a = "hello"; // Would Error: cannot assign `string` to a `number`
        return a + b;
    })

    type Shape = any

    interface PaintOptions {
        shape: Shape;
        xPos?: number;
        yPos?: number;
    }

    function paintShape({shape, xPos = 0, yPos = 0}: PaintOptions) {
        console.log("x coordinate at", xPos);

    }


// Create interface instance
    interface Person1 {
        name: string;
        readonly age: number;
    }

    interface Person2 {
        name: string;
        readonly age: number;
    }

    let person1: Person1 = {
        name: "Person McPersonface",
        age: 42,
    };
    let person2: Person2 = {
        name: "Person McPersonface",
        age: 42,
    };
    person1 = person2

// Assignability FUnction
    type voidFunc = () => void;

    const f1: voidFunc = () => {
        return true;
    };

    const f2: voidFunc = () => true;

    const f3: voidFunc = function () {
        return true;
    };


    interface Colorful {
        color: string;
    }

    interface Circle {
        radius: number;
    }

    type ColorfulCircle = Colorful & Circle;

    function draw(circle: Colorful & Circle) {
        console.log(`Color was ${circle.color}`);
        console.log(`Radius was ${circle.radius}`);
    }

    // okay
    draw({color: "blue", radius: 42});
    //draw({color: "red", raidus: 42});


    // Tuple Types
    // A tuple type is another sort of Array type that knows exactly how many elements it contains,
    // and exactly which types it contains at specific positions.
    type StringNumberPair = [string, number];
}


