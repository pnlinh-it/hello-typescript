```typescript
// Separate export
const PI = 3.14;
const sayHello = (greet: string) => { alert(greet) }
export const NAME = 'Linh';
export {PI, sayHello}
// import
import {PI, sayHello, NAME} from './separateExport'


// Default export
export default class User { name: string }
// import
import User from "./defaultExport"; // not {User}, just User  
import AnyNameHere from "./defaultExport";


// Default export multiple
class Circle { name: string }
class Rectangle { name: string }
export default {Circle, Rectangle}
// import
import Shape from './defaultExportMultiple'
const circle = new Shape.Circle()
const rectangle = new Shape.Rectangle()


// Default and separate export
export const MAX = 100;
export default class User { name: string }
// import
import AnyUserNameHere, {MAX} from "./defaultAndSeparateExport";
import {default as User, MAX} from "./defaultAndSeparateExport";
```

# More
- https://javascript.info/import-export
- [Export](https://www.typescriptlang.org/docs/handbook/modules.html#export)
- [Default export](https://www.typescriptlang.org/docs/handbook/modules.html#default-exports)
- [Import](https://www.typescriptlang.org/docs/handbook/modules.html#import)
- [Guidance for structuring modules](https://www.typescriptlang.org/docs/handbook/modules.html#guidance-for-structuring-modules)
