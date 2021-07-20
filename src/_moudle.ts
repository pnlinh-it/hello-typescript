// Allow choose which is import → export.ts const A = {}
// Permit choose which is import → export.ts default const A = {}
// When export variable we must wrap in object
// export {sayHello, sayGoodbye}
// export const phi = 1.61;

interface Storage {
}

interface Session {
}

export interface User {
    name: string
}

const SECTION_NAME3 = 'function'
const SECTION_NAME4 = 'function'

// Can use import {SECTION_NAME1} from './_function'
export const SECTION_NAME1 = 'function'
export {SECTION_NAME3, SECTION_NAME4}
export {Session, Storage as OtherStorage}

// Cannot choose which is import: import {SECTION_NAME1} from './_function'
// import fn from './_function'
// fn.SECTION_NAME3, fn.SECTION_NAME4
export default {SECTION_NAME3, SECTION_NAME4}