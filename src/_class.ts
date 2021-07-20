function helloClass() {
    // Index signature?
    // Always use this to access to properties
    // Getter, setter
    // implementing an interface with an optional property doesn’t create that property
    // In most cases, classes in TypeScript are compared structurally, the same as other types.
    // https://www.typescriptlang.org/docs/handbook/type-compatibility.html
    // Interface canbe Adding new fields to an existing interface

    class User {
        username: string

        //[index: string]: number | string;

        constructor(private id: number, username: string) {
            this.username = username
        }

        get upperUsername(): string {
            return this.username.toUpperCase()
        }

        sayHell(): void {
            console.log(`Hell ${this.username}`)
        }
    }

    const user = new User(1, 'Linh')
    console.log(user.upperUsername)
    user.sayHell()


    class People {
        id: number;

        userName!: string;

        age!: number;

        readonly nickName: string = "world";

        constructor(id: number, username: string);
        constructor(id: number, username: string, age?: number) {
            this.id = id
            this.userName = username
            if (age != null) {
                this.age = age
            }
        }
    }

    class Student extends People {
        classId: number

        constructor(id: number, username: string, private mark: number, classId: number, age?: number,) {
            super(id, username);
            this.classId = mark
        }
    }


    // Implement interface that has optional properties

    interface A {
        x: number;
        y?: number;
    }

    class C implements A {
        x = 0;
    }

    const c = new C();
    // c.y = 10; TS2339: Property 'y' does not exist on type 'C'


    // Override method
    // In override method can add optional parameter
    class Base {
        sayHello() {
        }
    }

    class Derived extends Base {
        // sayHello(name: String) Not work

        sayHello(name?: String) {

        }
    }


    // Initialization Order
    // The base class fields are initialized
    // The base class constructor runs
    // The derived class fields are initialized
    // The derived class constructor runs

    class Base1 {
        name = "base";

        constructor() {
            console.log("My name is " + this.name);
        }
    }

    class Derived1 extends Base1 {
        name = "derived";
    }

    // Prints "base", not "derived"
    const d = new Derived1();

    // Base class constructor saw its own value for name during its own constructor,
    // because the derived class field initializations hadn’t run yet.


    // static / public / protected / private


    // Relationships Between Classes
    // In most cases, classes in TypeScript are compared structurally, the same as other types.
    class Person {
        name: string = '';
        age: number = 12;
    }

    class Employee {
        name: string = '';
        age: number = 12;
        salary: number = 13;
    }

    const p: Person = new Employee();


    // Interface override
    interface Box {
        height: number;
        width: number;
    }

    interface Box {
        scale: number;
    }

    let box: Box = {height: 5, width: 6, scale: 10};

    interface Animal {
        name1: string
    }

    interface People {
        name2: string
    }

    interface Cloner {
        clone(animal: Animal): Animal;
    }

    interface Cloner {
        clone(people: People): People;
    }

    interface Cloner {
        clone(animal: Animal): Animal;
    }

    class Child implements Cloner {
        clone(animal: Animal): Animal;
        clone(people: People): People;
        clone(animal: Animal | People): Animal | People {
            return {name1: ''};
        }
    }
}
