# Init project

```sh
npm init
npm i express
npm i -D typescript ts-node nodemon @types/node @types/express
# npm install -save-dev typescript ts-node nodemon @types/node @types/express
touch .gitignore
mkdir {dist,src}
tsc --init
```

Update `package.json`

```json
{
  "name": "hello-typescript",
  "version": "1.0.0",
  "description": "Hello typescript",
  "main": "index.js",
  "scripts": {
    "test": "test",
    "start": "node ./dist/app.js",
    "dev": "nodemon ./dist/app.js",
    "build": "tsc -p ."
  },
  "author": "Linh Pham",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

Update `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "strictNullChecks": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

Run a specify `.ts` file

```shell
npx ts-node src/_class.ts
```

# FAQ

# Type

### Intersect two type that have same property but difference type

- The new type of intersect property is `never`

```typescript
type LeftType = {
    id: string
}
type RightType = {
    id: number
}
type IntersectionType = LeftType & RightType
```

### Create new type by intersect and remove or add some properties

```typescript
type PowerUser = Omit<User, 'type'> & Omit<Admin, 'type'> & {
    type: 'powerUser'
};
```

## Function

### Optional parameter

- Optional parameter must be put on the end of function parameters.

### Overload function rule

- The return type of implementation signature function must be cover all return type of the rest overload signature. The
  parameter is no mater.

```typescript
// Notice the return type of the implementation signature.
function hello(number: number): number;
function hello(text: string): string;
function hello(content: string, name: string, user: User): User;
function hello(content: string, name: string, admin: Admin): Admin;
function hello(number: any): string | number | User | Admin {
    return ''
}
```

