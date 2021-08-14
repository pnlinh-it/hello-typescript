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

export type AnyClass<ReturnType = any> = new (...args: any[]) => ReturnType;

function build(user: AnyClass<MyUser>) {
    return new user()
}

export default {}

