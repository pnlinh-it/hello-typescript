export let squareTwo = 1.41;

export const phi = 1.61;

export class RandomNumberGenerator {
}

const sayHello = function (name: string) {
    console.log(name)
}

function sayGoodbye(name: string) {
    console.log(name)
}

export {sayHello, sayGoodbye}

export function absolute(num: number) {
    if (num < 0) return num * -1;
    return num;
}