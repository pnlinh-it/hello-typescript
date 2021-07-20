function generic() {
    // function idenity<Type>(type: Type, fn: (arg: Type) => Type): Type {
    //     return fn(type)
    // }
    // Assign variable to function
    // Callable interface or type alias
    // Determine where put Type. Typically before parenthesis (

    // Two type og functional generic
    interface A<Type> {
        (input: Type): Type;
    }

    interface B {
        <Type>(number: Type): Type
    }


    // Assign variable to function
    function identity<Type>(arg: Type): Type {
        return arg
    }

    let identityAlias: <Type>(arg: Type) => Type = identity


    // Describe function interface
    interface CallableInterface {
        <Type>(name: Type): Type
    }

    let callableInterface: CallableInterface = function <Type>(arg: Type) {
        return arg
    }

    let callableInterfaceArrow: CallableInterface = <Type>(agr: Type) => {
        return agr
    }
    let callableInterfaceAlias: CallableInterface = identity


    // Create
    interface GenericNumber<NumType> {
        zeroValue: NumType;
        add: (x: NumType, y: NumType) => NumType;
    }

    let myGenericNumber: GenericNumber<number> = {
        zeroValue: 0,
        add: function (x: number, y: number) {
            return x + y;
        }
    }
}