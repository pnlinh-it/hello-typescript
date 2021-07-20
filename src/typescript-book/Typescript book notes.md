### Types are structural

TypeScript objects are structurally typed. This means the names don't matter as long as the structures match.

```typescript
interface Point2D {
    x: number;
    y: number;
}

interface Point3D {
    x: number;
    y: number;
    z: number;
}

var point2D: Point2D = {x: 0, y: 10}
var point3D: Point3D = {x: 0, y: 10, z: 20}

function iTakePoint2D(point: Point2D) { /* do something */
}

iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
iTakePoint2D({x: 0}); // Error: missing information `y`

interface Point {
    x: number,
    y: number
}
class Point2D {
    constructor(public x:number, public y:number){}
}

let p: Point = new Point2D(1,2);
```

### Equality

If you want to compare two objects for structural equality `==/===` are not sufficient. e.g.

```typescript
console.log("" == "0"); // false
console.log(0 == ""); // true

console.log({a: 123} == {a: 123}); // False
console.log({a: 123} === {a: 123}); // False
```

### Null vs. Undefined

```typescript
console.log(typeof null) // object
console.log(null == undefined); // true
console.log(undefined == null); // true
```

Recommend `== null` to check for both undefined or null because of `underfined == null`.

```typescript
function foo(arg: string | null | undefined) {
    if (arg != null) {
        // arg must be a string as `!=` rules out both null and undefined. 
    }
}
```

### this

Any access to this keyword within a function is controlled by how the function is actually called. It is commonly
referred to as the “calling context.”
- [A sweet video about this pattern 🌹](https://egghead.io/lessons/typescript-make-usages-of-this-safe-in-class-methods)
```typescript
function foo() {
    console.log(this);
}

foo(); // logs out the global e.g. `window` in browsers

let bar = {
    foo
}
bar.foo(); // Logs out `bar` as `foo` was called on `bar`
```

Be careful when use `this` inside `function`. `this` can be not point to expected object. `this` within the `function` is
going to point to `window` because `window` is going to be what executes the `growOld` function.

```typescript
function Person(age) {
    this.age = age;
    this.growOld = function () {
        this.age++;
    }
}

var person = new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function () {
    console.log(person.age);
}, 2000); // 1, should have been 2

// Fix use _this
function Person(age) {
    this.age = age;
    var _this = this;  // capture this
    this.growOld = function() {
        _this.age++;   // use the captured this
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 2

// Fix use arrow function
function Person(age) {
    this.age = age;
    this.growOld = () => {
        this.age++;
    }
}

var person = new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function () {
    console.log(person.age);
}, 2000); // 2

// Type script
class Person {
    constructor(public age:number) {}
    growOld = () => {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 2
```

### Truthy

| Variable Type   | When it is *falsy*       | When it is *truthy*      |
|-----------------|--------------------------|--------------------------|
| `boolean`       | `false`                  | `true`                   |
| `string`        | `''` (empty string)      | any other string         |
| `number`        | `0`  `NaN`               | any other number         |
| `null`          | always                   | never                    |
| `undefined`     | always                   | never                    |
| Any other Object including empty ones like `{}`,`[]` | **<ins>never</ins>** | **<ins>always</ins>** |

### The `!!` pattern

Used to convert variable to a *boolean* (one of `true`|`false`). The `!` pattern converts the variable (in this case
foo) to a boolean but inverts the logic. 

### `let`
```typescript
let foo = 123;
if (true) {
    let foo = 456;
}
console.log(foo); // 123
```

### `for...of`
`for...in` is iterate over `keys`. `for...of` is iterate over `value`.
```typescript
var someArray = [9, 2, 5];
for (var item in someArray) {
    console.log(item); // 0,1,2
}

var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item); // 9,2,5
}
```

### String interpolation
```typescript
var lyrics = `Never gonna give you up
Keep moving
Never gonna let you down`;
```

### Type compatibility
#### Structure
```typescript
interface Point {
    x: number,
    y: number
}

class Point2D {
    constructor(public x:number, public y:number){}
}

let p: Point;
// OK, because of structural typing
p = new Point2D(1,2);
```
#### Functions
```typescript
/** Type Hierarchy */
interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

/** Two sample functions */
let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

/** Assignment */
iMakePoint2D = iMakePoint3D; // Okay
iMakePoint3D = iMakePoint2D; // ERROR: Point2D is not assignable to Point3D


/** Type Hierarchy */
interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

/** Two sample functions */
let iTakePoint2D = (point: Point2D) => { /* do something */ }
let iTakePoint3D = (point: Point3D) => { /* do something */ }

iTakePoint3D = iTakePoint2D; // Okay : Reasonable
iTakePoint2D = iTakePoint3D; // Okay : WHAT
```

#### Classes
Only instance members and methods are compared. constructors and statics play no part.
```typescript
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { /** do something */ }
}

class Size {
    feet: number;
    constructor(meters: number) { /** do something */ }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK
```
`private` and `protected` members must originate from the same class. Such members essentially make the class nominal.
```typescript
/** A class hierarchy */
class Animal { protected feet: number; }
class Cat extends Animal { }

let animal: Animal;
let cat: Cat;

animal = cat; // OKAY
cat = animal; // OKAY

/** Looks just like Animal */
class Size { protected feet: number; }

let size: Size;

animal = size; // ERROR
size = animal; // ERROR
```

