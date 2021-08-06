function declare() {
    // Destructuring array
    let [a, b] = [1, 2]
    let [c, ...d] = [1, 2, 3, 4]
    let [e, f, ...g] = [1, 2, 3, 4]


// Destructuring tuple
    let tuple: [number, string, boolean] = [7, "hello", true];
    let [a1, b1, c1] = tuple;


// Destructuring object
    let user = {
        username: "foo",
        age: 12,
        mark: 34
    };
    let {username, age, ...mark} = user;
    let {a2, b2} = {a2: "baz", b2: 101};


// Destructuring function

    interface Quiz {
        name: string,
        questionCount: number,
        averageMark?: number
    }

    function printQuiz({name, questionCount, averageMark = 12}: Quiz) {

    }


// Default value

    function keepWholeObject(wholeObject: { a: string; b?: number }) {
        let {a, b = 1001} = wholeObject;
    }


// Spread
    let first = [1, 2];
    let second = [3, 4];
    let bothPlus = [0, ...first, ...second, 5];

// Override
    let defaults = {food: "spicy", price: "$$", ambiance: "noisy"};
    let search = {...defaults, food: "rich"};
// { food: "rich", price: "$$", ambiance: "noisy" }

    let defaults1 = {food: "spicy", price: "$$", ambiance: "noisy"};
// @ts-ignore
    let search1 = {food: "rich", ...defaults};
// { food: "spicy", price: "$$", ambiance: "noisy" }


}