## Narrowing
- Type Guards allow you to check the type of variable or an object with an operator.
- [Type Guard](https://basarat.gitbook.io/typescript/type-system/typeguard)

### What Narrowing means

- Such as Smart cast in Kotlin.

### Check type of class and interface

- To check primitive type using `typeof`
- To check class type using `instanceof`
- To check interface, type alias type using
    - [`in` operator narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing)
    - [Type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
    - Add type literal property such as `type: 'admin` or `kind: 'admin'`.
      See [Discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

```typescript
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square

function isSquare(shape: Shape): shape is Square {
    return shape.kind === 'square'
}

// Using type literal
function getArea(shape: Shape): number {
    if (shape.kind === 'square') {
        return shape.sideLength ** 2
    } else {
        return shape.radius ** 2 * Math.PI
    }
}

// Using in operator
function getArea(shape: Shape): number {
    if ('sideLength' in shape) {
        return shape.sideLength ** 2
    } else {
        return shape.radius ** 2 * Math.PI
    }
}

// Using type predicate
function getArea(shape: Circle | Square): number {
    if (isSquare(shape)) {
        return shape.sideLength ** 2
    } else {
        return shape.radius ** 2 * Math.PI
    }
}
```

### What use case of `never`

- Used to exhaustiveness check. Typically, it is used in switch case.

```typescript
type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
```

Adding a new member to the Shape union, will cause a TypeScript error:

```typescript
type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
// Type 'Triangle' is not assignable to type 'never'.
            return _exhaustiveCheck;
    }
}
```

## Utility Types

### `Partial<Type>`

- Use for update or filter.

```typescript
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return {...todo, ...fieldsToUpdate};
}
```

### `Required<Type>`

- Ensure every optional properties are non-null

```typescript
interface Props {
    a?: number;
    b?: string;
}

const obj: Props = {a: 5};

// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
const obj2: Required<Props> = {a: 5};
```

### `Readonly<Type>`

```typescript
interface Todo {
    title: string;
}

const todo: Readonly<Todo> = {
    title: "Delete inactive users",
};

// Cannot assign to 'title' because it is a read-only property.
todo.title = "Hello";
```

### `Omit<Type, Keys>`

- To construct new type and remove some keys

```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;
type TodoInfo = Omit<Todo, "completed" | "createdAt">;
```

```typescript
type PowerUser = Omit<User, 'type'> & Omit<Admin, 'type'> & {
    type: 'powerUser'
};
```
# Decorator
```typescript
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
```
- Execute after class declaration not when instantiate
- Notice the last line: actual it first generates a function name `__decorate`.  
- Then executes it wit after class declaration.
- Run get and result of `second()`
- Pass the result to the `__decorate()`
- The order is: `second()` → `__decorate()` → `functionReturnFromSecond()`
```typescript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length
    var r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    var d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]) {
                // This line will invoke function return from second function.
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function second(target: Object,
                propertyKey: string,
                descriptor: PropertyDescriptor) {
    // This execute before __decorate()
    // In nestjs, @Get(), @Post() maybe use descriptor.value to register handler to router...
    return function (target, propertyKey, descriptor) {
        // We can override origin method by: descriptor.value = function (...args) { }
        // This still execute when class declare
    };
}

class ExampleClass {
    method() {
        console.log(1);
    }
}

__decorate([ second() ], ExampleClass.prototype, "method", null);
```

![decorator](https://user-images.githubusercontent.com/11713395/128552061-35868bf3-c9ed-48c2-ab71-7fcb5151a357.gif)

Another example to measure the execution time. [See more](https://blog.logrocket.com/a-practical-guide-to-typescript-decorators/)
```typescript
function measure(target: Object,
                propertyKey: string,
                descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    // descriptor.value is point to launch method
    // In this case we override origin method
    descriptor.value = function (...args) {
        // This will invoke after launch is get called
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const finish = performance.now();
        console.log(`Execution time: ${finish - start} milliseconds`);
        return result;
    };

    return descriptor;
}

class Rocket {
    @measure
    launch() {
        console.log("Launching in 3... 2... 1... 🚀");
    }
}
```
- [Using Class Decorators in Typescript with a real example](https://dev.to/danywalls/decorators-in-typescript-with-example-part-1-m0f)
- [Exploring EcmaScript Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)


- https://dmitripavlutin.com/typescript-index-signatures/
- https://blog.logrocket.com/building-type-safe-dictionary-typescript/

## Using the Indexed Access Operator
- Essential of Typescript
```ts
import { City, Person, Product, Employee } from "./dataTypes";

function getValue<T, K extends keyof T>(
    item: T, keyname: K) { console.log(`Value: ${item[keyname]}`);
}
type priceType = Product["price"];
type allTypes = Product[keyof Product];

let p = new Product("Running Shoes", 100); 
getValue<Product, "name">(p, "name"); getValue(p, "price");

let e = new Employee("Bob Smith", "Sales"); 
getValue(e, "name");
getValue(e, "role");
```
The indexed access operator is expressed using square brackets following a type so that `Product["price"]`, for example, is number, since that is the type of the `price` property defined by the `Product` class. The indexed access operator works on literal value types, which means it can be used with index type queries, like this:

```ts
type allTypes = Product[keyof Product]; 
```

The `keyof Product` expression returns a literal value type union with the property names defined by the `Product` class, `"name" | "price"`. The indexed access operator returns the union of the types of those properties, such that `Product[keyof Product]` is `string | number`, which is the union of the types of the name and price properties.

The indexed access operator is most commonly used with generic types, which allows property types to
be handled safely even though the specific types that will be used are unknown, 
```ts
import { City, Person, Product, Employee } from "./dataTypes";
function getValue<T, K extends keyof T>(item: T, keyname: K): T[K] {
    return item[keyname];
}
let p = new Product("Running Shoes", 100);
console.log(getValue<Product, "name">(p, "name")); 
console.log(getValue(p, "price"));

let e = new Employee("Bob Smith", "Sales");
console.log(getValue(e, "name")); 
console.log(getValue(e, "role"));
```
![image](https://user-images.githubusercontent.com/11713395/135743680-e87e572f-66e4-461f-8f05-212a9795914e.png)

`T[K]` tells the compiler that the result of the getValue function will have the type of the property whose name is specified by the keyof type argument, leaving the compiler to determine the result types based on the generic type arguments used to invoke the function. For the `Product` object, that means a `name` argument will produce a `string` result, and a `price` argument will produce a `number` result. 

# Reference
- [TypeScript - Getting Started](https://www.logicbig.com/tutorials/misc/typescript/type-guards.html)
- [Advanced TypeScript Types Cheat Sheet](https://www.freecodecamp.org/news/advanced-typescript-types-cheat-sheet-with-examples/#intersection-types)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Typescript exercise](https://typescript-exercises.github.io/#exercise=6&file=%2Findex.ts)
