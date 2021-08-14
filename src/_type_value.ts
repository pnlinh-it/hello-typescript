import {User} from "./user";

// type and interface has no typeof
// type class is function
// value and type can be same name

// A type that alias to User
type MyUser = User

// A variable point to User
const MyUser = User

// new class or new function
const user = new MyUser('linh', 1)

// Pass type to generic
type UpadteUser = Partial<MyUser>

build1(MyUser)
build2(MyUser)
build3(user)

export type AnyClass<ReturnType = any> = new (...args: any[]) => ReturnType;

function build1(user: AnyClass<MyUser>) {
    return new user('linh', 12)
}

// https://www.typescriptlang.org/docs/handbook/2/typeof-types.html
function build2(user: typeof MyUser) {
    return new user('Linh', 12)
}

function build3(user: MyUser) {
    return user
}

export default {}

