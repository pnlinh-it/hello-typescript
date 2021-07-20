interface User {
    id: number,
    name: string,
    age: number
}

// "id" | "name" | "age"
type UserKeys = keyof User

function getUserKey(user: User, key: UserKeys) {
}

function getObjectKey<Type>(object: Type, key: keyof Type) {
}

