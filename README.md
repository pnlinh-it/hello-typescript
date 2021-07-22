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

# Reference
- [TypeScript - Getting Started](https://www.logicbig.com/tutorials/misc/typescript/type-guards.html)
- [Advanced TypeScript Types Cheat Sheet](https://www.freecodecamp.org/news/advanced-typescript-types-cheat-sheet-with-examples/#intersection-types)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Typescript exercise](https://typescript-exercises.github.io/#exercise=6&file=%2Findex.ts)
