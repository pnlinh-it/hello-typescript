# Export

```typescript
const PI = 3.14;
const sayHello = function (name: string) {
    console.log(name)
}

export {PI, sayHello} // Need wrap to object
export const NAME = 'Linh'; // Need const
export * as utilities from "./utilities"
import {utilities} from "./index"

export default class User {
    name: string
}
```

```typescript
const PI = 3.14;
const PHI = 0.1;
export default {PI, PHI}
```

# Import

```typescript
import {ZipCodeValidator} from "./ZipCodeValidator";
import {ZipCodeValidator as ZCV} from "./ZipCodeValidator";
import * as validator from "./ZipCodeValidator";
import "./my-module.js";
```

```typescript
import MyUser, {sayHello, sayGoodbye, pi as PI} from "./export";
import Constant from "./export";

Constant.PI
Constant.PHI
```

# More

- [Export](https://www.typescriptlang.org/docs/handbook/modules.html#export)
- [Default export](https://www.typescriptlang.org/docs/handbook/modules.html#default-exports)
- [Import](https://www.typescriptlang.org/docs/handbook/modules.html#import)
- [Guidance for structuring modules](https://www.typescriptlang.org/docs/handbook/modules.html#guidance-for-structuring-modules)
